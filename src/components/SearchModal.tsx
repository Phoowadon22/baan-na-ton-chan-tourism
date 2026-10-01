import React, { useState, useMemo } from 'react';
import { HOMESTAYS, PRODUCTS, FOOD_ITEMS } from '../data/mockData';
import { Homestay, Product, FoodItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHomestay: (homestay: Homestay) => void;
  onSelectProduct: (product: Product) => void;
  onSelectFood: (food: FoodItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectHomestay,
  onSelectProduct,
  onSelectFood,
}) => {
  const [keyword, setKeyword] = useState('');

  const filteredHomestays = useMemo(() => {
    if (!keyword.trim()) return [];
    const q = keyword.toLowerCase();
    return HOMESTAYS.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.hostName.toLowerCase().includes(q) ||
        h.villageLocation.toLowerCase().includes(q)
    );
  }, [keyword]);

  const filteredProducts = useMemo(() => {
    if (!keyword.trim()) return [];
    const q = keyword.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.craftHeritage.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [keyword]);

  const filteredFoods = useMemo(() => {
    if (!keyword.trim()) return [];
    const q = keyword.toLowerCase();
    return FOOD_ITEMS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.subtitle.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    );
  }, [keyword]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-12">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col z-10 border border-surface-container">
        {/* Search input bar */}
        <div className="p-3 border-b border-surface-container flex items-center gap-2">
          <span className="material-symbols-outlined text-outline text-[22px] ml-1">search</span>
          <input
            autoFocus
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="ค้นหาโฮมสเตย์, ผ้าหมักโคลน, ข้าวเปิ๊บ..."
            className="flex-1 bg-transparent border-none text-[15px] text-on-surface focus:outline-none placeholder:text-outline"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="w-7 h-7 rounded-full text-outline hover:text-on-surface flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-[13px] font-medium text-primary hover:bg-surface-container rounded-lg"
          >
            ยกเลิก
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!keyword.trim() ? (
            <div className="py-8 text-center">
              <span className="material-symbols-outlined text-[36px] text-outline mb-2">
                travel_explore
              </span>
              <p className="text-[13px] text-on-surface-variant">
                พิมพ์คำค้นหาเพื่อค้นหาที่พัก สินค้าหัตถกรรม หรืออาหารพื้นบ้านสุโขทัย
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['ผ้าหมักโคลน', 'โฮมสเตย์บ้านตลิ่งชัน', 'ข้าวเปิ๊บ', 'ย่ามทอมือ', 'จักรยาน'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setKeyword(tag)}
                      className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[12px] hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredHomestays.length === 0 &&
            filteredProducts.length === 0 &&
            filteredFoods.length === 0 ? (
            <div className="py-8 text-center text-outline text-[13px]">
              ไม่พบผลลัพธ์สำหรับ "{keyword}" กรุณาลองค้นหาด้วยคำอื่น
            </div>
          ) : (
            <>
              {/* Homestays */}
              {filteredHomestays.length > 0 && (
                <div>
                  <h4 className="font-headline font-bold text-[13px] text-outline uppercase tracking-wider mb-2">
                    ที่พักโฮมสเตย์ ({filteredHomestays.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredHomestays.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => {
                          onSelectHomestay(h);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer border border-transparent hover:border-surface-container transition-all"
                      >
                        <img
                          src={h.image}
                          alt={h.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-headline font-semibold text-[14px] text-on-surface truncate">
                            {h.name}
                          </h5>
                          <p className="text-[12px] text-on-surface-variant truncate">
                            {h.villageLocation}
                          </p>
                          <span className="text-[12px] font-bold text-primary">
                            ฿{h.price.toLocaleString()} / {h.priceUnit}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          chevron_right
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {filteredProducts.length > 0 && (
                <div>
                  <h4 className="font-headline font-bold text-[13px] text-outline uppercase tracking-wider mb-2">
                    สินค้าชุมชน ({filteredProducts.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer border border-transparent hover:border-surface-container transition-all"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-headline font-semibold text-[14px] text-on-surface truncate">
                            {p.name}
                          </h5>
                          <p className="text-[12px] text-secondary truncate">{p.craftHeritage}</p>
                          <span className="text-[12px] font-bold text-primary">
                            ฿{p.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          chevron_right
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Food */}
              {filteredFoods.length > 0 && (
                <div>
                  <h4 className="font-headline font-bold text-[13px] text-outline uppercase tracking-wider mb-2">
                    อาหารพื้นบ้าน ({filteredFoods.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredFoods.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => {
                          onSelectFood(f);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer border border-transparent hover:border-surface-container transition-all"
                      >
                        <img
                          src={f.image}
                          alt={f.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-headline font-semibold text-[14px] text-on-surface truncate">
                            {f.name}
                          </h5>
                          <p className="text-[12px] text-on-surface-variant truncate">{f.subtitle}</p>
                          <span className="text-[12px] font-bold text-primary">
                            ฿{f.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          chevron_right
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
