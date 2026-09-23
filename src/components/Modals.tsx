import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RIDER_AVATAR } from '../data/mockData';

export const Modals: React.FC = () => {
  const {
    isAddressModalOpen,
    setIsAddressModalOpen,
    addresses,
    selectedAddress,
    setSelectedAddress,
    isChatModalOpen,
    setIsChatModalOpen,
    isCallModalOpen,
    setIsCallModalOpen,
    isInvoiceModalOpen,
    setIsInvoiceModalOpen,
    isRefundModalOpen,
    setIsRefundModalOpen,
    totalPayable,
    totalItemsCount,
  } = useCart();

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    { sender: 'driver', text: 'Namaste Aman ji! I have picked up your order from Indiranagar Hub. On my way on 100ft road.', time: '11:45 AM' },
    { sender: 'driver', text: 'Will be at your gate in approximately 5 minutes on my Ather EV.', time: '11:46 AM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'user', text: chatInput, time: timeStr }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: 'Got it! Following your delivery instructions carefully.', time: 'Just now' },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* 1. Address Picker Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006714] text-[24px]">location_on</span>
                <h3 className="text-lg font-bold text-[#131b2e]">Select Delivery Location</h3>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setIsAddressModalOpen(false);
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedAddress.id === addr.id
                      ? 'border-[#0c831f] bg-[#e0ffd7]/20 shadow-sm'
                      : 'border-[#eaedff] hover:border-[#becab7] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0c831f] text-[20px]">
                        {addr.type === 'Home' ? 'home' : 'work'}
                      </span>
                      <span className="font-bold text-sm text-[#131b2e]">{addr.type}</span>
                      {addr.isDefault && (
                        <span className="bg-[#ffddb8] text-[#2a1700] text-[10px] font-bold px-1.5 py-0.2 rounded">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    {selectedAddress.id === addr.id && (
                      <span className="material-symbols-outlined text-[#0c831f] text-[20px]">check_circle</span>
                    )}
                  </div>
                  <p className="text-xs text-[#3f4a3c] font-medium mt-1.5">{addr.addressLine}</p>
                  <p className="text-[11px] text-[#6f7a6a]">{addr.cityStatePincode}</p>
                  {addr.deliveryNote && (
                    <div className="mt-2 text-[11px] bg-[#f2f3ff] px-2 py-1 rounded text-[#3f4a3c] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#855300]">info</span>
                      <span>{addr.deliveryNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                alert("GPS permission granted: Current location detected as Indiranagar 100ft Road.");
                setIsAddressModalOpen(false);
              }}
              className="w-full py-3 rounded-xl border-2 border-dashed border-[#0c831f] text-[#006714] font-bold text-sm hover:bg-[#e0ffd7]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
              <span>Use Current GPS Location</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Driver Chat Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl flex flex-col h-[520px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#006714] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={RIDER_AVATAR} alt="Ramesh" className="w-10 h-10 rounded-full object-cover ring-2 ring-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#8ffb87] rounded-full border-2 border-[#006714]"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Ramesh Kumar</h4>
                  <p className="text-xs text-[#e0ffd7]">Ather 450X • 0.6 km away</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf8ff]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs font-medium shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0c831f] text-white rounded-br-none'
                        : 'bg-white text-[#131b2e] border border-[#eaedff] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#6f7a6a] mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#eaedff] flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message to Ramesh..."
                className="flex-1 bg-[#f2f3ff] rounded-xl px-3.5 py-2 text-xs text-[#131b2e] focus:outline-none placeholder:text-[#6f7a6a]"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#0c831f] hover:bg-[#006714] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Call Driver Modal */}
      {isCallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#e0ffd7] text-[#0c831f] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px] animate-bounce">call</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#131b2e]">Calling Ramesh Kumar</h3>
              <p className="text-xs text-[#3f4a3c] mt-1">Free masked call via Order Kro In-App Relay</p>
              <p className="text-sm font-bold text-[#006714] mt-2">+91 80 4920 1100</p>
            </div>
            <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs text-[#6f7a6a]">
              Ramesh is currently on an EV scooter navigating 100ft road.
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCallModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#dd1845] hover:bg-[#b30033] text-white font-bold text-xs cursor-pointer shadow-md"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tax Invoice Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006714]">Tax Invoice &amp; Receipt</span>
                <h3 className="font-extrabold text-base text-[#131b2e]">Invoice #OK-INV-89210</h3>
              </div>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-xs text-[#3f4a3c] bg-[#f2f3ff] p-3 rounded-xl">
              <div className="flex justify-between">
                <span>GSTIN:</span>
                <span className="font-mono font-bold text-[#131b2e]">29AAGCO0412P1ZN</span>
              </div>
              <div className="flex justify-between">
                <span>Dark Store:</span>
                <span className="font-bold text-[#131b2e]">Indiranagar Hub #04, BLR</span>
              </div>
              <div className="flex justify-between">
                <span>Billed To:</span>
                <span className="font-bold text-[#131b2e]">Aman R., Green Glen Apt</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold text-[#0c831f]">UPI Instant (GPay)</span>
              </div>
            </div>
            <div className="border-t border-b border-[#eaedff] py-2 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold">
                <span>Items ({totalItemsCount}):</span>
                <span>₹{totalPayable}</span>
              </div>
              <div className="flex justify-between text-[#6f7a6a]">
                <span>CGST (2.5%) + SGST (2.5%):</span>
                <span>Included</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert("Invoice PDF downloaded successfully!");
                  setIsInvoiceModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0c831f] text-white font-bold text-xs hover:bg-[#006714] flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] font-bold text-xs hover:bg-[#eaedff] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Satisfaction Promise / Instant Refund Modal */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-[#e0ffd7] text-[#006714] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#006714]">100% Quality Guarantee</span>
              <h3 className="font-extrabold text-lg text-[#131b2e]">Instant Doorstep Refund</h3>
              <p className="text-xs text-[#3f4a3c] mt-1">
                If any fresh produce or grocery item does not meet your quality standards, select the item below for immediate zero-question refund to your UPI ID in under 60 seconds.
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f2f3ff] text-xs font-semibold cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#0c831f]" />
                <span>Hybrid Red Tomatoes (Damaged / Bruised)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f2f3ff] text-xs font-semibold cursor-pointer">
                <input type="checkbox" className="accent-[#0c831f]" />
                <span>Nandini Fresh Milk (Spoiled / Leaking)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f2f3ff] text-xs font-semibold cursor-pointer">
                <input type="checkbox" className="accent-[#0c831f]" />
                <span>Missing Item from Dark Store</span>
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert("Refund of ₹28 initiated instantly to aman.rege@oksbi! Ref #UPI-REF-9921.");
                  setIsRefundModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0c831f] text-white font-bold text-xs hover:bg-[#006714] cursor-pointer shadow-md"
              >
                Confirm Instant UPI Refund
              </button>
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] font-bold text-xs hover:bg-[#eaedff] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
