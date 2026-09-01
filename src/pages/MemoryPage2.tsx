import React from 'react';
import { PhotoFrame } from '../components/PhotoFrame';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { Laugh, Sparkles, Heart } from 'lucide-react';

export const MemoryPage2: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#fefbfb] via-[#fff3f6] to-[#fbf0f5]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-xs font-semibold uppercase tracking-wider mb-1">
          <Laugh className="w-3.5 h-3.5" />
          <span>Memory Reel #02</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
          MORE MEMORIES,<br />
          <span className="text-purple-700 font-dancing text-2xl sm:text-3xl">MORE CHAOS 🤪📸</span>
        </h2>
      </div>

      {/* Photo Frame */}
      <div className="my-auto py-1 max-w-sm mx-auto w-full">
        <PhotoFrame
          src={BIRTHDAY_CONFIG.photos.photo2}
          alt="More memories more chaos"
          caption="Some moments are too beautiful to forget... and some are too embarrassing to ever explain! 😂❤️"
          defaultMemoryTitle="Pure Unfiltered Chaos"
          defaultMemoryDesc="Replace with your photo in /assets/images/photo2.jpg"
          rotation="rotate-[1.5deg]"
          themeColor="purple"
        />
      </div>

      {/* Bottom note */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-caveat text-purple-600 font-bold flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Warning: 100% candid & hilarious moments inside!</span>
        </span>
      </div>
    </div>
  );
};
