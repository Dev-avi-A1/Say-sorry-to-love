import React from 'react';
import { Terminal, ShieldCheck, Heart } from 'lucide-react';

export const DeveloperPromise: React.FC = () => {
  const telemetryItems = [
    { label: 'LOVE', dots: '.................', status: 'RUNNING', badge: '❤️', color: 'text-rose-400' },
    { label: 'LOYALTY', dots: '..............', status: 'ACTIVE', badge: '✓', color: 'text-emerald-400' },
    { label: 'EFFORT', dots: '................', status: '100%', badge: '⚡', color: 'text-amber-400' },
    { label: 'REGRETS', dots: '...............', status: 'LEARNED_FROM', badge: '★', color: 'text-sky-400' },
    { label: 'PROMISE', dots: '...............', status: 'PERMANENT', badge: '🔒', color: 'text-emerald-400' },
  ];

  return (
    <section id="promise" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-12 border border-rose-500/25 relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2.5 text-xs font-code text-rose-400 mb-6">
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>covenant / dev_promise.md</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-serif-title font-normal text-white mb-8 tracking-tight">
          Developer's Promise <span className="text-rose-500">❤️</span>
        </h2>

        {/* Emotional Message */}
        <div className="space-y-6 text-lg sm:text-2xl font-serif-title text-zinc-100 font-light leading-relaxed tracking-wide border-l-2 border-rose-500/40 pl-6 sm:pl-8 my-8">
          <p>«I can't promise I'll never make mistakes.</p>
          <p>
            But I can promise that I'll keep learning,<br />
            keep improving,<br />
            and keep choosing you.
          </p>
          <p>Because you're not just someone I love.</p>
          <p className="text-rose-200 font-normal">
            You're someone I never want to stop becoming better for.»
          </p>
        </div>

        {/* Terminal Line: $ deployment_status */}
        <div className="mt-10 rounded-xl bg-[#08080e] border border-white/[0.08] p-5 sm:p-6 font-code text-xs sm:text-sm text-zinc-300 scanlines space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-semibold border-b border-white/[0.06] pb-2">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-rose-500">$</span>
            <span>deployment_status</span>
          </div>

          <div className="space-y-2 pt-1">
            {telemetryItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between font-code tabular-nums hover:bg-white/[0.02] px-2 py-0.5 rounded transition-colors"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-zinc-400 font-medium">{item.label}</span>
                  <span className="text-zinc-600 hidden sm:inline select-none">{item.dots}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${item.color}`}>{item.status}</span>
                  <span>{item.badge}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-zinc-400 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span>Uptime: Forever</span>
            <span>Service: Unconditional Love</span>
          </div>
        </div>
      </div>
    </section>
  );
};
