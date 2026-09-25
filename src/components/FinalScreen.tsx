import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export const FinalScreen: React.FC = () => {
  const [pulseCount, setPulseCount] = useState<number>(0);

  const handleHeartClick = () => {
    sound.playHeartbeat();
    setPulseCount((prev) => prev + 1);
  };

  return (
    <footer className="pt-24 pb-16 px-4 sm:px-6 text-center relative bg-gradient-to-b from-transparent via-[#060608] to-[#040406]">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Pulsing Glowing Heart */}
        <div className="relative inline-block cursor-pointer group" onClick={handleHeartClick}>
          {/* Ambient radial glow */}
          <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-2xl group-hover:bg-rose-500/50 transition-all duration-500 transform scale-125" />

          {/* SVG Heart with custom heartbeat keyframe */}
          <div className="relative p-6 rounded-full bg-rose-950/20 border border-rose-500/30 group-hover:border-rose-500/60 transition-all shadow-2xl">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-rose-500 fill-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.7)] animate-pulse"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="block text-[10px] font-code text-zinc-400 mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
            tap to feel heartbeat {pulseCount > 0 ? `(${pulseCount})` : ''}
          </span>
        </div>

        {/* Text: "❤️ I LOVE YOU ❤️" */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-serif-title tracking-wider text-white font-normal">
            ❤️ I LOVE YOU ❤️
          </h2>

          {/* System Status: Heart → Yours ❤️ */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-white/10 text-xs sm:text-sm font-code text-zinc-300">
            <span className="text-zinc-400">System Status:</span>
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              Heart → Yours ❤️
            </span>
          </div>
        </div>

        {/* Small Footer */}
        <div className="pt-12 text-xs font-code text-zinc-400 space-y-1">
          <div>Made with ❤️</div>
          <div className="text-zinc-400">compiled with regret,</div>
          <div className="text-rose-400/90 font-medium">deployed with love.</div>
          <div className="text-[10px] text-zinc-400 pt-3">
            v1.0.0-final · immutable branch · never revoked
          </div>
        </div>
      </div>
    </footer>
  );
};
