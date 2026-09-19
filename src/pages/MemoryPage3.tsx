import React from 'react';
import { PhotoFrame } from '../components/PhotoFrame';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { Stars, Sparkles, Heart } from 'lucide-react';

export const MemoryPage3: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#fffdfa] via-[#fff5f9] to-[#f8effb]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 border border-amber-200 rounded-full text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
          <Stars className="w-3.5 h-3.5 text-amber-600" />
          <span>Memory Reel #03</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
          THE GOOD OLD DAYS<br />
          <span className="text-amber-700 font-dancing text-2xl sm:text-3xl">my fav photo of u ✨📸</span>
        </h2>
      </div>

      {/* Photo Frame */}
      <div className="my-auto py-1 max-w-sm mx-auto w-full">
        <PhotoFrame
          src={BIRTHDAY_CONFIG.photos.photo3}
          alt="The good old days"
          caption="Who is this gurl🥺....Ofc it's my bestie😎😌💖"
          defaultMemoryTitle="Adventures & Fun Days"
          defaultMemoryDesc="Replace with your photo in /assets/images/photo3.jpg"
          rotation="rotate-[-1deg]"
          themeColor="gold"
        />
      </div>

      {/* Bottom note */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-caveat text-amber-700 font-bold flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-300" />
          <span>just look at the Cutie🥹👉👈</span>
        </span>
      </div>
    </div>
  );
};
