import React, { useState } from 'react';
import { BookingRecord, Homestay, Product } from '../types';
import { HOMESTAYS, PRODUCTS } from '../data/mockData';

interface ProfileViewProps {
  bookings: BookingRecord[];
  favorites: string[];
  onSelectHomestay: (homestay: Homestay) => void;
  onSelectProduct: (product: Product) => void;
  onOpenStory: () => void;
  onOpenContact: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  bookings,
  favorites,
  onSelectHomestay,
  onSelectProduct,
  onOpenStory,
  onOpenContact,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'favorites' | 'info'>('bookings');

  // Favorite homestays & products
  const favHomestays = HOMESTAYS.filter((h) => favorites.includes(h.id));
  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Profile Header */}
      <section className="bg-primary text-on-primary px-4 pt-6 pb-8 rounded-b-[28px] shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-full bg-primary-fixed border-2 border-white flex items-center justify-center text-primary-container shadow-md shrink-0">
            <span className="material-symbols-outlined text-[36px]">person</span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-headline font-bold text-[18px] text-white truncate">
                คุณผู้มาเยือนคนสำคัญ
              </h1>
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <span className="text-[12px] text-primary-fixed-dim">
              ผู้สนับสนุนวิถีชุมชนระดับทอง
            </span>
            <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-[11px] text-primary-fixed w-fit font-medium">
              <span className="material-symbols-outlined text-[13px]">eco</span>
              <span>ร่วมกระจายรายได้สู่ชุมชน 100%</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-5 bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
          <div>
            <span className="font-headline font-bold text-[18px] text-white">
              {bookings.length}
            </span>
            <span className="block text-[11px] text-primary-fixed-dim mt-0.5">การจองที่พัก</span>
          </div>
          <div className="border-x border-white/20">
            <span className="font-headline font-bold text-[18px] text-white">
              {favorites.length}
            </span>
            <span className="block text-[11px] text-primary-fixed-dim mt-0.5">รายการโปรด</span>
          </div>
          <div>
            <span className="font-headline font-bold text-[18px] text-tertiary-fixed">
              350
            </span>
            <span className="block text-[11px] text-primary-fixed-dim mt-0.5">แต้มชุมชน</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-3 bg-surface-container-low p-1 rounded-xl border border-surface-container text-[13px] font-headline font-semibold">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`py-2 rounded-lg transition-all text-center ${
              activeSubTab === 'bookings'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            การจอง ({bookings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('favorites')}
            className={`py-2 rounded-lg transition-all text-center ${
              activeSubTab === 'favorites'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            รายการโปรด ({favorites.length})
          </button>
          <button
            onClick={() => setActiveSubTab('info')}
            className={`py-2 rounded-lg transition-all text-center ${
              activeSubTab === 'info'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            ศูนย์ประสานงาน
          </button>
        </div>
      </section>

      {/* Content based on sub-tab */}
      <section className="px-4 mt-4">
        {activeSubTab === 'bookings' && (
          <div className="space-y-3">
            {bookings.length === 0 ? (
              <div className="p-8 bg-surface-container-lowest rounded-2xl text-center border border-surface-container">
                <span className="material-symbols-outlined text-[36px] text-outline mb-2">
                  calendar_today
                </span>
                <h4 className="font-headline font-bold text-[15px] text-on-surface">
                  ยังไม่มีประวัติการจองที่พัก
                </h4>
                <p className="text-[12px] text-on-surface-variant mt-1">
                  เลือกดูโฮมสเตย์เรือนไม้และสัมผัสความอบอุ่นของชาวบ้านนาต้นจั่น
                </p>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
                    <span className="font-mono text-[12px] font-bold text-outline">
                      {b.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>ยืนยันแล้ว</span>
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <img
                      src={b.homestay.image}
                      alt={b.homestay.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4 className="font-headline font-bold text-[15px] text-on-surface truncate">
                        {b.homestay.name}
                      </h4>
                      <p className="text-[12px] text-on-surface-variant">
                        {b.checkIn} ถึง {b.checkOut}
                      </p>
                      <p className="text-[12px] text-outline mt-0.5">
                        ผู้เข้าพัก {b.guests} ท่าน ({b.homestay.mealsIncluded})
                      </p>
                      <span className="text-[14px] font-bold text-primary mt-auto">
                        ยอดชำระ: ฿{b.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-2.5 rounded-xl text-[12px] text-on-surface-variant flex items-center justify-between">
                    <span>ผู้ดูแล: {b.homestay.hostName}</span>
                    <a
                      href="tel:0884957738"
                      className="text-primary font-semibold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">call</span>
                      <span>โทรหาเจ้าบ้าน</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSubTab === 'favorites' && (
          <div className="space-y-4">
            {favHomestays.length === 0 && favProducts.length === 0 ? (
              <div className="p-8 bg-surface-container-lowest rounded-2xl text-center border border-surface-container">
                <span className="material-symbols-outlined text-[36px] text-outline mb-2">
                  favorite_border
                </span>
                <h4 className="font-headline font-bold text-[15px] text-on-surface">
                  ยังไม่มีรายการที่ถูกใจ
                </h4>
                <p className="text-[12px] text-on-surface-variant mt-1">
                  แตะที่ไอคอนรูปหัวใจบนที่พักหรือสินค้า เพื่อบันทึกไว้ในหน้านี้
                </p>
              </div>
            ) : (
              <>
                {favHomestays.length > 0 && (
                  <div>
                    <h4 className="font-headline font-bold text-[14px] text-on-surface mb-2">
                      โฮมสเตย์ที่บันทึกไว้
                    </h4>
                    <div className="space-y-2">
                      {favHomestays.map((h) => (
                        <div
                          key={h.id}
                          onClick={() => onSelectHomestay(h)}
                          className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container flex items-center gap-3 cursor-pointer hover:shadow-sm transition-all"
                        >
                          <img
                            src={h.image}
                            alt={h.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-headline font-semibold text-[14px] text-on-surface truncate">
                              {h.name}
                            </h5>
                            <p className="text-[12px] text-on-surface-variant">{h.villageLocation}</p>
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

                {favProducts.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-headline font-bold text-[14px] text-on-surface mb-2">
                      สินค้าชุมชนที่บันทึกไว้
                    </h4>
                    <div className="space-y-2">
                      {favProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container flex items-center gap-3 cursor-pointer hover:shadow-sm transition-all"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-headline font-semibold text-[14px] text-on-surface truncate">
                              {p.name}
                            </h5>
                            <p className="text-[12px] text-secondary">{p.craftHeritage}</p>
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
              </>
            )}
          </div>
        )}

        {activeSubTab === 'info' && (
          <div className="space-y-3">
            {/* Coordination Center Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">holiday_village</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-[15px] text-on-surface">
                    ศูนย์ประสานงานกลุ่มโฮมสเตย์บ้านนาต้นจั่น
                  </h4>
                  <p className="text-[12px] text-on-surface-variant">
                    ตำบลบ้านตึก อำเภอศรีสัชนาลัย จังหวัดสุโขทัย
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container space-y-2 text-[13px]">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                  <span>เบอร์โทรศัพท์: 088-495-7738, 089-858-6705</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  <span>เวลาทำการศูนย์: 07:30 - 18:00 น. ทุกวัน</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                  <span>พิกัด GPS: 17.5142° N, 99.8241° E</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={onOpenContact}
                  className="py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-container text-white font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>ส่งข้อความสอบถาม</span>
                </button>
                <button
                  onClick={onOpenStory}
                  className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">history_edu</span>
                  <span>ประวัติชุมชน</span>
                </button>
              </div>
            </div>

            {/* Attractions within village */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container">
              <h4 className="font-headline font-bold text-[14px] text-on-surface mb-2">
                จุดเช็คอินห้ามพลาดในบ้านนาต้นจั่น
              </h4>
              <div className="space-y-2 text-[13px] text-on-surface-variant">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0 mt-0.5">
                    filter_hdr
                  </span>
                  <div>
                    <strong className="text-on-surface">จุดชมวิวห้วยต้นไฮ:</strong> ชมทะเลหมอกและพระอาทิตย์ขึ้น 360 องศา พร้อมดื่มกาแฟในกระบอกไม้ไผ่
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                    palette
                  </span>
                  <div>
                    <strong className="text-on-surface">ศูนย์การเรียนรู้ผ้าหมักโคลน:</strong> ชมการหมักผ้าในโคลนและกี่ทอผ้าโบราณใต้ถุนเรือน
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">
                    ramen_dining
                  </span>
                  <div>
                    <strong className="text-on-surface">ร้านข้าวเปิ๊บล้มยักษ์:</strong> ลิ้มลองก๋วยเตี๋ยวพระร่วงสูตรยายเครื่องแบบดั้งเดิม
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
