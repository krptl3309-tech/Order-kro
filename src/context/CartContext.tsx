import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Address, Screen } from '../types';
import { INITIAL_ADDRESSES, PRODUCTS } from '../data/mockData';

interface CartContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  cart: Record<string, number>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  tip: number;
  setTip: (tip: number) => void;
  couponApplied: boolean;
  setCouponApplied: (applied: boolean) => void;
  deliveryInstructions: string[];
  toggleInstruction: (instruction: string) => void;
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalItemsCount: number;
  itemTotal: number;
  handlingFee: number;
  deliveryFee: number;
  discount: number;
  totalPayable: number;
  totalSavings: number;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  isCallModalOpen: boolean;
  setIsCallModalOpen: (open: boolean) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  isRefundModalOpen: boolean;
  setIsRefundModalOpen: (open: boolean) => void;
  placeOrder: () => Promise<void>;
  latestOrderId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('storefront');
  
  // Initial cart matching the Checkout & Live Tracking screens (5 items)
  const [cart, setCart] = useState<Record<string, number>>({
    'prod-onion': 1,
    'prod-milk-amul': 2,
    'cat-tomato': 1,
    'prod-lays': 2,
    'cat-coconut': 1,
  });

  const [tip, setTip] = useState<number>(20);
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [deliveryInstructions, setDeliveryInstructions] = useState<string[]>(["🔕 Don't ring bell"]);
  const [addresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(INITIAL_ADDRESSES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [latestOrderId, setLatestOrderId] = useState<string>('OK-89210');

  // Modals
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  // Sync cart changes to backend Cloud SQL API
  const syncCartToCloudSql = async (productId: string, quantity: number) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, userId: 'guest_user' }),
      });
    } catch (e) {
      // Ignore background sync errors gracefully
    }
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const newQty = (prev[productId] || 0) + 1;
      syncCartToCloudSql(productId, newQty);
      return {
        ...prev,
        [productId]: newQty,
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const newQty = current <= 1 ? 0 : current - 1;
      syncCartToCloudSql(productId, newQty);
      if (newQty === 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: newQty,
      };
    });
  };

  const updateQuantity = (productId: string, qty: number) => {
    syncCartToCloudSql(productId, qty);
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: qty,
      };
    });
  };

  const clearCart = () => setCart({});

  const toggleInstruction = (instruction: string) => {
    setDeliveryInstructions((prev) =>
      prev.includes(instruction)
        ? prev.filter((i) => i !== instruction)
        : [...prev, instruction]
    );
  };

  // Calculations
  const { totalItemsCount, itemTotal, totalSavings } = useMemo(() => {
    let count = 0;
    let sum = 0;
    let savings = 0;

    Object.entries(cart).forEach(([id, qty]) => {
      if (qty <= 0) return;
      count += qty;
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) {
        sum += product.price * qty;
        if (product.mrp && product.mrp > product.price) {
          savings += (product.mrp - product.price) * qty;
        }
      }
    });

    return { totalItemsCount: count, itemTotal: sum, totalSavings: savings };
  }, [cart]);

  const handlingFee = totalItemsCount > 0 ? 4 : 0;
  const deliveryFee = 0; // Free above ₹149
  const discount = couponApplied && itemTotal > 0 ? 50 : 0;
  const totalPayable = Math.max(0, itemTotal + handlingFee + deliveryFee + tip - discount);

  const placeOrder = async () => {
    try {
      const items = Object.entries(cart).map(([productId, quantity]) => {
        const prod = PRODUCTS.find((p) => p.id === productId);
        return {
          productId,
          quantity,
          price: prod?.price || 20,
        };
      });

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'guest_user',
          items,
          totalPayable,
          itemTotal,
          discount,
          tip,
          handlingFee,
          paymentMethod: 'UPI',
          deliveryAddress: `${selectedAddress.type}: ${selectedAddress.addressLine}`,
          instructions: deliveryInstructions.join(', '),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.orderId) {
          setLatestOrderId(data.orderId);
        }
      }
    } catch (e) {
      console.error('Failed to post order to Cloud SQL:', e);
    }

    navigateTo('live-order-tracking');
  };

  return (
    <CartContext.Provider
      value={{
        currentScreen,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        tip,
        setTip,
        couponApplied,
        setCouponApplied,
        deliveryInstructions,
        toggleInstruction,
        addresses,
        selectedAddress,
        setSelectedAddress,
        searchQuery,
        setSearchQuery,
        totalItemsCount,
        itemTotal,
        handlingFee,
        deliveryFee,
        discount,
        totalPayable,
        totalSavings: totalSavings + discount,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isChatModalOpen,
        setIsChatModalOpen,
        isCallModalOpen,
        setIsCallModalOpen,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        isRefundModalOpen,
        setIsRefundModalOpen,
        placeOrder,
        latestOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
