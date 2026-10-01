import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    guests: '2',
    question: '',
  });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleReset = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={handleReset}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 border border-surface-container">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="p-5 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant shrink-0">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface">
                ติดต่อศูนย์ประสานงานโฮมสเตย์
              </h3>
              <p className="text-[12px] text-on-surface-variant">
                กลุ่มท่องเที่ยวชุมชนบ้านนาต้นจั่น สุโขทัย
              </p>
            </div>
          </div>

          {isSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-primary-fixed text-primary-container mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
              </div>
              <h4 className="font-headline font-bold text-[18px] text-on-surface">
                ส่งข้อความสำเร็จแล้ว!
              </h4>
              <p className="text-[13px] text-on-surface-variant max-w-xs mx-auto">
                เจ้าหน้าที่ศูนย์ประสานงานบ้านนาต้นจั่นจะติดต่อกลับท่านทางเบอร์โทรศัพท์หรือ LINE โดยเร็วที่สุด
              </p>
              <button
                onClick={handleReset}
                className="w-full py-2.5 mt-4 rounded-xl bg-primary text-white font-headline text-[14px] font-semibold"
              >
                ตกลง
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Quick direct contacts */}
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <a
                  href="tel:0884957738"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-container text-primary font-semibold hover:bg-primary-fixed/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>โทร: 088-495-7738</span>
                </a>
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-container text-[#06C755] font-semibold hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>LINE: @natonchan</span>
                </a>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-on-surface mb-1">
                  ชื่อผู้ติดต่อ *
                </label>
                <input
                  required
                  type="text"
                  placeholder="เช่น คุณวิชัย"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-[13px] text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[13px] font-medium text-on-surface mb-1">
                    เบอร์โทรติดต่อ *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="08X-XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-[13px] text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-on-surface mb-1">
                    วันที่เดินทางคาดการณ์
                  </label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full h-10 px-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-[12px] text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-on-surface mb-1">
                  สอบถามเพิ่มเติม / ความต้องการพิเศษ
                </label>
                <textarea
                  rows={3}
                  placeholder="เช่น ต้องการบ้านพักวิวทุ่งนาสำหรับ 4 คน, สนใจเวิร์กช็อปทอผ้าหมักโคลน..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-[13px] text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary-container text-white font-headline font-semibold text-[14px] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>ส่งข้อความถึงศูนย์ประสานงาน</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
