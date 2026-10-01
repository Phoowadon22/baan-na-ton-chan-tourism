import React, { useState, useMemo } from 'react';
import {
  PRODUCT_HEADER_BG,
  PRODUCTS,
  PRODUCT_CATEGORIES,
} from '../data/mockData';
import { Product } from '../types';

interface ProductsViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh'>('popular');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.craftHeritage.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Featured items for horizontal reel
  const featuredProducts = PRODUCTS.slice(0, 2);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner with Mud-Cloth Fabric Accent */}
      <section className="relative w-full overflow-hidden bg-primary-container text-on-primary px-4 pt-6 pb-10 rounded-b-[28px] shadow-md">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
          style={{ backgroundImage: `url(${PRODUCT_HEADER_BG})` }}
        />
        <div className="relative z-10 flex flex-col gap-1 max-w-sm">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-primary-fixed/20 text-primary-fixed font-headline text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">eco</span>
            <span>ภูมิปัญญาหมู่บ้านนาต้นจั่น</span>
          </div>
          <h1 className="font-headline text-[28px] text-white font-bold tracking-tight mt-1">
            สินค้าชุมชน
          </h1>
          <p className="text-[13px] text-surface-container-high/90">
            ของฝากจากใจ ผลิตภัณฑ์ล้ำค่าจากภูมิปัญญาท้องถิ่นสุโขทัย
          </p>
        </div>
      </section>

      {/* Search & Filter Controls (Overlapping Header) */}
      <div className="px-4 -mt-4 z-20">
        <div className="flex items-center gap-2 bg-surface-container-lowest p-1.5 rounded-xl shadow-[0_4px_20px_rgba(47,93,58,0.08)] border border-surface-container/60">
          <div className="flex items-center flex-1 min-w-0 px-3 bg-surface-container-low rounded-lg h-11">
            <span className="material-symbols-outlined text-outline text-[20px] shrink-0 mr-2">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาสินค้าชุมชน, ผ้าหมักโคลน..."
              className="w-full bg-transparent text-[14px] text-on-surface focus:outline-none placeholder:text-outline/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setSortBy(
                sortBy === 'popular'
                  ? 'priceLow'
                  : sortBy === 'priceLow'
                  ? 'priceHigh'
                  : 'popular'
              );
            }}
            aria-label="กรองสินค้า"
            title="สลับการเรียงลำดับ"
            className="h-11 w-11 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>

      {/* Category Icons Row */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-headline text-[18px] text-on-surface font-bold">หมวดหมู่</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className="font-headline text-[12px] text-primary font-semibold hover:underline"
          >
            ดูทั้งหมด
          </button>
        </div>

        <div className="grid grid-cols-6 gap-2 text-center">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center gap-1 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform active:scale-95 ${
                    isSelected
                      ? 'bg-primary text-on-primary ring-2 ring-primary-fixed'
                      : 'bg-surface-container-low text-primary-container hover:bg-primary-fixed/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                </div>
                <span
                  className={`font-headline text-[11px] truncate w-full transition-colors ${
                    isSelected
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant font-medium'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recommended Banner / Horizontal Strip */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-2">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-tertiary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <h2 className="font-headline text-[18px] text-on-surface font-bold">
              สินค้าแนะนำพิเศษ
            </h2>
          </div>
          <span className="font-headline text-[12px] text-secondary font-semibold">ยอดนิยม</span>
        </div>

        {/* Horizontal Reel */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          {featuredProducts.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="flex shrink-0 w-[240px] flex-col bg-surface-container-lowest rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(47,93,58,0.06)] relative border border-surface-container/60"
              >
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-surface-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => onSelectProduct(item)}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-headline text-[11px] font-bold flex items-center gap-0.5 shadow-sm ${
                        item.badge === 'ยอดนิยม'
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-secondary text-on-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      <span>{item.badge}</span>
                    </span>
                  )}
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    aria-label="Favorite"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur text-on-surface flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-colors ${
                        isFav ? 'text-error' : 'text-outline hover:text-tertiary'
                      }`}
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="pt-2 flex flex-col gap-0.5">
                  <span className="font-headline text-[11px] text-secondary truncate">
                    {item.craftHeritage}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(item)}
                    className="font-headline text-[14px] text-on-surface font-semibold truncate cursor-pointer hover:text-primary transition-colors"
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-headline text-[18px] text-primary font-bold">
                      ฿{item.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onAddToCart(item, 1)}
                      className="h-8 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-transform shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>หยิบใส่ตะกร้า</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Product Grid (2 Columns Mobile) */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <h2 className="font-headline text-[18px] text-on-surface font-bold">
              รายการสินค้าทั้งหมด
            </h2>
            <span className="text-[12px] text-on-surface-variant">
              คัดสรรสดใหม่และงานฝีมือจากชาวบ้าน ({filteredProducts.length} รายการ)
            </span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-[11px]">
            <span>เรียงตาม:</span>
            <button
              onClick={() => {
                setSortBy(
                  sortBy === 'popular'
                    ? 'priceLow'
                    : sortBy === 'priceLow'
                    ? 'priceHigh'
                    : 'popular'
                );
              }}
              className="font-semibold text-primary font-headline hover:underline"
            >
              {sortBy === 'popular'
                ? 'ยอดนิยม'
                : sortBy === 'priceLow'
                ? 'ราคาต่ำ-สูง'
                : 'ราคาสูง-ต่ำ'}
            </button>
          </div>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <article
                key={product.id}
                className="flex flex-col bg-surface-container-lowest rounded-2xl p-2.5 shadow-[0_4px_16px_rgba(47,93,58,0.05)] transition-all border border-surface-container/60 hover:shadow-md"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    aria-label="Favorite"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur text-on-surface flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] transition-colors ${
                        isFav ? 'text-error' : 'text-outline hover:text-tertiary'
                      }`}
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  <span className="absolute bottom-2 left-2 bg-primary/85 backdrop-blur text-on-primary px-1.5 py-0.5 rounded text-[11px] font-headline flex items-center gap-0.5">
                    <span
                      className="material-symbols-outlined text-[12px] text-tertiary-fixed"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span>{product.rating}</span>
                  </span>
                </div>

                <div className="flex flex-col flex-1 pt-2">
                  <span className="font-headline text-[11px] text-secondary truncate">
                    {product.craftHeritage}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-headline text-[14px] text-on-surface font-semibold line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2">
                    <span className="font-headline text-[18px] text-primary font-bold block">
                      ฿{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="w-full mt-1.5 h-9 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>เพิ่มลงตะกร้า</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Community Impact Trust Banner */}
      <section className="mt-8 px-4 mb-6">
        <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-3 border border-surface-container">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
            <span className="material-symbols-outlined text-[24px]">diversity_1</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-[14px] text-on-surface font-semibold">
              รายได้สู่ชุมชนโดยตรง 100%
            </span>
            <p className="text-[12px] text-on-surface-variant leading-tight mt-0.5">
              ทุกการสั่งซื้อของคุณช่วยสนับสนุนช่างทอผ้าและกลุ่มสตรีแม่บ้านนาต้นจั่นให้มีรายได้ยั่งยืน
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
