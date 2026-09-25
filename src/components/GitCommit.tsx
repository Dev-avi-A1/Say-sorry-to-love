import React, { useState } from 'react';
import { GitCommit as GitIcon, GitBranch, Check, Copy, History } from 'lucide-react';
import { sound } from '../utils/audio';

export const GitCommit: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showLogDetails, setShowLogDetails] = useState<boolean>(false);

  const handleCopy = () => {
    sound.playKeyTick(1.2);
    navigator.clipboard.writeText('git commit -m "I promise to do better ❤️"');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLog = () => {
    sound.playKeyTick(1.0);
    setShowLogDetails(!showLogDetails);
  };

  return (
    <section id="git-commit" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-code text-zinc-400 ml-2">
              git — branch: main — commit: 520love
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLog}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 font-code px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span>{showLogDetails ? 'Hide Tree' : 'View Tree'}</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-rose-300 font-code px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              title="Copy commit command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Code/Terminal Content */}
        <div className="rounded-xl bg-[#08080e] border border-white/[0.06] p-5 sm:p-6 font-code text-xs sm:text-sm text-zinc-200 scanlines space-y-4 leading-relaxed">
          {/* Status Check */}
          <div>
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <span className="text-rose-500">$</span>
              <span>git status</span>
            </div>
            <div className="text-zinc-400 pl-4 pt-1 space-y-0.5">
              <div className="text-zinc-500">Changes detected:</div>
              <div className="text-amber-400 pl-2">modified: heart.txt</div>
              <div className="text-amber-400 pl-2">modified: memories.json</div>
              <div className="text-amber-400 pl-2">modified: behavior.js</div>
            </div>
          </div>

          {/* Git Add */}
          <div>
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <span className="text-rose-500">$</span>
              <span>git add .</span>
            </div>
          </div>

          {/* Git Commit */}
          <div>
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <span className="text-rose-500">$</span>
              <span>git commit -m &quot;I promise to do better ❤️&quot;</span>
            </div>

            <div className="pl-4 pt-2 space-y-1.5 border-l-2 border-emerald-500/30 ml-2 mt-2">
              <div className="text-emerald-400 font-medium">
                [main 520love] I promise to do better ❤️
              </div>
              <div className="text-zinc-300">
                3 files changed<br />
                3 intentions improved<br />
                <span className="text-rose-400 font-bold">∞ love preserved</span>
              </div>
            </div>
          </div>

          {/* Branch Tree details if toggled */}
          {showLogDetails && (
            <div className="pt-3 border-t border-white/[0.08] text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                <GitBranch className="w-3.5 h-3.5 text-rose-400" />
                <span>Verified Git Tree:</span>
              </div>
              <div className="pl-4 space-y-1 border-l border-rose-500/20 ml-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>* 520love (HEAD -&gt; main)</span>
                  <span className="text-zinc-500">// GPG: 0xDEV_TRUE_HEART [Verified]</span>
                </div>
                <div className="text-zinc-500 pl-4">I promise to do better ❤️</div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span>* 1314you</span>
                  <span className="text-zinc-500">// Fall in love with you every single day</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span>* 000init</span>
                  <span className="text-zinc-500">// The day we met (best moment ever)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Closing Thought */}
        <div className="mt-8 text-center">
          <p className="text-lg sm:text-xl font-serif-title tracking-wide text-zinc-200 italic">
            &ldquo;Some bugs deserve more than a fix. They deserve understanding.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
