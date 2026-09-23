import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export const ProductCatalogScreen: React.FC = () => {
  const { cart, addToCart, removeFromCart, totalItemsCount, totalPayable, navigateTo } = useCart();

  const [selectedSubCategory, setSelectedSubCategory] = useState('Fresh Vegetables');
  const [maxPrice, setMaxPrice] = useState(200);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyFarmToday, setOnlyFarmToday] = useState(true);
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-low' | 'price-high' | 'rating'>('bestseller');

  const subCategories = [
    { name: 'All Vegetables', count: 84 },
    { name: 'Fresh Vegetables', count: 36 },
    { name: 'Daily Veggies', count: 18 },
    { name: 'Leafy & Herbs', count: 12 },
    { name: 'Exotic Veg & Greens', count: 9 },
    { name: 'Roots & Tubers', count: 11 },
    { name: "Season's Bestsellers", count: 15 },
  ];

  // Combine vegetables from PRODUCTS
  const vegProducts: Product[] = [
    PRODUCTS.find((p) => p.id === 'prod-onion')!,
    PRODUCTS.find((p) => p.id === 'cat-tomato')!,
    PRODUCTS.find((p) => p.id === 'cat-coriander')!,
    PRODUCTS.find((p) => p.id === 'cat-capsicum')!,
    PRODUCTS.find((p) => p.id === 'cat-spinach')!,
    PRODUCTS.find((p) => p.id === 'cat-mushrooms')!,
    PRODUCTS.find((p) => p.id === 'cat-lemon')!,
    PRODUCTS.find((p) => p.id === 'cat-broccoli')!,
    PRODUCTS.find((p) => p.id === 'cat-bhindi')!,
    PRODUCTS.find((p) => p.id === 'cat-cucumber')!,
    PRODUCTS.find((p) => p.id === 'cat-coconut')!,
    PRODUCTS.find((p) => p.id === 'cat-potato')!,
  ].filter(Boolean);

  // Filter & Sort
  const filteredProducts = vegProducts
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // default bestseller order
    });

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Breadcrumb strip */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-3">
        <div className="flex items-center gap-1.5 text-xs text-[#3f4a3c]">
          <button onClick={() => navigateTo('storefront')} className="hover:text-[#006714] cursor-pointer">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#becab7]">chevron_right</span>
          <button onClick={() => navigateTo('product-catalog')} className="hover:text-[#006714] cursor-pointer">
            Fruits &amp; Vegetables
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#becab7]">chevron_right</span>
          <span className="font-bold text-[#131b2e]">{selectedSubCategory}</span>
        </div>
      </div>

      {/* Top Banner: Farm-to-Kitchen Harvest Promise */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#006714] to-[#0c831f] text-white p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1 bg-[#ffddb8] text-[#2a1700] text-[10px] uppercase px-2.5 py-0.5 rounded-full font-extrabold tracking-wider">
              <span className="material-symbols-outlined text-[14px]">eco</span>
              <span>Farm-to-Kitchen Harvest Promise</span>
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
              Dew-washed, graded daily at 4:30 AM
            </h1>
            <p className="text-xs md:text-sm text-[#e0ffd7]">
              Sourced direct from Kolar, Malur &amp; Hosur farm collectives. Zero chemical ripening, 100% replacement guarantee at doorstep.
            </p>
          </div>
          <div className="flex items-center gap-3 z-10">
            <div className="text-center bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
              <span className="block text-lg font-extrabold text-[#8ffb87]">4.9★</span>
              <span className="text-[10px] text-white/90 uppercase font-semibold">Quality Index</span>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
              <span className="block text-lg font-extrabold text-[#ffddb8]">9 Mins</span>
              <span className="text-[10px] text-white/90 uppercase font-semibold">Express ETA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs lg:sticky lg:top-36">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3f4a3c] mb-3">
                Vegetables Subcategories
              </h3>
              <div className="space-y-1">
                {subCategories.map((sub) => {
                  const isActive = selectedSubCategory === sub.name;
                  return (
                    <button
                      key={sub.name}
                      onClick={() => setSelectedSubCategory(sub.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#e0ffd7] text-[#006714] font-bold border-l-4 border-[#0c831f]'
                          : 'text-[#131b2e] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <span>{sub.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#0c831f] text-white' : 'bg-[#eaedff] text-[#3f4a3c]'}`}>
                        {sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#eaedff] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3f4a3c] mb-3">
                Delivery Promise
              </h3>
              <div className="flex items-center justify-between p-2.5 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006714] text-[20px]">bolt</span>
                  <span className="text-xs font-bold text-[#131b2e]">Within 9 Mins</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#006714] animate-pulse"></span>
              </div>
            </div>

            <div className="border-t border-[#eaedff] pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3f4a3c]">Max Price</h3>
                <span className="text-xs font-bold text-[#006714]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0c831f] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6f7a6a] mt-1 font-semibold">
                <span>₹20</span>
                <span>₹100</span>
                <span>₹250</span>
              </div>
            </div>

            <div className="border-t border-[#eaedff] pt-4 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3f4a3c] mb-2">
                Quality Preference
              </h3>
              <label className="flex items-center gap-2 text-xs text-[#131b2e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOrganic}
                  onChange={(e) => setOnlyOrganic(e.target.checked)}
                  className="rounded accent-[#0c831f]"
                />
                <span>100% Organic Certified</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#131b2e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFarmToday}
                  onChange={(e) => setOnlyFarmToday(e.target.checked)}
                  className="rounded accent-[#0c831f]"
                />
                <span>Farm Picked Today</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#131b2e] cursor-pointer">
                <input type="checkbox" className="rounded accent-[#0c831f]" />
                <span>Hydroponic Greens</span>
              </label>
            </div>

            <button
              onClick={() => {
                setMaxPrice(200);
                setSelectedSubCategory('Fresh Vegetables');
                setOnlyOrganic(false);
                setOnlyFarmToday(true);
              }}
              className="w-full py-2 text-xs font-bold text-[#6f7a6a] hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Right Column: Catalog Products Grid */}
          <main className="lg:col-span-9 space-y-5">
            {/* Header with Sort and Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#eaedff]">
              <div>
                <h2 className="text-lg md:text-xl font-extrabold text-[#131b2e]">
                  {selectedSubCategory}
                </h2>
                <p className="text-xs text-[#3f4a3c]">
                  Showing {filteredProducts.length} freshest picks in Indiranagar
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#3f4a3c] font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#f2f3ff] text-xs font-bold text-[#131b2e] px-3 py-2 rounded-xl border-none focus:outline-none cursor-pointer"
                >
                  <option value="bestseller">Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                const qty = cart[product.id] || 0;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between border border-[#eaedff]"
                  >
                    <div>
                      {/* Image & Badges */}
                      <div className="relative w-full aspect-square rounded-xl bg-[#f2f3ff] overflow-hidden mb-3 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.altText}
                          className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform"
                        />
                        {product.discountBadge && (
                          <span className="absolute top-2 left-2 bg-[#b30033] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                            {product.discountBadge}
                          </span>
                        )}
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#131b2e] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006714] inline-block"></span> 9 mins
                        </span>
                      </div>

                      {/* Weight & Rating */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="inline-block bg-[#eaedff] px-2 py-0.5 rounded text-[11px] font-bold text-[#3f4a3c]">
                          {product.weight}
                        </span>
                        {product.rating && (
                          <div className="flex items-center gap-0.5 text-[11px] font-bold text-[#855300]">
                            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              star
                            </span>
                            <span>{product.rating}</span>
                            {product.ratingCount && (
                              <span className="text-[10px] text-[#6f7a6a]">({product.ratingCount})</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-[13px] text-[#131b2e] line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* Price and Cart Button */}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#eaedff]">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-[15px] text-[#131b2e]">₹{product.price}</span>
                          {product.mrp && (
                            <span className="text-[12px] line-through text-[#6f7a6a]">₹{product.mrp}</span>
                          )}
                        </div>
                        {product.saveAmount && (
                          <span className="text-[10px] text-[#006714] font-bold block leading-none">
                            Save ₹{product.saveAmount}
                          </span>
                        )}
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
              })}
            </div>

            {/* Load more button */}
            <div className="pt-8 text-center">
              <button
                onClick={() => alert("All 36 fresh vegetable items loaded.")}
                className="px-6 py-2.5 bg-white border border-[#eaedff] text-xs font-bold text-[#131b2e] rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer shadow-xs"
              >
                Showing 12 of 36 items • Load More
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Bottom Cart Bar (if items in cart) */}
      {totalItemsCount > 0 && (
        <aside className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#0c831f] text-white p-3 md:px-5 rounded-2xl shadow-[0_8px_30px_rgba(12,131,31,0.38)] flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold">{totalItemsCount} Items</span>
                  <span className="text-[#e0ffd7]">•</span>
                  <span className="text-sm font-extrabold">₹{totalPayable}</span>
                </div>
                <span className="text-[11px] text-[#e0ffd7] leading-none block">Delivering to Flat 102 in 9 mins</span>
              </div>
            </div>
            <button
              onClick={() => navigateTo('fast-checkout')}
              className="flex items-center gap-1 bg-white text-[#006714] px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[#f2f3ff] transition-transform active:scale-95 cursor-pointer"
            >
              <span>Go to Checkout</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
