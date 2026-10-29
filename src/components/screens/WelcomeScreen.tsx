import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../../config/birthdayConfig';
import { CutePuppy } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';
import { FloatingPetals } from '../common/FloatingPetals';

interface WelcomeScreenProps {
  onYes: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onYes }) => {
  const { welcome } = birthdayConfig;
  const [noCount, setNoCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [playfulMessage, setPlayfulMessage] = useState<string | null>(null);

  const handleYes = () => {
    soundManager.playSparkle();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f9a8d4', '#f472b6', '#e879f9', '#c084fc', '#86efac', '#fde68a', '#ff6b9d'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    setTimeout(() => {
      onYes();
    }, 450);
  };

  const handleNo = () => {
    soundManager.playBoop();
    setIsShaking(true);

    const messageIndex = noCount % welcome.noPlayfulResponses.length;
    setPlayfulMessage(welcome.noPlayfulResponses[messageIndex]);
    setNoCount((prev) => prev + 1);

    setTimeout(() => {
      setIsShaking(false);
    }, 450);
  };

  const yesScale = Math.min(1 + noCount * 0.08, 1.35);

  return (
    <div className="relative min-h-[100svh] w-full flex items-center justify-center p-4 bg-pastel-stripes overflow-hidden">
      <FloatingPetals count={16} />
      {/* Top and Bottom Accent Borders */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-cyan-300/40" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-cyan-300/40" />

      {/* Main Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#F0FDFF] rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(6,182,212,0.20)] border-4 border-cyan-200/90 text-center flex flex-col items-center z-10">

        {/* Washi Tape Header */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 washi-tape-pink px-6 py-1 rounded-sm text-xs font-heading font-medium text-sky-900 tracking-wider uppercase">
          ★ Top Secret Surprise ★
        </div>

        {/* Puppy Illustration */}
        <div className="mt-2 mb-3 animate-float-slow">
          <CutePuppy className="w-32 h-32 sm:w-36 sm:h-36" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-cyan-900 tracking-tight mb-2">
          {welcome.greeting}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-cyan-800/80 font-medium leading-relaxed max-w-xs mb-6">
          {welcome.subGreeting}
        </p>

        {/* Playful Rejection Toast */}
        {playfulMessage && (
          <div
            className={`w-full mb-5 py-2 px-3 bg-sky-100 border border-sky-300 rounded-2xl text-sky-700 text-sm font-hand font-semibold shadow-sm transition-all animate-bounce ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            {playfulMessage}
          </div>
        )}

        {/* Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-1">
          {/* YES Button */}
          <button
            id="welcome-yes-btn"
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-500 text-white font-heading font-semibold text-base sm:text-lg cute-btn flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200"
          >
            <span>{welcome.yesButtonText}</span>
          </button>

          {/* NO Button */}
          <button
            id="welcome-no-btn"
            onClick={handleNo}
            className={`w-full sm:w-auto py-3 px-5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-cyan-800 font-heading font-medium text-sm sm:text-base border-2 border-teal-200/80 cursor-pointer transition-all ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            <span>{welcome.noButtonText}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-cyan-400 font-hand font-semibold">
          <span>✨</span>
          <span>Made just for you with endless love</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};
