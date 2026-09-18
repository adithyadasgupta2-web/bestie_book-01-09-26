import React, { useState } from 'react';
import { Sparkles, Heart, Crown, Pizza, Laugh, HelpCircle, Award } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const BestieIntroPage: React.FC = () => {
  const [clickedTrait, setClickedTrait] = useState<number | null>(null);

  const traits = [
    {
      id: 1,
      title: 'a gold',
      emoji: '',
      subtitle: '',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50 border-amber-200 text-amber-900',
      badge: '',
    },
    {
      id: 2,
      title: '',
      emoji: '👑',
      subtitle: '',
      color: 'from-rose-400 to-pink-600',
      bgColor: 'bg-rose-50 border-rose-200 text-rose-900',
      badge: '',
    },
    {
      id: 3,
      title: '',
      emoji: '🍕',
      subtitle: '',
      color: 'from-emerald-400 to-teal-600',
      bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badge: '',
    },
    {
      id: 4,
      title: ',
      emoji: '🤪',
      subtitle: '',
      color: 'from-purple-400 to-indigo-600',
      bgColor: 'bg-purple-50 border-purple-200 text-purple-900',
      badge: '',
    },
  ];

  const handleTraitClick = (id: number) => {
    soundEngine.playSparkle();
    setClickedTrait(id === clickedTrait ? null : id);
  };

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#fffdfa] via-[#fef6f8] to-[#fbf0ff]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-[11px] font-semibold uppercase tracking-wider mb-1">
          <Award className="w-3 h-3 text-purple-600" />
          <span>Profile Dossier</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800">
          WHO IS THIS AMAZING PERSON? 😎💖
        </h2>
        <p className="font-caveat text-sm sm:text-base text-pink-600 font-semibold">
          An official investigation into the legend herself: <span className="text-rose-600 font-bold">{BIRTHDAY_CONFIG.bestieName}</span>
        </p>
      </div>

      {/* Trait Cards Grid */}
      <div className="my-auto grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto w-full py-1">
        {traits.map((t) => {
          const isSelected = clickedTrait === t.id;
          return (
            <div
              key={t.id}
              onClick={() => handleTraitClick(t.id)}
              className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left relative group ${t.bgColor} ${
                isSelected ? 'ring-2 ring-pink-400 shadow-md scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl select-none group-hover:scale-125 transition-transform">{t.emoji}</span>
                  <h4 className="font-sans text-xs sm:text-sm font-bold leading-tight">{t.title}</h4>
                </div>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-white/80 border border-current opacity-70">
                  {t.badge}
                </span>
              </div>
              <p className="font-caveat text-xs sm:text-sm mt-1 text-slate-700 font-medium leading-snug">
                {t.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* The Grand Punchline */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white p-3 sm:p-3.5 rounded-xl shadow-md text-center max-w-lg mx-auto w-full relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-white/15">
          <Heart className="w-20 h-20 fill-white" />
        </div>
        <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-pink-200">
          BUT MOST IMPORTANTLY...
        </p>
        <h3 className="font-playfair text-lg sm:text-xl font-black mt-0.5 text-yellow-200 drop-shadow-sm flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>THE BEST BESTIE IN THE ENTIRE WORLD! 💖</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </h3>
      </div>
    </div>
  );
};
