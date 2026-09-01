import React from 'react';
import { Sparkles, Heart, Gift, PartyPopper, Stars } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';

interface WelcomePageProps {
  onNextPage?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = () => {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-7 relative overflow-hidden bg-gradient-to-b from-[#fffdfa] via-[#fff5f7] to-[#fdf2f8]">
      {/* Decorative corner borders & flourishes */}
      <div className="absolute top-2 left-2 text-pink-300 pointer-events-none opacity-60">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute top-2 right-2 text-rose-300 pointer-events-none opacity-60">
        <Heart className="w-5 h-5 fill-rose-200" />
      </div>
      <div className="absolute bottom-2 left-2 text-purple-300 pointer-events-none opacity-60">
        <Stars className="w-5 h-5" />
      </div>
      <div className="absolute bottom-2 right-2 text-pink-300 pointer-events-none opacity-60">
        <Gift className="w-5 h-5" />
      </div>

      {/* Header section */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/70 border border-pink-200/80 rounded-full text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
          <PartyPopper className="w-3.5 h-3.5 text-pink-500 animate-bounce" />
          <span>Chapter I • The Beginning</span>
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
          WELCOME, <span className="text-rose-600 font-dancing text-3xl sm:text-4xl block sm:inline">{BIRTHDAY_CONFIG.bestieName}!</span> 🎉💖
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-pink-300 via-rose-400 to-purple-300 mx-auto mt-2 rounded-full" />
      </div>

      {/* Letter Body in Handwritten Style */}
      <div className="my-auto py-3 px-2 text-center max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-pink-200/80 shadow-md relative group hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[11px] px-3 py-0.5 rounded-full font-medium shadow-xs flex items-center gap-1">
            <Heart className="w-3 h-3 fill-current" />
            <span>Special Dedication</span>
          </div>

          <p className="font-caveat text-xl sm:text-2xl text-slate-800 leading-relaxed tracking-wide font-semibold mt-1">
            Today is officially <span className="text-rose-600 underline decoration-pink-300 decoration-wavy">YOUR</span> day!
          </p>

          <div className="my-3 space-y-1.5 font-caveat text-lg sm:text-xl text-slate-700 font-medium">
            <p>So get ready for some precious memories,</p>
            <p className="text-purple-700">some unstoppable laughter,</p>
            <p className="text-pink-600">some deeply emotional moments,</p>
            <p className="font-bold text-rose-600 text-xl sm:text-2xl pt-1">
              and of course... LOTS AND LOTS OF LOVE! 🥹💖
            </p>
          </div>

          <div className="pt-2 border-t border-pink-100 mt-3">
            <p className="font-dancing text-lg sm:text-xl text-purple-800 font-bold">
              Turn the page and let the surprises begin... ✨
            </p>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center pb-1">
        <p className="font-sans text-[11px] text-pink-400 font-medium flex items-center justify-center gap-1">
          <span>✨ Flip forward to start your journey</span>
        </p>
      </div>
    </div>
  );
};
