import React, { useState } from 'react';
import { X, ArrowLeft, Heart, Sparkles, MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../../config/birthdayConfig';
import { soundManager } from '../../utils/soundEffects';

interface LetterEnvelopeModalProps {
  onClose: () => void;
}

export const LetterEnvelopeModal: React.FC<LetterEnvelopeModalProps> = ({ onClose }) => {
  const { letter, name } = birthdayConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundManager.playSparkle();
    setIsOpen(true);

    // Sequence: Envelope flap opens -> Letter slides out -> Letter unfolds
    setTimeout(() => {
      setIsUnfolded(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#E879F9', '#FDE047'],
      });
    }, 700);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      soundManager.playPop();
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center p-3 sm:p-6 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-pink-200 my-auto text-left flex flex-col cursor-default"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-200/80 mb-4">
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs sm:text-sm font-heading font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Surprises Menu</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-2xl font-heading font-bold text-purple-950">
              {letter.title}
            </h2>
            <p className="text-xs sm:text-sm font-hand text-pink-600 font-bold">
              {letter.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Envelope & Letter Container */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[380px] py-4">
          
          {/* Closed / Interactive Envelope State */}
          {!isUnfolded && (
            <div className="flex flex-col items-center text-center animate-fadeIn">
              
              {/* Envelope Body */}
              <div
                onClick={handleOpenEnvelope}
                className={`relative w-72 sm:w-80 h-48 bg-[#FFF5F7] rounded-2xl border-3 border-pink-300 shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden ${
                  isOpen ? 'scale-105' : 'animate-bounce'
                }`}
              >
                {/* Envelope Flap */}
                <div
                  className={`absolute top-0 left-0 right-0 h-24 bg-pink-200 border-b-2 border-pink-300 origin-top transition-transform duration-700 z-20 ${
                    isOpen ? '-rotate-180 -translate-y-full opacity-60' : ''
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />

                {/* Wax Seal with Heart */}
                {!isOpen && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-400 border-2 border-red-500 rounded-full flex items-center justify-center shadow-md z-30 animate-pulse">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                )}

                {/* Stamp */}
                <div className="absolute top-3 right-3 w-10 h-12 bg-yellow-100 border border-dashed border-yellow-400 rounded-xs flex flex-col items-center justify-center text-xs">
                  <span>🌸</span>
                  <span className="text-[7px] font-bold text-yellow-700">SPECIAL</span>
                </div>

                {/* Recipient Address */}
                <div className="text-center font-hand text-purple-900 mt-12 z-10">
                  <p className="text-xs uppercase tracking-widest text-pink-500 font-heading">Special Delivery For:</p>
                  <p className="text-xl font-bold text-purple-950 mt-0.5">{name}</p>
                </div>
              </div>

              {/* Tap to Open Prompt */}
              <button
                onClick={handleOpenEnvelope}
                className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-heading font-semibold text-sm shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <MailOpen className="w-4 h-4" />
                <span>{isOpen ? 'Opening Letter... 🌸' : 'Tap to Break Seal & Open 💌'}</span>
              </button>
            </div>
          )}

          {/* Unfolded Letter Sheet */}
          {isUnfolded && (
            <div className="w-full bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border-2 border-pink-200 shadow-md relative bg-lined-paper animate-fadeIn">
              
              {/* Scrapbook Tape Accents */}
              <div className="absolute -top-3 left-10 washi-tape-pink px-4 py-0.5 rounded-xs text-[10px] font-heading font-bold text-pink-900">
                A SMALL LETTER FOR YOU 💌
              </div>
              <div className="absolute -top-3 right-10 washi-tape-yellow px-4 py-0.5 rounded-xs text-[10px] font-heading font-bold text-yellow-900">
                HAPPY BIRTHDAY 🌸
              </div>

              {/* Salutation */}
              <div className="font-hand text-2xl sm:text-3xl font-bold text-purple-950 mb-3">
                {letter.salutation}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 font-hand text-lg sm:text-xl font-semibold text-purple-900/90 leading-relaxed">
                {letter.paragraphs.map((p, index) => (
                  <p key={index} className="transition-all">
                    {p}
                  </p>
                ))}
              </div>

              {/* Sign-off & Sender */}
              <div className="mt-8 pt-4 border-t border-pink-200/60 font-hand text-right">
                <p className="text-lg text-pink-600 font-bold">{letter.signOff}</p>
                <p className="text-2xl font-extrabold text-purple-950 mt-1">{letter.sender}</p>
              </div>

              {/* Bottom Stamp / Seal & Return button */}
              <div className="mt-6 pt-2 flex items-center justify-between text-xs font-heading text-purple-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Sealed with heartfelt love</span>
                </span>
                <button
                  onClick={() => {
                    soundManager.playPop();
                    onClose();
                  }}
                  className="px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg cursor-pointer"
                >
                  Back to Surprises 🌸
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
