import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Clock, Calendar, Sparkles, PartyPopper, Cake, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const CountdownPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPastOrToday: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPastOrToday: false,
  });

  const [forceCelebration, setForceCelebration] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(BIRTHDAY_CONFIG.birthdayDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPastOrToday: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isPastOrToday: false,
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfettiExplosion = () => {
    soundEngine.playSparkle();
    soundEngine.playTrophyFanfare();
    setForceCelebration(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#38bdf8'],
    });

    const end = Date.now() + 1500;
    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ffd700', '#da70d6'],
      });
    }, 250);
  };

  const isCelebrationActive = timeLeft.isPastOrToday || forceCelebration;

  const targetFormatted = new Date(BIRTHDAY_CONFIG.birthdayDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-7 relative overflow-hidden bg-gradient-to-b from-[#fffafb] via-[#fff1f5] to-[#fdf4ff]">
      {/* Header */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 border border-rose-200 rounded-full text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{targetFormatted}</span>
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-800">
          THE MOST SPECIAL DAY 🎂✨
        </h2>
        <p className="font-caveat text-base sm:text-lg text-pink-600 font-semibold mt-1">
          Counting down every magical second until the big celebration!
        </p>
      </div>

      {/* Main Countdown Display */}
      <div className="my-auto py-2">
        {isCelebrationActive ? (
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl text-center max-w-sm mx-auto animate-bounce transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">🎉🎂💖</div>
            <h3 className="font-playfair text-2xl font-black tracking-tight">
              IT&apos;S FINALLY YOUR DAY!!!
            </h3>
            <p className="font-caveat text-xl text-pink-100 mt-2 font-bold">
              Happy Birthday, {BIRTHDAY_CONFIG.bestieName}! Let the celebration never end! 🥳✨
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
            {[
              { label: 'DAYS', value: timeLeft.days, color: 'from-pink-500 to-rose-500' },
              { label: 'HOURS', value: timeLeft.hours, color: 'from-rose-500 to-purple-500' },
              { label: 'MINUTES', value: timeLeft.minutes, color: 'from-purple-500 to-indigo-500' },
              { label: 'SECONDS', value: timeLeft.seconds, color: 'from-indigo-500 to-pink-500' },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xs p-2.5 sm:p-3.5 rounded-xl border border-pink-200/80 shadow-md text-center flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform"
              >
                <span className={`font-playfair text-2xl sm:text-3xl font-black bg-gradient-to-br ${unit.color} bg-clip-text text-transparent`}>
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-500 mt-0.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Interactive celebration preview button */}
        <div className="mt-4 text-center">
          <button
            id="celebrate-now-button"
            onClick={triggerConfettiExplosion}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <PartyPopper className="w-4 h-4" />
            <span>{isCelebrationActive ? 'Blast More Confetti! 🎊' : 'Celebrate Today! 🥳✨'}</span>
          </button>
        </div>
      </div>

      {/* Sweet quote at bottom */}
      <div className="bg-white/60 backdrop-blur-xs p-3 rounded-xl border border-pink-100 text-center max-w-sm mx-auto">
        <p className="font-caveat text-sm sm:text-base text-slate-700 font-semibold flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
          <span>Every year you just get more wonderful, vibrant & awesome!</span>
        </p>
      </div>
    </div>
  );
};
