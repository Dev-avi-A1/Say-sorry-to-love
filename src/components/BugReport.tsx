import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Flame, GitCompare, ShieldAlert, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const BugReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'diff'>('overview');

  const handleTabChange = (tab: 'overview' | 'diff') => {
    sound.playKeyTick(1.1);
    setActiveTab(tab);
  };

  return (
    <section id="bug-report" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-code font-bold text-white tracking-tight">
                  BUG REPORT #001
                </h2>
                <span className="flex items-center gap-1.5 text-xs font-code font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  RESOLVED
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-code mt-0.5">
                Severity: Unacceptable · Assigned to: Me · Resolution: Sincere Apology
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 bg-black/40 rounded-lg border border-white/[0.06] text-xs font-code">
            <button
              type="button"
              onClick={() => handleTabChange('overview')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'overview'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Incident Details
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('diff')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'diff'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Git Diff</span>
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-4">
            {/* Grid of Bug Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bug */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] hover:border-rose-500/30 transition-all">
                <span className="text-xs font-code text-zinc-400 uppercase tracking-wider block mb-1">
                  Bug Description
                </span>
                <p className="text-sm sm:text-base text-zinc-100 font-serif-title text-lg leading-relaxed">
                  «I made my favorite person feel hurt.»
                </p>
              </div>

              {/* Root Cause */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] hover:border-amber-500/30 transition-all">
                <span className="text-xs font-code text-zinc-400 uppercase tracking-wider block mb-1">
                  Root Cause
                </span>
                <p className="text-sm sm:text-base text-zinc-100 font-serif-title text-lg leading-relaxed">
                  «My mistake, my words, or my actions.»
                </p>
              </div>

              {/* Impact */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] hover:border-rose-500/30 transition-all">
                <span className="text-xs font-code text-zinc-400 uppercase tracking-wider block mb-1">
                  Impact
                </span>
                <p className="text-sm sm:text-base text-zinc-100 font-serif-title text-lg leading-relaxed text-rose-200">
                  «One beautiful smile was replaced by sadness.»
                </p>
              </div>

              {/* Fix */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                <span className="text-xs font-code text-zinc-400 uppercase tracking-wider block mb-1">
                  Fix & Prevention
                </span>
                <p className="text-sm sm:text-base text-zinc-100 font-serif-title text-lg leading-relaxed text-emerald-300">
                  «Apologize sincerely + understand + improve.»
                </p>
              </div>
            </div>

            {/* Bottom Meta Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-rose-950/20 border border-rose-500/20">
                <span className="text-xs font-code text-zinc-400">Priority Level</span>
                <span className="text-xs sm:text-sm font-code font-bold text-rose-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500" />
                  CRITICAL ❤️
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                <span className="text-xs font-code text-zinc-400">Deployment Status</span>
                <span className="text-xs sm:text-sm font-code font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  PATCH DEPLOYED ✓
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Code Diff View */
          <div className="rounded-xl bg-[#08080d] border border-white/[0.08] p-4 sm:p-5 font-code text-xs sm:text-sm overflow-x-auto scanlines">
            <div className="text-zinc-500 pb-2 border-b border-white/[0.06] mb-3">
              $ git diff --staged behavior.ts
            </div>
            <div className="space-y-1">
              <div className="text-cyan-400">@@ -1,7 +1,7 @@ relationship/attitude.ts</div>
              <div className="text-rose-400/90 bg-rose-950/30 px-2 py-0.5 rounded -mx-2">
                - const ego = true;
              </div>
              <div className="text-rose-400/90 bg-rose-950/30 px-2 py-0.5 rounded -mx-2">
                - const defensiveReaction = true;
              </div>
              <div className="text-rose-400/90 bg-rose-950/30 px-2 py-0.5 rounded -mx-2">
                - const needToWinArgument = true;
              </div>
              <div className="text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded -mx-2">
                + const sincereListening = true;
              </div>
              <div className="text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded -mx-2">
                + const yourFeelingsFirst = true;
              </div>
              <div className="text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded -mx-2">
                + const softGentlePatience = true;
              </div>
              <div className="text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded -mx-2">
                + const lovePreserved = Infinity; // permanently
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
