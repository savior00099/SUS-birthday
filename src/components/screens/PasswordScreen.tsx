import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Delete, ArrowLeft, KeyRound, Sparkles, HelpCircle } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { soundManager } from '../../utils/soundEffects';

interface PasswordScreenProps {
  onUnlock: () => void;
  onBack: () => void;
}

export const PasswordScreen: React.FC<PasswordScreenProps> = ({ onUnlock, onBack }) => {
  const { passwordScreen, secretPassword } = birthdayConfig;
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleDigit = (digit: string) => {
    if (isUnlocked || pin.length >= 4) return;
    soundManager.playPop();

    const newPin = pin + digit;
    setPin(newPin);
    setErrorMsg(null);

    if (newPin.length === 4) {
      if (newPin === secretPassword) {
        setIsUnlocked(true);
        soundManager.playSparkle();

        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#22D3EE', '#06B6D4', '#67E8F9', '#34D399', '#A5F3FC'],
        });

        setTimeout(() => {
          onUnlock();
        }, 850);
      } else {
        soundManager.playBoop();
        setIsShaking(true);
        setErrorMsg(passwordScreen.errorMessage);

        setTimeout(() => {
          setPin('');
          setIsShaking(false);
        }, 600);
      }
    }
  };

  const handleBackspace = () => {
    if (isUnlocked || pin.length === 0) return;
    soundManager.playPop();
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const handleClear = () => {
    if (isUnlocked) return;
    soundManager.playPop();
    setPin('');
    setErrorMsg(null);
  };

  return (
    <div className="relative min-h-[100svh] w-full flex items-center justify-center p-4 bg-pastel-stripes overflow-hidden">
      {/* Scrapbook Container Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#F0FDFF] rounded-3xl p-6 sm:p-7 shadow-[0_15px_35px_rgba(6,182,212,0.20)] border-4 border-cyan-200/90 text-center flex flex-col items-center z-10">

        {/* Back Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onBack();
          }}
          className="absolute top-4 left-4 p-2 rounded-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 transition-colors flex items-center gap-1 text-xs font-heading font-medium cursor-pointer"
          title="Return to welcome"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Top washi tape */}
        <div className="washi-tape-yellow px-5 py-0.5 rounded-sm text-[11px] font-heading font-semibold text-teal-900 tracking-wider mb-2">
          SECRET KEYPAD 🔐
        </div>

        {/* Circular cute badge */}
        <div className="relative mt-2 mb-2 w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-100 to-teal-100 border-2 border-teal-300 flex items-center justify-center shadow-inner">
          {isUnlocked ? (
            <span className="text-3xl animate-bounce">💖</span>
          ) : (
            <KeyRound className="w-7 h-7 text-cyan-500 animate-wiggle" />
          )}
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-teal-400 animate-spin-slow" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-cyan-900 tracking-tight mb-1">
          {isUnlocked ? passwordScreen.successMessage : passwordScreen.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-cyan-800/70 font-medium mb-4">
          {isUnlocked ? "Opening your special world... ✨" : passwordScreen.subtitle}
        </p>

        {/* 4 Password Indicator Dots */}
        <div
          className={`flex items-center justify-center gap-4 my-2 px-6 py-2.5 bg-cyan-50/70 rounded-2xl border border-cyan-100 transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center transition-all duration-300"
              >
                {isUnlocked ? (
                  <span className="text-xl animate-heartbeat text-cyan-500">💗</span>
                ) : (
                  <div
                    className={`rounded-full transition-all duration-200 ${
                      isFilled
                        ? 'w-5 h-5 bg-gradient-to-tr from-cyan-400 to-teal-500 shadow-sm scale-110'
                        : 'w-4 h-4 border-2 border-cyan-300 bg-white/80'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-1 text-xs text-sky-600 font-hand font-semibold animate-shake">
            {errorMsg}
          </div>
        )}

        {/* 0-9 Keypad Grid */}
        <div className="w-full max-w-[270px] grid grid-cols-3 gap-2.5 sm:gap-3 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              id={`keypad-digit-${digit}`}
              onClick={() => handleDigit(digit.toString())}
              disabled={isUnlocked}
              className="h-12 sm:h-13 rounded-2xl bg-white hover:bg-cyan-50 active:bg-cyan-100 border-2 border-cyan-200/80 text-cyan-900 font-heading font-semibold text-lg sm:text-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {digit}
            </button>
          ))}

          {/* Clear Button */}
          <button
            onClick={handleClear}
            disabled={isUnlocked || pin.length === 0}
            className="h-12 sm:h-13 rounded-2xl bg-teal-50 hover:bg-teal-100 active:bg-teal-200 border-2 border-teal-200 text-teal-800 font-heading text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-40"
          >
            Clear
          </button>

          {/* Zero */}
          <button
            id="keypad-digit-0"
            onClick={() => handleDigit('0')}
            disabled={isUnlocked}
            className="h-12 sm:h-13 rounded-2xl bg-white hover:bg-cyan-50 active:bg-cyan-100 border-2 border-cyan-200/80 text-cyan-900 font-heading font-semibold text-lg sm:text-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            0
          </button>

          {/* Backspace Button */}
          <button
            onClick={handleBackspace}
            disabled={isUnlocked || pin.length === 0}
            className="h-12 sm:h-13 rounded-2xl bg-sky-50 hover:bg-sky-100 active:bg-sky-200 border-2 border-sky-200 text-sky-700 flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-40"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Hint Section */}
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => {
              soundManager.playPop();
              setShowHint(!showHint);
            }}
            className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-800 font-heading font-medium underline underline-offset-2 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? "Hide hint" : "Forgot the secret code? ✨"}</span>
          </button>

          {showHint && (
            <div className="mt-2 py-1.5 px-3 bg-cyan-100/90 border border-cyan-300 rounded-xl text-cyan-800 text-xs font-hand font-bold shadow-sm">
              {passwordScreen.hintText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
