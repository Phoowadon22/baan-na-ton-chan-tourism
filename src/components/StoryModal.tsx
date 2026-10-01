import React, { useState } from 'react';
import { COMMUNITY_IMPACT_BG, HERO_BG } from '../data/mockData';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 border border-surface-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Header Video / Visual Banner */}
          <div className="relative w-full h-56 bg-primary-container overflow-hidden">
            <img
              src={HERO_BG}
              alt="เรื่องราวบ้านนาต้นจั่น"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-black/30" />

            {/* Play Button Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-surface/90 hover:bg-surface text-primary flex items-center justify-center shadow-xl backdrop-blur-sm transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[36px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            <div className="absolute bottom-3 left-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-semibold">
                สารคดีชุมชนสุโขทัย
              </span>
              <h3 className="font-headline font-bold text-white text-[18px] mt-1 drop-shadow-sm">
                จากผืนผ้าเปื้อนโคลน สู่มรดกภูมิปัญญาระดับโลก
              </h3>
            </div>
          </div>

          {/* Story Content */}
          <div className="p-5 space-y-4 text-on-surface">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container">
              <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-[14px]">
                  จุดกำเนิด "ผ้าหมักโคลน" บ้านนาต้นจั่น
                </h4>
                <p className="text-[12px] text-on-surface-variant">
                  ค้นพบโดย ป้าจำเรียง ศิริ ปราชญ์ชาวบ้านแห่งสุโขทัย
                </p>
              </div>
            </div>

            <div className="space-y-3 text-[14px] text-on-surface-variant leading-relaxed">
              <p>
                ในอดีต ชาวบ้านสังเกตว่า ชายผ้านุ่งของชาวนาที่เดินลุยโคลนในท้องนาเป็นเวลานาน เมื่อนำกลับมาซักล้าง กลับมีเนื้อผ้าที่นิ่ม นุ่มมือ พลิ้วไหว และไม่ระคายเคืองผิว แตกต่างจากผ้าทอใหม่ทั่วไปที่มักจะแข็งกระด้าง
              </p>
              <p>
                ป้าจำเรียงจึงได้ริเริ่มทดลองนำผ้าฝ้ายทอมือไปหมักไว้ในบ่อโคลนธรรมชาติที่อุดมด้วยแร่ธาตุหมักทับถมหลายปี จนเกิดเป็นภูมิปัญญา <strong className="text-primary font-semibold">"ผ้าหมักโคลน"</strong> ที่โด่งดังไปทั่วประเทศ และได้รับรางวัลนวัตกรรมทางภูมิปัญญาระดับสากล
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden p-4 bg-primary-container text-on-primary">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(${COMMUNITY_IMPACT_BG})` }}
              />
              <div className="relative z-10 space-y-1">
                <span className="text-tertiary-fixed text-[12px] font-bold uppercase tracking-wider">
                  รางวัลแห่งความภาคภูมิใจ
                </span>
                <p className="font-headline font-bold text-[15px] text-white">
                  รางวัล PATA Gold Awards ด้านการท่องเที่ยวโดยชุมชนยอดเยี่ยม (Community-Based Tourism)
                </p>
                <p className="text-[12px] text-on-primary-container">
                  ทุกบาททุกสตางค์จากการท่องเที่ยวหมุนเวียนสู่ครอบครัวชาวบ้าน โรงเรียน และกองทุนชุมชนอย่างโปร่งใส
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-headline text-[14px] font-semibold transition-all shadow-sm"
              >
                เข้าใจแล้ว ร่วมสนับสนุนชุมชน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
