import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/mockData';

export const FastCheckoutScreen: React.FC = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    totalItemsCount,
    itemTotal,
    handlingFee,
    deliveryFee,
    discount,
    tip,
    setTip,
    couponApplied,
    setCouponApplied,
    deliveryInstructions,
    toggleInstruction,
    selectedAddress,
    setIsAddressModalOpen,
    totalPayable,
    totalSavings,
    placeOrder,
    navigateTo,
  } = useCart();

  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'wallet' | 'cod'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'custom'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const cartProductList = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return { product, qty };
    })
    .filter((item) => item.product !== undefined);

  const availableInstructions = [
    "🔕 Don't ring bell",
    "🚪 Leave at door",
    "📵 Avoid calling",
    "🐕 Pet at home",
  ];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top back bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('product-catalog')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#006714] hover:text-[#00530e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Store / Shopping</span>
          </button>
          <div className="flex items-center gap-1 text-[11px] text-[#3f4a3c] font-semibold bg-[#e0ffd7] px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px] text-[#006714]">lock</span>
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Flow Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery ETA Alert */}
            <div className="bg-[#0c831f] text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Delivery in 9 Minutes</h3>
                  <p className="text-xs text-[#e0ffd7]">Shipment 1 of 1 • Packed from Indiranagar Hub #04</p>
                </div>
              </div>
              <span className="bg-[#ffddb8] text-[#2a1700] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                PRIORITY RUN
              </span>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e0ffd7] flex items-center justify-center text-[#006714]">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#131b2e]">Delivering to {selectedAddress.type}</h3>
                    <p className="text-xs text-[#3f4a3c]">{selectedAddress.addressLine}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-xs font-bold text-[#0c831f] hover:text-[#006714] px-3 py-1.5 rounded-lg border border-[#0c831f] hover:bg-[#e0ffd7]/30 transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Delivery Instructions */}
              <div className="border-t border-[#eaedff] pt-3">
                <p className="text-xs font-bold text-[#3f4a3c] mb-2">Delivery Instructions for Rider</p>
                <div className="flex flex-wrap gap-2">
                  {availableInstructions.map((instruction) => {
                    const isSelected = deliveryInstructions.includes(instruction);
                    return (
                      <button
                        key={instruction}
                        onClick={() => toggleInstruction(instruction)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0c831f] text-white border-[#0c831f] font-bold shadow-xs'
                            : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd] hover:border-[#becab7]'
                        }`}
                      >
                        {instruction}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Items in Cart */}
            <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <h3 className="font-extrabold text-base text-[#131b2e]">
                  Items in Your Order ({totalItemsCount})
                </h3>
                <button
                  onClick={() => navigateTo('product-catalog')}
                  className="text-xs font-bold text-[#006714] hover:underline cursor-pointer"
                >
                  + Add More Items
                </button>
              </div>

              {cartProductList.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-[#3f4a3c]">Your cart is empty.</p>
                  <button
                    onClick={() => navigateTo('product-catalog')}
                    className="mt-3 px-5 py-2 bg-[#0c831f] text-white rounded-xl text-xs font-bold"
                  >
                    Browse Fresh Veggies
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#eaedff]">
                  {cartProductList.map(({ product, qty }) => {
                    if (!product) return null;
                    return (
                      <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-contain bg-[#f2f3ff] p-1"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-[#131b2e] leading-snug">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-[#6f7a6a]">
                              {product.weight} • ₹{product.price} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-[#0c831f] text-white rounded-lg px-1 py-0.5 shadow-xs">
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="w-5 h-5 flex items-center justify-center hover:opacity-80 active:scale-90 transition-transform cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">remove</span>
                            </button>
                            <span className="text-xs px-1.5 font-bold tabular-nums">{qty}</span>
                            <button
                              onClick={() => addToCart(product.id)}
                              className="w-5 h-5 flex items-center justify-center hover:opacity-80 active:scale-90 transition-transform cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">add</span>
                            </button>
                          </div>
                          <span className="font-bold text-sm text-[#131b2e] min-w-[48px] text-right">
                            ₹{product.price * qty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Payment Options Section */}
            <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-[#131b2e]">Select Payment Method</h3>

              {/* Tabs */}
              <div className="flex border-b border-[#eaedff] text-xs font-bold">
                <button
                  onClick={() => setPaymentTab('upi')}
                  className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                    paymentTab === 'upi'
                      ? 'border-[#006714] text-[#006714]'
                      : 'border-transparent text-[#3f4a3c] hover:text-[#131b2e]'
                  }`}
                >
                  ⚡ UPI Instant
                </button>
                <button
                  onClick={() => setPaymentTab('card')}
                  className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                    paymentTab === 'card'
                      ? 'border-[#006714] text-[#006714]'
                      : 'border-transparent text-[#3f4a3c] hover:text-[#131b2e]'
                  }`}
                >
                  Credit &amp; Debit Card
                </button>
                <button
                  onClick={() => setPaymentTab('wallet')}
                  className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                    paymentTab === 'wallet'
                      ? 'border-[#006714] text-[#006714]'
                      : 'border-transparent text-[#3f4a3c] hover:text-[#131b2e]'
                  }`}
                >
                  Wallets / BNPL
                </button>
                <button
                  onClick={() => setPaymentTab('cod')}
                  className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                    paymentTab === 'cod'
                      ? 'border-[#006714] text-[#006714]'
                      : 'border-transparent text-[#3f4a3c] hover:text-[#131b2e]'
                  }`}
                >
                  Cash on Delivery
                </button>
              </div>

              {/* Tab Content */}
              {paymentTab === 'upi' && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setSelectedUpiApp('gpay')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        selectedUpiApp === 'gpay'
                          ? 'border-[#006714] bg-[#e0ffd7]/20 ring-1 ring-[#006714]'
                          : 'border-[#eaedff] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#006714] text-[24px]">account_balance_wallet</span>
                      <span className="text-xs font-bold text-[#131b2e]">Google Pay</span>
                    </button>
                    <button
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        selectedUpiApp === 'phonepe'
                          ? 'border-[#006714] bg-[#e0ffd7]/20 ring-1 ring-[#006714]'
                          : 'border-[#eaedff] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#855300] text-[24px]">payments</span>
                      <span className="text-xs font-bold text-[#131b2e]">PhonePe</span>
                    </button>
                    <button
                      onClick={() => setSelectedUpiApp('paytm')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        selectedUpiApp === 'paytm'
                          ? 'border-[#006714] bg-[#e0ffd7]/20 ring-1 ring-[#006714]'
                          : 'border-[#eaedff] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#131b2e] text-[24px]">qr_code_2</span>
                      <span className="text-xs font-bold text-[#131b2e]">Paytm UPI</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] font-bold text-[#3f4a3c] block mb-1">Or enter UPI ID</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="yourname@okaxis"
                        value={customUpiId}
                        onChange={(e) => setCustomUpiId(e.target.value)}
                        className="flex-1 bg-[#f2f3ff] rounded-xl px-3 py-2 text-xs text-[#131b2e] focus:outline-none"
                      />
                      <button
                        onClick={() => setSelectedUpiApp('custom')}
                        className="px-4 py-2 bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-bold text-[#131b2e] rounded-xl cursor-pointer"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentTab === 'card' && (
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl border border-[#006714] bg-[#e0ffd7]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[26px] text-[#006714]">credit_card</span>
                      <div>
                        <div className="text-xs font-bold text-[#131b2e]">HDFC Bank Regalia •••• 4092</div>
                        <div className="text-[11px] text-[#6f7a6a]">Expires 08/29</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-14 bg-white border border-[#becab7] rounded-lg px-2 py-1 text-xs text-center font-mono"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Add Card modal opened.")}
                    className="w-full py-2.5 rounded-xl border border-dashed border-[#6f7a6a] text-xs font-bold text-[#3f4a3c] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                  >
                    + Add New Credit or Debit Card
                  </button>
                </div>
              )}

              {paymentTab === 'wallet' && (
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl border border-[#eaedff] flex items-center justify-between hover:bg-[#f2f3ff] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#006714]">Simpl</span>
                      <span className="text-xs text-[#131b2e]">1-Tap Pay Later (Credit: ₹4,500)</span>
                    </div>
                    <input type="radio" name="wallet" defaultChecked className="accent-[#0c831f]" />
                  </div>
                  <div className="p-3 rounded-xl border border-[#eaedff] flex items-center justify-between hover:bg-[#f2f3ff] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#855300]">Amazon Pay</span>
                      <span className="text-xs text-[#131b2e]">Balance: ₹340</span>
                    </div>
                    <input type="radio" name="wallet" className="accent-[#0c831f]" />
                  </div>
                </div>
              )}

              {paymentTab === 'cod' && (
                <div className="p-3.5 bg-[#f2f3ff] rounded-xl text-xs space-y-1">
                  <p className="font-bold text-[#131b2e]">Cash or QR on Delivery</p>
                  <p className="text-[#3f4a3c]">Pay cash or scan rider&apos;s dynamic QR on arrival. No handling charges.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Bill Breakdown */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-36">
            {/* Bill Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-[#131b2e]">Bill Breakdown</h3>

              <div className="space-y-2.5 text-xs text-[#3f4a3c]">
                <div className="flex justify-between">
                  <span>Item Total ({totalItemsCount} items)</span>
                  <span className="font-bold text-[#131b2e]">₹{itemTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Fee</span>
                  <span className="font-bold text-[#131b2e]">₹{handlingFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span className="bg-[#e0ffd7] text-[#006714] font-extrabold px-2 py-0.5 rounded text-[11px]">
                    FREE (Above ₹149)
                  </span>
                </div>

                {couponApplied && discount > 0 && (
                  <div className="flex justify-between text-[#006714] font-bold">
                    <span>Coupon QUICK100</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                {/* Delivery Tip selector */}
                <div className="pt-2 border-t border-[#eaedff]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-[#131b2e]">Rider Tip (100% to Driver)</span>
                    <span className="font-bold text-[#006714]">₹{tip}</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 10, 20, 30, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTip(amount)}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          tip === amount
                            ? 'bg-[#0c831f] text-white shadow-xs'
                            : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                        }`}
                      >
                        {amount === 0 ? 'None' : `₹${amount}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-[#eaedff] flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-extrabold text-base text-[#131b2e] block">To Pay</span>
                    <span className="text-[10px] text-[#6f7a6a]">Inclusive of all taxes</span>
                  </div>
                  <span className="text-xl font-extrabold text-[#006714]">₹{totalPayable}</span>
                </div>
              </div>

              {/* Coupon card */}
              <div className="bg-[#e0ffd7]/40 border border-[#0c831f]/30 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006714] text-[20px]">local_offer</span>
                  <div>
                    <span className="text-xs font-extrabold text-[#006714] block">QUICK100 APPLIED</span>
                    <span className="text-[10px] text-[#3f4a3c]">₹50 discount unlocked</span>
                  </div>
                </div>
                <button
                  onClick={() => setCouponApplied(!couponApplied)}
                  className="text-xs font-bold text-[#b30033] hover:underline cursor-pointer"
                >
                  {couponApplied ? 'Remove' : 'Apply'}
                </button>
              </div>

              {/* Place Order CTA Button */}
              <button
                disabled={totalItemsCount === 0 || isProcessing}
                onClick={handlePay}
                className="w-full py-3.5 bg-[#0c831f] hover:bg-[#006714] text-white font-extrabold text-sm rounded-xl shadow-[0_4px_16px_rgba(12,131,31,0.3)] transition-all active:scale-98 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{totalPayable} &amp; Place Order</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              {totalSavings > 0 && (
                <div className="text-center">
                  <span className="inline-block bg-[#ffddb8] text-[#2a1700] text-xs font-bold px-3 py-1 rounded-full">
                    🎉 You saved ₹{totalSavings} on this order!
                  </span>
                </div>
              )}
            </div>

            {/* Quality & Speed Guarantees */}
            <div className="bg-white p-4 rounded-2xl border border-[#eaedff] text-xs space-y-2 text-[#3f4a3c]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006714] text-[18px]">timer</span>
                <span>Delivered in 9 mins or ₹50 cashback</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006714] text-[18px]">verified</span>
                <span>Zero questions asked instant replacement at door</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
