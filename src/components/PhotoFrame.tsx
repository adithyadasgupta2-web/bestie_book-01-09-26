import React, { useState } from 'react';
import { Camera, Sparkles, Heart, ZoomIn, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PhotoFrameProps {
  src: string;
  alt: string;
  caption: string;
  defaultMemoryTitle: string;
  defaultMemoryDesc: string;
  rotation?: string;
  doodles?: string[];
  themeColor?: 'pink' | 'purple' | 'rose' | 'gold';
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  caption,
  defaultMemoryTitle,
  defaultMemoryDesc,
  rotation = 'rotate-0',
  themeColor = 'pink',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const borderThemes = {
    pink: 'border-pink-200 shadow-pink-200/50',
    purple: 'border-purple-200 shadow-purple-200/50',
    rose: 'border-rose-200 shadow-rose-200/50',
    gold: 'border-amber-200 shadow-amber-200/50',
  };

  const handleOpenZoom = () => {
    soundEngine.playSparkle();
    setIsZoomed(true);
  };

  return (
    <>
      <div
        className={`relative transition-all duration-300 transform ${rotation} hover:rotate-0 hover:scale-[1.02] cursor-pointer group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenZoom}
      >
        {/* Cute tape sticker at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-100/80 backdrop-blur-xs border border-pink-200/60 rotate-[-2deg] shadow-xs rounded-xs z-20 flex items-center justify-center">
          <span className="text-[10px] font-caveat font-semibold text-pink-700 tracking-wider">💖 MEMORY</span>
        </div>

        {/* Polaroid frame body */}
        <div className={`p-3.5 pb-5 bg-white rounded-lg shadow-xl border ${borderThemes[themeColor]} transition-shadow duration-300 hover:shadow-2xl`}>
          <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded overflow-hidden flex items-center justify-center border border-pink-100">
            {/* Real photo or curated illustration */}
            {!hasError ? (
              <img
                src={src}
                alt={alt}
                onError={() => setHasError(true)}
                className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-pink-100/60 via-purple-100/40 to-rose-100/60">
                <div className="w-14 h-14 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-2 text-pink-500">
                  <Camera className="w-7 h-7 animate-pulse" />
                </div>
                <h4 className="font-playfair font-bold text-slate-800 text-sm">{defaultMemoryTitle}</h4>
                <p className="font-caveat text-pink-600 text-xs mt-1 leading-snug">{defaultMemoryDesc}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500 bg-white/70 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Replace in {src}</span>
                </div>
              </div>
            )}

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
              <div className="bg-white/90 text-pink-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Memory</span>
              </div>
            </div>
          </div>

          {/* Handwritten Polaroid Caption */}
          <div className="mt-3 text-center">
            <p className="font-caveat text-lg text-slate-800 font-semibold leading-tight group-hover:text-pink-600 transition-colors">
              {caption}
            </p>
          </div>
        </div>

        {/* Decorative corner sparkles */}
        <div className="absolute -bottom-2 -right-2 text-amber-400 opacity-80 group-hover:scale-125 transition-transform">
          <Sparkles className="w-5 h-5 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
        </div>
        <div className="absolute -top-1 -left-2 text-rose-400 opacity-80 group-hover:scale-125 transition-transform">
          <Heart className="w-4 h-4 fill-rose-300 text-rose-400" />
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white p-6 rounded-2xl shadow-2xl border border-pink-200 transform scale-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-photo-zoom-button"
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-slate-900">
              {!hasError ? (
                <img src={src} alt={alt} className="max-h-[65vh] w-auto object-contain" />
              ) : (
                <div className="p-12 text-center text-white flex flex-col items-center">
                  <Camera className="w-16 h-16 text-pink-400 mb-3" />
                  <h3 className="font-playfair text-xl font-bold text-pink-200">{defaultMemoryTitle}</h3>
                  <p className="font-caveat text-lg text-pink-300 mt-2">{defaultMemoryDesc}</p>
                </div>
              )}
            </div>
            <p className="mt-4 text-center font-caveat text-2xl text-slate-800 font-bold">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
