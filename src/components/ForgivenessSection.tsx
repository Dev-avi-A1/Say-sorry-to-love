import React, { useState, useEffect, useRef } from 'react';
import { Heart, Check, Sparkles, Send, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface ForgivenessSectionProps {
  recipientName: string;
}

export const ForgivenessSection: React.FC<ForgivenessSectionProps> = ({ recipientName }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'forgiven'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [showScreenTransition, setShowScreenTransition] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);
  const burstCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check saved state
  useEffect(() => {
    const saved = localStorage.getItem('developer_apology_forgiven');
    if (saved === 'true') {
      setStatus('forgiven');
      setProgress(100);
    }
    const savedNote = localStorage.getItem('developer_apology_note');
    if (savedNote) {
      setNoteText(savedNote);
      setNoteSaved(true);
    }
  }, []);

  // Handle clicking "Forgive This Developer? 🥺"
  const handleForgiveClick = () => {
    if (status !== 'idle') return;
    setStatus('loading');
    sound.playDiagnosticTone();

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      sound.playKeyTick(1.0 + (p / 100) * 0.5);

      if (p >= 100) {
        clearInterval(interval);
        // Trigger subtle screen transition
        setShowScreenTransition(true);

        setTimeout(() => {
          setShowScreenTransition(false);
          setStatus('forgiven');
          localStorage.setItem('developer_apology_forgiven', 'true');
          sound.playWarmResolutionChord();
          triggerHeartBurst();
        }, 600);
      }
    }, 45);
  };

  const handleReset = () => {
    localStorage.removeItem('developer_apology_forgiven');
    setStatus('idle');
    setProgress(0);
    sound.playKeyTick(0.8);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    localStorage.setItem('developer_apology_note', noteText.trim());
    setNoteSaved(true);
    sound.playWarmResolutionChord();
    triggerHeartBurst();
  };

  // Subtle elegant particles / floating hearts burst (anti-slop restraint)
  const triggerHeartBurst = () => {
    const canvas = burstCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 350;

    interface BurstParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
      isHeart: boolean;
      rot: number;
    }

    const particles: BurstParticle[] = [];
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffffff'];

    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 3.5 + 1.5;
      particles.push({
        x: canvas.width / 2,
        y: 120,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        alpha: 1,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: Math.random() > 0.35,
        rot: Math.random() * Math.PI,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
    };

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          if (p.isHeart) {
            drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      if (alive && frame < 120) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <section id="forgiveness" className="py-20 px-4 sm:px-6 max-w-3xl mx-auto relative">
      {/* Screen flash transition overlay */}
      {showScreenTransition && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-rose-500/20 backdrop-blur-sm transition-opacity duration-500" />
      )}

      <div className="glass-panel-glow rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden border border-rose-500/30">
        {/* Canvas for heart burst */}
        <canvas
          ref={burstCanvasRef}
          className="absolute inset-0 pointer-events-none z-10"
        />

        {status === 'idle' && (
          <div className="space-y-6">
            <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
              <Heart className="w-8 h-8 animate-pulse text-rose-500 fill-rose-500/50" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif-title font-normal text-white">
              Will You Give Me A Chance To Make It Right?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
              No ego. No defense. Just someone who loves you deeply, asking for your grace and promising to treat your heart like the precious gift it is.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleForgiveClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
              >
                <span className="text-xl">🥺</span>
                <span>Forgive This Developer?</span>
                <Sparkles className="w-4 h-4 text-rose-200 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="py-6 space-y-5">
            <div className="text-sm font-code text-rose-300 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Applying emotional patch...</span>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <div className="font-code text-rose-400 text-sm tracking-tight overflow-hidden">
                {'█'.repeat(Math.floor(progress / 5))}
                {'░'.repeat(20 - Math.floor(progress / 5))} {progress}%
              </div>
              <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-xs font-code text-zinc-500">
              Synchronizing feelings · Resolving hurts · Restoring warmth
            </p>
          </div>
        )}

        {status === 'forgiven' && (
          <div className="py-4 space-y-6 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-code text-xs sm:text-sm font-semibold tracking-wider">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>❤️ PATCH SUCCESSFULLY APPLIED ❤️</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-serif-title text-white tracking-wide">
              «Thank you for giving my heart another chance.»
            </h3>

            <div className="text-2xl sm:text-3xl font-serif-title text-rose-400 italic">
              &ldquo;I love you. ❤️&rdquo;
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Every commitment made in this patch is now permanently live in my heart.
            </p>

            {/* Optional Personal Note Box from Her */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] text-left max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-code text-zinc-300">
                  {noteSaved ? 'Your response has been saved ❤️' : 'Send a note back (Optional):'}
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] font-code text-zinc-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                  title="Re-run forgiveness interaction"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              </div>

              {!noteSaved ? (
                <form onSubmit={handleSaveNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write a message, a hug, or a condition... :)"
                    className="w-full text-xs font-code p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-400 focus:outline-none focus:border-rose-500/50 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded-lg bg-white/[0.06] hover:bg-rose-500/20 text-rose-200 border border-white/10 hover:border-rose-500/30 text-xs font-code font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Note to Heart Log</span>
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs font-code text-rose-200 space-y-1">
                  <div className="text-zinc-400">Response recorded:</div>
                  <div className="text-white italic">&ldquo;{noteText}&rdquo;</div>
                  <button
                    type="button"
                    onClick={() => setNoteSaved(false)}
                    className="text-[11px] text-rose-400 underline pt-1 block"
                  >
                    Edit note
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
