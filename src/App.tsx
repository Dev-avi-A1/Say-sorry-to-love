/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navigation } from './components/Navigation';
import { TerminalIntro } from './components/TerminalIntro';
import { HeroSection } from './components/HeroSection';
import { BugReport } from './components/BugReport';
import { GitCommit } from './components/GitCommit';
import { LoveMessage } from './components/LoveMessage';
import { ForgivenessSection } from './components/ForgivenessSection';
import { DeveloperPromise } from './components/DeveloperPromise';
import { FinalScreen } from './components/FinalScreen';
import { PersonalizeModal } from './components/PersonalizeModal';
import { sound } from './utils/audio';

export default function App() {
  const [showTerminalIntro, setShowTerminalIntro] = useState<boolean>(true);
  const [recipientName, setRecipientName] = useState<string>('My Love');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);

  // Initialize recipient name from URL parameters or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('for') || params.get('name') || params.get('to');
      if (nameParam) {
        setRecipientName(nameParam);
        localStorage.setItem('developer_apology_name', nameParam);
      } else {
        const storedName = localStorage.getItem('developer_apology_name');
        if (storedName) {
          setRecipientName(storedName);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playWarmResolutionChord();
    }
  };

  const handleSaveName = (newName: string) => {
    setRecipientName(newName);
    localStorage.setItem('developer_apology_name', newName);
  };

  return (
    <div className="relative min-h-screen bg-[#09090c] text-zinc-100 flex flex-col selection:bg-rose-500/30 selection:text-rose-200">
      {/* Background ambient canvas */}
      <BackgroundCanvas />

      {/* Opening Terminal Intro */}
      {showTerminalIntro && (
        <TerminalIntro
          recipientName={recipientName}
          onComplete={() => setShowTerminalIntro(false)}
        />
      )}

      {/* Main App Navigation (Top Bar Contract) */}
      <Navigation
        recipientName={recipientName}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onPersonalizeClick={() => setIsPersonalizeOpen(true)}
        onReplayTerminal={() => setShowTerminalIntro(true)}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 flex-1 space-y-4">
        {/* Hero Section */}
        <HeroSection
          recipientName={recipientName}
          onReplayTerminal={() => setShowTerminalIntro(true)}
        />

        {/* Interactive Bug Report */}
        <BugReport />

        {/* Git Commit Section */}
        <GitCommit />

        {/* Romantic Developer Message */}
        <LoveMessage />

        {/* Interactive Forgiveness Button */}
        <ForgivenessSection recipientName={recipientName} />

        {/* Developer's Promise */}
        <DeveloperPromise />

        {/* Final Screen */}
        <FinalScreen />
      </main>

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        currentName={recipientName}
        onSaveName={handleSaveName}
      />
    </div>
  );
}
