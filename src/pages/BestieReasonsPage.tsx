import React, { useState } from 'react';
import { Heart, Sparkles, Star, Award, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const BestieReasonsPage: React.FC = () => {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const reasons = [
    {
      id: 1,
      emoji: '💖',
      text: 'You always understand me, even when I don’t say a single word.',
      tag: 'Mind Reader',
    },
    {
      id: 2,
      emoji: '😂',
      text: 'You laugh at my stupid jokes even when they are genuinely not funny.',
      tag: 'Best Laugh',
    },
    {
      id: 3,
      emoji: '🤪',
      text: 'You are crazy enough to match my exact frequency and vibe of chaos.',
      tag: 'Partner in Crime',
    },
    {
      id: 4,
      emoji: '🫶',
      text: 'You are there during both the happiest triumphs and difficult moments.',
      tag: 'True Anchor',
    },
    {
      id: 5,
      emoji: '✨',
      text: 'You make the most ordinary casual days feel completely unforgettable.',
      tag: 'Pure Magic',
    },
    {
      id: 6,
      emoji: '❤️',
      text: 'Life would definitely be infinitely more boring without you in it.',
      tag: 'Essential Human',
    },
  ];

  const handleReasonClick = (id: number) => {
    soundEngine.playSparkle();
    setActiveReason(id === activeReason ? null : id);
  };

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#fffafd] via-[#fef4f8] to-[#fbf0fa]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 border border-rose-200 rounded-full text-rose-700 text-[11px] font-semibold uppercase tracking-wider mb-1">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-300" />
          <span>From the Bottom of My Heart</span>
        </div>
        <h2 className="font-playfair text-lg sm:text-2xl font-black text-slate-800 leading-tight">
          WHY YOU ARE THE BEST BESTIE EVER 💖
        </h2>
      </div>

      {/* Reasons List */}
      <div className="my-auto space-y-1.5 sm:space-y-2 max-w-md mx-auto w-full py-1">
        {reasons.map((r) => {
          const isSelected = activeReason === r.id;
          return (
            <div
              key={r.id}
              onClick={() => handleReasonClick(r.id)}
              className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                isSelected
                  ? 'bg-rose-50/90 border-rose-300 shadow-md scale-[1.01]'
                  : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:bg-white hover:shadow-xs'
              }`}
            >
              <span className="text-lg sm:text-xl select-none flex-shrink-0 animate-pulse">{r.emoji}</span>
              <p className="font-caveat text-sm sm:text-base text-slate-800 font-semibold leading-snug flex-1">
                {r.text}
              </p>
              <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-pink-100/70 text-pink-700 flex-shrink-0">
                {r.tag}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Heartfelt Note */}
      <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/15 to-purple-500/10 border border-rose-200 p-2.5 sm:p-3 rounded-xl text-center max-w-md mx-auto w-full">
        <p className="font-dancing text-base sm:text-lg text-rose-800 font-bold leading-tight">
          &ldquo;Basically... I don&apos;t know how I got this lucky, but I&apos;m really glad I got YOU as my bestie. 🥹💖&rdquo;
        </p>
      </div>
    </div>
  );
};
