import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 border border-surface-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Image */}
          <div className="relative w-full h-64 bg-surface-container">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-tertiary text-on-tertiary px-2.5 py-1 rounded-full text-[12px] font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>{product.badge}</span>
              </span>
            )}
            <div className="absolute bottom-3 left-3 bg-primary/90 text-white px-2 py-0.5 rounded-md text-[12px] flex items-center gap-1 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[13px] text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span>{product.rating}</span>
              <span className="opacity-80">({product.reviewCount || 30} รีวิว)</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-5 space-y-4">
            <div>
              <span className="text-[12px] font-semibold text-secondary block">
                {product.craftHeritage}
              </span>
              <h2 className="font-headline font-bold text-[20px] text-on-surface mt-0.5">
                {product.name}
              </h2>
              <div className="font-headline font-bold text-[24px] text-primary mt-1">
                ฿{product.price.toLocaleString()}
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2 border border-surface-container text-[13px]">
              <div>
                <span className="font-semibold text-on-surface block mb-0.5">เรื่องราวและภูมิปัญญา:</span>
                <p className="text-on-surface-variant leading-relaxed">{product.description}</p>
              </div>
              <div className="pt-2 border-t border-surface-container">
                <span className="font-semibold text-on-surface block mb-0.5">กลุ่มช่างฝีมือ:</span>
                <p className="text-primary font-medium">{product.artisanInfo}</p>
              </div>
              <div className="pt-2 border-t border-surface-container">
                <span className="font-semibold text-on-surface block mb-0.5">วัสดุ / ส่วนประกอบ:</span>
                <p className="text-on-surface-variant">{product.material}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-[14px] text-on-surface">จำนวนที่ต้องการ</span>
              <div className="flex items-center gap-3 bg-surface-container-low rounded-xl border border-surface-container px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface hover:text-primary active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="font-bold text-[15px] min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface hover:text-primary active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>

            {/* Total & Action */}
            <div className="pt-3 border-t border-surface-container flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] text-outline">ยอดรวม</span>
                <span className="font-headline font-bold text-[18px] text-primary">
                  ฿{(product.price * quantity).toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 h-11 bg-primary hover:bg-primary-container text-white font-headline font-semibold text-[14px] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>เพิ่มลงตะกร้า</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
