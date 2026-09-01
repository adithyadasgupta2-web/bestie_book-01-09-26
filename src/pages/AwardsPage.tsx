import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Laugh, Pizza, Sparkles, Heart, Award, X } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const AwardsPage: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<{
    title: string;
    icon: string;
    subtitle: string;
    congrats: string;
    color: string;
  } | null>(null);

  const awards = [
    {
      id: 'drama',
      title: 'BEST DRAMA QUEEN AWARD',
      icon: '🏆',
      subtitle: 'For unmatched emotional range & theatrical storytelling.',
      congrats: 'Congratulations! You beat out millions of contenders for the most dramatic bestie performance of the decade! 🎭✨',
      color: 'from-amber-400 to-yellow-500',
      bgColor: 'bg-amber-50/90 border-amber-200 text-amber-900',
    },
    {
      id: 'overthinking',
      title: 'QUEEN OF OVERTHINKING',
      icon: '👑',
      subtitle: 'Turning simple situations into 14-step conspiracy theories.',
      congrats: 'Awarded for exceptional dedication to analyzing texts and hypothetical scenarios! 🧠💡',
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50/90 border-purple-200 text-purple-900',
    },
    {
      id: 'laughing',
      title: 'BEST LAUGHING PARTNER',
      icon: '😂',
      subtitle: 'Laughing so hard that sound stops coming out.',
      congrats: 'Thank you for giving my stomach a 6-pack workout from laughing until we cry! 🤣💖',
      color: 'from-rose-400 to-pink-500',
      bgColor: 'bg-rose-50/90 border-rose-200 text-rose-900',
    },
    {
      id: 'food',
      title: 'CERTIFIED FOOD LOVER',
      icon: '🍕',
      subtitle: 'Always ready to order food or go on midnight snack hunts.',
      congrats: 'Unanimously chosen as Chief Snack Officer and Supreme Food Critic! 🍟🧁',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50/90 border-emerald-200 text-emerald-900',
    },
    {
      id: 'crazy',
      title: 'CRAZIEST PERSON I KNOW',
      icon: '🤪',
      subtitle: 'Certified wild, adventurous, and delightfully unhinged.',
      congrats: 'Awarded with high honors for keeping life 1000% unpredictable & fun! 🚀✨',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50/90 border-orange-200 text-orange-900',
    },
    {
      id: 'bestie_year',
      title: 'BEST BESTIE OF THE YEAR',
      icon: '💖',
      subtitle: 'Undisputed champion of loyalty, love, and friendship.',
      congrats: 'The Grand Lifetime Achievement Award for being the most wonderful human ever! 👑🥂',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-100/90 border-pink-300 text-pink-900',
    },
  ];

  const handleClaimAward = (award: typeof awards[0]) => {
    soundEngine.playTrophyFanfare();
    soundEngine.playSparkle();
    setSelectedAward(award);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffd700', '#f43f5e', '#ec4899', '#c084fc'],
    });
  };

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#fffcfb] via-[#fff4f8] to-[#fbf0ff]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 border border-amber-200 rounded-full text-amber-800 text-[11px] font-semibold uppercase tracking-wider mb-1">
          <Trophy className="w-3 h-3 text-amber-600" />
          <span>Annual Ceremony</span>
        </div>
        <h2 className="font-playfair text-lg sm:text-2xl font-black text-slate-800 leading-tight">
          THE OFFICIAL BESTIE AWARDS 🏆😂
        </h2>
        <p className="font-caveat text-xs sm:text-sm text-pink-600 font-semibold">
          Tap any trophy to claim your official prestigious title!
        </p>
      </div>

      {/* Grid of awards */}
      <div className="my-auto grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg mx-auto w-full py-1">
        {awards.map((a) => (
          <button
            key={a.id}
            id={`award-button-${a.id}`}
            onClick={() => handleClaimAward(a)}
            className={`p-2.5 rounded-xl border text-left transition-all duration-200 hover:shadow-md hover:scale-[1.03] active:scale-95 flex flex-col justify-between ${a.bgColor} cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-125 transition-transform">{a.icon}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 opacity-60 group-hover:opacity-100" />
            </div>
            <div className="mt-1.5">
              <h4 className="font-sans text-[11px] font-extrabold uppercase tracking-tight leading-tight">
                {a.title}
              </h4>
              <p className="font-caveat text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">
                {a.subtitle}
              </p>
            </div>
            <div className="mt-1.5 text-[9px] font-bold text-amber-700 bg-white/70 px-1.5 py-0.5 rounded text-center">
              TAP TO CLAIM ✨
            </div>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          Official Accreditation from the <span className="font-bold text-pink-600">Best Friend Academy</span> 💖
        </span>
      </div>

      {/* Award Acceptance Popup */}
      {selectedAward && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative max-w-sm w-full bg-white p-6 rounded-2xl shadow-2xl border-2 border-amber-300 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-award-modal-button"
              onClick={() => setSelectedAward(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl shadow-inner animate-bounce">
              {selectedAward.icon}
            </div>
            <div className="inline-block mt-3 px-3 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
              OFFICIAL CERTIFICATE
            </div>
            <h3 className="font-playfair text-xl font-black text-slate-800 mt-2">
              {selectedAward.title}
            </h3>
            <p className="font-dancing text-2xl text-rose-600 font-bold mt-1">
              Presented to: {BIRTHDAY_CONFIG.bestieName} 👑
            </p>
            <p className="font-caveat text-lg text-slate-700 font-semibold mt-3 bg-pink-50/80 p-3 rounded-xl border border-pink-100 leading-snug">
              &ldquo;{selectedAward.congrats}&rdquo;
            </p>
            <button
              id="accept-award-button"
              onClick={() => setSelectedAward(null)}
              className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Accept With Pride! 🏆💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
