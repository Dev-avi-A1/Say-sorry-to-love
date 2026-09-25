import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { Play, FastForward, Terminal, ArrowDown } from 'lucide-react';

interface TerminalIntroProps {
  onComplete: () => void;
  recipientName: string;
}

interface ScriptLine {
  text: string;
  delay: number; // delay before next line in ms
  color?: string;
  isProgressBar?: boolean;
  isCommand?: boolean;
}

export const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete, recipientName }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentTypingText, setCurrentTypingText] = useState<string>('');
  const [commandFinished, setCommandFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const terminalContentRef = useRef<HTMLDivElement | null>(null);

  const script: ScriptLine[] = [
    { text: 'Initializing apology.exe...', delay: 350 },
    { text: 'Loading memories...', delay: 300 },
    { text: 'Scanning relationship.status...', delay: 400 },
    { text: 'Checking heart_status...', delay: 500 },
    { text: `ERROR: ${recipientName || 'Girlfriend'} is hurt 💔`, delay: 750, color: 'text-rose-400 font-semibold' },
    { text: 'Running emotional diagnostics...', delay: 450 },
    { text: 'Cause detected:', delay: 250 },
    { text: 'MY_MISTAKE', delay: 650, color: 'text-amber-400 font-semibold' },
    { text: 'Searching solution...', delay: 450 },
    { text: '> Solution found:', delay: 300 },
    { text: '> Say_Sorry_With_All_My_Heart ❤️', delay: 700, color: 'text-emerald-400 font-semibold' },
    { text: 'Compiling apology...', delay: 350 },
    { text: '__PROGRESS_BAR__', delay: 1100, isProgressBar: true },
    { text: 'Build successful ✓', delay: 600, color: 'text-emerald-400 font-semibold' },
    { text: 'Starting something special...', delay: 800, color: 'text-rose-300' },
  ];

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [displayedLines, currentTypingText, progress]);

  // Command typing animation: "$ ./apology.exe"
  useEffect(() => {
    const commandText = './apology.exe';
    let index = 0;
    const interval = setInterval(() => {
      if (index <= commandText.length) {
        setCurrentTypingText(commandText.slice(0, index));
        sound.playKeyTick(1 + (index % 3) * 0.1);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCommandFinished(true);
        }, 300);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Line-by-line script execution after command finishes
  useEffect(() => {
    if (!commandFinished) return;

    let lineIndex = 0;
    let timer: NodeJS.Timeout;

    const playNextLine = () => {
      if (lineIndex >= script.length) {
        setIsDone(true);
        sound.playWarmResolutionChord();
        timer = setTimeout(() => {
          onComplete();
        }, 1200);
        return;
      }

      const item = script[lineIndex];

      if (item.isProgressBar) {
        // Animate progress bar from 0 to 100
        let p = 0;
        const progressInterval = setInterval(() => {
          p += 5;
          setProgress(p);
          sound.playKeyTick(1.2);
          if (p >= 100) {
            clearInterval(progressInterval);
            setDisplayedLines((prev) => [...prev, '████████████████████ 100%']);
            lineIndex++;
            timer = setTimeout(playNextLine, 400);
          }
        }, 45);
      } else {
        setDisplayedLines((prev) => [...prev, item.text]);
        if (item.color?.includes('rose') || item.text.includes('ERROR')) {
          sound.playDiagnosticTone();
        } else {
          sound.playKeyTick(0.9);
        }
        lineIndex++;
        timer = setTimeout(playNextLine, item.delay);
      }
    };

    timer = setTimeout(playNextLine, 200);

    return () => clearTimeout(timer);
  }, [commandFinished]);

  const handleSkip = () => {
    sound.playWarmResolutionChord();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07070a]/95 backdrop-blur-2xl transition-all duration-700">
      <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14]/90 shadow-2xl shadow-rose-950/20 flex flex-col h-[520px] max-h-[90vh]">
        {/* macOS Style Window Title Bar */}
        <div className="h-10 bg-[#14141f] border-b border-white/[0.08] px-4 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/60 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/60 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/60 shadow-sm" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-code font-medium">
            <Terminal className="w-3.5 h-3.5 text-rose-400/80" />
            <span>bash — apology.exe — 80x24</span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1 text-[11px] font-code text-zinc-400 hover:text-rose-300 transition-colors px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08]"
          >
            <span>Skip</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>

        {/* Terminal Content Screen */}
        <div
          ref={terminalContentRef}
          className="flex-1 p-4 sm:p-6 font-code text-xs sm:text-sm text-zinc-300 overflow-y-auto space-y-2 scanlines relative select-text"
        >
          {/* Active Command Line */}
          <div className="flex items-center gap-2 text-rose-300/90 font-semibold">
            <span className="text-rose-500">$</span>
            <span>{currentTypingText}</span>
            {!commandFinished && (
              <span className="w-2 h-4 bg-rose-400 inline-block animate-pulse align-middle" />
            )}
          </div>

          {/* Script Output Lines */}
          {commandFinished && (
            <div className="space-y-1.5 pt-2">
              {displayedLines.map((line, idx) => {
                let colorClass = 'text-zinc-300';
                if (line.includes('ERROR:')) colorClass = 'text-rose-400 font-semibold';
                else if (line.includes('MY_MISTAKE')) colorClass = 'text-amber-400 font-semibold';
                else if (line.includes('Say_Sorry') || line.includes('Build successful'))
                  colorClass = 'text-emerald-400 font-semibold';
                else if (line.includes('Starting something special'))
                  colorClass = 'text-rose-300 font-medium animate-pulse';
                else if (line.includes('██')) colorClass = 'text-rose-400 font-mono tracking-tight';

                return (
                  <div key={idx} className={`${colorClass} leading-relaxed transition-opacity duration-200`}>
                    {line}
                  </div>
                );
              })}

              {/* In-progress progress bar indicator */}
              {!displayedLines.includes('████████████████████ 100%') && progress > 0 && (
                <div className="text-rose-400 font-mono">
                  {'█'.repeat(Math.floor(progress / 5))}
                  {'░'.repeat(20 - Math.floor(progress / 5))} {progress}%
                </div>
              )}

              {/* Cursor when running */}
              {!isDone && (
                <div className="flex items-center gap-1 text-zinc-500 text-xs pt-1">
                  <span className="w-2 h-3.5 bg-zinc-400 inline-block animate-ping" />
                  <span className="opacity-70">processing emotional state...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="p-3 bg-[#11111a] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-code">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Status: {isDone ? 'READY' : 'RUNNING_DIAGNOSTICS'}</span>
          </div>

          {isDone ? (
            <button
              type="button"
              onClick={onComplete}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-medium transition-all shadow-lg shadow-rose-600/30"
            >
              <span>Enter Experience</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-zinc-400">Press Skip to jump directly</span>
          )}
        </div>
      </div>
    </div>
  );
};
