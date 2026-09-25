import React, { useState, useEffect } from 'react';
import { Heart, FileCode, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  recipientName: string;
  onReplayTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ recipientName, onReplayTerminal }) => {
  const fullApologyText =
    "I know I hurt you, and I don't want to hide behind excuses.\n\nIf I could rewrite that moment, I would.\n\nYou mean far more to me than winning an argument or being right.\n\nI'm genuinely sorry. ❤️";

  const [typedApology, setTypedApology] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullApologyText.length) {
        setTypedApology(fullApologyText.slice(0, index + 1));
        if (index % 4 === 0) {
          sound.playKeyTick(0.95);
        }
        index++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullApologyText]);

  return (
    <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative glass-panel-glow rounded-2xl p-6 sm:p-10 transition-all border border-rose-500/20 backdrop-blur-2xl">
        {/* Terminal/File Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-code text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>src/apology/heartfelt_message.tsx</span>
          </div>

          <button
            type="button"
            onClick={onReplayTerminal}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-rose-300 font-code transition-colors px-2 py-1 rounded bg-white/[0.03] hover:bg-white/[0.07]"
            title="Replay terminal animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay Boot</span>
          </button>
        </div>

        {/* Large Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-normal tracking-tight text-white mb-4">
            Hey {recipientName || 'Love'}, I'm Sorry <span className="inline-block text-rose-500 animate-pulse">❤️</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300/90 max-w-2xl mx-auto leading-relaxed">
            This isn't just a message. I coded this because you mean enough to me to deserve something made especially for you.
          </p>
        </div>

        {/* Typewriter Apology Box */}
        <div className="my-8 p-6 sm:p-8 rounded-xl bg-[#0e0e17]/80 border border-white/[0.08] shadow-inner relative">
          <div className="absolute top-3 right-4 text-[11px] font-code text-rose-400/70 select-none">
            // honest confession
          </div>
          <div className="text-base sm:text-lg text-zinc-100 font-serif-title tracking-wide whitespace-pre-line leading-relaxed sm:leading-loose">
            «{typedApology}»
            {!isTypingComplete && (
              <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle" />
            )}
          </div>
        </div>

        {/* IMPORTANT_PATCH.md Section */}
        <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#0c0c14]/90 p-5 sm:p-7 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-xs font-code font-semibold tracking-wider text-rose-300 border-b border-white/[0.06] pb-3">
            <FileCode className="w-4 h-4 text-rose-400" />
            <span>IMPORTANT_PATCH.md</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* The Bug */}
            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/20">
              <div className="text-xs font-code uppercase tracking-wider text-rose-400 mb-1">
                The bug
              </div>
              <div className="text-sm sm:text-base font-medium text-white">
                My mistake.
              </div>
            </div>

            {/* The Patch */}
            <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/20">
              <div className="text-xs font-code uppercase tracking-wider text-amber-400 mb-1">
                The patch
              </div>
              <div className="text-sm sm:text-base font-medium text-white">
                My apology.
              </div>
            </div>

            {/* The Permanent Update */}
            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
              <div className="text-xs font-code uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                <span>The permanent update</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-sm sm:text-base font-medium text-white leading-snug">
                Learning, understanding, and treating your heart better.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
