import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RIDER_AVATAR, MAP_IMAGE_URL } from '../data/mockData';

export const LiveOrderTrackingScreen: React.FC = () => {
  const {
    navigateTo,
    setIsChatModalOpen,
    setIsCallModalOpen,
    setIsInvoiceModalOpen,
    setIsRefundModalOpen,
    selectedAddress,
    tip,
    latestOrderId,
  } = useCart();

  // Arriving in countdown timer (starts at 5 min 43 sec)
  const [secondsLeft, setSecondsLeft] = useState(343);
  const [riderSpeed, setRiderSpeed] = useState(34);
  const [distanceRemaining, setDistanceRemaining] = useState(640);
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      // subtle fluctuation in speed and distance to emulate real telemetry
      setRiderSpeed(30 + Math.floor(Math.sin(Date.now() / 2000) * 6));
      setDistanceRemaining((prev) => Math.max(120, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Bar with Live Telemetry */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => navigateTo('storefront')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#006714] hover:text-[#00530e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Store</span>
          </button>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 bg-[#e0ffd7] text-[#006714] px-3 py-1 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006714] animate-ping"></span>
              <span>GPS Telemetry 10Hz Live</span>
            </span>
            <span className="text-[#3f4a3c] font-medium">Order #{latestOrderId}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* ETA Header Banner */}
        <div className="bg-gradient-to-r from-[#006714] to-[#0c831f] text-white p-6 rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[36px] text-[#8ffb87] animate-pulse">
                electric_moped
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#ffddb8] block">
                Order in Transit
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Arriving in{' '}
                <span className="tabular-nums text-[#8ffb87]">{formatCountdown(secondsLeft)}</span>
              </h1>
              <p className="text-xs text-[#e0ffd7] mt-0.5">
                Ramesh is cruising on 100ft Road, Indiranagar • Estimated arrival 11:51 AM
              </p>
            </div>
          </div>

          {/* Telemetry Stats */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/15">
              <span className="block text-base font-extrabold text-white">{distanceRemaining}m</span>
              <span className="text-[10px] text-[#e0ffd7] uppercase">Remaining</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/15">
              <span className="block text-base font-extrabold text-white">{riderSpeed} km/h</span>
              <span className="text-[10px] text-[#e0ffd7] uppercase">EV Speed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/15">
              <span className="block text-base font-extrabold text-[#8ffb87]">142g</span>
              <span className="text-[10px] text-[#e0ffd7] uppercase">CO2 Saved</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Strip */}
        <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs mb-6 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#006714] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Packed &amp; Dispatched</span>
            </span>
            <span className="text-[#0c831f] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              <span>On Route (78% completed)</span>
            </span>
            <span className="text-[#6f7a6a]">At Your Doorstep</span>
          </div>
          <div className="w-full bg-[#f2f3ff] h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#0c831f] h-full rounded-full w-[78%] transition-all duration-500"></div>
          </div>
        </div>

        {/* 2-Column Main Layout: Live GPS Map + Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live GPS Route Map & Rider Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            {/* Map Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#eaedff] shadow-md relative">
              {/* Upcoming turn banner on top of map */}
              <div className="absolute top-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#eaedff] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#006714] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">turn_left</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block leading-tight">
                      Turn left onto 12th Main Road
                    </span>
                    <span className="text-[10px] text-[#6f7a6a]">In 120 meters • Next to Glen&apos;s Bakehouse</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#006714] bg-[#e0ffd7] px-2 py-0.5 rounded-md">
                  LIVE GPS
                </span>
              </div>

              {/* Map Canvas / Simulated Interactive Map */}
              <div className="relative w-full h-[400px] md:h-[460px] bg-[#d2d9f4] overflow-hidden">
                <img
                  src={MAP_IMAGE_URL}
                  alt="Live tracking map of Indiranagar Bengaluru"
                  className="w-full h-full object-cover scale-105"
                />

                {/* Dark Store Hub Marker */}
                <div className="absolute top-24 left-16 z-10 flex flex-col items-center">
                  <div className="bg-[#131b2e] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md whitespace-nowrap mb-1">
                    Indiranagar Hub #04
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center ring-4 ring-white shadow-lg">
                    <span className="material-symbols-outlined text-[16px]">storefront</span>
                  </div>
                </div>

                {/* Animated Rider Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-bounce duration-1000">
                  <div className="bg-[#006714] text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1 whitespace-nowrap mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ffb87] animate-ping"></span>
                    <span>Ramesh Kumar (Ather EV)</span>
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#0c831f] text-white flex items-center justify-center ring-4 ring-white shadow-2xl">
                      <span className="material-symbols-outlined text-[24px]">electric_moped</span>
                    </div>
                    <span className="absolute -inset-1 rounded-full border-2 border-[#006714] animate-ping opacity-60"></span>
                  </div>
                </div>

                {/* Destination Customer Pin */}
                <div className="absolute bottom-16 right-16 z-10 flex flex-col items-center">
                  <div className="bg-[#b30033] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md whitespace-nowrap mb-1">
                    Flat 102 (Doorstep)
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#dd1845] text-white flex items-center justify-center ring-4 ring-white shadow-xl">
                    <span className="material-symbols-outlined text-[18px]">home</span>
                  </div>
                </div>

                {/* Map Floating Controls */}
                <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
                  <button
                    onClick={() => alert("Centered GPS on Ramesh Kumar's EV Scooter")}
                    className="w-10 h-10 rounded-xl bg-white text-[#131b2e] shadow-md flex items-center justify-center hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">my_location</span>
                  </button>
                  <button
                    onClick={() => alert("Switched to Street Satellite layer")}
                    className="w-10 h-10 rounded-xl bg-white text-[#131b2e] shadow-md flex items-center justify-center hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">layers</span>
                  </button>
                </div>
              </div>

              {/* Map Footer Bar */}
              <div className="p-4 bg-white border-t border-[#eaedff] flex items-center justify-between text-xs text-[#3f4a3c]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006714] text-[18px]">eco</span>
                  <span className="font-semibold">Zero-emission electric delivery by Ather Energy fleet</span>
                </div>
                <span className="text-[#6f7a6a] font-mono">GPS accuracy ±2m</span>
              </div>
            </div>

            {/* Bag Temperature & Quality Guard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dae2fd] text-[#006714] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">thermostat</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6f7a6a]">Cold Chain Insulation</span>
                  <p className="text-sm font-extrabold text-[#131b2e]">4.2°C Chill Sealed</p>
                  <span className="text-[11px] text-[#006714] font-medium">Dairy &amp; greens maintained fresh</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e0ffd7] text-[#0c831f] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6f7a6a]">Hygiene &amp; Safety</span>
                  <p className="text-sm font-extrabold text-[#131b2e]">UV-C Sanitized Bag</p>
                  <span className="text-[11px] text-[#006714] font-medium">Tamper-evident seal locked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Driver Profile, Stepper & Order Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Driver Profile Card */}
            <div className="bg-white p-5 rounded-3xl border border-[#eaedff] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={RIDER_AVATAR}
                      alt="Ramesh Kumar"
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0c831f]"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-[#0c831f] text-white p-0.5 rounded-full text-[12px] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#131b2e]">Ramesh Kumar</h3>
                    <div className="flex items-center gap-2 text-xs text-[#3f4a3c] mt-0.5">
                      <span className="flex items-center gap-0.5 font-bold text-[#855300]">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        4.9
                      </span>
                      <span>•</span>
                      <span>3,420 deliveries</span>
                    </div>
                    <p className="text-[11px] text-[#6f7a6a] mt-0.5 font-mono">Ather 450X • KA 03 ET 4920</p>
                  </div>
                </div>
              </div>

              {/* Driver Actions (Call / Chat) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setIsCallModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006714]">call</span>
                  <span>Call Ramesh</span>
                </button>
                <button
                  onClick={() => setIsChatModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#0c831f] hover:bg-[#006714] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Live Chat</span>
                </button>
              </div>

              {tip > 0 && (
                <div className="bg-[#e0ffd7] p-2.5 rounded-xl flex items-center justify-between text-xs text-[#006714]">
                  <span className="font-semibold">₹{tip} tip added for Ramesh</span>
                  <span className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 rounded">Thank you!</span>
                </div>
              )}
            </div>

            {/* Vertical Order Stepper */}
            <div className="bg-white p-5 rounded-3xl border border-[#eaedff] shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#131b2e] uppercase tracking-wider">
                Order Timeline
              </h3>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#0c831f]/30">
                {/* Step 1 */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#0c831f] text-white flex items-center justify-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#131b2e]">Order Placed</h4>
                    <p className="text-[11px] text-[#6f7a6a]">11:42 AM • Payment verified via UPI</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#0c831f] text-white flex items-center justify-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#131b2e]">Packed &amp; Quality Checked</h4>
                    <p className="text-[11px] text-[#6f7a6a]">11:44 AM • Triple-checked at Indiranagar Hub</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#fea619] text-[#684000] flex items-center justify-center text-[10px] animate-pulse">
                    <span className="material-symbols-outlined text-[12px]">electric_moped</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#006714]">Out for Express Delivery</h4>
                    <p className="text-[11px] text-[#3f4a3c] font-medium">11:45 AM • Ramesh is 3 minutes away</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-3 opacity-50">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#eaedff] text-[#3f4a3c] flex items-center justify-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">home</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#131b2e]">Delivery at Doorstep</h4>
                    <p className="text-[11px] text-[#6f7a6a]">Expected by 11:51 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Collapsible Box */}
            <div className="bg-white p-5 rounded-3xl border border-[#eaedff] shadow-sm space-y-4">
              <div
                onClick={() => setIsItemsExpanded(!isItemsExpanded)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h3 className="font-extrabold text-sm text-[#131b2e]">Order Summary (5 Items)</h3>
                  <p className="text-xs text-[#6f7a6a]">Total Paid: ₹179 via UPI</p>
                </div>
                <span className="material-symbols-outlined text-[#3f4a3c]">
                  {isItemsExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </div>

              {isItemsExpanded && (
                <div className="space-y-3 pt-2 border-t border-[#eaedff] text-xs">
                  <div className="flex items-center justify-between">
                    <span>1x Farm Fresh Red Onion (1 kg)</span>
                    <span className="font-bold">₹38</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>2x Amul Taaza Homogenised Milk (500 ml)</span>
                    <span className="font-bold">₹54</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>1x Fresh Hybrid Tomato (500 g)</span>
                    <span className="font-bold">₹18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>2x Lay&apos;s India&apos;s Magic Masala (50 g)</span>
                    <span className="font-bold">₹40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>1x Tender Coconut (1 pc)</span>
                    <span className="font-bold">₹55</span>
                  </div>

                  <div className="pt-2 border-t border-[#eaedff] flex justify-between font-bold text-sm text-[#006714]">
                    <span>Total Paid</span>
                    <span>₹179</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsInvoiceModalOpen(true)}
                className="w-full py-2 bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-bold text-[#131b2e] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">receipt</span>
                <span>Download Tax Invoice</span>
              </button>
            </div>

            {/* Satisfaction Promise / Instant Refund Banner */}
            <div className="bg-[#ffdada]/60 border border-[#b30033]/20 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b30033] text-[24px]">verified</span>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block leading-tight">
                    100% Doorstep Quality Guarantee
                  </span>
                  <span className="text-[11px] text-[#3f4a3c]">Item damaged or not fresh? Zero-question instant refund.</span>
                </div>
              </div>
              <button
                onClick={() => setIsRefundModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#dd1845] hover:bg-[#b30033] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Claim Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
