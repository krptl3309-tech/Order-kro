import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export const StorefrontScreen: React.FC = () => {
  const { cart, addToCart, removeFromCart, totalItemsCount, totalPayable, navigateTo } = useCart();

  // Super Saver Deals countdown timer
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 28, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 28, seconds: 19 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  // Group products
  const trendingProducts = PRODUCTS.slice(0, 6);
  const superSaverProducts = PRODUCTS.slice(6, 10);
  const morningEssentials = PRODUCTS.slice(10, 16);

  const renderProductCard = (product: Product, isSaverDeal = false) => {
    const qty = cart[product.id] || 0;

    return (
      <div
        key={product.id}
        className={`bg-white rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between border border-[#eaedff]/60 ${
          isSaverDeal ? 'p-4' : ''
        }`}
      >
        <div>
          <div className="relative w-full aspect-square rounded-xl bg-[#f2f3ff] overflow-hidden mb-2.5 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.altText || product.name}
              className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform"
            />
            {product.discountBadge && (
              <span className="absolute top-2 left-2 bg-[#b30033] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                {product.discountBadge}
              </span>
            )}
            {product.badge && (
              <span className="absolute top-2 left-2 bg-[#006714] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                {product.badge}
              </span>
            )}
            {product.rating && (
              <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/90 px-1.5 py-0.5 rounded text-[11px] font-bold text-[#855300] shadow-xs">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{product.rating}</span>
              </div>
            )}
            {product.deliveryMins && !product.discountBadge && !product.badge && (
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#131b2e] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006714] inline-block"></span> 9 mins
              </span>
            )}
          </div>

          <span className="inline-block bg-[#eaedff] px-2 py-0.5 rounded text-[11px] font-bold text-[#3f4a3c] mb-1">
            {product.weight}
          </span>
          <h3 className="font-bold text-[13px] text-[#131b2e] line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        <div className={`flex items-center justify-between pt-3 mt-1 ${isSaverDeal ? 'border-t border-[#eaedff]' : ''}`}>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[15px] text-[#131b2e]">₹{product.price}</span>
              {product.mrp && (
                <span className="text-[12px] line-through text-[#6f7a6a]">₹{product.mrp}</span>
              )}
            </div>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => addToCart(product.id)}
              className="px-4 py-1.5 rounded-lg bg-white border border-[#0c831f] text-[#0c831f] hover:bg-[#0c831f] hover:text-white transition-all text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#0c831f] text-white rounded-lg px-1 py-0.5 shadow-sm">
              <button
                onClick={() => removeFromCart(product.id)}
                className="w-6 h-6 flex items-center justify-center hover:opacity-80 active:scale-90 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="text-sm px-1.5 font-bold tabular-nums">{qty}</span>
              <button
                onClick={() => addToCart(product.id)}
                className="w-6 h-6 flex items-center justify-center hover:opacity-80 active:scale-90 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Hero Spotlight Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Main Fresh Produce Feature Banner */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c831f] via-[#006714] to-[#004d0c] text-white p-6 md:p-8 flex flex-col justify-between shadow-md min-h-[260px]">
            <div className="absolute -right-12 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-start gap-2 max-w-lg">
              <div className="flex items-center gap-2 bg-[#fea619] text-[#684000] px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-extrabold shadow-sm">
                <span className="material-symbols-outlined text-[15px] leading-none">bolt</span>
                <span>Morning Fresh Deals • Guaranteed 9 Mins</span>
              </div>
              <h1 className="text-2xl md:text-4xl text-white font-extrabold tracking-tight mt-2 leading-tight">
                Farm-to-kitchen organic greens &amp; veggies
              </h1>
              <p className="text-sm md:text-base text-[#e0ffd7] font-medium mt-1">
                Crisp, dew-washed tomatoes, baby spinach &amp; daily staples starting at just{' '}
                <span className="text-base font-extrabold text-[#ffddb8]">₹19</span>.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-6 pt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('product-catalog')}
                  className="inline-flex items-center gap-2 bg-white text-[#006714] text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#f2f3ff] transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Shop Morning Fresh</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <span className="text-xs text-white/80 hidden sm:inline-block">
                  Harvested 4:00 AM • Direct from Kolar
                </span>
              </div>

              <div className="hidden sm:flex items-center -space-x-2">
                <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt="Cherry tomatoes"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0ZU3sln9gyocmYtG55E0gP6BNpZVZOmZ1cfjQY4mvu9yKGvZHzgdtBB6yzcjKPtVn37RXRuIxUBTM1MaLwzw8FtVyv2fosYHB43cQqfiwOfqAWamTKFdzwI2D2UxRvFXnnJV_Q7SXRsWABHtGaZHL38kooGGV4GJXzsXHGXAzhCdcFCx2QQi5pMWfkmX1w0x1wEonf3KFWp6VDxXi9JC1isfo3i9EZn2H7FAd8rYcDsaPrywci3nv"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt="Curly kale leaves"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpoyO6EJ6nXYQV9Cfk7uZHuoS2prxcgjHMYxWlS7aYPZ9fRm5BX9eGd1IEBn833DzDBp86A2IFFcGSjFSKS2Q98aCgKc6NWaLO0EFT-pjBBQMoDNVmNs48d78l2mqycRvqRSVT2aj661xr7-5bcJDJmRkK496kcM2zvo5MDo2mb9H5F2ouTtVCHGhp0-SNrgcpiMbgPR_0pHHmkr_MuOQIyYfyTTFjkySZLfbdiD8qc71cgBFkEj9g"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt="Sliced bell peppers"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcUnJHfDtdMex8p3GsMET6RjyMV2uArv3I2k6uV4Ngu8MatE6-tZ1g0FCON-corxZCQXoHZdgfFPlriJNVxrhtxQx7ciNDzp6-5V-soigOOcVNXMgF1Uwc9UAJ8op4u8zukpgPi64tZoqeeCqqzfXjY_rjOAI8TxchQLjslYzoWatwYmeGkQAdt0d0IV6VslDgeeQNwK9z7dxbUJh6Y-HKZY-9BQz9l9AVG82o84rIgU-WP_8nPPa7"
                  />
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-40 mix-blend-screen pointer-events-none">
              <img
                className="w-full h-full object-cover"
                alt="Assortment of fresh organic vegetables"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm1e2cSjXiBCK_XThLbCd92m1pzNnNIKg2Jx6-4r8fJyxnVUj5aGcOJHhIlTEBLazQ5BsNlruCxR-3nIYXSPtaWKj5uhJnF_f9jCcutJBmQzMLaNp6yd-nwAsFqqdQoNXAe411pfP1jyRZtvZdz4IDFCBSUcQCH-09cAYoWZYBEZyMJEf4T53DWEzNlMo6i0Uw_WtFfPs1iB6So7UrYiYMN8h23kr4IT0kLPrqoH9xEuPjIivk_PIQ"
              />
            </div>
          </div>

          {/* Matchday Munchies Promo Side Banner */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#dd1845] via-[#b30033] to-[#70001f] text-white p-6 flex flex-col justify-between shadow-md min-h-[260px]">
            <div className="relative z-10 flex flex-col items-start">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-bold text-white">
                <span className="material-symbols-outlined text-[14px]">sports_cricket</span>
                <span>IPL Matchday Offer</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-3 leading-tight">
                Munchies &amp; Chilled Drinks BOGO
              </h2>
              <p className="text-xs md:text-sm text-[#fff4f4] mt-1 font-medium">
                Buy 1 Get 1 on Lay&apos;s, Doritos, Thums Up &amp; dips. Delivered before the next over!
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-3 flex items-center justify-between">
              <div className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-[10px] uppercase font-bold tracking-wider block text-[#ffdada]">Use Coupon</span>
                <span className="text-sm font-extrabold text-white tracking-widest">MATCHCHEER</span>
              </div>
              <button
                onClick={() => {
                  addToCart('prod-lays');
                  navigateTo('fast-checkout');
                }}
                className="bg-white text-[#b30033] text-sm font-bold px-4 py-2 rounded-xl shadow hover:bg-[#ffdada] transition-colors cursor-pointer"
              >
                Claim Deal
              </button>
            </div>

            <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-30 pointer-events-none">
              <span className="material-symbols-outlined text-[140px] text-white">fastfood</span>
            </div>
          </div>
        </div>
      </section>

      {/* Speed & Trust Assurance Strip */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white rounded-2xl p-3.5 shadow-xs border border-[#eaedff]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#855300] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#131b2e] leading-tight truncate">Under 10 Mins</p>
              <p className="text-[11px] text-[#3f4a3c] leading-tight truncate">Live GPS dark-store run</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-[#dae2fd] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#006714] text-[22px]">ac_unit</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#131b2e] leading-tight truncate">Cold Chain Sealed</p>
              <p className="text-[11px] text-[#3f4a3c] leading-tight truncate">4°C chill pack insulation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#0c831f] text-[22px]">verified</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#131b2e] leading-tight truncate">100% Quality Check</p>
              <p className="text-[11px] text-[#3f4a3c] leading-tight truncate">Triple-graded daily stock</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdada] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#b30033] text-[22px]">cached</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#131b2e] leading-tight truncate">1-Click Fast Refund</p>
              <p className="text-[11px] text-[#3f4a3c] leading-tight truncate">Instant return at doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Circular / Visual Grid Section (10 Aisles) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#006714] font-bold block">Curated Aisles</span>
            <h2 className="text-xl md:text-2xl text-[#131b2e] font-extrabold tracking-tight">Explore Categories</h2>
          </div>
          <button
            onClick={() => navigateTo('product-catalog')}
            className="text-xs font-bold text-[#006714] hover:text-[#00530e] flex items-center gap-0.5 cursor-pointer"
          >
            <span>See All 48 Categories</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigateTo('product-catalog')}
              className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-white hover:bg-[#e2e7ff] transition-all shadow-xs hover:shadow-md cursor-pointer border border-[#eaedff]"
            >
              <div className="relative w-16 h-16 rounded-xl bg-[#f2f3ff] flex items-center justify-center overflow-hidden mb-2">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  src={cat.image}
                  alt={cat.name}
                />
                {cat.badge && (
                  <span className={`absolute -bottom-0.5 inset-x-0 ${cat.badgeColor || 'bg-[#fea619] text-[#684000]'} text-[8px] font-bold uppercase py-0.5`}>
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-[#131b2e] line-clamp-2 group-hover:text-[#006714] leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Trending in Indiranagar Shelf */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#855300] font-bold text-xs mb-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>Hyperlocal Live Feed</span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl text-[#131b2e] font-extrabold tracking-tight">Trending in Indiranagar right now</h2>
              <span className="bg-[#ffddb8] text-[#2a1700] text-[10px] px-2 py-0.5 rounded-full font-bold">⚡ 9 MINS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Scrolled to previous trending items")}
              className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <button
              onClick={() => alert("Scrolled to next trending items")}
              className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {trendingProducts.map((p) => renderProductCard(p))}
        </div>
      </section>

      {/* Super Saver Deals Banner & Grid Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-6">
        <div className="bg-gradient-to-r from-[#e2e7ff] to-white rounded-3xl p-6 shadow-sm border border-[#eaedff]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1 bg-[#b30033] text-white text-[10px] uppercase px-2.5 py-0.5 rounded-md font-extrabold tracking-wider mb-1.5">
                <span className="material-symbols-outlined text-[13px]">percent</span>
                <span>Mega Clearance</span>
              </div>
              <h2 className="text-xl md:text-2xl text-[#131b2e] font-extrabold tracking-tight">
                Order Kro Super Saver Deals
              </h2>
              <p className="text-xs md:text-sm text-[#3f4a3c]">Unbeatable prices on pantry staples and household essentials</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#3f4a3c]">Ends in:</span>
              <div className="flex items-center gap-1 text-sm font-extrabold text-[#b30033] bg-[#ffdada] px-3 py-1.5 rounded-xl">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>
                  {formatTime(countdown.hours)} : {formatTime(countdown.minutes)} : {formatTime(countdown.seconds)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {superSaverProducts.map((p) => renderProductCard(p, true))}
          </div>
        </div>
      </section>

      {/* Morning Routine Essentials Shelf */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#2a1700]">
              <span className="material-symbols-outlined text-[24px]">wb_sunny</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl text-[#131b2e] font-extrabold tracking-tight">Morning Routine Essentials</h2>
              <p className="text-xs text-[#3f4a3c]">Wholesome oats, farm eggs, artisan sourdough &amp; fresh paneer</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('product-catalog')}
            className="text-xs font-bold text-[#006714] hover:text-[#00530e] flex items-center gap-0.5 cursor-pointer"
          >
            <span>View Breakfast Corner</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {morningEssentials.map((p) => renderProductCard(p))}
        </div>
      </section>

      {/* Sticky Bottom Quick Cart Pill Float */}
      {totalItemsCount > 0 && (
        <aside className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#0c831f] text-white p-3 md:px-5 rounded-2xl shadow-[0_8px_30px_rgba(12,131,31,0.38)] flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 shadow-sm">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt="Milk thumb"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuChhNa2mJqSZrHaRjRKFptovKq_0Zfu75YMn9KlXNtUqDE7R5-DEQaCsSSFkFdWsxmQnY0PXRO0U3-gTNnWyhU9eCTRpyCDlL6dJNyGsLQYx6hPF1_m25-g5Y1RQqW66i0Tkii48eDCY5LdO0KDdrw1MN7tsxCUYzWWY1ZTPB5xkEwuztIFc3XPk2Y_iKzeVeNWpxNZi5yma1nZ7-hMA2u5aIXoNebWDH73p1CEbBK4IpEBRXuTfkGP"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-white p-0.5 shadow-sm">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt="Onions thumb"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ7FhUN5epkRqge713zTrwLO7MvJoyHKbUqGL21JS9cMWtL33MOy03LreyNs3wCQkB8mj0gSmSQ7OiV3VVGFY5j4pcqGsV4ibUyAcX6dpxtCjExEt2Lz15L4xsjAK6snAxZAdUkCHAvuArqZqaN6-Qq2QnEt8UXWU6uSQl-YXSDd91nxwTqVRTTxTiyhAan3eywcw0SyJ1ppJwf2dIwiJ233YC8iiPjINTm7JaUjoN1shZa30khK-k"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center text-[10px] font-bold text-[#0c831f]">
                  +{Math.max(1, totalItemsCount - 2)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold">{totalItemsCount} Items</span>
                  <span className="text-[#e0ffd7]">•</span>
                  <span className="text-sm font-extrabold">₹{totalPayable}</span>
                </div>
                <span className="text-[11px] text-[#e0ffd7] leading-none block">Saved ₹42 with member pricing</span>
              </div>
            </div>
            <button
              onClick={() => navigateTo('fast-checkout')}
              className="flex items-center gap-1 bg-white text-[#006714] px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[#f2f3ff] transition-transform active:scale-95 cursor-pointer"
            >
              <span>View Cart</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
