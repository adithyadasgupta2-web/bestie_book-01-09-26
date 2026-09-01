import React, { useMemo, useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface MagicalBackgroundProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isPlayingMusic?: boolean;
}

export const MagicalBackground: React.FC<MagicalBackgroundProps> = ({
  isMuted,
  onToggleMute,
  isPlayingMusic = false,
}) => {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.7 + 5) % 95}%`,
      top: `${(i * 7.3 + 8) % 90}%`,
      size: 10 + (i % 5) * 6,
      duration: 5 + (i % 6) * 2,
      delay: (i % 7) * 0.8,
      type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'star' : i % 4 === 2 ? 'sparkle' : 'bokeh',
      color: ['#f472b6', '#fbcfe8', '#e9d5ff', '#c084fc', '#fde047'][i % 5],
    }));
  }, []);

  // Floating sparkle particles when clicked
  const [clickSparkles, setClickSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger on buttons
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('input')) return;

      const newSparkle = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setClickSparkles((prev) => [...prev.slice(-10), newSparkle]);
      soundEngine.playSparkle();

      setTimeout(() => {
        setClickSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-br from-rose-950/90 via-purple-950/80 to-slate-950">
      {/* Ambient background glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-rose-400/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating particles (hearts, stars, bokeh) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none pointer-events-none opacity-40 hover:opacity-80 transition-opacity"
          style={{
            left: p.left,
            top: p.top,
            animation: `floatSlow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' && (
            <span style={{ fontSize: `${p.size}px`, color: p.color }} className="drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
              💖
            </span>
          )}
          {p.type === 'star' && (
            <span style={{ fontSize: `${p.size * 0.8}px`, color: p.color }} className="drop-shadow-[0_0_6px_rgba(253,224,71,0.6)] animate-twinkle">
              ✨
            </span>
          )}
          {p.type === 'sparkle' && (
            <span style={{ fontSize: `${p.size * 0.7}px` }} className="text-amber-200 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]">
              ⭐
            </span>
          )}
          {p.type === 'bokeh' && (
            <div
              className="rounded-full blur-sm opacity-60"
              style={{
                width: `${p.size * 1.5}px`,
                height: `${p.size * 1.5}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 15px ${p.color}`,
              }}
            />
          )}
        </div>
      ))}

      {/* Click interactive sparkle bursts */}
      {clickSparkles.map((s) => (
        <div
          key={s.id}
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{ left: s.x, top: s.y }}
        >
          <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
        </div>
      ))}

      {/* Top right quick audio indicator & control */}
      <div className="fixed top-4 right-4 z-50 pointer-events-auto flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/30 shadow-lg text-pink-200 text-xs">
        {isPlayingMusic && (
          <div className="flex items-center gap-1 text-pink-400">
            <Music className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden sm:inline text-[11px] font-medium text-pink-300">Birthday Vibes Playing</span>
          </div>
        )}
        <button
          id="toggle-mute-bg-button"
          onClick={onToggleMute}
          title={isMuted ? "Unmute Sounds & Music" : "Mute Sounds & Music"}
          className="p-1.5 hover:bg-pink-500/20 rounded-full transition-colors text-pink-300 hover:text-pink-100 flex items-center gap-1"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          <span className="sr-only">Toggle sound</span>
        </button>
      </div>
    </div>
  );
};
