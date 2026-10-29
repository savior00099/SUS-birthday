import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import {
  RetroCameraSticker,
  LoveLetterSticker,
  GiftBoxSticker,
  LoveNotesSticker,
  WishCakeSticker,
} from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';

export type SurpriseKey = 'gallery' | 'letter' | 'reasons' | 'wish' | 'gift';

interface SurpriseMenuScreenProps {
  onSelectSurprise: (key: SurpriseKey) => void;
  openedSurprises: Record<SurpriseKey, boolean>;
  onGoToFinal: () => void;
}

export const SurpriseMenuScreen: React.FC<SurpriseMenuScreenProps> = ({
  onSelectSurprise,
  openedSurprises,
  onGoToFinal,
}) => {
  const { surpriseMenu } = birthdayConfig;
  const totalCount = 5;
  const openedCount = Object.values(openedSurprises).filter(Boolean).length;
  const allOpened = openedCount >= totalCount;

  // Delightful mini floral interaction: tap the blossom for a secret thought!
  const [flowerMessage, setFlowerMessage] = useState<string | null>(null);
  const floralThoughts = [
    "🌸 You bring so much calm & happiness to those around you!",
    "🌷 Reminder: You are doing amazing, always.",
    "🌼 May this year bloom with your sweetest dreams!",
    "✨ You have the warmest, kindest heart.",
    "🌿 Grateful for every memory we share!",
  ];

  const handleFlowerTap = () => {
    soundManager.playSparkle();
    const nextMsg = floralThoughts[Math.floor(Math.random() * floralThoughts.length)];
    setFlowerMessage(nextMsg);
  };

  const handleCardClick = (key: SurpriseKey) => {
    soundManager.playSparkle();
    onSelectSurprise(key);
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col items-center justify-start p-4 sm:p-6 bg-pastel-stripes pb-12 overflow-x-hidden">
      
      {/* Header Container */}
      <div className="w-full max-w-2xl text-center my-4 sm:my-6 z-10">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/95 border border-purple-200 rounded-full text-purple-700 text-xs font-heading font-semibold shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>{surpriseMenu.progressText}: {openedCount}/{totalCount} unlocked</span>
          <span className="text-pink-500">🌸</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-purple-950 tracking-tight leading-tight">
          {surpriseMenu.heading}
        </h1>

        {/* Subtitle */}
        <p className="mt-1 text-sm sm:text-base font-hand font-bold text-pink-600">
          {surpriseMenu.subtitle}
        </p>

        {/* Mini Floral Interactive Blossom */}
        <div className="mt-3 flex flex-col items-center">
          <button
            onClick={handleFlowerTap}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50/90 hover:bg-pink-100 border border-pink-200 rounded-full text-pink-700 text-xs font-heading font-medium transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <span className="animate-wiggle">🌸</span>
            <span>Tap this flower for a sweet thought</span>
            <span className="text-[10px]">✨</span>
          </button>

          {flowerMessage && (
            <div className="mt-2 py-1.5 px-4 bg-white/90 border border-pink-200 rounded-2xl text-purple-900 text-xs sm:text-sm font-hand font-bold shadow-sm animate-fadeIn">
              {flowerMessage}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Surprise Cards Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 z-10 px-1">
        
        {/* Surprise 1: Retro Camera (Photo Gallery) */}
        <div
          id="surprise-card-camera"
          onClick={() => handleCardClick('gallery')}
          className="relative bg-[#FFFDF9] rounded-3xl p-5 border-3 border-purple-200/90 shadow-[0_8px_20px_rgba(168,85,247,0.12)] hover:shadow-[0_12px_28px_rgba(168,85,247,0.22)] transition-all transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col items-center text-center group"
        >
          {/* Card Washi Tape */}
          <div className="absolute -top-2.5 left-6 washi-tape-pink px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold text-pink-900 tracking-wider">
            {surpriseMenu.items.camera.badge}
          </div>

          {/* Completion Checkmark */}
          {openedSurprises.gallery && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span>Viewed</span>
            </div>
          )}

          {/* Sticker Illustration */}
          <div className="my-2 group-hover:scale-105 transition-transform">
            <RetroCameraSticker className="w-24 h-24" />
          </div>

          <h3 className="text-lg font-heading font-bold text-purple-950">
            {surpriseMenu.items.camera.title}
          </h3>
          <p className="text-xs text-purple-700/80 font-medium mt-0.5">
            {surpriseMenu.items.camera.subtitle}
          </p>

          <div className="mt-3 w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-heading font-semibold border border-purple-200 transition-colors">
            Tap to open photos 📸
          </div>
        </div>

        {/* Surprise 2: A Small Letter for You */}
        <div
          id="surprise-card-letter"
          onClick={() => handleCardClick('letter')}
          className="relative bg-[#FFFDF9] rounded-3xl p-5 border-3 border-pink-200/90 shadow-[0_8px_20px_rgba(244,114,182,0.12)] hover:shadow-[0_12px_28px_rgba(244,114,182,0.22)] transition-all transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="absolute -top-2.5 left-6 washi-tape-purple px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold text-purple-900 tracking-wider">
            {surpriseMenu.items.letter.badge}
          </div>

          {openedSurprises.letter && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span>Read</span>
            </div>
          )}

          <div className="my-2 group-hover:scale-105 transition-transform">
            <LoveLetterSticker className="w-24 h-24" />
          </div>

          <h3 className="text-lg font-heading font-bold text-purple-950">
            {surpriseMenu.items.letter.title}
          </h3>
          <p className="text-xs text-pink-700/80 font-medium mt-0.5">
            {surpriseMenu.items.letter.subtitle}
          </p>

          <div className="mt-3 w-full py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl text-xs font-heading font-semibold border border-pink-200 transition-colors">
            Tap to open letter 💌
          </div>
        </div>

        {/* Surprise 3: 6 Reasons I Love You + 1 Thing I Hate the Most */}
        <div
          id="surprise-card-reasons"
          onClick={() => handleCardClick('reasons')}
          className="relative bg-[#FFFDF9] rounded-3xl p-5 border-3 border-rose-200/90 shadow-[0_8px_20px_rgba(244,63,94,0.12)] hover:shadow-[0_12px_28px_rgba(244,63,94,0.22)] transition-all transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="absolute -top-2.5 left-6 washi-tape-pink px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold text-rose-950 tracking-wider">
            {surpriseMenu.items.reasons?.badge || 'Confession ♡'}
          </div>

          {openedSurprises.reasons && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span>Read ♡</span>
            </div>
          )}

          <div className="my-2 group-hover:scale-105 transition-transform">
            <LoveNotesSticker className="w-24 h-24" />
          </div>

          <h3 className="text-lg font-heading font-bold text-purple-950">
            {surpriseMenu.items.reasons?.title || '6 Reasons I Love You'}
          </h3>
          <p className="text-xs text-rose-700/80 font-medium mt-0.5">
            {surpriseMenu.items.reasons?.subtitle || 'Plus 1 secret thing I hate the most ♡'}
          </p>

          <div className="mt-3 w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-heading font-semibold border border-rose-200 transition-colors">
            Tap to open little notes 💖
          </div>
        </div>

        {/* Surprise 4: Make a Birthday Wish (Interactive Cake & Candle) */}
        <div
          id="surprise-card-wish"
          onClick={() => handleCardClick('wish')}
          className="relative bg-[#FFFDF9] rounded-3xl p-5 border-3 border-amber-200/90 shadow-[0_8px_20px_rgba(245,158,11,0.12)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.22)] transition-all transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="absolute -top-2.5 left-6 washi-tape-yellow px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold text-amber-950 tracking-wider">
            {surpriseMenu.items.wish?.badge || 'Wish Time 🎂'}
          </div>

          {openedSurprises.wish && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span>Wish Made ✨</span>
            </div>
          )}

          <div className="my-2 group-hover:scale-105 transition-transform">
            <WishCakeSticker className="w-24 h-24" />
          </div>

          <h3 className="text-lg font-heading font-bold text-purple-950">
            {surpriseMenu.items.wish?.title || 'Make a Birthday Wish'}
          </h3>
          <p className="text-xs text-amber-800/80 font-medium mt-0.5">
            {surpriseMenu.items.wish?.subtitle || "Blow out your candle & make a wish 🕯️✨"}
          </p>

          <div className="mt-3 w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-heading font-semibold border border-amber-200 transition-colors">
            Tap to blow candle & wish 🎂
          </div>
        </div>

        {/* Surprise 5: Surprise Gift Box */}
        <div
          id="surprise-card-gift"
          onClick={() => handleCardClick('gift')}
          className="relative bg-[#FFFDF9] rounded-3xl p-5 border-3 border-indigo-200/90 shadow-[0_8px_20px_rgba(99,102,241,0.12)] hover:shadow-[0_12px_28px_rgba(99,102,241,0.22)] transition-all transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col items-center text-center group sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute -top-2.5 left-6 washi-tape-purple px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold text-indigo-950 tracking-wider">
            {surpriseMenu.items.gift.badge}
          </div>

          {openedSurprises.gift && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span>Unwrapped</span>
            </div>
          )}

          <div className="my-2 group-hover:scale-105 transition-transform">
            <GiftBoxSticker className="w-24 h-24" />
          </div>

          <h3 className="text-lg font-heading font-bold text-purple-950">
            {surpriseMenu.items.gift.title}
          </h3>
          <p className="text-xs text-indigo-700/80 font-medium mt-0.5">
            {surpriseMenu.items.gift.subtitle}
          </p>

          <div className="mt-3 w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-heading font-semibold border border-indigo-200 transition-colors">
            Tap to open gift 🎁
          </div>
        </div>
      </div>

      {/* Final Wish Transition Button */}
      <div className="w-full max-w-xl mt-6 px-1 z-10 flex flex-col items-center">
        <button
          id="see-final-wish-btn"
          onClick={() => {
            soundManager.playSparkle();
            onGoToFinal();
          }}
          className={`w-full py-4 px-6 rounded-2xl font-heading font-bold text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
            allOpened
              ? 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white cute-btn animate-pulse'
              : 'bg-white/90 hover:bg-white text-purple-800 border-2 border-purple-200 shadow-sm'
          }`}
        >
          <span>{surpriseMenu.finishButtonText}</span>
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </button>

        {!allOpened && (
          <p className="text-xs text-purple-600 font-hand font-semibold mt-2 text-center">
            You can check out all 5 surprises or tap above to see the final wish! 🌸
          </p>
        )}
      </div>
    </div>
  );
};
