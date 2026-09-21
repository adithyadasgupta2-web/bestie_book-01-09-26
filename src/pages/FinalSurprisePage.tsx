import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, Crown, Stars, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const FinalSurprisePage: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpenSurprise = () => {
    soundEngine.playTrophyFanfare();
    soundEngine.playSparkle();
    setIsRevealed(true);

    // Continuous multi-stage fireworks & confetti explosion
    const duration = 4000;
    const end = Date.now() + duration;

    // Center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff007f', '#ff1493', '#ffd700', '#00e5ff', '#9400d3'],
    });

    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 80,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ffd700', '#da70d6', '#ff1493', '#00fa9a'],
      });
    }, 300);
  };

  return (
    <div className={`h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden transition-colors duration-700 ${
      isRevealed
        ? 'bg-gradient-to-b from-[#2a0845] via-[#64147c] to-[#1b002c] text-white'
        : 'bg-gradient-to-b from-[#1e1022] via-[#2d1235] to-[#120815] text-pink-100'
    }`}>
      {/* Background ambient sparkle stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping opacity-30"
            style={{
              left: `${(i * 13) % 90}%`,
              top: `${(i * 19) % 85}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              backgroundColor: ['#ffd700', '#ff69b4', '#ffffff', '#c084fc'][i % 4],
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {!isRevealed ? (
        /* Mystery Teaser State */
        <div className="my-auto flex flex-col items-center justify-center text-center max-w-sm mx-auto z-10 px-2 py-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-500/20 border-2 border-pink-400/50 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(244,114,182,0.5)] animate-pulse">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300 animate-bounce" />
          </div>

          <p className="font-sans text-xs uppercase font-extrabold tracking-widest text-pink-300">
            ONE MORE SECRET SURPRISE...
          </p>

          <h2 className="font-playfair text-2xl sm:text-3xl font-black text-white mt-1 leading-tight drop-shadow-md">
            WAIT...<br />
            <span className="text-yellow-300 font-dancing text-3xl sm:text-4xl">DON&apos;T CLOSE THE BOOK YET! 👀🎁</span>
          </h2>

          <p className="font-caveat text-base sm:text-lg text-pink-200 mt-2 font-medium">
            There is one final grand reveal reserved exclusively for you...
          </p>

          <button
            id="open-final-surprise-button"
            onClick={handleOpenSurprise}
            className="mt-5 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-slate-950 font-black rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(244,114,182,0.8)] hover:shadow-[0_0_35px_rgba(251,191,36,1)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>OPEN THE FINAL SURPRISE ✨</span>
          </button>
        </div>
      ) : (
        /* Cinematic Celebration Reveal */
        <div className="my-auto flex flex-col items-center justify-center text-center max-w-md mx-auto z-10 py-1 space-y-2 animate-in zoom-in-95 duration-500 overflow-y-auto custom-book-scrollbar max-h-[380px]">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 bg-yellow-400/20 border border-yellow-400/50 rounded-full text-yellow-300 text-[11px] font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>Grand Finale Dedication</span>
          </div>

          <h2 className="font-playfair text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-rose-200 leading-tight drop-shadow-md">
            HAPPY BIRTHDAY,<br />
            <span className="text-yellow-300 font-dancing text-2xl sm:text-4xl block mt-0.5">
              MY AMAZING {BIRTHDAY_CONFIG.bestieName.toUpperCase()}! 🎂💖✨
            </span>
          </h2>

          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20 text-pink-100 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
            <p>
              May your new year be filled with unbounded happiness, roaring success, gorgeous memories, and everything your beautiful heart desires.
            </p>
          </div>

          <p className="font-caveat text-xl sm:text-2xl text-rose-300 font-bold">
            Thank you for simply being YOU. ❤️
          </p>

          <div className="py-1">
            <p className="font-sans text-xs sm:text-sm font-black tracking-widest text-yellow-300">
              STAY CRAZY. STAY BEAUTIFUL. STAY AMAZING. 👑💖
            </p>
          </div>

          <div className="p-2 sm:p-3 bg-gradient-to-r from-rose-500/30 via-pink-500/40 to-purple-500/30 rounded-xl border-2 border-pink-400/60 shadow-[0_0_20px_rgba(244,114,182,0.4)] w-full">
            <h3 className="font-playfair text-xl sm:text-3xl font-black text-yellow-200 tracking-wide flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>BE MY BESTIE FOREVER ❤️♾️</span>
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
            </h3>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pb-1 z-10">
        <span className="text-[10px] text-pink-300/80 font-sans">
          ✨ Flip forward to the book back cover
        </span>
      </div>
    </div>
  );
};
