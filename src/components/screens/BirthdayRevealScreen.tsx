import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { BirthdayCake } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';
import { FloatingPetals } from '../common/FloatingPetals';

interface BirthdayRevealScreenProps {
  onOpenSurprises: () => void;
}

export const BirthdayRevealScreen: React.FC<BirthdayRevealScreenProps> = ({ onOpenSurprises }) => {
  const { revealScreen, name } = birthdayConfig;
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  // Trigger celebration confetti blast when screen mounts
  useEffect(() => {
    soundManager.playSparkle();

    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f9a8d4', '#f472b6', '#e879f9', '#c084fc', '#86efac', '#fde68a', '#ff6b9d'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    soundManager.playBlowOut();
    setCandlesBlown(true);
    setWishMade(true);

    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f9a8d4', '#f472b6', '#c084fc', '#86efac'],
    });
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-pastel-stripes overflow-x-hidden">
      <FloatingPetals count={20} />
      
      {/* Main Scrapbook Collage Card */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#F0FDFF] rounded-3xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(6,182,212,0.22)] border-4 border-cyan-200/90 text-center flex flex-col items-center z-10 my-4">
        
        {/* Top Decorative Flower Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape-purple px-5 py-1 rounded-sm text-xs font-heading font-medium text-teal-900 tracking-wider">
          A SPECIAL SURPRISE 🌊
        </div>

        {/* Level Up Badge */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 border border-cyan-200 rounded-full text-cyan-700 text-xs font-heading font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Another Year Of Pure Magic For {name}</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
        </div>

        {/* Large Animated Heading */}
        <h1 className="mt-3 text-3xl sm:text-4xl font-heading font-extrabold text-cyan-950 tracking-tight leading-tight">
          {revealScreen.heading}
        </h1>

        {/* Subheading */}
        <p className="mt-2 text-base sm:text-lg font-hand font-bold text-teal-600 max-w-sm leading-snug">
          {revealScreen.subheading}
        </p>

        {/* Interactive Birthday Cake */}
        <div className="relative my-3 flex flex-col items-center">
          <BirthdayCake
            isBlownOut={candlesBlown}
            onBlowOut={handleBlowCandles}
            className="w-44 h-44 sm:w-48 sm:h-48 cursor-pointer"
          />
          
          {/* Wish / Blow Candle Prompt */}
          <button
            onClick={handleBlowCandles}
            className="mt-1 px-4 py-1.5 bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 rounded-full text-yellow-900 text-xs font-heading font-medium shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{candlesBlown ? '✨ Wish made! Candles blown! ✨' : '🕯️ Tap cake to blow out candles! 💨'}</span>
          </button>

          {wishMade && (
            <p className="text-xs text-cyan-600 font-hand font-semibold mt-1 animate-float-gentle">
              Your secret wish is sealed with friendship magic! 💫
            </p>
          )}
        </div>

        {/* Tagline / Mini Scrapbook note */}
        <div className="w-full bg-cyan-50/70 border border-cyan-200/80 rounded-2xl p-3 my-3 text-xs sm:text-sm text-cyan-800 font-medium leading-relaxed">
          {revealScreen.tagline}
        </div>

        {/* Mini Polaroid Collage Preview */}
        <div className="relative w-full py-2 flex items-center justify-center gap-2 select-none overflow-hidden">
          <div className="w-20 sm:w-24 bg-white p-1.5 pb-3 rounded-lg shadow-md border border-cyan-100 -rotate-6 transform hover:rotate-0 transition-transform">
            <div className="w-full h-14 bg-sky-100 rounded flex items-center justify-center text-xl">
              📸
            </div>
            <p className="text-[9px] font-hand text-center text-cyan-800 mt-1 truncate">Memories</p>
          </div>

          <div className="w-20 sm:w-24 bg-white p-1.5 pb-3 rounded-lg shadow-md border border-cyan-100 rotate-3 transform hover:rotate-0 transition-transform z-10">
            <div className="w-full h-14 bg-teal-100 rounded flex items-center justify-center text-xl">
              💌
            </div>
            <p className="text-[9px] font-hand text-center text-cyan-800 mt-1 truncate">A small letter</p>
          </div>

          <div className="w-20 sm:w-24 bg-white p-1.5 pb-3 rounded-lg shadow-md border border-cyan-100 -rotate-3 transform hover:rotate-0 transition-transform">
            <div className="w-full h-14 bg-cyan-100 rounded flex items-center justify-center text-xl">
              🎁
            </div>
            <p className="text-[9px] font-hand text-center text-cyan-800 mt-1 truncate">Surprises</p>
          </div>
        </div>

        {/* Big Action Button */}
        <button
          id="open-surprises-btn"
          onClick={() => {
            soundManager.playSparkle();
            onOpenSurprises();
          }}
          className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-500 to-sky-500 text-white font-heading font-bold text-base sm:text-lg cute-btn flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200"
        >
          <Heart className="w-5 h-5 fill-current animate-heartbeat text-cyan-100" />
          <span>{revealScreen.buttonText}</span>
          <Sparkles className="w-5 h-5 text-teal-200" />
        </button>
      </div>
    </div>
  );
};
