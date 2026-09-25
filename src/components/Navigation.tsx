import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavigationProps {
  onPersonalizeClick: () => void;
  recipientName: string;
  isMuted: boolean;
  onToggleSound: () => void;
  onReplayTerminal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onPersonalizeClick,
  recipientName,
  isMuted,
  onToggleSound,
  onReplayTerminal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090c]/85 border-b border-white/[0.07] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-sm sm:text-base font-semibold tracking-tight text-white hover:text-rose-300 transition-colors font-code whitespace-nowrap"
        >
          patch.520(love)
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-400">
          <a
            href="#hero"
            className="hover:text-white transition-colors"
          >
            Apology
          </a>
          <a
            href="#bug-report"
            className="hover:text-white transition-colors"
          >
            Bug Report
          </a>
          <a
            href="#git-commit"
            className="hover:text-white transition-colors"
          >
            Git Commit
          </a>
          <a
            href="#love-message"
            className="hover:text-white transition-colors"
          >
            Message
          </a>
          <a
            href="#forgiveness"
            className="hover:text-rose-300 transition-colors"
          >
            Forgiveness
          </a>
          <a
            href="#promise"
            className="hover:text-white transition-colors"
          >
            Promise
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
            title={isMuted ? 'Enable tactile sound' : 'Mute sound'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            )}
            <span className="hidden sm:inline whitespace-nowrap font-code text-[11px]">
              {isMuted ? 'Muted' : 'Audio On'}
            </span>
          </button>

          <button
            type="button"
            onClick={onPersonalizeClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 transition-all whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="truncate max-w-[100px] sm:max-w-[140px]">
              For: {recipientName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
