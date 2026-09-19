import React from 'react';
import { PhotoFrame } from '../components/PhotoFrame';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { HeartHandshake, Sparkles, Heart } from 'lucide-react';

export const MemoryPage4: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#fffafd] via-[#fef2f6] to-[#fcf0f8]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-rose-100 border border-rose-200 rounded-full text-rose-700 text-xs font-semibold uppercase tracking-wider mb-1">
          <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
          <span>Memory Reel #04</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
         What do i like most about you? ..<br />
          <span className="text-rose-600 font-dancing text-2xl sm:text-3xl">Hmm....that's a great question 🤔</span>
        </h2>
      </div>

      {/* Photo Frame */}
      <div className="my-auto py-1 max-w-sm mx-auto w-full">
        <PhotoFrame
          src={BIRTHDAY_CONFIG.photos.photo4}
          alt="And the story continues"
          caption="your smile ofc 🫠🫠"
          defaultMemoryTitle="To Infinite Tomorrow Adventures"
          defaultMemoryDesc="Replace with your photo in /assets/images/photo4.jpg"
          rotation="rotate-[1deg]"
          themeColor="rose"
        />
      </div>

      {/* Bottom note */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-caveat text-rose-600 font-bold flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>The best chapters of our story are still being written! ✨</span>
        </span>
      </div>
    </div>
  );
};
