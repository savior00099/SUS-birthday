import React, { useState } from 'react';
import { X, ArrowLeft, Sparkles, RotateCcw, ExternalLink, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../../config/birthdayConfig';
import { GiftBoxSticker } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';

interface GiftBoxModalProps {
  onClose: () => void;
}

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({ onClose }) => {
  const { giftBox, nickname } = birthdayConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'film' | 'jewelry'>('film');

  const handleOpenGift = () => {
    if (isOpen) return;
    soundManager.playSparkle();
    setIsOpen(true);

    // Celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FBBF24', '#A78BFA', '#34D399', '#60A5FA', '#F43F5E'],
    });
  };

  const handleRewrap = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      soundManager.playPop();
      onClose();
    }
  };

  const giftSource = activeTab === 'film' ? '/gift-box/index.html' : '/gift-box/standalone.html';

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex flex-col items-center p-2 sm:p-4 md:p-6 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          isOpen ? 'max-w-4xl' : 'max-w-xl'
        } bg-[#FAF7F2] rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-4 border-pink-200 my-auto text-left flex flex-col cursor-default transition-all duration-300`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-pink-200/80 mb-4">
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

          <div className="text-center px-2">
            <h2 className="text-base sm:text-xl font-heading font-bold text-purple-950 flex items-center justify-center gap-1.5">
              <span>{giftBox.title}</span>
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
            </h2>
            <p className="text-[11px] sm:text-xs font-hand text-pink-600 font-bold">
              {giftBox.subtitle}
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

        {/* Unopened Stage */}
        {!isOpen ? (
          <div className="w-full flex flex-col items-center justify-center py-6">
            <div
              onClick={handleOpenGift}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 animate-bounce"
            >
              <GiftBoxSticker className="w-36 h-36 sm:w-44 sm:h-44" isOpen={false} />
            </div>

            <div className="mt-5 text-center">
              <button
                id="open-gift-box-btn"
                onClick={handleOpenGift}
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-heading font-bold text-base cute-btn flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                <span>Tap to Unwrap {nickname}'s Gift! 🎁</span>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
              </button>
              <p className="text-xs font-hand font-semibold text-purple-600 mt-2.5">
                Specially handpicked and prepared with love for you ♡
              </p>
            </div>
          </div>
        ) : (
          /* Opened Stage: The Interactive Gift Box Experience */
          <div className="w-full flex flex-col items-center animate-fadeIn">
            {/* View Mode Switcher & Fullscreen Button */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 bg-pink-50/80 p-2 rounded-2xl border border-pink-200">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab('film')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'film'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white/80 hover:bg-white text-pink-900 border border-pink-200'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-pink-200" />
                  <span>Blooming Tree & Film</span>
                </button>

                <button
                  onClick={() => setActiveTab('jewelry')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'jewelry'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white/80 hover:bg-white text-pink-900 border border-pink-200'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-pink-200" />
                  <span>Jewelry & Keepsakes</span>
                </button>
              </div>

              <a
                href={giftSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-semibold text-pink-700 bg-white/90 hover:bg-white border border-pink-200 transition-colors shadow-xs ml-auto"
                title="Open in full screen window"
              >
                <span>Full Screen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Gift Page Iframe */}
            <div className="relative w-full h-[480px] sm:h-[550px] md:h-[620px] rounded-2xl overflow-hidden border-2 border-pink-200 shadow-inner bg-[#fff8f1]">
              <iframe
                key={giftSource}
                src={giftSource}
                title="Birthday Gift Surprise"
                className="w-full h-full border-0"
                allow="autoplay"
              />
            </div>

            {/* Accompanying Words & Perks */}
            <div className="w-full mt-4 bg-[#FFFDF9] rounded-2xl p-4 sm:p-6 border-2 border-pink-200 shadow-sm flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-purple-950 mb-1.5">
                {giftBox.revealedHeading}
              </h3>

              <p className="font-hand text-base sm:text-lg font-bold text-pink-950 leading-relaxed max-w-xl">
                "{giftBox.message}"
              </p>

              {/* Special Perks / Badges */}
              <div className="w-full mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {giftBox.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-pink-50/80 border border-pink-200/80 text-xs font-heading font-semibold text-purple-900 flex items-center gap-2"
                  >
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRewrap}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-pink-700 hover:text-pink-900 bg-pink-100 hover:bg-pink-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{giftBox.openAgainText}</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playPop();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-purple-800 hover:text-purple-950 bg-purple-100 hover:bg-purple-200 border border-purple-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Surprises</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
