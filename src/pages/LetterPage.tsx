import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, Heart, Play, FastForward, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

const FULL_LETTER_PARAGRAPHS = [
  `Happy Birthday, ${BIRTHDAY_CONFIG.bestieName}! 💖`,
  `I honestly don't know where to begin, because how do you describe someone who has become such an important part of your life?`,
  `Thank you for every laugh, every conversation, every stupid joke, every crazy moment, and every memory.`,
  `Thank you for being there. Thank you for understanding me. Thank you for simply being YOU.`,
  `Life becomes so much more beautiful when you have someone to share both the happy and crazy moments with.`,
  `On your birthday, I hope you receive everything your heart wishes for.`,
  `Keep smiling. Keep laughing. Keep being the amazing, beautiful and wonderfully crazy person you are. 😂💖`,
  `Happy Birthday once again, Bestie! I hope our friendship always stays just as crazy, just as beautiful, and just as special.Be my bestie forever`,
];

const SIGNATURE = "With lots of love,\nYour Forever adithya 💖";

export const LetterPage: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = FULL_LETTER_PARAGRAPHS.join('\n\n') + '\n\n' + SIGNATURE;

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [fullText]);

  const handleShowAll = () => {
    soundEngine.playSparkle();
    setDisplayedText(fullText);
    setIsTypingComplete(true);
  };

  const handleReplay = () => {
    soundEngine.playSparkle();
    setDisplayedText('');
    setIsTypingComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 18);
  };

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#fffcf8] via-[#fff5f3] to-[#fbf1f6]">
      {/* Header with Wax Seal */}
      <div className="text-center pt-1 flex items-center justify-between">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 border border-rose-200 rounded-full text-rose-700 text-[11px] font-semibold uppercase tracking-wider">
          <Mail className="w-3 h-3 text-rose-500" />
          <span>Handwritten Letter</span>
        </div>

        {/* Speed / Reveal controls */}
        <div className="flex items-center gap-1.5">
          {!isTypingComplete ? (
            <button
              id="instant-letter-reveal-button"
              onClick={handleShowAll}
              className="text-[11px] font-bold text-pink-600 hover:text-pink-800 bg-white/80 hover:bg-white border border-pink-200 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            >
              <FastForward className="w-3 h-3" />
              <span>Show All</span>
            </button>
          ) : (
            <button
              id="replay-letter-button"
              onClick={handleReplay}
              className="text-[11px] font-bold text-slate-500 hover:text-pink-600 bg-white/80 border border-pink-100 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Typewriter Replay</span>
            </button>
          )}
        </div>
      </div>

      <div className="text-center mt-1">
        <h2 className="font-playfair text-lg sm:text-2xl font-black text-slate-800 leading-tight">
          A LITTLE LETTER FOR YOU 💌
        </h2>
      </div>

      {/* Letter Paper Container with vintage lines */}
      <div className="my-auto py-1 max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="bg-[#fffefb] p-3.5 sm:p-5 rounded-xl border border-pink-200/90 shadow-md relative overflow-y-auto max-h-[300px] sm:max-h-[340px] custom-book-scrollbar">
          {/* Lined paper aesthetic subtle background lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #f472b6 28px)',
              backgroundPosition: '0 28px',
            }}
          />

          <div className="relative z-10 whitespace-pre-line font-caveat text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-1.5 h-4 bg-rose-500 animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom stamp */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-dancing text-rose-600 font-bold flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-500" />
          <span>Sealed with infinite love & bestie blessings</span>
        </span>
      </div>
    </div>
  );
};
