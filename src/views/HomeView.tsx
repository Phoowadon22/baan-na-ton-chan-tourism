import React from 'react';
import {
  HERO_BG,
  DISCOVERY_CATEGORIES,
  HOMESTAYS,
  COMMUNITY_IMPACT_BG,
} from '../data/mockData';
import { Homestay, TabType } from '../types';

interface HomeViewProps {
  onNavigateTab: (tab: TabType) => void;
  onSelectHomestay: (homestay: Homestay) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenStory: () => void;
  onOpenContact: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onSelectHomestay,
  favorites,
  onToggleFavorite,
  onOpenStory,
  onOpenContact,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-4 pt-4 pb-6">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl min-h-[350px] flex flex-col justify-end p-5 sm:p-6">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#154224]/95 via-[#184828]/55 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col gap-1 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7a8656]/50 backdrop-blur-md border border-white/10 w-fit">
              <span className="material-symbols-outlined text-[#bbefc1] text-[16px]">eco</span>
              <span className="font-headline text-[12px] font-semibold text-white tracking-wide">
                ท่องเที่ยววิถีชุมชนยั่งยืน
              </span>
            </div>

            <h1 className="font-headline text-[28px] sm:text-[32px] text-white font-bold leading-tight mt-1.5 drop-shadow-sm">
              สัมผัสวิถีชุมชน
              <br />
              <span className="text-[#ffdcbf]">ณ บ้านนาต้นจั่น</span>
            </h1>

            <p className="text-[13px] sm:text-[14px] text-white/90 leading-relaxed my-2 max-w-sm drop-shadow-sm">
              เที่ยว พัก กิน ช้อป ครบในที่เดียว เติมพลังใจท่ามกลางธรรมชาติและเสน่ห์ภูมิปัญญาสุโขทัย
            </p>

            {/* CTA Buttons matching screenshot */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigateTab('homestay')}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#244f31] hover:bg-[#1e432a] border border-[#386b47] text-white font-headline text-[13px] font-semibold h-11 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">bed</span>
                <span>ค้นหาที่พัก</span>
              </button>

              <button
                onClick={() => onNavigateTab('products')}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#dce3e7] hover:bg-[#e6ecf0] border-[3px] border-[#9aa4a9] text-[#1c4828] font-headline text-[13px] font-semibold h-11 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#1c4828]">shopping_bag</span>
                <span>ดูสินค้าชุมชน</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Filter / Category Icons (ค้นพบเสน่ห์บ้านนาต้นจั่น) */}
      <section className="w-full px-4 py-2 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <h2 className="font-headline text-[18px] text-on-surface font-bold">
              ค้นพบเสน่ห์บ้านนาต้นจั่น
            </h2>
            <span className="text-[13px] text-on-surface-variant">
              สำรวจไฮไลท์และกิจกรรมท้องถิ่นที่คัดสรรมาเพื่อคุณ
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {DISCOVERY_CATEGORIES.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigateTab(item.targetTab)}
              className="flex flex-col bg-surface-container-lowest rounded-xl p-2.5 shadow-sm transition-all hover:shadow-md active:scale-[0.98] cursor-pointer border border-surface-container/40"
            >
              <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-500"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div
                  className={`absolute top-1.5 left-1.5 w-7 h-7 rounded-lg ${item.badgeClass} flex items-center justify-center shadow-sm`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline text-[14px] text-on-surface font-bold">
                  {item.title}
                </span>
                <span className="text-[12px] text-on-surface-variant line-clamp-2 leading-tight mt-0.5">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Homestays Section (ที่พักยอดนิยม) */}
      <section className="w-full px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <h2 className="font-headline text-[18px] text-on-surface font-bold">ที่พักยอดนิยม</h2>
            <span className="text-[13px] text-on-surface-variant">
              โฮมสเตย์สัมผัสธรรมชาติ ดูแลดั่งญาติมิตร
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('homestay')}
            className="font-headline text-[13px] text-primary-container hover:text-primary flex items-center gap-0.5 font-semibold"
          >
            <span>ดูทั้งหมด</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Homestay Cards */}
        <div className="flex flex-col gap-4">
          {HOMESTAYS.slice(0, 3).map((homestay) => {
            const isFav = favorites.includes(homestay.id);
            return (
              <div
                key={homestay.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-surface-container/60"
              >
                <div className="relative w-full h-44">
                  <div
                    className="w-full h-full bg-cover bg-center cursor-pointer"
                    onClick={() => onSelectHomestay(homestay)}
                    style={{ backgroundImage: `url(${homestay.image})` }}
                  />

                  {homestay.badge && (
                    <div className="absolute top-3 left-3 bg-tertiary-container text-on-tertiary px-2.5 py-0.5 rounded-full font-headline text-[11px] font-semibold shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        local_fire_department
                      </span>
                      <span>{homestay.badge}</span>
                    </div>
                  )}

                  <button
                    onClick={() => onToggleFavorite(homestay.id)}
                    aria-label="Favorite"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm active:scale-90"
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

                <div className="p-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span
                      onClick={() => onSelectHomestay(homestay)}
                      className="font-headline text-[15px] font-bold text-on-surface cursor-pointer hover:text-primary transition-colors truncate"
                    >
                      {homestay.name}
                    </span>
                    <div className="flex items-center gap-1 text-tertiary font-headline text-[12px] font-semibold shrink-0">
                      <span
                        className="material-symbols-outlined text-[16px] text-tertiary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{homestay.rating}</span>
                      <span className="text-on-surface-variant font-normal">
                        ({homestay.reviewCount} รีวิว)
                      </span>
                    </div>
                  </div>

                  {/* Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap my-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      <span>{homestay.homeCapacity || homestay.capacity}</span>
                    </span>
                    {homestay.id === 'hs-1' ? (
                      <>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">free_breakfast</span>
                          <span>รวมมื้อเช้า-เย็น</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">pedal_bike</span>
                          <span>มีจักรยาน</span>
                        </span>
                      </>
                    ) : homestay.id === 'hs-2' ? (
                      <>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">yard</span>
                          <span>วิวสวนผลไม้</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">wifi</span>
                          <span>Wi-Fi ฟรี</span>
                        </span>
                      </>
                    ) : homestay.id === 'hs-3' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                        <span className="material-symbols-outlined text-[14px]">local_florist</span>
                        <span>แปลงดอกไม้</span>
                      </span>
                    ) : (
                      homestay.amenities.slice(0, 2).map((a, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-headline text-[11px]">
                          <span>{a}</span>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-surface-container/60 mt-1">
                    <div className="flex flex-col">
                      <span className="font-headline text-[11px] text-on-surface-variant">
                        ราคาเริ่มต้น
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-[18px] font-bold text-primary-container">
                          ฿{(homestay.homePrice || homestay.price).toLocaleString()}
                        </span>
                        <span className="text-[13px] text-on-surface-variant">
                          / {homestay.priceUnit}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectHomestay(homestay)}
                      className="bg-primary-container hover:bg-primary text-white font-headline text-[13px] font-semibold h-10 px-4 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Impact & Stats Highlight Banner */}
      <section className="w-full px-4 py-6">
        <div className="relative w-full rounded-2xl overflow-hidden p-5 sm:p-6 bg-primary-container text-on-primary shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
            style={{ backgroundImage: `url(${COMMUNITY_IMPACT_BG})` }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-[32px] text-tertiary-fixed mb-1">
              spa
            </span>

            <blockquote className="font-headline text-[20px] text-surface font-bold leading-snug">
              “มากกว่าการท่องเที่ยว
              <br />
              คือการได้เป็นส่วนหนึ่งของชุมชน”
            </blockquote>

            <p className="text-[13px] text-on-primary-container mt-1 max-w-xs">
              ทุกการเข้าพักและการสนับสนุนสินค้า กระจายรายได้สู่ครอบครัวชาวบ้านโดยตรง
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-3 bg-primary/40 rounded-xl p-3 backdrop-blur-sm border border-primary-fixed/20">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 text-primary-fixed">
                  <span className="material-symbols-outlined text-[16px]">groups</span>
                  <span className="font-headline text-[18px] font-bold">500+</span>
                </div>
                <span className="font-headline text-[11px] text-on-primary-container mt-0.5 text-center">
                  ผู้มาเยือน/ปี
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 text-tertiary-fixed">
                  <span className="material-symbols-outlined text-[16px]">cabin</span>
                  <span className="font-headline text-[18px] font-bold">20+</span>
                </div>
                <span className="font-headline text-[11px] text-on-primary-container mt-0.5 text-center">
                  โฮมสเตย์ชุมชน
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 text-secondary-fixed">
                  <span className="material-symbols-outlined text-[16px]">handshake</span>
                  <span className="font-headline text-[18px] font-bold">50+</span>
                </div>
                <span className="font-headline text-[11px] text-on-primary-container mt-0.5 text-center">
                  สินค้าหัตถกรรม
                </span>
              </div>
            </div>

            {/* Community Video/Story Button */}
            <button
              onClick={onOpenStory}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/20 hover:bg-surface/30 text-surface text-[13px] font-headline font-semibold backdrop-blur-sm transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>ฟังเรื่องราวจากชาวบ้านนาต้นจั่น</span>
            </button>
          </div>
        </div>
      </section>

      {/* Subtle Inquiry Teaser Box */}
      <section className="w-full px-4 pb-6">
        <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between gap-3 border border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-[13px] text-on-surface font-semibold truncate">
                วางแผนทริปท่องเที่ยวชุมชน?
              </span>
              <span className="text-[12px] text-on-surface-variant truncate">
                ติดต่อศูนย์ประสานงานกลุ่มโฮมสเตย์
              </span>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="bg-surface-container-lowest hover:bg-surface-variant text-primary-container font-headline text-[12px] font-semibold px-3 py-2 rounded-lg shrink-0 shadow-sm transition-colors active:scale-95"
          >
            ติดต่อสอบถาม
          </button>
        </div>
      </section>
    </div>
  );
};
