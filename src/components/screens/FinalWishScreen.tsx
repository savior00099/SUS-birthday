import React, { useState } from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { soundManager } from '../../utils/soundEffects';
import { FloatingPetals } from '../common/FloatingPetals';
import { PhotoPlaceholderIllustration } from '../common/CuteDoodles';

interface FinalWishScreenProps {
  onReplay: () => void;
}

export const FinalWishScreen: React.FC<FinalWishScreenProps> = ({ onReplay }) => {
  const { finalScreen, name } = birthdayConfig;
  const [step, setStep] = useState<'pause' | 'revealed'>('pause');
  const [photoError, setPhotoError] = useState(false);

  const handleRevealLetter = () => {
    soundManager.playSparkle();
    setStep('revealed');
  };

  const handleReplayClick = () => {
    soundManager.playSparkle();
    onReplay();
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-pastel-stripes pb-12 overflow-x-hidden">
      {/* Ambient floating petals */}
      <FloatingPetals count={20} />

      {/* ── STEP 1: A QUIET PAUSE ── */}
      {step === 'pause' && (
        <div
          id="final-step-pause"
          className="relative w-full max-w-md sm:max-w-lg bg-[#FFFDF8] rounded-3xl p-7 sm:p-10 border-4 border-pink-200/90 shadow-[0_20px_45px_rgba(244,114,182,0.22)] text-center flex flex-col items-center z-10 my-auto animate-fade-up select-none"
        >
          {/* Top Vintage Washi Tape */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 washi-tape-pink px-6 py-1 rounded-xs text-xs font-heading font-bold text-pink-950 tracking-wider shadow-xs">
            A QUIET PAUSE ♡
          </div>

          {/* Delicate Decorative Doodles */}
          <div className="my-3 flex items-center justify-center gap-2 text-pink-400">
            <span className="text-xl">🌸</span>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-wiggle" />
            <span className="text-xl">✨</span>
          </div>

          {/* Centered Emotional Text in Elegant Handwritten Font */}
          <h1 className="my-4 text-2xl sm:text-3xl md:text-4xl font-hand font-bold text-[#701a75] tracking-wide leading-relaxed">
            “{finalScreen.pauseText}”
          </h1>

          {/* Small Action Button */}
          <button
            id="reveal-letter-btn"
            onClick={handleRevealLetter}
            className="mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-heading font-bold text-sm sm:text-base cute-btn flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
          >
            <Heart className="w-4 h-4 fill-pink-100 text-pink-100 animate-heartbeat" />
            <span>{finalScreen.pauseButtonText}</span>
            <Sparkles className="w-4 h-4 text-yellow-200" />
          </button>

          <p className="mt-3 text-[11px] text-pink-400 font-hand font-medium">
            Take a slow breath and tap above when you're ready ♡
          </p>
        </div>
      )}

      {/* ── STEP 2, 3, 4: REVEAL THE LETTER, FINAL PHOTO & CLOSING ── */}
      {step === 'revealed' && (
        <div
          id="final-step-letter"
          className="relative w-full max-w-xl sm:max-w-2xl bg-[#FFFDF8] rounded-3xl p-5 sm:p-9 border-4 border-pink-200/90 shadow-[0_24px_50px_rgba(244,114,182,0.25)] flex flex-col items-center z-10 my-4 animate-paper-unfold select-none"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 washi-tape-purple px-6 py-1 rounded-xs text-xs font-heading font-bold text-purple-950 tracking-wider shadow-xs">
            ONE LAST WISH FOR YOU 💌
          </div>

          {/* Header Badge */}
          <div className="mt-2 mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 bg-pink-100/80 border border-pink-200 rounded-full text-pink-900 text-xs font-heading font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>For {name} on Your Birthday</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          </div>

          {/* ── STEP 2: The Letter Stationery Paper ── */}
          <div className="w-full bg-[#FFFBF5] rounded-2xl p-5 sm:p-7 border border-pink-200/80 shadow-inner relative text-left">
            {/* Corner Decorative Flower Doodle */}
            <div className="absolute top-3 right-3 text-sm opacity-60">🌸</div>

            {/* Letter Paragraphs */}
            <div className="space-y-4">
              {finalScreen.letterParagraphs.map((para, index) => (
                <p
                  key={index}
                  className="font-hand font-bold text-base sm:text-lg text-[#701a75] leading-relaxed sm:leading-loose"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Handwritten Signature */}
            <div className="mt-6 pt-3 border-t border-pink-200/60 flex flex-col items-end">
              <p className="font-hand font-bold text-lg sm:text-xl text-rose-800 tracking-wide flex items-center gap-1">
                <span>{finalScreen.signature}</span>
                <span className="text-pink-500 text-base">🌸</span>
              </p>
            </div>
          </div>

          {/* ── STEP 3: The Final Photo in Vintage Polaroid Frame ── */}
          <div className="w-full my-6 flex flex-col items-center animate-fade-up">
            <div className="relative bg-white p-3.5 sm:p-4 pb-6 rounded-2xl shadow-[0_14px_32px_rgba(0,0,0,0.1)] border border-pink-100 -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-sm sm:max-w-md w-full mx-auto select-none">
              {/* Tape Accent on top of Polaroid */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 washi-tape-yellow px-5 py-0.5 rounded-xs text-[10px] font-heading font-bold text-teal-900 shadow-2xs">
                A TREASURED MOMENT ♡
              </div>

              {/* Photo Frame Container */}
              <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-pink-50 flex items-center justify-center border border-pink-100/60 relative">
                {finalScreen.finalPhoto.url && !photoError ? (
                  <img
                    src={finalScreen.finalPhoto.url}
                    alt={finalScreen.finalPhoto.alt || "Our favourite memory"}
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                ) : (
                  <PhotoPlaceholderIllustration type="celebrate" bg="#FCE7F3" />
                )}
              </div>

              {/* Caption */}
              <p className="font-hand text-base sm:text-lg font-bold text-purple-950 text-center mt-3 leading-snug">
                {finalScreen.finalPhoto.caption}
              </p>
            </div>
          </div>

          {/* ── STEP 4: Final Screen Message & Replay ── */}
          <div className="w-full flex flex-col items-center text-center mt-1 animate-fade-up">
            {/* The Final Heartfelt Statement */}
            <p className="font-heading font-extrabold text-base sm:text-lg text-purple-950 max-w-md px-2 leading-relaxed">
              “{finalScreen.finalMessage}”
            </p>

            {/* Small Replay Button returning to the beginning */}
            <button
              id="replay-experience-btn"
              onClick={handleReplayClick}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-purple-900 border border-pink-200 font-heading font-semibold text-xs sm:text-sm cursor-pointer shadow-xs transition-transform active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-pink-600" />
              <span>{finalScreen.replayButtonText}</span>
            </button>

            {/* Footer */}
            <p className="mt-4 text-xs text-purple-500 font-hand font-semibold">
              {finalScreen.footerText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
