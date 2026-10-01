import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'หน้าแรก', icon: 'cottage' },
    { id: 'homestay', label: 'ที่พัก', icon: 'holiday_village' },
    { id: 'products', label: 'สินค้า', icon: 'storefront' },
    { id: 'food', label: 'อาหาร', icon: 'restaurant' },
    { id: 'profile', label: 'ติดตาม/โปรไฟล์', icon: 'person_pin_circle' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(47,93,58,0.06)] border-t border-surface-container/60">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 py-1 transition-all relative ${
                isActive
                  ? 'text-primary-container font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative flex items-center justify-center w-12 h-7 mb-0.5">
                <span
                  className={`absolute inset-0 rounded-full transition-transform duration-200 ${
                    isActive ? 'scale-100 bg-primary-fixed' : 'scale-0'
                  }`}
                />
                <span
                  className={`material-symbols-outlined relative z-10 text-[22px] transition-colors ${
                    isActive ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'
                  }`}
                >
                  {item.icon}
                </span>
              </div>
              <span className="font-headline text-[11px] font-semibold tracking-tight leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
