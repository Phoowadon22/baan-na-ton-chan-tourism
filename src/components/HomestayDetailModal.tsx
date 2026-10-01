import React, { useState } from 'react';
import { Homestay, BookingRecord } from '../types';

interface HomestayDetailModalProps {
  homestay: Homestay | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (record: BookingRecord) => void;
}

export const HomestayDetailModal: React.FC<HomestayDetailModalProps> = ({
  homestay,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);
  const [checkInDate, setCheckInDate] = useState('2026-03-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-03-16');
  const [includeMeals, setIncludeMeals] = useState(true);
  const [bookerName, setBookerName] = useState('');
  const [bookerPhone, setBookerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen || !homestay) return null;

  const basePricePerPerson = homestay.price;
  // If price unit is "หลัง / คืน", price is flat; if "ท่าน / คืน", multiply by guests
  const isPerHouse = homestay.priceUnit.includes('หลัง');
  const totalPrice = isPerHouse
    ? basePricePerPerson * nights
    : basePricePerPerson * guests * nights;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: BookingRecord = {
      id: `BK-${Date.now()}`,
      homestay,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: 'confirmed',
      bookerName: bookerName || 'คุณผู้เข้าพัก',
      bookerPhone: bookerPhone || '081-234-5678',
      notes,
    };
    onConfirmBooking(newRecord);
    setIsBooked(true);
  };

  const handleClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 border border-surface-container">
        {/* Close Button Floating */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {isBooked ? (
          <div className="p-6 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="font-headline font-bold text-[20px] text-on-surface">
              จองโฮมสเตย์สำเร็จแล้ว!
            </h3>
            <p className="text-on-surface-variant text-[14px] mt-1 mb-4">
              คุณได้ทำการจอง <span className="font-semibold text-primary">{homestay.name}</span> เรียบร้อยแล้ว
            </p>

            <div className="w-full bg-surface-container-low rounded-xl p-4 text-left text-[13px] space-y-2 mb-6 border border-surface-container">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">เจ้าบ้านผู้ดูแล:</span>
                <span className="font-semibold text-on-surface">{homestay.hostName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">วันที่เข้าพัก:</span>
                <span className="font-semibold text-on-surface">{checkInDate} ถึง {checkOutDate} ({nights} คืน)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">จำนวนผู้เข้าพัก:</span>
                <span className="font-semibold text-on-surface">{guests} ท่าน</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">อาหาร:</span>
                <span className="font-semibold text-primary">{homestay.mealsIncluded}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-outline-variant/30 text-[15px] font-bold">
                <span>ยอดชำระเมื่อเช็คอิน:</span>
                <span className="text-primary">฿{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[12px] text-outline mb-6">
              * ข้อมูลการจองถูกบันทึกไว้ในแท็บ "โปรไฟล์" สามารถเปิดแสดงต่อเจ้าบ้านเมื่อเดินทางถึง
            </p>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-primary hover:bg-primary-container text-white font-headline font-semibold rounded-xl shadow-md transition-all"
            >
              ตกลง และปิดหน้านี้
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Hero Image */}
            <div className="relative w-full h-56 bg-surface-container">
              <img
                src={homestay.detailImage || homestay.image}
                alt={homestay.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Host tag on bottom left */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined text-[16px]">face</span>
                </div>
                <span className="text-white text-[13px] font-medium drop-shadow-sm">
                  ดูแลโดย {homestay.hostName}
                </span>
              </div>

              {/* Badge */}
              {homestay.badge && (
                <div className="absolute top-3 left-3 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1 shadow-md">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                  <span>{homestay.badge}</span>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-headline font-bold text-[20px] text-on-surface">
                    {homestay.name}
                  </h2>
                  <div className="flex items-center gap-1 text-tertiary text-[14px] font-bold">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>{homestay.rating}</span>
                    <span className="text-on-surface-variant text-[12px] font-normal">
                      ({homestay.reviewCount} รีวิว)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-outline text-[13px] mt-1">
                  <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
                  <span>{homestay.villageLocation}</span>
                </div>
              </div>

              {/* Amenity pills */}
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container font-headline text-[12px] text-on-surface">
                  <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                  <span>รองรับ {homestay.capacity}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container font-headline text-[12px] text-on-surface">
                  <span className="material-symbols-outlined text-[14px] text-primary">bed</span>
                  <span>{homestay.bedType}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant font-headline text-[12px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">restaurant</span>
                  <span>{homestay.mealsIncluded}</span>
                </span>
              </div>

              {/* Description */}
              <div className="bg-surface-container-low rounded-xl p-3.5 border border-surface-container">
                <h4 className="font-headline font-bold text-[14px] text-on-surface mb-1">
                  เกี่ยวกับที่พัก
                </h4>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  {homestay.description}
                </p>
              </div>

              {/* Highlight activities */}
              <div>
                <h4 className="font-headline font-bold text-[14px] text-on-surface mb-2">
                  กิจกรรมและสิทธิพิเศษเมื่อเข้าพัก
                </h4>
                <ul className="space-y-1.5 text-[13px] text-on-surface-variant">
                  {homestay.highlightFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Form Widget */}
              <form onSubmit={handleBookingSubmit} className="bg-surface-container-low rounded-2xl p-4 border border-primary-fixed/40 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-outline">ราคาเริ่มต้น</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline font-bold text-[20px] text-primary">
                        ฿{basePricePerPerson.toLocaleString()}
                      </span>
                      <span className="text-[12px] text-on-surface-variant">
                        / {homestay.priceUnit}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-outline">ยอดรวมประมาณการ</span>
                    <div className="font-headline font-bold text-[18px] text-tertiary">
                      ฿{totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-2 text-[13px]">
                  <div>
                    <label className="block text-outline text-[11px] mb-1">วันที่เช็คอิน</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-outline text-[11px] mb-1">วันที่เช็คเอาท์</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px]">
                  <div>
                    <label className="block text-outline text-[11px] mb-1">จำนวนคืน</label>
                    <select
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px]"
                    >
                      <option value={1}>1 คืน</option>
                      <option value={2}>2 คืน</option>
                      <option value={3}>3 คืน</option>
                      <option value={4}>4 คืน</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-outline text-[11px] mb-1">จำนวนผู้เข้าพัก</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px]"
                    >
                      <option value={1}>1 ท่าน</option>
                      <option value={2}>2 ท่าน</option>
                      <option value={3}>3 ท่าน</option>
                      <option value={4}>4 ท่าน</option>
                      <option value={5}>5 ท่านขึ้นไป</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px]">
                  <div>
                    <label className="block text-outline text-[11px] mb-1">ชื่อผู้ติดต่อ *</label>
                    <input
                      type="text"
                      placeholder="เช่น สมพร"
                      value={bookerName}
                      onChange={(e) => setBookerName(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-outline text-[11px] mb-1">เบอร์โทรศัพท์ *</label>
                    <input
                      type="tel"
                      placeholder="08X-XXX-XXXX"
                      value={bookerPhone}
                      onChange={(e) => setBookerPhone(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary-container text-white font-headline font-semibold text-[14px] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">bed</span>
                  <span>ยืนยันการจองที่พักนี้ (฿{totalPrice.toLocaleString()})</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
