import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2, Disc3, Sparkles, Heart, SkipForward, SkipBack } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

interface MusicPageProps {
  onMusicPlayStateChange?: (isPlaying: boolean) => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ onMusicPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Default 3:00 display duration
  const [useSynthFallback, setUseSynthFallback] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(BIRTHDAY_CONFIG.music.path);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 1) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleError = () => {
      // Switch gracefully to Web Audio synthesized acoustic lofi chords
      setUseSynthFallback(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
      soundEngine.stopLofiBirthdaySynth();
    };
  }, []);

  // Update volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
    soundEngine.setVolume(isMuted ? 0 : newVol);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    soundEngine.setMuted(nextMuted);
  };

  const togglePlay = () => {
    soundEngine.playSparkle();
    if (isPlaying) {
      if (audioRef.current && !useSynthFallback) {
        audioRef.current.pause();
      }
      soundEngine.stopLofiBirthdaySynth();
      setIsPlaying(false);
      onMusicPlayStateChange?.(false);
    } else {
      if (audioRef.current && !useSynthFallback) {
        audioRef.current.play().catch(() => {
          // If browser restricts or MP3 is placeholder
          setUseSynthFallback(true);
          soundEngine.startLofiBirthdaySynth(volume);
        });
      } else {
        soundEngine.startLofiBirthdaySynth(volume);
      }
      setIsPlaying(true);
      onMusicPlayStateChange?.(true);
    }
  };

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && !useSynthFallback) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#fffafd] via-[#fbf1f8] to-[#f6ecfa]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-pink-100 border border-pink-200 rounded-full text-pink-700 text-[11px] font-semibold uppercase tracking-wider mb-1">
          <Music2 className="w-3 h-3 text-pink-500" />
          <span>Bestie Soundtrack</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-black text-slate-800 leading-tight">
          OUR BIRTHDAY VIBES 🎵💖
        </h2>
        <p className="font-caveat text-xs sm:text-sm text-pink-600 font-semibold mt-0.5">
          The official soundtrack dedicated to our unforgettable friendship!
        </p>
      </div>

      {/* Cassette / Vinyl Player Box */}
      <div className="my-auto py-1 max-w-sm mx-auto w-full">
        <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border-2 border-pink-200 shadow-xl relative overflow-hidden">
          {/* Vinyl & Title Area */}
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="relative">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center shadow-lg border-2 border-pink-300 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border border-white">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-playfair font-bold text-slate-800 text-sm truncate">
                {BIRTHDAY_CONFIG.music.title}
              </h4>
              <p className="font-caveat text-xs sm:text-sm text-pink-600 font-semibold truncate">
                {BIRTHDAY_CONFIG.music.artist}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                <span>{useSynthFallback ? 'Acoustic Melody Synth' : 'HQ Birthday Audio'}</span>
                <span>•</span>
                <span className="text-pink-500 font-medium">{BIRTHDAY_CONFIG.music.path}</span>
              </div>
            </div>
          </div>

          {/* Equalizer Waveform Bars */}
          <div className="flex items-end justify-center gap-1 h-8 mb-3 bg-pink-50/70 p-1.5 rounded-lg border border-pink-100">
            {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 40].map((height, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  isPlaying
                    ? 'bg-gradient-to-t from-pink-500 to-purple-500 animate-pulse'
                    : 'bg-pink-200 h-2'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, (height * (isPlaying ? 1 : 0.2)))}%` : '6px',
                  animationDelay: `${(i % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Progress Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-sans font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Controls (Play, Volume, Mute) */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-pink-100">
            {/* Volume control */}
            <div className="flex items-center gap-1.5">
              <button
                id="music-mute-button"
                onClick={handleToggleMute}
                className="text-slate-500 hover:text-pink-600 transition-colors p-1 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-14 sm:w-16 h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Central Play/Pause Button */}
            <button
              id="music-play-pause-button"
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transform active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <div className="text-[10px] text-slate-500 font-caveat font-bold text-right">
              {isPlaying ? 'Now Grooving! 🎶' : 'Tap to Play ✨'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          Easily replace with your song in <code className="text-pink-600 font-mono bg-white/70 px-1 py-0.5 rounded">public/assets/music/song.mp3</code>
        </span>
      </div>
    </div>
  );
};
