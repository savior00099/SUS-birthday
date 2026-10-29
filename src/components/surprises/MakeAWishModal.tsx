import React, { useState } from 'react';
import { X, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/soundEffects';

interface MakeAWishModalProps {
  onClose: () => void;
}

export const MakeAWishModal: React.FC<MakeAWishModalProps> = ({ onClose }) => {
  // States: 'wishing' | 'extinguishing' | 'revealed'
  const [wishState, setWishState] = useState<'wishing' | 'extinguishing' | 'revealed'>('wishing');
  const [isSmoking, setIsSmoking] = useState(false);

  const handleMakeWish = () => {
    if (wishState !== 'wishing') return;

    // Transition to extinguishing state
    setWishState('extinguishing');
    setIsSmoking(true);
    soundManager.playBlowOut();

    // Trigger colorful emoji-matching confetti burst
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f9a8d4', '#f472b6', '#e879f9', '#c084fc', '#86efac', '#fde68a', '#ff6b9d'],
    });

    // Magical chime and reveal
    setTimeout(() => {
      soundManager.playSparkle();
      setWishState('revealed');
    }, 900);
  };

  const handleRelight = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playSparkle();
    setIsSmoking(false);
    setWishState('wishing');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      soundManager.playPop();
      onClose();
    }
  };

  const isLit = wishState === 'wishing';
  const isExtinguishing = wishState === 'extinguishing';
  const isRevealed = wishState === 'revealed';

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="make-a-wish-title"
    >
      {/* Scrapbook Wish Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-5 sm:p-8 border-4 border-pink-200/90 shadow-[0_20px_50px_rgba(244,114,182,0.25)] flex flex-col items-center text-center cursor-default z-10 my-auto animate-fade-up select-none"
      >
        {/* Top Decorative Vintage Washi Tape */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 washi-tape-pink px-6 py-1 rounded-xs text-xs font-heading font-bold text-pink-950 tracking-wider shadow-xs">
          WISH TRADITION 🎂✨
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors cursor-pointer border border-pink-200"
          title="Close modal"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Doodles / Stamps */}
        <div className="absolute top-6 left-6 text-pink-300 opacity-60 text-lg hidden sm:block">🌸</div>
        <div className="absolute top-10 right-10 text-yellow-400 opacity-70 text-lg hidden sm:block animate-wiggle">✨</div>
        <div className="absolute bottom-6 left-6 text-purple-300 opacity-60 text-lg hidden sm:block">🌷</div>
        <div className="absolute bottom-8 right-8 text-pink-400 opacity-60 text-lg hidden sm:block animate-heartbeat">♡</div>

        {/* 1. Opening Header */}
        <div className="w-full mt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/80 border border-pink-200 rounded-full text-pink-800 text-xs font-heading font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>Time to Make a Birthday Wish</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          </div>

          <h1
            id="make-a-wish-title"
            className="text-2xl sm:text-3xl font-heading font-extrabold text-[#701a75] tracking-tight leading-tight"
          >
            Okay, birthday star… it's wish time! 🎂
          </h1>

          <p className="mt-1 text-sm sm:text-base font-hand font-bold text-pink-700">
            There's one little birthday tradition we can't skip.
          </p>
        </div>

        {/* 2. Illustrated Birthday Cake with ONE Prominent Lit Candle */}
        <div className="relative my-4 flex flex-col items-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-md select-none"
            >
              {/* Soft Radial Warm Candle Glow (when candle is lit) */}
              {isLit && (
                <ellipse
                  cx="100"
                  cy="38"
                  rx="45"
                  ry="35"
                  fill="url(#candle-glow)"
                  className="animate-pulse"
                />
              )}

              <defs>
                <radialGradient id="candle-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#FDE047" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Decorative Stars / Doodles around the cake */}
              <text x="22" y="55" fontSize="14" fill="#FBBF24" opacity="0.85">✨</text>
              <text x="165" y="60" fontSize="13" fill="#F472B6" opacity="0.85">🌸</text>
              <text x="26" y="145" fontSize="12" fill="#EC4899" opacity="0.7">♡</text>
              <text x="165" y="145" fontSize="13" fill="#FBBF24" opacity="0.85">⭐</text>

              {/* Porcelain Cake Stand / Plate */}
              <ellipse cx="100" cy="180" rx="76" ry="12" fill="#E2E8F0" />
              <ellipse cx="100" cy="177" rx="74" ry="10" fill="#FFFDF8" stroke="#E2E8F0" strokeWidth="2" />
              <path d="M 85 180 L 80 192 L 120 192 L 115 180 Z" fill="#E2E8F0" opacity="0.7" />

              {/* Bottom Tier (Dusty Pink & Warm Cream) */}
              <rect x="42" y="125" width="116" height="48" rx="10" fill="#FDE8EE" stroke="#F472B6" strokeWidth="2.5" />
              
              {/* Bottom Tier Frosting Layer */}
              <path
                d="M 42 133 C 50 142, 56 142, 64 133 C 72 144, 78 144, 86 133 C 94 144, 102 144, 110 133 C 118 144, 126 144, 134 133 C 142 142, 148 142, 158 133 L 158 125 L 42 125 Z"
                fill="#FFF4E6"
              />

              {/* Bottom Tier Decorative Sprinkles & Little Hearts */}
              <circle cx="56" cy="150" r="2.5" fill="#EC4899" />
              <circle cx="75" cy="157" r="2.5" fill="#8B5CF6" />
              <circle cx="95" cy="150" r="2.5" fill="#F59E0B" />
              <circle cx="115" cy="158" r="2.5" fill="#10B981" />
              <circle cx="136" cy="151" r="2.5" fill="#EC4899" />
              <circle cx="147" cy="142" r="2" fill="#3B82F6" />

              {/* Top Tier (Warm Ivory / Vanilla) */}
              <rect x="62" y="85" width="76" height="42" rx="8" fill="#FFF8F0" stroke="#F9A8D4" strokeWidth="2.5" />

              {/* Top Tier Frosting Drips */}
              <path
                d="M 62 93 C 68 102, 74 102, 80 93 C 86 103, 92 103, 98 93 C 104 103, 110 103, 116 93 C 122 102, 128 102, 138 93 L 138 85 L 62 85 Z"
                fill="#FCE7F3"
              />

              {/* Top Tier Cherries / Berries */}
              <circle cx="78" cy="85" r="4" fill="#E11D48" />
              <circle cx="100" cy="84" r="4.5" fill="#BE185D" />
              <circle cx="122" cy="85" r="4" fill="#E11D48" />

              {/* ONE PROMINENT LIT CANDLE IN THE CENTER */}
              {/* Candle Body */}
              <rect
                x="96"
                y="46"
                width="8"
                height="38"
                rx="3"
                fill="#FEF3C7"
                stroke="#D97706"
                strokeWidth="1.5"
              />
              {/* Candle Pastel Pink Decorative Stripes */}
              <path d="M 96 55 L 104 59" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
              <path d="M 96 65 L 104 69" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
              <path d="M 96 75 L 104 79" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />

              {/* Candle Wick */}
              <line x1="100" y1="46" x2="100" y2="39" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />

              {/* Candle Flame (when lit) */}
              {isLit && (
                <g className="animate-candle">
                  {/* Outer Warm Golden Flame */}
                  <path
                    d="M 100 39 C 94 32, 94 24, 100 16 C 106 24, 106 32, 100 39 Z"
                    fill="#F59E0B"
                  />
                  {/* Inner Bright Yellow Flame */}
                  <path
                    d="M 100 38 C 96 32, 96 26, 100 20 C 104 26, 104 32, 100 38 Z"
                    fill="#FEF08A"
                  />
                  {/* Tiny Hot White Core */}
                  <ellipse cx="100" cy="33" rx="1.8" ry="3" fill="#FFFFFF" />
                </g>
              )}

              {/* Extinguishing Flame Effect */}
              {isExtinguishing && (
                <g className="animate-flame-extinguish">
                  <path
                    d="M 100 39 C 93 30, 93 22, 100 15 C 107 22, 107 30, 100 39 Z"
                    fill="#F59E0B"
                    opacity="0.75"
                  />
                  <circle cx="100" cy="30" r="3" fill="#FEF08A" />
                </g>
              )}

              {/* Animated Smoke Curls when extinguished */}
              {(isSmoking || isRevealed) && (
                <g>
                  {/* Smoke Trail 1 */}
                  <path
                    d="M 100 37 Q 96 30 99 24 T 96 14 T 101 4"
                    stroke="#CBD5E1"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-smoke-1"
                  />
                  {/* Smoke Trail 2 */}
                  <path
                    d="M 100 37 Q 104 32 101 26 T 105 18 T 100 10"
                    stroke="#E2E8F0"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-smoke-2"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* 3. Wish Preparation Stage */}
        {isLit && (
          <div className="w-full max-w-sm flex flex-col items-center animate-fade-up">
            <p className="text-sm sm:text-base font-hand font-bold text-burgundy text-[#831843] leading-relaxed">
              Close your eyes, make a wish, and keep it just for yourself. ♡
            </p>

            {/* "I've Made My Wish" Button */}
            <button
              id="make-wish-action-btn"
              onClick={handleMakeWish}
              className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-heading font-bold text-base sm:text-lg cute-btn flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
            >
              <Sparkles className="w-5 h-5 text-yellow-200" />
              <span>I've Made My Wish ✨</span>
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </button>

            <p className="mt-2 text-[11px] text-pink-500 font-medium font-hand">
              Tap the button to blow out your candle 🕯️💨
            </p>
          </div>
        )}

        {/* 4. Extinguishing State (Smooth transition message) */}
        {isExtinguishing && (
          <div className="w-full max-w-sm flex flex-col items-center py-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-800 text-sm font-heading font-medium animate-pulse">
              <span>Puff! Blowing out your candle... 💨</span>
              <span className="text-base">✨</span>
            </div>
          </div>
        )}

        {/* 5. Magical Reveal Stage */}
        {isRevealed && (
          <div className="w-full max-w-md flex flex-col items-center animate-fade-up">
            {/* The Heartfelt Wish Blessing Box */}
            <div className="relative w-full bg-[#FFF9F2] border-2 border-pink-200 rounded-2xl p-4 sm:p-5 shadow-inner text-left my-2">
              {/* Corner Tape Stamp */}
              <div className="absolute -top-2.5 right-6 washi-tape-yellow px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold text-teal-900">
                A WISH FOR YOU ♡
              </div>

              <p className="text-xs sm:text-sm font-hand font-bold text-[#831843] leading-relaxed sm:leading-loose">
                “May this new chapter bring you the happiness you deserve, the courage to chase your dreams, the little surprises that make you smile, and beautiful moments you'll want to remember forever. May some of your most wonderful wishes come true when you least expect them. Happy Birthday, you! ♡”
              </p>
            </div>

            {/* Final Interaction Text */}
            <p className="mt-2 text-sm sm:text-base font-heading font-bold text-purple-950 flex items-center justify-center gap-1.5">
              <span>Wish made. Now let the magic begin. 💌</span>
            </p>

            {/* Action Buttons: Return to Scrapbook & Replay */}
            <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="back-to-scrapbook-btn"
                onClick={() => {
                  soundManager.playPop();
                  onClose();
                }}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-heading font-bold text-sm cute-btn flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Our Scrapbook</span>
              </button>

              <button
                id="relight-candle-btn"
                onClick={handleRelight}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-pink-100/80 hover:bg-pink-200/90 text-pink-900 font-heading font-semibold text-xs transition-colors cursor-pointer border border-pink-200"
                title="Relight candle and make another wish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Make Another Wish 🕯️</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer gentle hint */}
        <p className="text-[11px] text-pink-400 font-hand font-medium mt-4">
          Tap anywhere outside to return to your scrapbook 🌸
        </p>
      </div>
    </div>
  );
};
