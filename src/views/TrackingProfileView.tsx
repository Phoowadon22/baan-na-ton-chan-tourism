import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface TrackingProfileViewProps {
  onShowToast: (message: string) => void;
  onSelectHomestayByName?: (name: string) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export const TrackingProfileView: React.FC<TrackingProfileViewProps> = ({
  onShowToast,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'homestay' | 'products'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    onShowToast(`คัดลอก ${label} เรียบร้อยแล้ว`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onShowToast('ซิงค์ข้อมูลกับกลุ่มชุมชนล่าสุดแล้ว');
    }, 600);
  };

  // Check visibility by search
  const isMatchSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  const showHomestayActive = (activeTab === 'all' || activeTab === 'homestay') &&
    isMatchSearch('BTJ-2025-0891 บ้านไม้ชายทุ่ง เรือนป้าเสงี่ยม ปลายนา สุโขทัย');

  const showProductActive = (activeTab === 'all' || activeTab === 'products') &&
    isMatchSearch('ED892019482TH SHP-2025-0412 ผ้าคลุมไหล่หมักโคลนย้อมคราม สบู่ดินโคลน');

  const showHistoryHomestay = (activeTab === 'all' || activeTab === 'homestay') &&
    isMatchSearch('เรือนปู่ย่าร่มเย็น ลุงสุชาติ ขันโตก');

  const showHistoryProduct = (activeTab === 'all' || activeTab === 'products') &&
    isMatchSearch('ผ้าซิ่นตีนจกโบราณ ลายสิบสองหน่วยตัด');

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="px-4 py-4 flex flex-col gap-5">
        {/* Top Sub-Header & Overview */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-headline text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">nature_people</span>
                <span>วิสาหกิจชุมชน</span>
              </span>
              <span className="font-headline text-[11px] text-on-surface-variant">อัปเดตแบบเรียลไทม์</span>
            </div>

            <button
              onClick={handleRefresh}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95"
              title="รีเฟรชข้อมูล"
            >
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-500 ${
                  isRefreshing ? 'rotate-180' : ''
                }`}
              >
                sync
              </span>
            </button>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <h2 className="font-headline font-bold text-[24px] text-on-surface tracking-tight">
              ติดตามสถานะ &amp; ประวัติ
            </h2>
            <span className="font-headline text-[12px] text-primary font-semibold">
              5 รายการทั้งหมด
            </span>
          </div>
          <p className="text-[13px] text-on-surface-variant">
            ตรวจสอบการเดินทางสู่บ้านนาต้นจั่น และพัสดุหัตถกรรมหมักโคลน
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหารหัสจอง BTJ-..., สินค้า หรือชื่อเรือน..."
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-surface-container-lowest text-on-surface text-[14px] placeholder:text-on-surface-variant/70 shadow-sm border border-surface-container/60 focus:outline-none focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Segmented Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`shrink-0 px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all shadow-sm ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            ทั้งหมด (5)
          </button>
          <button
            onClick={() => setActiveTab('homestay')}
            className={`shrink-0 px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all shadow-sm ${
              activeTab === 'homestay'
                ? 'bg-primary text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            การจองที่พัก (2)
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`shrink-0 px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all shadow-sm ${
              activeTab === 'products'
                ? 'bg-primary text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            สั่งซื้อสินค้า (3)
          </button>
        </div>

        {/* SECTION 1: ACTIVE HOMESTAY BOOKING */}
        {showHomestayActive && (
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-headline font-semibold text-[14px] text-on-surface">
                  การจองที่พักเร็วๆ นี้
                </span>
              </div>
              <span className="font-headline text-[12px] text-primary font-semibold">
                อีก 6 วันเดินทาง
              </span>
            </div>

            {/* Main Booking Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-4 flex flex-col gap-4 border border-surface-container/60 relative overflow-hidden">
              {/* Top Card Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-headline text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span>ยืนยันแล้ว (มัดจำ 50%)</span>
                </div>
                <button
                  onClick={() => copyToClipboard('BTJ-2025-0891', 'รหัสการจอง BTJ-2025-0891')}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-headline text-[11px] bg-surface-container-low px-2.5 py-1 rounded-lg border border-surface-container/60 active:scale-95"
                >
                  <span className="font-mono font-bold">BTJ-2025-0891</span>
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                </button>
              </div>

              {/* Homestay Thumbnail & Details */}
              <div className="flex gap-3 items-start">
                <img
                  className="w-24 h-24 rounded-xl object-cover shrink-0 shadow-sm"
                  alt="บ้านไม้ชายทุ่ง เรือนป้าเสงี่ยม"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwrkmhc5bUPXGXdu5StnqIC4X_MNakERKe90-b6WlqOw48kIXxY-adjy1l2Vz9SaWbTNLmso85u6kgYM1Qw0KwK5wxjWMUAHeZzDwizvW6y-Q4Bzn0PKTca8ZtR6-e3VUcV0gw4hBMRX_3mEKS_sqocObMLR1cmW3ZsVGxNdwSppwtZIV8rttiH9N0IIikXD4dQE5-4SBE3ZcSkOytikRcR88OrWajAKIRZ6CN67dWK-E2ag0gM-M2"
                />
                <div className="flex flex-col justify-between min-w-0 flex-1 h-24">
                  <div>
                    <div className="flex items-center gap-1 text-tertiary font-headline text-[11px] font-semibold mb-0.5">
                      <span className="material-symbols-outlined text-[14px]">eco</span>
                      <span>โฮมสเตย์วิถีเกษตรอินทรีย์</span>
                    </div>
                    <h3 className="font-headline font-bold text-[16px] text-on-surface truncate">
                      บ้านไม้ชายทุ่ง (เรือนป้าเสงี่ยม)
                    </h3>
                    <p className="text-[12px] text-on-surface-variant truncate flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] shrink-0 text-secondary">
                        location_on
                      </span>
                      <span>หมู่ 5 ปลายนา วิวภูเขาพระศรี</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant font-headline text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                      <span>15 - 17 มี.ค. 68</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      <span>ผู้ใหญ่ 2 ท่าน</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Journey Stepper */}
              <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-3 border border-surface-container/60">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-[12px] text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">local_florist</span>
                    <span>เส้นทางเตรียมการต้อนรับของชุมชน</span>
                  </span>
                  <span className="font-headline text-[11px] text-primary font-semibold">
                    ขั้นตอนที่ 3 จาก 4
                  </span>
                </div>

                {/* Steps */}
                <div className="relative flex flex-col gap-3 mt-1">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="absolute left-3 top-6 bottom-[-16px] w-[2px] bg-primary" />
                    <div className="flex flex-col min-w-0 pb-1">
                      <span className="font-headline font-semibold text-[13px] text-on-surface">
                        ส่งคำขอจองโฮมสเตย์
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        เสร็จสมบูรณ์เมื่อ 28 ก.พ. 2568 (10:14 น.)
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="absolute left-3 top-6 bottom-[-16px] w-[2px] bg-primary" />
                    <div className="flex flex-col min-w-0 pb-1">
                      <span className="font-headline font-semibold text-[13px] text-on-surface">
                        ชำระมัดจำยืนยันสิทธิ์ 50%
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        ชำระผ่าน PromptPay สำเร็จ (฿1,775)
                      </span>
                    </div>
                  </div>

                  {/* Step 3 (In-Progress) */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        restaurant_menu
                      </span>
                    </div>
                    <div className="absolute left-3 top-6 bottom-[-16px] w-[2px] bg-surface-container-highest" />
                    <div className="flex flex-col min-w-0 bg-surface-container-lowest p-2.5 rounded-xl shadow-sm border border-surface-container/60 w-full">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-headline text-[13px] text-primary font-semibold">
                          เตรียมการต้อนรับ &amp; วัตถุดิบขันโตก
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-headline text-[10px] font-bold">
                          กำลังทำ
                        </span>
                      </div>
                      <p className="text-[12px] text-on-surface mt-1 leading-snug">
                        "ป้าเสงี่ยมกำลังเก็บผักกูดและพริกปลอดสารสดๆ จากสวนหลังบ้านเพื่อเตรียมสำรับต้อนรับคุณ"
                      </p>
                      <span className="font-headline text-[11px] text-tertiary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">outdoor_garden</span>
                        <span>สวนสมุนไพรบ้านนาต้นจั่น</span>
                      </span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3 relative pt-1">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0 z-10">
                      <span className="material-symbols-outlined text-[14px]">cottage</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-headline font-semibold text-[13px] text-on-surface-variant">
                        เช็คอินเข้าพักและรับกุญแจ
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        15 มี.ค. 2568 ตั้งแต่ 14:00 น. เป็นต้นไป
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-surface-container-low px-4 py-3 rounded-xl flex flex-col gap-1.5 border border-surface-container/60 text-[13px]">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>ยอดรวมทั้งสิ้น (3 วัน 2 คืน พร้อมอาหาร)</span>
                  <span className="font-semibold text-on-surface">฿3,550</span>
                </div>
                <div className="flex justify-between items-center text-primary">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>มัดจำล่วงหน้าแล้ว (50%)</span>
                  </span>
                  <span className="font-bold">- ฿1,775</span>
                </div>
                <div className="h-[1px] bg-outline-variant/40 my-0.5" />
                <div className="flex justify-between items-center font-headline font-semibold">
                  <span className="text-tertiary">คงเหลือชำระวันเช็คอิน (เงินสด/สแกน)</span>
                  <span className="text-tertiary font-bold text-[16px]">฿1,775</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setIsVoucherOpen(true)}
                  className="h-12 bg-primary hover:bg-primary-container text-white rounded-xl font-headline text-[13px] font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                  <span>ดู E-Voucher &amp; QR</span>
                </button>
                <a
                  href="tel:0884957738"
                  className="h-12 bg-surface-container-high hover:bg-surface-container-highest text-primary rounded-xl font-headline text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98 border border-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  <span>ติดต่อป้าเสงี่ยม</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: ACTIVE PRODUCT SHIPMENT */}
        {showProductActive && (
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                <span className="font-headline font-semibold text-[14px] text-on-surface">
                  พัสดุหัตถกรรมกำลังจัดส่ง
                </span>
              </div>
              <span className="font-headline text-[12px] text-on-surface-variant font-medium">
                EMS ด่วนพิเศษ
              </span>
            </div>

            {/* Shipment Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-4 flex flex-col gap-3.5 border border-surface-container/60">
              {/* Header status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                  <span>กำลังนำจ่ายปลายทาง</span>
                </div>
                <button
                  onClick={() => copyToClipboard('ED892019482TH', 'เลขพัสดุ EMS: ED892019482TH')}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-secondary font-headline text-[11px] bg-surface-container-low px-2.5 py-1 rounded-lg border border-surface-container/60 active:scale-95"
                >
                  <span className="font-mono font-bold">ED892019482TH</span>
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                </button>
              </div>

              {/* Latest Courier Status Banner */}
              <div className="bg-secondary-container/30 p-3 rounded-xl flex items-center gap-3 border border-secondary-container/50">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">pin_drop</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-[13px] text-on-surface truncate font-semibold">
                    ถึงศูนย์กระจายพัสดุปลายทาง (พร้อมส่ง)
                  </span>
                  <span className="text-[12px] text-on-surface-variant">
                    เจ้าหน้าที่อยู่ระหว่างนำจ่าย คาดว่าจะถึงวันนี้ 16:30 น.
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex flex-col gap-2">
                <span className="font-headline text-[11px] text-on-surface-variant">
                  รายการสินค้าในคำสั่งซื้อ #SHP-2025-0412:
                </span>

                {/* Item 1 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low border border-surface-container/60">
                  <img
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                    alt="ผ้าคลุมไหล่หมักโคลนย้อมคราม"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9kM9Z7C0NwckyIbjXmolDCEMcy3usoc-bk9TXKPYpVmDhnjnJQ11fh5BGiv_Nbky5llNGw6dJmRCrmf8wSO51STlRb7hTBuTtgLeBtmmr3uKmJ9pr1gnS94_Ot_jKcng5NJdq5bFibsttjcOVoGq335lS2ESv7I5J4JdxgujClLXfvxJZLow9Rn5tANoHayssVBMBHIRWPcalEYaZbmUTO812R4G1ZNLuJqXAA2IUorA_ugdUFjf8"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline font-semibold text-[13px] text-on-surface truncate">
                      ผ้าคลุมไหล่หมักโคลนย้อมคราม ลายสายน้ำสุโขทัย
                    </h4>
                    <p className="text-[11px] text-on-surface-variant">1 ผืน • ย้อมครามธรรมชาติ 100%</p>
                  </div>
                  <span className="font-headline font-bold text-[14px] text-primary shrink-0">
                    ฿1,250
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low border border-surface-container/60">
                  <img
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                    alt="สบู่ดินโคลนธรรมชาติบริสุทธิ์"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTxnUI2fSCFhEkUZkZSzy0AcTpX_Zf7_nnbxPoU1HF4r94Q2BDWaUmKWPXlpniHWStqk4YYXX1X6lyqbSQ_05Je1lWre1KgOiCyQ-65qE9GH3jkW89qHI98jEqGxtkf0PnbWuzPqC9mSYUTfkJfjxDQvE7Z2rMjhNddWUiyjWfK6iYdajvWmh4e6OowSK2uQLGhXCnYlf05GzpFOVxvxs0Aj3Hcbt63a8nCAp_gqytyYxppHECNvEF"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline font-semibold text-[13px] text-on-surface truncate">
                      สบู่ดินโคลนธรรมชาติบริสุทธิ์
                    </h4>
                    <p className="text-[11px] text-on-surface-variant">2 ก้อน • สกัดจากดินโคลนหนองน้ำธรรมชาติ</p>
                  </div>
                  <span className="font-headline font-bold text-[14px] text-primary shrink-0">
                    ฿240
                  </span>
                </div>
              </div>

              {/* Total and Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-surface-container/60">
                <div className="flex flex-col">
                  <span className="text-[11px] text-on-surface-variant">
                    ยอดชำระแล้ว (รวมค่าจัดส่ง)
                  </span>
                  <span className="font-headline font-bold text-[18px] text-primary">
                    ฿1,550
                  </span>
                </div>
                <button
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="h-10 px-4 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-headline text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">track_changes</span>
                  <span>เช็คเส้นทางพัสดุ</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: COMPLETED HISTORY */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                history
              </span>
              <span className="font-headline font-semibold text-[14px] text-on-surface">
                ประวัติที่ผ่านมา
              </span>
            </div>
            <span className="font-headline text-[11px] text-on-surface-variant font-medium">
              3 รายการก่อนหน้า
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* History Item 1: Homestay Completed */}
            {showHistoryHomestay && (
              <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-surface-container/60">
                <div className="flex items-center justify-between text-on-surface-variant font-headline text-[11px]">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    <span>เข้าพักเสร็จสมบูรณ์</span>
                  </span>
                  <span>12 - 13 ต.ค. 2567</span>
                </div>

                <div className="flex gap-3 items-center py-1">
                  <img
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    alt="เรือนปู่ย่าร่มเย็น ลุงสุชาติ"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfnK3jWCnRVzpnQmFlFXQoFEvcn28dlkq_4y_8R4aJpX1mZDrBvb2UMfKP3PaoaxDh6nEIpzFhxWfD4Ron7fF3lfWg0f_CplA0Y420hfhT--83qpFy34G4fff2W3eBEuDNwzJwUwCxo-7ZyhWYLlPYVB-FLZKdPCBK-p5MwpGDHVCHQbU9LEGccxmWURE8uXNA0-huyjx0aZNOIpRxh0n02Z9NcIFIdUtQcZoE2mRTvJQytCBjIL7j"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline font-bold text-[14px] text-on-surface truncate">
                      เรือนปู่ย่าร่มเย็น (ลุงสุชาติ)
                    </h4>
                    <p className="text-[12px] text-on-surface-variant">2 วัน 1 คืน • สำรับขันโตกเช้า-เย็น</p>
                    <span className="font-headline text-[12px] text-primary font-semibold">
                      ฿1,600 (ชำระครบถ้วน)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-surface-container/60">
                  <button
                    onClick={() => onShowToast('คะแนนรีวิวของคุณ: 5 ดาว "อบอุ่น ขันโตกอร่อยมาก"')}
                    className="h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-headline text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">star</span>
                    <span>ดูรีวิวที่เคยให้</span>
                  </button>
                  <button
                    onClick={() => onShowToast('กำลังเปิดตารางว่างสำหรับ เรือนปู่ย่าร่มเย็น')}
                    className="h-9 rounded-xl bg-primary-container hover:bg-primary text-white font-headline text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors active:scale-98 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">sync</span>
                    <span>จองพักอีกครั้ง</span>
                  </button>
                </div>
              </div>
            )}

            {/* History Item 2: Product Completed */}
            {showHistoryProduct && (
              <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-surface-container/60">
                <div className="flex items-center justify-between text-on-surface-variant font-headline text-[11px]">
                  <span className="flex items-center gap-1 text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                    <span>ส่งมอบพัสดุเรียบร้อย</span>
                  </span>
                  <span>22 ม.ค. 2568</span>
                </div>

                <div className="flex gap-3 items-center py-1">
                  <img
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    alt="ผ้าซิ่นตีนจกโบราณ ลายสิบสองหน่วยตัด"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqxqlx4Vp7uPY9dE_bW_zx3VXDPay0cb1nKtEes2MbXosfu3MCAuOzxzMJzQMAWMEN_Vtwa0GkfMDS5UDAku1d3E8zDc8p4KCoi_e4PcPpf2uJFxjLCJr53gYZRdeVOh2OBpIgj2s6jIGbRJI3LBYio45DuLtFtIWJQ9NsJ_DUFf8Z1JIqXIE72ZoHt-HROUmwggFuRNOkRHnyy0vartGXdaEUMExEdOqoa5_3oP8Gl6qdNBbcoz1K"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline font-bold text-[14px] text-on-surface truncate">
                      ผ้าซิ่นตีนจกโบราณ ลายสิบสองหน่วยตัด
                    </h4>
                    <p className="text-[12px] text-on-surface-variant">ทอมือพิเศษโดยกลุ่มแม่บ้านนาต้นจั่น</p>
                    <span className="font-headline text-[12px] text-primary font-semibold">
                      ฿3,800 (จัดส่งสำเร็จ)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1 border-t border-surface-container/60">
                  <button
                    onClick={() => onShowToast('เพิ่ม ผ้าซิ่นตีนจกโบราณ ลงในตะกร้าแล้ว')}
                    className="h-9 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-headline text-[11px] font-semibold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px]">repeat</span>
                    <span>สั่งซื้ออีกชิ้น</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: COMMUNITY HELP & GUARANTEE BANNER */}
        <div className="bg-surface-container-high rounded-2xl p-4 flex flex-col gap-2.5 shadow-sm relative overflow-hidden border border-surface-container">
          <div className="flex items-center gap-1.5 text-primary font-headline text-[13px] font-semibold">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>มีข้อสงสัย หรือต้องการเลื่อนวันเดินทาง?</span>
          </div>
          <p className="text-[12px] text-on-surface-variant pr-6 leading-relaxed">
            ชาวบ้านและศูนย์ประสานงานโฮมสเตย์นาต้นจั่นยินดีช่วยเหลือและต้อนรับทุกท่านด้วยไมตรีจิต
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:0884957738"
              className="h-10 bg-surface-container-lowest text-on-surface rounded-xl font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:text-primary transition-colors border border-surface-container"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">phone</span>
              <span>088-495-7738</span>
            </a>
            <button
              onClick={() => copyToClipboard('@natonchan', 'LINE ID: @natonchan')}
              className="h-10 bg-surface-container-lowest text-on-surface rounded-xl font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:text-primary transition-colors border border-surface-container active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">chat</span>
              <span>LINE: @natonchan</span>
            </button>
          </div>

          {/* 100% Community Assurance */}
          <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center gap-2 text-on-surface-variant font-headline text-[11px]">
            <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            <span>รายได้ 100% กระจายสู่กลุ่มเกษตรกรและช่างทอผ้าบ้านนาต้นจั่น</span>
          </div>
        </div>
      </div>

      {/* MODAL: E-VOUCHER & CHECK-IN QR CODE */}
      {isVoucherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 flex flex-col gap-4 shadow-2xl relative border border-surface-container">
            <button
              onClick={() => setIsVoucherOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex flex-col items-center text-center gap-1 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-headline text-[11px] font-semibold">
                บัตรเข้าพักอิเล็กทรอนิกส์
              </span>
              <h3 className="font-headline font-bold text-[18px] text-on-surface">
                บ้านไม้ชายทุ่ง (เรือนป้าเสงี่ยม)
              </h3>
              <p className="text-[12px] text-on-surface-variant">
                ยื่นคิวอาร์โค้ดนี้เมื่อเดินทางถึงศูนย์ต้อนรับ
              </p>
            </div>

            {/* Stylized QR Code SVG */}
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-surface-container">
              <svg className="w-44 h-44 text-primary" fill="currentColor" viewBox="0 0 100 100">
                <rect fill="none" height="24" rx="2" stroke="currentColor" stroke-width="6" width="24" x="10" y="10" />
                <rect fill="currentColor" height="10" rx="1" width="10" x="17" y="17" />
                <rect fill="none" height="24" rx="2" stroke="currentColor" stroke-width="6" width="24" x="66" y="10" />
                <rect fill="currentColor" height="10" rx="1" width="10" x="73" y="17" />
                <rect fill="none" height="24" rx="2" stroke="currentColor" stroke-width="6" width="24" x="10" y="66" />
                <rect fill="currentColor" height="10" rx="1" width="10" x="17" y="73" />
                <rect height="6" rx="1" width="6" x="42" y="12" />
                <rect height="14" rx="1" width="6" x="52" y="12" />
                <rect height="12" rx="1" width="6" x="42" y="24" />
                <rect height="6" rx="1" width="14" x="12" y="42" />
                <rect height="6" rx="1" width="6" x="32" y="42" />
                <rect fill="#8B5A2B" height="12" rx="2" width="12" x="44" y="44" />
                <rect height="6" rx="1" width="8" x="62" y="42" />
                <rect height="6" rx="1" width="12" x="76" y="42" />
                <rect height="16" rx="1" width="6" x="42" y="62" />
                <rect height="6" rx="1" width="10" x="54" y="62" />
                <rect height="12" rx="1" width="6" x="68" y="54" />
                <rect height="24" rx="1" width="8" x="80" y="62" />
                <rect height="6" rx="1" width="18" x="54" y="74" />
                <rect height="6" rx="1" width="8" x="60" y="84" />
              </svg>
              <span className="font-mono font-bold text-on-surface font-headline text-[13px] tracking-wider">
                BTJ-2025-0891
              </span>
            </div>

            <div className="flex flex-col gap-1 text-on-surface-variant text-[12px] bg-surface-container p-3 rounded-xl border border-surface-container-high">
              <div className="flex justify-between">
                <span>ผู้เข้าพัก:</span>
                <span className="text-on-surface font-medium">คุณกัญญาณัฐ และผู้ติดตาม (2 ท่าน)</span>
              </div>
              <div className="flex justify-between">
                <span>วันที่:</span>
                <span className="text-on-surface font-medium">15 - 17 มี.ค. 2568 (3 วัน 2 คืน)</span>
              </div>
              <div className="flex justify-between">
                <span>คงเหลือชำระ:</span>
                <span className="text-tertiary font-bold">฿1,775</span>
              </div>
            </div>

            <button
              onClick={() => setIsVoucherOpen(false)}
              className="w-full h-11 bg-primary hover:bg-primary-container text-white rounded-xl font-headline text-[13px] font-semibold transition-all shadow-md"
            >
              เสร็จสิ้น
            </button>
          </div>
        </div>
      )}

      {/* MODAL: EMS TRACKING TIMELINE */}
      {isTrackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 flex flex-col gap-4 shadow-2xl relative max-h-[85vh] overflow-y-auto border border-surface-container">
            <button
              onClick={() => setIsTrackingModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex flex-col gap-0.5 pr-8">
              <span className="font-headline text-[11px] text-secondary font-semibold">
                ไปรษณีย์ไทย EMS ด่วนพิเศษ
              </span>
              <h3 className="font-headline font-bold text-[18px] text-on-surface">
                รหัสพัสดุ: ED892019482TH
              </h3>
              <p className="text-[12px] text-on-surface-variant">ปลายทาง: ลาดพร้าว กทม.</p>
            </div>

            {/* Courier Timeline List */}
            <div className="flex flex-col gap-4 pl-2 border-l-2 border-primary/30 ml-2 py-1">
              <div className="relative pl-4">
                <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/20" />
                <span className="font-headline text-[11px] text-primary font-bold">วันนี้ • 14:30 น.</span>
                <p className="font-headline font-semibold text-[13px] text-on-surface">
                  ถึงศูนย์กระจายสินค้าปลายทาง (ศป. ลาดพร้าว)
                </p>
                <span className="text-[12px] text-on-surface-variant">เตรียมการนำจ่ายโดยเจ้าหน้าที่</span>
              </div>

              <div className="relative pl-4">
                <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-surface-container-highest" />
                <span className="font-headline text-[11px] text-on-surface-variant font-medium">เมื่อวาน • 21:10 น.</span>
                <p className="font-headline font-semibold text-[13px] text-on-surface">
                  ศูนย์คัดแยกพัสดุสุโขทัย
                </p>
                <span className="text-[12px] text-on-surface-variant">ส่งต่อไปยังศูนย์กระจายปลายทาง</span>
              </div>

              <div className="relative pl-4">
                <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-surface-container-highest" />
                <span className="font-headline text-[11px] text-on-surface-variant font-medium">เมื่อวาน • 11:20 น.</span>
                <p className="font-headline font-semibold text-[13px] text-on-surface">
                  รับฝากพัสดุที่ทำการไปรษณีย์ศรีสัชนาลัย
                </p>
                <span className="text-[12px] text-on-surface-variant">จัดส่งโดยวิสาหกิจชุมชนบ้านนาต้นจั่น</span>
              </div>
            </div>

            <button
              onClick={() => setIsTrackingModalOpen(false)}
              className="w-full h-11 bg-surface-container text-on-surface rounded-xl font-headline text-[13px] font-semibold hover:bg-surface-container-high transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
