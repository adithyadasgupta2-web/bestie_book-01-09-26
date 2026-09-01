import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Wind, RotateCcw, Heart, Stars } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const WishPage: React.FC = () => {
  const [isBlown, setIsBlown] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  const handleBlowCandles = () => {
    if (isBlown) return;

    soundEngine.playCandleBlow();
    setIsBlown(true);
    setWishCount((prev) => prev + 1);

    // Confetti shower
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#f43f5e', '#ec4899', '#38bdf8', '#c084fc'],
    });
  };

  const handleRelight = () => {
    soundEngine.playSparkle();
    setIsBlown(false);
  };

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#fffcfb] via-[#fff3f7] to-[#faeff8]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 border border-amber-200 rounded-full text-amber-800 text-[11px] font-semibold uppercase tracking-wider mb-1">
          <Stars className="w-3 h-3 text-amber-600" />
          <span>Magical Birthday Ritual</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
          MAKE A WISH... 🌟🎂
        </h2>
        <p className="font-caveat text-sm sm:text-base text-pink-600 font-semibold mt-0.5">
          Close your eyes, make the biggest wish for your year ahead...
        </p>
      </div>

      {/* Interactive Birthday Cake Illustration */}
      <div className="my-auto py-2 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        {/* Cake Container */}
        <div className="relative flex flex-col items-center">
          {/* Candles */}
          <div className="flex gap-4 sm:gap-6 mb-1 z-20">
            {[1, 2, 3].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center relative">
                {/* Flame / Smoke */}
                {!isBlown ? (
                  <div className="relative flex flex-col items-center">
                    <div className="w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.9)] transform -translate-y-1 scale-110" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full blur-[1px] absolute top-1" />
                  </div>
                ) : (
                  <div className="h-5 flex items-center justify-center">
                    <div className="w-1 h-4 bg-slate-400/60 rounded-full animate-ping opacity-60" />
                    <span className="text-[10px] text-slate-400 absolute -top-2 animate-bounce">💨</span>
                  </div>
                )}
                {/* Candle stick with stripes */}
                <div
                  className="w-3 h-9 rounded-t-xs shadow-xs"
                  style={{
                    backgroundImage: candleIndex % 2 === 0
                      ? 'repeating-linear-gradient(45deg, #f472b6, #f472b6 3px, #ffffff 3px, #ffffff 6px)'
                      : 'repeating-linear-gradient(45deg, #c084fc, #c084fc 3px, #ffffff 3px, #ffffff 6px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top Tier Cake */}
          <div className="w-36 sm:w-44 h-12 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-2xl relative shadow-md border-t-2 border-white flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 flex justify-between px-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white/90 rounded-b-full shadow-2xs" />
              ))}
            </div>
            {/* Decorative strawberry or heart */}
            <span className="text-sm select-none z-10">🍓 💖 🍓</span>
          </div>

          {/* Bottom Tier Cake */}
          <div className="w-48 sm:w-56 h-14 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 rounded-b-xl relative shadow-lg border-t-2 border-pink-100 flex items-center justify-around overflow-hidden">
            <div className="absolute top-0 inset-x-0 flex justify-between px-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-3.5 bg-white/90 rounded-b-full shadow-2xs" />
              ))}
            </div>
            <span className="text-xs select-none z-10 text-white font-caveat font-bold tracking-widest">
              HAPPY BIRTHDAY {BIRTHDAY_CONFIG.bestieName.toUpperCase()}
            </span>
          </div>

          {/* Golden Plate */}
          <div className="w-56 sm:w-64 h-3 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 rounded-full shadow-md mt-0.5 border border-amber-300" />
        </div>

        {/* Wish Reaction Banner or Action Button */}
        <div className="mt-4 text-center w-full">
          {!isBlown ? (
            <button
              id="blow-candles-button"
              onClick={handleBlowCandles}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
            >
              <Wind className="w-4 h-4 animate-pulse" />
              <span>BLOW THE CANDLES 🕯️✨</span>
            </button>
          ) : (
            <div className="animate-in zoom-in-95 duration-300 flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white px-5 py-2.5 rounded-2xl shadow-lg text-center max-w-xs">
                <p className="font-playfair text-sm sm:text-base font-extrabold text-yellow-200">
                  WE HOPE YOUR WISH COMES TRUE! 💖✨
                </p>
                <p className="font-caveat text-xs sm:text-sm text-pink-100 mt-0.5">
                  May every dream you hold find its way to you this year!
                </p>
              </div>

              <button
                id="relight-candles-button"
                onClick={handleRelight}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 hover:bg-white text-rose-600 border border-rose-200 rounded-full text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Make Another Wish! 🕯️</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          Wishes granted: <span className="font-bold text-rose-600">{wishCount}</span> ✨
        </span>
      </div>
    </div>
  );
};
