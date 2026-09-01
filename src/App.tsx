import React, { useState, useEffect } from 'react';
import { MagicalBackground } from './components/Background/MagicalBackground';
import { BirthdayBook } from './components/Book/BirthdayBook';
import { soundEngine } from './utils/audio';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans selection:bg-pink-300 selection:text-pink-900">
      {/* Dreamy Magical Particle & Sparkle Background */}
      <MagicalBackground
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isPlayingMusic={isPlayingMusic}
      />

      {/* Main Digital Birthday Storybook */}
      <BirthdayBook onMusicPlayStateChange={setIsPlayingMusic} />
    </div>
  );
}
