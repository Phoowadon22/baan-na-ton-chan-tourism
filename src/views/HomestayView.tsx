import React, { useState, useMemo } from 'react';
import {
  HOMESTAY_HEADER_BG,
  SCENIC_RETREAT_BG,
  HOMESTAYS,
  HOMESTAY_FILTERS,
} from '../data/mockData';
import { Homestay } from '../types';

interface HomestayViewProps {
  onSelectHomestay: (homestay: Homestay) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenContact: () => void;
}

export const HomestayView: React.FC<HomestayViewProps> = ({
  onSelectHomestay,
  favorites,
  onToggleFavorite,
  onOpenContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh' | 'rating'>('popular');
  const [datesText, setDatesText] = useState('15 - 17 มี.ค.');
  const [guestsText, setGuestsText] = useState('ผู้ใหญ่ 2 คน');
  const [isEditingBooking, setIsEditingBooking] = useState(false);

  // Filter and sort
  const filteredList = useMemo(() => {
    let result = [...HOMESTAYS];

    // Filter by chip
    if (selectedFilter === 'wooden') {
      result = result.filter(
        (h) => h.id === 'hs-1' || h.id === 'hs-2' || h.id === 'hs-4'
      );
    } else if (selectedFilter === 'private') {
      result = result.filter((h) => h.id === 'hs-3');
    } else if (selectedFilter === 'view') {
      result = result.filter((h) => h.id === 'hs-1' || h.id === 'hs-2');
    } else if (selectedFilter === 'family') {
      result = result.filter((h) => h.id === 'hs-3' || h.capacity.includes('4'));
    }

    // Text query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.villageLocation.toLowerCase().includes(q) ||
          h.hostName.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedFilter, searchQuery, sortBy]);

  return (
    <div className="flex flex-col w-full">
      {/* Visual Header Hero Banner */}
      <section className="relative w-full overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HOMESTAY_HEADER_BG})` }}
          />
        </div>
        <div className="relative z-10 px-4 pt-6 pb-8 flex flex-col items-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/20 backdrop-blur-md mb-2">
            <span className="material-symbols-outlined text-[14px] text-primary-fixed">cottage</span>
            <span className="font-headline text-[11px] font-semibold text-primary-fixed">
              การพักผ่อนวิถีชุมชน
            </span>
          </div>
          <h1 className="font-headline text-[28px] text-on-primary font-bold tracking-tight">
            ที่พักโฮมสเตย์
          </h1>
          <p className="text-[13px] text-primary-fixed-dim mt-1 max-w-[300px] leading-relaxed">
            บรรยากาศอบอุ่น นอนเรือนไม้ สูดไอดิน ใกล้ชิดธรรมชาติพร้อมวิถีชีวิตชาวบ้านนาต้นจั่น
          </p>
        </div>
      </section>

      {/* Interactive Search & Booking Widget */}
      <section className="px-4 -mt-4 relative z-20">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(22,69,37,0.08)] p-4 flex flex-col gap-3 border border-surface-container/60">
          {/* Search Input */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อที่พัก, บ้านสวน, โซนริมทุ่ง..."
              className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface text-[14px] placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Dates & Guests Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsEditingBooking(!isEditingBooking)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low text-left hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-primary-container text-[18px]">
                calendar_month
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-outline leading-none">วันเดินทาง</span>
                <span className="font-headline text-[12px] font-semibold text-on-surface truncate leading-tight mt-0.5">
                  {datesText}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsEditingBooking(!isEditingBooking)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low text-left hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-primary-container text-[18px]">
                group
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-outline leading-none">จำนวนผู้เข้าพัก</span>
                <span className="font-headline text-[12px] font-semibold text-on-surface truncate leading-tight mt-0.5">
                  {guestsText}
                </span>
              </div>
            </button>
          </div>

          {isEditingBooking && (
            <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container space-y-2 text-[12px]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-outline block mb-1">เลือกวันที่</span>
                  <select
                    value={datesText}
                    onChange={(e) => setDatesText(e.target.value)}
                    className="w-full p-1.5 bg-surface-container-lowest rounded border border-outline-variant"
                  >
                    <option value="15 - 17 มี.ค.">15 - 17 มี.ค. (สุดสัปดาห์)</option>
                    <option value="20 - 22 มี.ค.">20 - 22 มี.ค. (ปลายเดือน)</option>
                    <option value="1 - 3 เม.ย.">1 - 3 เม.ย. (ต้นเดือน)</option>
                    <option value="12 - 15 เม.ย.">12 - 15 เม.ย. (สงกรานต์สุโขทัย)</option>
                  </select>
                </div>
                <div>
                  <span className="text-outline block mb-1">จำนวนผู้เข้าพัก</span>
                  <select
                    value={guestsText}
                    onChange={(e) => setGuestsText(e.target.value)}
                    className="w-full p-1.5 bg-surface-container-lowest rounded border border-outline-variant"
                  >
                    <option value="ผู้ใหญ่ 1 คน">ผู้ใหญ่ 1 คน (เดี่ยว)</option>
                    <option value="ผู้ใหญ่ 2 คน">ผู้ใหญ่ 2 คน (คู่รัก/เพื่อน)</option>
                    <option value="ผู้ใหญ่ 3-4 คน">ผู้ใหญ่ 3-4 คน (กลุ่มเพื่อน)</option>
                    <option value="ครอบครัว 5-6 คน">ครอบครัว 5-6 คน (เหมาหลัง)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => {
              setIsEditingBooking(false);
              const element = document.getElementById('homestay-listings');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-headline text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(22,69,37,0.25)] active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">travel_explore</span>
            <span>ค้นหาที่พักว่าง</span>
          </button>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="mt-5 px-4" id="homestay-listings">
        {/* Filter Chips Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {HOMESTAY_FILTERS.map((chip) => {
            const isActive = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`filter-chip shrink-0 px-4 py-1.5 rounded-full font-headline text-[12px] font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Results Count & Sorting Header */}
        <div className="flex items-center justify-between mt-3 pt-1">
          <span className="font-headline text-[12px] text-on-surface-variant font-medium">
            พบ {filteredList.length} ที่พักในชุมชน
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface cursor-pointer">
            <span className="text-[11px] text-outline">เรียงตาม:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="font-headline text-[12px] font-semibold text-primary-container bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="popular">ยอดนิยม</option>
              <option value="priceLow">ราคา: ต่ำ - สูง</option>
              <option value="priceHigh">ราคา: สูง - ต่ำ</option>
              <option value="rating">คะแนนรีวิวสูงสุด</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-primary-container">
              expand_more
            </span>
          </div>
        </div>
      </section>

      {/* Homestay Listing Cards */}
      <section className="mt-4 px-4 flex flex-col gap-5">
        {filteredList.map((homestay) => {
          const isFav = favorites.includes(homestay.id);
          return (
            <article
              key={homestay.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(25,28,33,0.06)] flex flex-col transition-all active:scale-[0.99] border border-surface-container/60"
            >
              {/* Image banner */}
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={homestay.image}
                  alt={homestay.name}
                  onClick={() => onSelectHomestay(homestay)}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {homestay.badge && (
                    <span
                      className={`px-2.5 py-1 rounded-full font-headline text-[11px] font-semibold flex items-center gap-1 shadow-sm ${
                        homestay.badgeType === 'tertiary'
                          ? 'bg-tertiary text-on-tertiary'
                          : homestay.badgeType === 'secondary'
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-primary-fixed text-on-primary-fixed-variant'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[13px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {homestay.badgeType === 'tertiary'
                          ? 'local_fire_department'
                          : homestay.badgeType === 'secondary'
                          ? 'park'
                          : 'landscape'}
                      </span>
                      <span>{homestay.badge}</span>
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary-container font-headline text-[11px] font-semibold">
                    โฮมสเตย์แท้
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={() => onToggleFavorite(homestay.id)}
                  aria-label="บันทึกรายการโปรด"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 shadow-sm"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isFav ? 'text-error' : 'text-outline hover:text-tertiary'
                    }`}
                    style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>

                {/* Bottom Image Overlay: Host Quote */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[14px]">face</span>
                  </div>
                  <span className="font-headline text-[12px] text-surface-container-lowest truncate drop-shadow-sm font-medium">
                    ดูแลโดย {homestay.hostName}
                  </span>
                </div>
              </div>

              {/* Card Details Content */}
              <div className="p-4 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <h2
                      onClick={() => onSelectHomestay(homestay)}
                      className="font-headline text-[18px] text-on-surface font-semibold truncate cursor-pointer hover:text-primary transition-colors"
                    >
                      {homestay.name}
                    </h2>
                    <p className="text-[13px] text-outline flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        location_on
                      </span>
                      <span>{homestay.villageLocation}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container shrink-0">
                    <span
                      className="material-symbols-outlined text-tertiary-container text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-headline text-[12px] font-bold text-on-surface">
                      {homestay.rating}
                    </span>
                    <span className="text-[11px] text-outline">({homestay.reviewCount})</span>
                  </div>
                </div>

                {/* Amenity Feature Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
                  {homestay.id === 'hs-1' ? (
                    <>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                        <span>2-4 ท่าน</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">bed</span>
                        <span>2 เตียงเดี่ยว</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">restaurant</span>
                        <span>รวมอาหาร 2 มื้อ</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-headline text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">ac_unit</span>
                        <span>ห้องแอร์</span>
                      </span>
                    </>
                  ) : homestay.id === 'hs-2' ? (
                    <>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                        <span>2 ท่าน</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">bed</span>
                        <span>1 ฟูกหนานุ่ม</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">pedal_bike</span>
                        <span>ปั่นจักรยานฟรี</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-fixed/40 text-on-primary-fixed-variant font-headline text-[11px]">
                        <span className="material-symbols-outlined text-[14px]">eco</span>
                        <span>ชายทุ่งลมเย็น</span>
                      </span>
                    </>
                  ) : homestay.id === 'hs-3' ? (
                    <>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                        <span>4-6 ท่าน</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">home</span>
                        <span>บ้านหลังใหญ่</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">soup_kitchen</span>
                        <span>ครัวระเบียง</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-headline text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">ac_unit</span>
                        <span>แอร์ 2 ห้อง</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                        <span>{homestay.capacity}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">bed</span>
                        <span>{homestay.bedType}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low font-headline text-[11px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">restaurant</span>
                        <span>{homestay.mealsIncluded}</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Pricing & Bottom CTA Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-container/60">
                  <div className="flex flex-col">
                    <span className="font-headline text-[11px] text-outline">ราคาเริ่มต้น</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-[22px] text-primary font-bold">
                        ฿{homestay.price.toLocaleString()}
                      </span>
                      <span className="text-[12px] text-on-surface-variant">
                        / {homestay.id === 'hs-3' ? 'คืน / หลัง' : homestay.priceUnit}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectHomestay(homestay)}
                    className="h-10 px-5 rounded-lg bg-primary-container text-on-primary font-headline text-[13px] font-semibold flex items-center gap-1.5 hover:bg-primary transition-colors active:scale-95 shadow-sm"
                  >
                    <span>ดูรายละเอียด</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Banner Card: พักผ่อน...ท่ามกลางธรรมชาติ */}
      <section className="mt-8 mb-4 px-4">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <div
            className="w-full h-60 bg-cover bg-center"
            style={{ backgroundImage: `url(${SCENIC_RETREAT_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5">
            <span className="font-headline text-[11px] text-tertiary-fixed tracking-wide uppercase font-semibold">
              Sukhothai Rural Retreat
            </span>
            <h3 className="font-headline text-[22px] text-surface font-bold mt-1">
              พักผ่อน...ท่ามกลางธรรมชาติ
            </h3>
            <p className="text-[13px] text-surface-container-high mt-1 text-balance">
              สัมผัสอากาศบริสุทธิ์ ชาร์จพลังชีวิต พร้อมร่วมทำกิจกรรมย้อมผ้าหมักโคลนและชิมข้าวเปิ๊บโบราณ
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="mt-4 w-full h-11 bg-tertiary hover:bg-tertiary-container text-on-tertiary rounded-xl font-headline text-[14px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <span>ดูที่พักและแพ็กเกจทั้งหมด</span>
              <span className="material-symbols-outlined text-[18px]">explore</span>
            </button>
          </div>
        </div>
      </section>

      {/* Community Host Commitment Notice */}
      <section className="mt-2 mb-6 px-4">
        <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3 border border-surface-container">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">handshake</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-headline text-[14px] text-on-surface font-semibold">
              การท่องเที่ยวโดยชุมชน (CBT)
            </h4>
            <p className="text-[13px] text-on-surface-variant mt-0.5">
              รายได้จากการเข้าพัก 100% กระจายสู่กลุ่มแม่บ้าน เกษตรกร และชาวบ้านนาต้นจั่นโดยตรงเพื่อความยั่งยืน
            </p>
            <button
              onClick={onOpenContact}
              className="text-[12px] text-primary font-semibold hover:underline mt-1.5 self-start flex items-center gap-0.5"
            >
              <span>สอบถามข้อมูลการเข้าพักเพิ่มเติม</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
