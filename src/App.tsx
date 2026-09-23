import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { StorefrontScreen } from './screens/StorefrontScreen';
import { ProductCatalogScreen } from './screens/ProductCatalogScreen';
import { FastCheckoutScreen } from './screens/FastCheckoutScreen';
import { LiveOrderTrackingScreen } from './screens/LiveOrderTrackingScreen';

const MainContent: React.FC = () => {
  const { currentScreen } = useCart();

  return (
    <main className="w-full pt-32 transition-opacity duration-200">
      {currentScreen === 'storefront' && <StorefrontScreen />}
      {currentScreen === 'product-catalog' && <ProductCatalogScreen />}
      {currentScreen === 'fast-checkout' && <FastCheckoutScreen />}
      {currentScreen === 'live-order-tracking' && <LiveOrderTrackingScreen />}
    </main>
  );
};

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#0c831f] selection:text-white">
        <Header />
        <div className="flex-1 w-full">
          <MainContent />
        </div>
        <Footer />
        <Modals />
        <ScreenSwitcher />
      </div>
    </CartProvider>
  );
}
