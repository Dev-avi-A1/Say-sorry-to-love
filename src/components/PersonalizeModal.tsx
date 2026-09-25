import React, { useState } from 'react';
import { X, Heart, Check, Copy, Sparkles, Share2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSaveName: (name: string) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSaveName,
}) => {
  const [name, setName] = useState<string>(currentName);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playWarmResolutionChord();
    onSaveName(name.trim() || 'My Love');
    onClose();
  };

  const handleCopyShareLink = () => {
    sound.playKeyTick(1.2);
    const targetName = name.trim() || 'My Love';
    const url = new URL(window.location.href);
    url.searchParams.set('for', targetName);
    navigator.clipboard.writeText(url.toString());
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl glass-panel-glow p-6 border border-rose-500/30 relative">
        <button
          type="button"
          onClick={() => {
            sound.playKeyTick(0.8);
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-rose-400 font-code text-xs mb-3">
          <Sparkles className="w-4 h-4" />
          <span>personalize_target.config</span>
        </div>

        <h3 className="text-xl font-serif-title text-white mb-2">
          Personalize Recipient Name
        </h3>
        <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
          Customize her name or favorite nickname so the code, terminal diagnostics, and messages address her directly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-code text-zinc-300 mb-1.5">
              Her Name or Pet Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya, Sweetheart, Babe, My Love"
              maxLength={30}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-400 text-sm font-sans focus:outline-none focus:border-rose-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium font-code transition-all shadow-lg shadow-rose-600/30"
            >
              Save Name
            </button>
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-rose-200 text-xs font-code transition-all flex items-center gap-1.5"
              title="Copy personalized URL to share"
            >
              {linkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Link</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
