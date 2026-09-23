import React, { useRef, useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { LOGO_URL, USER_AVATAR, PRODUCTS } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    totalItemsCount,
    totalPayable,
    selectedAddress,
    setIsAddressModalOpen,
    searchQuery,
    setSearchQuery,
    addToCart,
  } = useCart();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      {/* Top micro bar */}
      <div className="bg-[#f2f3ff] text-[#3f4a3c]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between text-[11px] font-normal">
          <div className="flex items-center gap-2">
            <div
              onClick={() => navigateTo('product-catalog')}
              className="flex items-center gap-1.5 bg-[#ffddb8] text-[#2a1700] px-2.5 py-0.5 rounded-full font-bold shadow-sm cursor-pointer hover:bg-[#ffb95f] transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] text-[#855300]">bolt</span>
              <span className="tracking-tight">9 MINS</span>
            </div>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center gap-1 hover:text-[#006714] transition-colors text-left font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-[#006714]">location_on</span>
              <span className="font-bold text-[#131b2e]">Delivering to:</span>
              <span className="max-w-[200px] sm:max-w-xs truncate text-[#3f4a3c]">{selectedAddress.addressLine}</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
          </div>

          <div className="flex items-center gap-4 font-medium text-[11px]">
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); alert("App link sent via SMS to your registered number!"); }}
              className="hidden sm:inline-block hover:text-[#006714] transition-colors"
            >
              Download App
            </a>
            <span className="hidden sm:inline-block text-[#becab7]">|</span>
            <a
              href="#support"
              onClick={(e) => { e.preventDefault(); alert("Order Kro 24x7 Support is live! Call 1800-ORDER-KRO"); }}
              className="hover:text-[#006714] transition-colors"
            >
              24x7 Customer Support
            </a>
            <span className="text-[#becab7]">|</span>
            <div className="flex items-center gap-1 text-[#b30033] font-bold bg-[#ffdada] px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">local_offer</span>
              <span>₹100 Off code: QUICK100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between gap-4 md:gap-6">
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo('storefront')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img
            alt="Order Kro Logo"
            className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
            src={LOGO_URL}
          />
          <span className="font-extrabold text-lg tracking-tight text-[#006714] uppercase">
            Order Kro
          </span>
        </div>

        {/* Global Live Search Bar */}
        <div className="flex-1 max-w-[560px] relative">
          <div className="relative flex items-center w-full bg-[#f2f3ff] rounded-xl px-3.5 py-2 hover:bg-[#eaedff] transition-colors shadow-inner">
            <span className="material-symbols-outlined text-[#3f4a3c] text-[20px] mr-2.5">search</span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full bg-transparent text-[13px] text-[#131b2e] placeholder:text-[#3f4a3c]/70 focus:outline-none"
              placeholder='Search "milk, bread, fresh tomatoes, maggi, chips" (Press / to search)'
              type="text"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#6f7a6a] hover:text-[#131b2e] mr-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
            <button
              onClick={() => alert("Listening... speak product name")}
              title="Voice Search"
              className="text-[#3f4a3c] hover:text-[#006714] transition-colors ml-1 p-1 rounded-full hover:bg-[#e2e7ff]"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>

          {/* Search suggestions dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#eaedff] overflow-hidden z-50">
              <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-[#6f7a6a] bg-[#f2f3ff]">
                Suggested Products
              </div>
              <div className="divide-y divide-[#f2f3ff]">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                    onClick={() => {
                      navigateTo('product-catalog');
                      setIsSearchFocused(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1" />
                      <div>
                        <div className="text-sm font-bold text-[#131b2e]">{item.name}</div>
                        <div className="text-xs text-[#6f7a6a]">{item.weight} • ₹{item.price}</div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item.id);
                      }}
                      className="px-3 py-1 bg-[#0c831f] text-white rounded-lg text-xs font-bold hover:bg-[#006714]"
                    >
                      ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right action group */}
        <div className="flex items-center gap-4 md:gap-5 shrink-0">
          {/* My Orders link */}
          <button
            onClick={() => navigateTo('live-order-tracking')}
            className={`hidden lg:flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
              currentScreen === 'live-order-tracking' ? 'text-[#006714]' : 'text-[#131b2e] hover:text-[#006714]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-[#3f4a3c]">receipt_long</span>
            <span>My Orders</span>
          </button>

          {/* User profile dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#f2f3ff] transition-colors"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-[#0c831f]/20"
                src={USER_AVATAR}
              />
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-semibold text-[#131b2e]">Aman R.</span>
                <span className="material-symbols-outlined text-[16px] text-[#3f4a3c]">expand_more</span>
              </div>
            </div>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#eaedff] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#f2f3ff]">
                  <div className="font-bold text-sm text-[#131b2e]">Aman Rege</div>
                  <div className="text-xs text-[#6f7a6a] truncate">aman.rege@oksbi</div>
                </div>
                <button
                  onClick={() => {
                    navigateTo('live-order-tracking');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#131b2e] hover:bg-[#f2f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>Active Orders (1)</span>
                </button>
                <button
                  onClick={() => {
                    setIsAddressModalOpen(true);
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#131b2e] hover:bg-[#f2f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Saved Addresses</span>
                </button>
                <button
                  onClick={() => {
                    alert("Order Kro Member Pass: Active (Saved ₹42 this week)");
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#006714] font-bold hover:bg-[#f2f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                  <span>VIP Member Club</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart CTA Button */}
          <button
            onClick={() => navigateTo('fast-checkout')}
            className="flex items-center gap-3 bg-[#0c831f] text-white hover:bg-[#006714] transition-all px-4 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(12,131,31,0.28)] active:scale-95 cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#fea619] text-[#684000] text-[10px] px-1.5 py-0.2 rounded-full font-extrabold shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#e0ffd7] leading-none font-extrabold">
                {totalItemsCount} Items
              </span>
              <span className="text-[15px] font-bold leading-none mt-1">
                ₹{totalPayable > 0 ? totalPayable : 0}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Category sub-navigation bar */}
      <div className="bg-[#ffffff] shadow-sm border-t border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-none text-[13px]">
            <button
              onClick={() => navigateTo('storefront')}
              className={`whitespace-nowrap py-1 transition-colors font-medium cursor-pointer ${
                currentScreen === 'storefront'
                  ? 'text-[#006714] font-bold border-b-2 border-[#006714]'
                  : 'text-[#3f4a3c] hover:text-[#131b2e]'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className={`whitespace-nowrap py-1 transition-colors font-medium cursor-pointer ${
                currentScreen === 'product-catalog'
                  ? 'text-[#006714] font-bold border-b-2 border-[#006714]'
                  : 'text-[#3f4a3c] hover:text-[#131b2e]'
              }`}
            >
              Fruits &amp; Vegetables
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Dairy, Bread &amp; Eggs
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Snacks &amp; Munchies
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Beverages &amp; Drinks
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Instant &amp; Frozen Food
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Personal Care
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Cleaning &amp; Household
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Baby Care
            </button>
            <button
              onClick={() => navigateTo('product-catalog')}
              className="text-[#3f4a3c] hover:text-[#131b2e] whitespace-nowrap py-1 transition-colors font-medium cursor-pointer"
            >
              Pet Supplies
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
