import React from 'react';
import { LOGO_URL } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useCart();

  return (
    <footer className="w-full bg-[#ffffff] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] mt-8 border-t border-[#eaedff]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div
              onClick={() => navigateTo('storefront')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img alt="Order Kro Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
              <span className="text-lg font-bold text-[#006714] tracking-tight uppercase">
                Order Kro
              </span>
            </div>
            <p className="text-[15px] text-[#131b2e] font-semibold">
              India&apos;s favourite 10-minute grocery delivery app.
            </p>
            <p className="text-[13px] text-[#3f4a3c] max-w-sm">
              Order groceries, fresh produce, dairy, bakery, and daily essentials with lightning-fast neighborhood deliveries.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3f4a3c] block mb-2">
                Experience Order Kro App
              </span>
              <div className="flex items-center gap-3">
                <div
                  onClick={() => alert("Redirecting to Google Play Store...")}
                  className="bg-[#131b2e] text-white px-3.5 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-sm hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[24px]">shop</span>
                  <div className="leading-none">
                    <span className="block text-[9px] uppercase tracking-wider text-[#becab7]">Get it on</span>
                    <span className="font-bold text-[11px]">Google Play</span>
                  </div>
                </div>
                <div
                  onClick={() => alert("Redirecting to Apple App Store...")}
                  className="bg-[#131b2e] text-white px-3.5 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-sm hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
                  <div className="leading-none">
                    <span className="block text-[9px] uppercase tracking-wider text-[#becab7]">Download on</span>
                    <span className="font-bold text-[11px]">App Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-2">
            <h4 className="text-[16px] text-[#131b2e] font-bold">Categories</h4>
            <ul className="space-y-2 text-[13px] text-[#3f4a3c]">
              <li>
                <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Vegetables &amp; Fruits
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Dairy &amp; Breakfast
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('storefront')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Munchies &amp; Chips
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Cold Drinks &amp; Juices
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Instant &amp; Frozen
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Tea, Coffee &amp; Health Drinks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] transition-colors cursor-pointer">
                  Bakery &amp; Biscuits
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-2">
            <h4 className="text-[16px] text-[#131b2e] font-bold">Useful Links</h4>
            <ul className="space-y-2 text-[13px] text-[#3f4a3c]">
              <li><a className="hover:text-[#006714] transition-colors" href="#about" onClick={(e)=>{e.preventDefault(); alert("Order Kro delivers groceries in 9-10 minutes from micro dark stores across major Indian cities.");}}>About Us</a></li>
              <li><a className="hover:text-[#006714] transition-colors" href="#partner" onClick={(e)=>{e.preventDefault(); alert("Partner with Order Kro as a supplier, dark store operator, or delivery fleet member.");}}>Partner With Us</a></li>
              <li><a className="hover:text-[#006714] transition-colors" href="#franchise" onClick={(e)=>{e.preventDefault(); alert("Dark store franchise applications are currently open in Bengaluru, Mumbai, and Delhi NCR.");}}>Dark Store Franchise</a></li>
              <li><a className="hover:text-[#006714] transition-colors" href="#careers" onClick={(e)=>{e.preventDefault(); alert("We are hiring! Check out engineering, ops, and logistics openings.");}}>Careers</a></li>
              <li><a className="hover:text-[#006714] transition-colors" href="#privacy" onClick={(e)=>{e.preventDefault(); alert("Order Kro values your data privacy and security.");}}>Privacy Policy</a></li>
              <li><a className="hover:text-[#006714] transition-colors" href="#terms" onClick={(e)=>{e.preventDefault(); alert("Terms of Service for 10-minute grocery delivery.");}}>Terms of Service</a></li>
              <li><a className="hover:text-[#006714] transition-colors" href="#faq" onClick={(e)=>{e.preventDefault(); alert("Got queries? Our 24x7 help team is available via chat and phone.");}}>Contact &amp; FAQ</a></li>
            </ul>
          </div>

          {/* Security & Payments */}
          <div className="space-y-3">
            <h4 className="text-[16px] text-[#131b2e] font-bold">Security &amp; Payments</h4>
            <div className="flex items-center gap-2 text-[#3f4a3c]">
              <span className="material-symbols-outlined text-[#006714] text-[20px]">verified_user</span>
              <span className="text-[11px] font-semibold">100% Safe &amp; Secure Checkout</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#3f4a3c]">UPI</span>
              <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#3f4a3c]">RuPay</span>
              <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#3f4a3c]">Visa</span>
              <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#3f4a3c]">Mastercard</span>
              <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#3f4a3c]">NetBanking</span>
              <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#3f4a3c]">COD</span>
            </div>
            <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#855300] text-[28px]">electric_moped</span>
              <div className="leading-tight">
                <span className="text-[11px] font-bold text-[#131b2e] block">Zero Carbon Rider Fleet</span>
                <span className="text-[11px] text-[#3f4a3c]">EV deliveries for a greener India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#f2f3ff] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#3f4a3c]">
          <p>© 2025 Order Kro Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#006714] transition-colors cursor-pointer">Security</span>
            <span className="hover:text-[#006714] transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-[#006714] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#006714] transition-colors cursor-pointer">Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
