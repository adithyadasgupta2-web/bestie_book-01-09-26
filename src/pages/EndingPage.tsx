import React from 'react';
import { BookOpen, Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

interface EndingPageProps {
  onRestartStory: () => void;
}

export const EndingPage: React.FC<EndingPageProps> = ({ onRestartStory }) => {
  const handleRestart = () => {
    soundEngine.playSparkle();
    onRestartStory();
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-7 relative overflow-hidden bg-gradient-to-b from-[#fffafb] via-[#fef2f6] to-[#f9ecf5]">
      {/* Top Tag */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 border border-pink-200 rounded-full text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Epilogue</span>
        </div>
      </div>

      {/* Main Back Cover Note */}
      <div className="my-auto py-2 text-center max-w-md mx-auto w-full">
        <div className="bg-white/80 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-pink-200/80 shadow-md">
          <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
            THE END...
          </h2>
          <p className="font-dancing text-2xl sm:text-3xl text-rose-600 font-bold mt-1">
            OR MAYBE JUST ANOTHER BEAUTIFUL CHAPTER OF OUR FRIENDSHIP. 📖💖
          </p>

          <div className="w-16 h-0.5 bg-pink-300 mx-auto my-4 rounded-full" />

          <p className="font-caveat text-lg sm:text-xl text-slate-700 font-medium leading-relaxed">
            To many more birthdays, many more memories, and many more decades of being completely crazy together! 😂❤️
          </p>

          <p className="font-dancing text-2xl sm:text-3xl text-purple-900 font-black mt-4">
            Love You, {BIRTHDAY_CONFIG.bestieName}! 💖
          </p>

          {/* Re-read Story Button */}
          <div className="mt-6">
            <button
              id="read-story-again-button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>READ OUR STORY AGAIN 📖✨</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer copyright / love note */}
      <div className="text-center pb-2">
        <p className="font-sans text-[11px] text-pink-400 font-medium flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
          <span>Made with infinite love specially for you</span>
        </p>
      </div>
    </div>
  );
};
