import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export const LoveMessage: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const stanzas = [
    {
      lead: "If love were code,",
      body: "you would be the most important part of my project.",
      meta: "const corePrinciple = 'You';",
    },
    {
      lead: "If my life were a repository,",
      body: "you'd be my favorite commit.",
      meta: "git log --author='My Heart' --grep='You';",
    },
    {
      lead: "And if I had the chance to deploy everything again,",
      body: "I'd still choose you. ❤️",
      meta: "deploy({ target: 'Always You', rollback: false });",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Progressively reveal stanzas
            stanzas.forEach((_, idx) => {
              setTimeout(() => {
                setRevealedCount((prev) => Math.max(prev, idx + 1));
                sound.playDiagnosticTone();
              }, (idx + 1) * 450);
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (idx: number) => {
    sound.playHeartbeat();
  };

  return (
    <section
      id="love-message"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 max-w-4xl mx-auto relative overflow-hidden"
    >
      {/* Background cinematic radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-code mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>architecture_of_us.ts</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-title text-white tracking-tight">
          What You Truly Mean To Me
        </h2>
      </div>

      {/* Stanzas in elegant cinematic glass cards */}
      <div className="space-y-6 sm:space-y-8">
        {stanzas.map((stanza, idx) => {
          const isRevealed = revealedCount > idx;
          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-rose-500/30 transition-all duration-700 cursor-pointer transform ${
                isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-20 translate-y-6'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <p className="text-sm sm:text-base font-code text-rose-400 font-medium">
                    «{stanza.lead}
                  </p>
                  <p className="text-xl sm:text-3xl font-serif-title font-normal tracking-wide text-zinc-100 leading-snug">
                    {stanza.body}»
                  </p>
                </div>
                <div className="text-rose-500/40 hover:text-rose-400 transition-colors pt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-code text-zinc-500">
                <span className="truncate">{stanza.meta}</span>
                <span className="text-rose-400/60 font-serif-title text-sm italic">
                  truth.v1
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
