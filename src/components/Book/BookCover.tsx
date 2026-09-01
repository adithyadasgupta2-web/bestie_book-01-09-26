import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Cake, Stars, BookOpen, Crown } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/assets';
import { soundEngine } from '../../utils/audio';

interface BookCoverProps {
  onOpenBook: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({ onOpenBook }) => {
  const handleOpenClick = () => {
    soundEngine.playSparkle();

    // Opening confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#f472b6'],
    });

    onOpenBook();
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#7a1236] via-[#9f1239] to-[#4c0519] text-white shadow-2xl border-4 border-[#fbcfe8]/40 selection:bg-pink-300 selection:text-pink-950">
      {/* Ornate Gold Border Inset */}
      <div className="absolute inset-3 sm:inset-4 border-2 border-amber-300/40 rounded-xl sm:rounded-2xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-5 border border-amber-300/20 rounded-lg sm:rounded-xl pointer-events-none" />

      {/* Decorative Gold Corner Filigrees */}
      <div className="absolute top-4 left-4 text-amber-300/80 pointer-events-none">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-4 right-4 text-amber-300/80 pointer-events-none">
        <Stars className="w-6 h-6" />
      </div>
      <div className="absolute bottom-4 left-4 text-amber-300/80 pointer-events-none">
        <Heart className="w-6 h-6 fill-amber-300/40" />
      </div>
      <div className="absolute bottom-4 right-4 text-amber-300/80 pointer-events-none">
        <Gift className="w-6 h-6" />
      </div>

      {/* Hardcover Spine Stitching Embellishment on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none" />

      {/* Header Tag / Crown */}
      <div className="text-center z-10 pt-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-200 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-inner backdrop-blur-xs">
          <Crown className="w-4 h-4 text-amber-300" />
          <span>The Birthday Edition</span>
        </div>
      </div>

      {/* Main Cover Title & Elements */}
      <div className="my-auto text-center z-10 py-2 max-w-lg mx-auto">
        <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-100 to-rose-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] leading-tight tracking-tight">
          HAPPY BIRTHDAY<br />
          <span className="font-dancing text-4xl sm:text-6xl lg:text-7xl text-yellow-300 block mt-1">
            {BIRTHDAY_CONFIG.bestieName.toUpperCase()}! 🎂💖
          </span>
        </h1>

        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto my-3 sm:my-4 rounded-full" />

        <p className="font-caveat text-xl sm:text-2xl lg:text-3xl text-pink-100 font-medium leading-relaxed drop-shadow-sm max-w-md mx-auto">
          A little book filled with memories, laughter, love and surprises...<br />
          <span className="text-amber-200 font-bold">Made especially for YOU ✨</span>
        </p>

        {/* Floating Icons Array */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 text-2xl sm:text-3xl select-none">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎂</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎈</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>❤️</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>✨</span>
          <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎁</span>
          <span className="animate-bounce" style={{ animationDelay: '1s' }}>⭐</span>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="text-center z-10 pb-2">
        <button
          id="open-birthday-book-button"
          onClick={handleOpenClick}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-400 hover:from-yellow-200 hover:to-rose-300 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(251,191,36,0.7)] hover:shadow-[0_0_40px_rgba(251,191,36,1)] transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span>OPEN YOUR BIRTHDAY BOOK 📖✨</span>
          <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
        </button>

        <p className="text-[11px] text-pink-300/80 font-sans mt-3">
          Touch or click to open your magical storybook
        </p>
      </div>
    </div>
  );
};
