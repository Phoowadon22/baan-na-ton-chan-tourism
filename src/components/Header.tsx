import React from 'react';
import { APP_LOGO } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onSelectTab,
}) => {
  const getSubTitle = (tab: TabType) => {
    switch (tab) {
      case 'home':
        return 'Home';
      case 'homestay':
        return 'Homestay';
      case 'products':
        return 'Products';
      case 'food':
        return 'Local Cuisine';
      case 'profile':
        return 'Tracking And Profile';
      default:
        return 'Home';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/60">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand identity */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 min-w-0 flex-1 text-left group"
        >
          <img
            alt="โลโก้บ้านนาต้นจั่น สุโขทัย"
            className="h-8 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
            src={APP_LOGO}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-[17px] font-bold text-primary-container truncate leading-tight tracking-tight">
              บ้านนาต้นจั่น สุโขทัย
            </span>
            <span className="text-[12px] text-on-surface-variant font-medium truncate">
              {getSubTitle(currentTab)}
            </span>
          </div>
        </button>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-tertiary text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            ) : (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary-container"></span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            aria-label="Notifications"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            aria-label="User Profile"
            className={`w-8 h-8 rounded-full flex items-center justify-center ml-1 shrink-0 transition-transform active:scale-95 shadow-sm ${
              currentTab === 'profile'
                ? 'bg-primary ring-2 ring-primary-fixed ring-offset-1'
                : 'bg-primary hover:bg-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
