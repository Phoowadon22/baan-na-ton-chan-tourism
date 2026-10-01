import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'homestay' | 'shipping'>('homestay');
  const [homestayRoom, setHomestayRoom] = useState('โฮมสเตย์บ้านตลิ่งชัน');
  const [shippingAddress, setShippingAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = deliveryType === 'homestay' ? 0 : subtotal > 500 ? 0 : 50;
  const grandTotal = subtotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      // after showing confirmation
    }, 500);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="h-16 px-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[24px]">
              shopping_bag
            </span>
            <h2 className="font-headline font-bold text-on-surface text-[17px]">
              ตะกร้าสินค้าชุมชน
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[12px] font-semibold">
              {items.reduce((acc, cur) => acc + cur.quantity, 0)} ชิ้น
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        {orderComplete ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="font-headline font-bold text-[20px] text-on-surface">
              สั่งซื้อสำเร็จแล้ว!
            </h3>
            <p className="text-on-surface-variant text-[14px] mt-1 mb-6 max-w-xs">
              คำสั่งซื้อของคุณถูกส่งตรงไปยังกลุ่มวิสาหกิจชุมชนบ้านนาต้นจั่นแล้ว ขอขอบพระคุณที่สนับสนุนชาวบ้าน
            </p>
            <div className="w-full bg-surface-container-low rounded-xl p-4 text-left text-[13px] mb-6 space-y-2 border border-surface-container">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">รหัสสั่งซื้อ:</span>
                <span className="font-semibold text-on-surface">NTC-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">ผู้รับ:</span>
                <span className="font-semibold text-on-surface">{customerName || 'ผู้มาเยือนคนสำคัญ'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">การจัดส่ง:</span>
                <span className="font-semibold text-on-surface">
                  {deliveryType === 'homestay' ? `ส่งที่ ${homestayRoom}` : 'พัสดุด่วนถึงบ้าน'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-outline-variant/30">
                <span className="font-bold text-on-surface">ยอดชำระรวม:</span>
                <span className="font-bold text-primary text-[15px]">฿{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3 bg-primary hover:bg-primary-container text-white font-headline font-semibold rounded-xl transition-all shadow-md"
            >
              เสร็จสิ้น
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
              <span className="material-symbols-outlined text-[40px]">remove_shopping_cart</span>
            </div>
            <h3 className="font-headline font-bold text-on-surface text-[18px]">
              ยังไม่มีสินค้าในตะกร้า
            </h3>
            <p className="text-on-surface-variant text-[14px] mt-1 max-w-xs">
              เลือกซื้อผ้าหมักโคลน ข้าวอินทรีย์ หรือของฝากชุมชนเพื่อสนับสนุนรายได้ชาวบ้านนาต้นจั่น
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-white font-headline text-[14px] font-semibold hover:bg-primary-container transition-all"
            >
              เลือกดูสินค้าชุมชน
            </button>
          </div>
        ) : isCheckingOut ? (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <h3 className="font-headline font-bold text-on-surface text-[16px]">
                กรอกข้อมูลการจัดส่งและชำระเงิน
              </h3>
            </div>

            {/* Delivery option */}
            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container space-y-2">
              <label className="text-[13px] font-semibold text-on-surface">เลือกรูปแบบการจัดส่ง</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('homestay')}
                  className={`p-2.5 rounded-lg border text-left text-[13px] transition-all ${
                    deliveryType === 'homestay'
                      ? 'border-primary bg-primary-fixed/30 text-on-surface font-semibold'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[18px] text-primary">cottage</span>
                    <span>ส่งที่โฮมสเตย์</span>
                  </div>
                  <span className="text-[11px] text-primary block">ฟรีค่าส่งในหมู่บ้าน</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('shipping')}
                  className={`p-2.5 rounded-lg border text-left text-[13px] transition-all ${
                    deliveryType === 'shipping'
                      ? 'border-primary bg-primary-fixed/30 text-on-surface font-semibold'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
                    <span>ส่งพัสดุถึงบ้าน</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant block">
                    {subtotal > 500 ? 'ฟรี (ยอดเกิน ฿500)' : '฿50 ทั่วประเทศ'}
                  </span>
                </button>
              </div>
            </div>

            {/* Customer info */}
            <div className="space-y-3">
              <div>
                <label className="block text-[13px] font-medium text-on-surface mb-1">
                  ชื่อ-นามสกุล ผู้รับ *
                </label>
                <input
                  required
                  type="text"
                  placeholder="เช่น สมศักดิ์ ใจดี"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-on-surface mb-1">
                  เบอร์โทรศัพท์ติดต่อ *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="08X-XXX-XXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              {deliveryType === 'homestay' ? (
                <div>
                  <label className="block text-[13px] font-medium text-on-surface mb-1">
                    ชื่อโฮมสเตย์ / หมายเลขห้องที่พัก
                  </label>
                  <input
                    type="text"
                    value={homestayRoom}
                    onChange={(e) => setHomestayRoom(e.target.value)}
                    placeholder="เช่น โฮมสเตย์บ้านตลิ่งชัน ห้อง 2"
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[13px] font-medium text-on-surface mb-1">
                    ที่อยู่จัดส่งพัสดุ *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="เลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
                    className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

            {/* Payment method */}
            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container space-y-2">
              <span className="text-[13px] font-semibold text-on-surface block">
                วิธีชำระเงิน
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[13px] cursor-pointer text-on-surface">
                  <input type="radio" name="payment" defaultChecked className="accent-primary" />
                  <span>สแกน QR พร้อมเพย์ชุมชน (ไม่เสียค่าธรรมเนียม)</span>
                </label>
                <label className="flex items-center gap-2 text-[13px] cursor-pointer text-on-surface">
                  <input type="radio" name="payment" className="accent-primary" />
                  <span>ชำระเงินสดปลายทาง / เมื่อเช็คอินโฮมสเตย์</span>
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-auto pt-3 border-t border-surface-container space-y-1 text-[13px]">
              <div className="flex justify-between text-on-surface-variant">
                <span>ยอดรวมสินค้า:</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>ค่าจัดส่ง:</span>
                <span>{shippingFee === 0 ? 'ฟรี' : `฿${shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-on-surface text-[15px] pt-1">
                <span>ยอดชำระสุทธิ:</span>
                <span className="text-primary">฿{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary-container text-white font-headline font-semibold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>ยืนยันการสั่งซื้อสินค้า</span>
            </button>
          </form>
        ) : (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-surface-container-low rounded-xl p-3 flex gap-3 border border-surface-container"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0 bg-surface-container"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[11px] text-secondary font-medium truncate">
                        {product.craftHeritage}
                      </span>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-outline hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <h4 className="font-headline font-semibold text-[14px] text-on-surface truncate">
                      {product.name}
                    </h4>
                    <span className="text-primary font-bold text-[14px] mt-0.5">
                      ฿{product.price.toLocaleString()}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <span className="text-[11px] text-on-surface-variant">จำนวน</span>
                      <div className="flex items-center gap-2 bg-surface-container-lowest rounded-lg border border-surface-container px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:text-primary active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="font-semibold text-[13px] min-w-[16px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:text-primary active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom calculation & checkout */}
            <div className="p-4 bg-surface-container-low border-t border-surface-container space-y-3">
              <div className="space-y-1 text-[13px]">
                <div className="flex justify-between text-on-surface-variant">
                  <span>ยอดรวมสินค้า ({items.reduce((a, b) => a + b.quantity, 0)} ชิ้น):</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>จัดส่งในชุมชน:</span>
                  <span className="text-primary font-medium">ฟรี</span>
                </div>
                <div className="flex justify-between font-bold text-[16px] text-on-surface pt-1 border-t border-surface-container">
                  <span>ยอดสุทธิ:</span>
                  <span className="text-primary">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClearCart}
                  className="px-3 h-11 rounded-xl border border-outline-variant text-outline hover:text-on-surface text-[13px] font-medium"
                >
                  ล้างตะกร้า
                </button>
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="flex-1 h-11 bg-primary hover:bg-primary-container text-white font-headline font-semibold text-[14px] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
                >
                  <span>ดำเนินการสั่งซื้อ</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 justify-center text-[11px] text-outline">
                <span className="material-symbols-outlined text-[14px] text-primary">eco</span>
                <span>รายได้ทั้งหมดส่งตรงถึงกลุ่มแม่บ้านและช่างทอผ้า</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
