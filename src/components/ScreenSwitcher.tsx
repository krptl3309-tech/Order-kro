import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Screen } from '../types';

export const ScreenSwitcher: React.FC = () => {
  const { currentScreen, navigateTo } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const screens: Array<{ id: Screen; label: string; icon: string; badge: string }> = [
    { id: 'storefront', label: '1. Storefront (Home)', icon: 'storefront', badge: 'Screen 1' },
    { id: 'product-catalog', label: '2. Vegetables Catalog', icon: 'nutrition', badge: 'Screen 3' },
    { id: 'fast-checkout', label: '3. Fast Checkout', icon: 'shopping_bag', badge: 'Screen 4' },
    { id: 'live-order-tracking', label: '4. Live GPS Tracking', icon: 'electric_moped', badge: 'Screen 2' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isExpanded && (
        <div className="mb-2 bg-[#131b2e] text-white p-2.5 rounded-2xl shadow-2xl border border-white/10 w-64 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-[#becab7] uppercase tracking-wider">
            <span>Quick Screen Switcher</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#becab7] hover:text-white"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
          {screens.map((s) => {
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  navigateTo(s.id);
                  setIsExpanded(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0c831f] text-white font-bold shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                  <span>{s.label}</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-white/60'}`}>
                  {s.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 bg-[#131b2e] text-white px-3.5 py-2 rounded-full shadow-2xl border border-white/20 hover:bg-[#006714] transition-all cursor-pointer active:scale-95 group"
      >
        <span className="material-symbols-outlined text-[18px] text-[#ffddb8] group-hover:rotate-45 transition-transform">
          dashboard_customize
        </span>
        <span className="text-xs font-bold tracking-tight">Screens</span>
        <span className="w-2 h-2 rounded-full bg-[#8ffb87]"></span>
      </button>
    </div>
  );
};
