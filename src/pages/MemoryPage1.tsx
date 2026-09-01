import React from 'react';
import { PhotoFrame } from '../components/PhotoFrame';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { Camera, Sparkles, Heart } from 'lucide-react';

export const MemoryPage1: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#fffafb] via-[#fff5f8] to-[#fdf2f8]">
      {/* Top Tag & Title */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-pink-100 border border-pink-200 rounded-full text-pink-700 text-xs font-semibold uppercase tracking-wider mb-1">
          <Camera className="w-3.5 h-3.5" />
          <span>Memory Reel #01</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
          CHAPTER ONE:<br />
          <span className="text-rose-600 font-dancing text-2xl sm:text-3xl">WHERE THE MEMORIES BEGAN 📸💖</span>
        </h2>
      </div>

      {/* Center Photo Frame */}
      <div className="my-auto py-1 max-w-sm mx-auto w-full">
        <PhotoFrame
          src={BIRTHDAY_CONFIG.photos.photo1}
          alt="Where our memories began"
          caption="Every great friendship starts with a memory... and somehow ours became a whole collection of beautiful chaos! 😂💖"
          defaultMemoryTitle="The Iconic First Memory"
          defaultMemoryDesc="Replace with your photo in /assets/images/photo1.jpg"
          rotation="rotate-[-1.5deg]"
          themeColor="rose"
        />
      </div>

      {/* Bottom note */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-caveat text-pink-500 font-bold flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Click on the photo to zoom into the moment!</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-300" />
        </span>
      </div>
    </div>
  );
};
