import React, { useState } from 'react';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';

interface FoodViewProps {
  onAddToCart?: (item: any) => void;
  onOpenContact: () => void;
}

export const FoodView: React.FC<FoodViewProps> = ({ onOpenContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'signature', label: 'เมนูซิกเนเจอร์' },
    { id: 'noodle', label: 'ข้าวเปิ๊บ/ข้าวพันผัก' },
    { id: 'set', label: 'สำรับขันโตก' },
    { id: 'beverage', label: 'เครื่องดื่มสมุนไพร' },
  ];

  const filteredFoods =
    selectedCategory === 'all'
      ? FOOD_ITEMS
      : FOOD_ITEMS.filter((f) => f.category === selectedCategory);

  const handleOrderFood = (food: FoodItem) => {
    setOrderNotice(`สั่ง "${food.name}" ไปยังโฮมสเตย์เรียบร้อยแล้ว!`);
    setTimeout(() => {
      setOrderNotice(null);
    }, 2800);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Banner */}
      <section className="relative w-full bg-tertiary-container text-on-tertiary px-4 pt-6 pb-8 rounded-b-[24px] shadow-sm overflow-hidden">
        <div className="relative z-10 flex flex-col gap-1 max-w-sm">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-tertiary-fixed/30 text-tertiary-fixed font-headline text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">restaurant_menu</span>
            <span>รสชาติต้นตำรับสุโขทัย</span>
          </div>
          <h1 className="font-headline text-[26px] text-white font-bold tracking-tight mt-1">
            อาหารพื้นบ้าน &amp; ข้าวเปิ๊บ
          </h1>
          <p className="text-[13px] text-on-tertiary-container">
            ลิ้มลอง "ข้าวเปิ๊บโบราณ" ปรุงสดร้อนจากเตา และสำรับขันโตกผักอินทรีย์เสิร์ฟถึงเรือนพัก
          </p>
        </div>
      </section>

      {/* Floating Notice Toast */}
      {orderNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-primary text-white rounded-full shadow-xl flex items-center gap-2 font-headline text-[13px] animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{orderNotice}</span>
        </div>
      )}

      {/* Category Pills */}
      <section className="px-4 mt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full font-headline text-[12px] font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-tertiary-container text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Food Story Highlight */}
      <section className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">
              local_fire_department
            </span>
            <h3 className="font-headline font-bold text-[15px] text-on-surface">
              ข้าวเปิ๊บ คืออะไร?
            </h3>
          </div>
          <p className="text-[13px] text-on-surface-variant leading-relaxed">
            "ข้าวเปิ๊บ" หรือก๋วยเตี๋ยวพระร่วง เป็นภูมิปัญญาการทำอาหารที่สืบทอดกันมากว่าร้อยปี โดยคำว่า <strong>"เปิ๊บ"</strong> เป็นภาษาถิ่นเหนือแปลว่า <strong>"พับ"</strong> การนำแผ่นแป้งข้าวเจ้าสดละเลงบนปากหม้อผ้าขาวบางแล้วพับห่อผักบุ้ง กะหล่ำปลี และไข่ เสิร์ฟในน้ำซุปกระดูกหมูกลมกล่อม
          </p>
        </div>
      </section>

      {/* Menu Cards */}
      <section className="px-4 mt-4 flex flex-col gap-4">
        {filteredFoods.map((food) => (
          <article
            key={food.id}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container/60 flex flex-col sm:flex-row gap-3 p-3.5 hover:shadow-md transition-all"
          >
            <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-surface-container shrink-0">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {food.isRecommended && (
                <span className="absolute top-2 left-2 bg-tertiary text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                  แนะนำ
                </span>
              )}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[13px] text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{food.rating}</span>
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-headline font-bold text-[16px] text-on-surface">
                  {food.name}
                </h3>
                <p className="text-[12px] text-secondary font-medium mt-0.5">
                  {food.subtitle}
                </p>
                <p className="text-[13px] text-on-surface-variant mt-1.5 line-clamp-2">
                  {food.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {food.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-surface-container/60">
                <span className="font-headline font-bold text-[18px] text-primary">
                  ฿{food.price}
                </span>
                <button
                  onClick={() => handleOrderFood(food)}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white font-headline text-[12px] font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">room_service</span>
                  <span>สั่งเสิร์ฟที่โฮมสเตย์</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Workshop Booking Teaser */}
      <section className="px-4 mt-6">
        <div className="bg-primary-container text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-primary-fixed text-[11px] font-bold uppercase">
              กิจกรรมเชิงสร้างสรรค์
            </span>
            <h4 className="font-headline font-bold text-[15px] mt-0.5">
              เวิร์กช็อปทำข้าวเปิ๊บด้วยตนเอง
            </h4>
            <p className="text-[12px] text-primary-fixed-dim">
              เรียนรู้การละเลงแป้งปากหม้อสูตรคุณยายเครื่อง พร้อมชิมฝีมือตนเอง
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-3.5 py-2 rounded-xl bg-white text-primary-container font-headline text-[12px] font-semibold shrink-0 shadow-sm hover:bg-surface-container transition-colors active:scale-95"
          >
            จองกิจกรรม
          </button>
        </div>
      </section>
    </div>
  );
};
