/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { HomestayDetailModal } from './components/HomestayDetailModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { StoryModal } from './components/StoryModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { HomeView } from './views/HomeView';
import { HomestayView } from './views/HomestayView';
import { ProductsView } from './views/ProductsView';
import { FoodView } from './views/FoodView';
import { TrackingProfileView } from './views/TrackingProfileView';
import { TabType, Homestay, Product, FoodItem, CartItem, BookingRecord } from './types';
import { HOMESTAYS, PRODUCTS } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 item as shown with the dot in the initial mockup
    { product: PRODUCTS[2], quantity: 1 },
  ]);
  const [favorites, setFavorites] = useState<string[]>(['hs-1', 'p-1']);
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'BK-10824',
      homestay: HOMESTAYS[0],
      checkIn: '2026-03-15',
      checkOut: '2026-03-17',
      guests: 2,
      totalPrice: 2400,
      status: 'confirmed',
      bookerName: 'คุณผู้เข้าพัก',
      bookerPhone: '081-234-5678',
      notes: 'ขอเตียงคู่และมื้อค่ำขันโตก',
    },
  ]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Floating Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('เพิ่มสินค้าลงในตะกร้าแล้ว');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorite toggle
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Booking confirm
  const handleConfirmBooking = (newRecord: BookingRecord) => {
    setBookings((prev) => [newRecord, ...prev]);
    showToast('จองโฮมสเตย์เรียบร้อยแล้ว!');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-16 pb-24 bg-surface min-h-[calc(100vh-64px)]">
        {currentTab === 'home' && (
          <HomeView
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onSelectHomestay={(homestay) => setSelectedHomestay(homestay)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenStory={() => setIsStoryOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentTab === 'homestay' && (
          <HomestayView
            onSelectHomestay={(homestay) => setSelectedHomestay(homestay)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentTab === 'products' && (
          <ProductsView
            onSelectProduct={(product) => setSelectedProduct(product)}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentTab === 'food' && (
          <FoodView
            onAddToCart={handleAddToCart}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <TrackingProfileView
            onShowToast={showToast}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Homestay Detail Modal */}
      <HomestayDetailModal
        homestay={selectedHomestay}
        isOpen={!!selectedHomestay}
        onClose={() => setSelectedHomestay(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Story Video & History Modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectHomestay={(homestay) => setSelectedHomestay(homestay)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectFood={(food: FoodItem) => {
          setCurrentTab('food');
        }}
      />

      {/* Contact Coordination Center Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Toast Notification matching Image 3 HTML */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-inverse-surface text-inverse-on-surface rounded-full shadow-xl flex items-center gap-2 font-headline text-[13px] pointer-events-none transition-all duration-300 ${
          toastMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <span className="material-symbols-outlined text-primary-fixed text-[18px]">
          check_circle
        </span>
        <span>{toastMessage || 'เพิ่มสินค้าลงในตะกร้าแล้ว'}</span>
      </div>
    </div>
  );
}
