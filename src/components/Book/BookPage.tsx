import React from 'react';
import { Bookmark, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/assets';

interface BookPageProps {
  children: React.ReactNode;
  pageNumber: number;
  totalPages: number;
  isLeftPage?: boolean;
}

export const BookPage: React.FC<BookPageProps> = ({
  children,
  pageNumber,
  totalPages,
  isLeftPage = false,
}) => {
  return (
    <div
      className={`relative w-full h-full bg-[#fffefb] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between select-text shadow-inner ${
        isLeftPage ? 'page-shadow-left border-r border-pink-200/60' : 'page-shadow-right border-l border-pink-200/60'
      }`}
    >
      {/* Decorative Book Paper Edge Lines */}
      <div
        className={`absolute top-0 bottom-0 ${
          isLeftPage ? 'left-0 w-2.5 bg-gradient-to-r from-pink-300/30 via-pink-200/10 to-transparent' : 'right-0 w-2.5 bg-gradient-to-l from-pink-300/30 via-pink-200/10 to-transparent'
        } pointer-events-none z-20`}
      />

      {/* Realistic Book Spine Center Crease */}
      <div
        className={`absolute top-0 bottom-0 ${
          isLeftPage ? 'right-0 w-4 bg-gradient-to-l from-black/10 via-black/5 to-transparent' : 'left-0 w-4 bg-gradient-to-r from-black/10 via-black/5 to-transparent'
        } pointer-events-none z-20`}
      />

      {/* Decorative Top Header Banner */}
      <div className="px-5 pt-2 flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-pink-400/90 border-b border-pink-100/70 select-none z-10">
        <div className="flex items-center gap-1">
          <Heart className="w-2.5 h-2.5 fill-pink-300 text-pink-400" />
          <span>{BIRTHDAY_CONFIG.websiteTitle}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span>{BIRTHDAY_CONFIG.bestieName}&apos;s Special Book</span>
        </div>
      </div>

      {/* Page Content Container */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">
        {children}
      </div>

      {/* Page Footer with Page Number */}
      <div className="px-5 pb-2 pt-1 flex items-center justify-between text-[11px] font-sans text-slate-400 border-t border-pink-100/70 select-none z-10 bg-white/60 backdrop-blur-2xs">
        <span className="font-caveat text-xs font-bold text-pink-500">
          Best Friends Forever 💕
        </span>
        <span className="font-mono text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-pink-50 border border-pink-100">
          Page {pageNumber} of {totalPages}
        </span>
      </div>
    </div>
  );
};
