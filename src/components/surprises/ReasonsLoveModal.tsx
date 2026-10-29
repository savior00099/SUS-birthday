import React, { useState } from 'react';
import { X, ArrowLeft, Sparkles, ChevronDown, ChevronUp, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/soundEffects';

interface ReasonsLoveModalProps {
  onClose: () => void;
}

interface ReasonCard {
  id: number;
  numberStr: string;
  title: string;
  teaser: string;
  message: string;
  emoji: string;
  tapeColor: 'pink' | 'purple' | 'yellow';
  rotation: string;
}

const REASONS: ReasonCard[] = [
  {
    id: 1,
    numberStr: "Reason #1",
    title: "Your Personality",
    teaser: "The warmth, kindness, and genuine charm you carry...",
    message: "I love your personality so much. The way you talk, your kindness, your thoughtful mind, and how genuine you are in everything you do. Being around you brings so much warmth and positivity into my life.",
    emoji: "✨",
    tapeColor: "pink",
    rotation: "-rotate-1",
  },
  {
    id: 2,
    numberStr: "Reason #2",
    title: "Your Aims & Goals",
    teaser: "The ambition and focus you have for your dreams...",
    message: "I truly admire your aim and goals in life. You have a clear vision, high morals, and dedication. Seeing your determination inspires me, and I will always pray and root for all your dreams to come true, insha'Allah.",
    emoji: "🎯",
    tapeColor: "purple",
    rotation: "rotate-1",
  },
  {
    id: 3,
    numberStr: "Reason #3",
    title: "How Religious-Minded You Are",
    teaser: "Your faith, devotion, and the pure values you hold...",
    message: "This is something I respect and admire the most about you. In a world where people forget their values, your faith, modesty, and devotion make your character truly honourable and beautiful.",
    emoji: "🕊️",
    tapeColor: "yellow",
    rotation: "-rotate-1.5",
  },
  {
    id: 4,
    numberStr: "Reason #4",
    title: "You Are Truly Different",
    teaser: "You don't follow the crowd; you're one of a kind...",
    message: "You stand out from everyone else. You have your own authentic way of thinking, your own unique identity, and you never pretend to be someone you're not. You're rare, Hamida.",
    emoji: "🌟",
    tapeColor: "pink",
    rotation: "rotate-1",
  },
  {
    id: 5,
    numberStr: "Reason #5",
    title: "The Way You Are",
    teaser: "Just simply you — with all your quirks and innocence...",
    message: "I love you just the way you are. You don't have to be perfect or have everything figured out. Your quirks, your laughter, your thoughts, and everything that makes you Humo is already more than enough.",
    emoji: "🌸",
    tapeColor: "purple",
    rotation: "-rotate-1",
  },
  {
    id: 6,
    numberStr: "Reason #6",
    title: "Your Voice",
    teaser: "A calming sound that brings instant comfort...",
    message: "I genuinely love your voice. Listening to you speak brings an instant sense of peace and comfort. Even when my day is stressful, just hearing you talk makes everything feel ten times lighter.",
    emoji: "🎙️",
    tapeColor: "yellow",
    rotation: "rotate-1.5",
  },
];

const SEVENTH_NOTE = {
  id: 7,
  teaserBadge: "P.S. There's one more thing… 🙈",
  title: "What I Hate the Most… 🥺",
  initialTeaser: "There's actually one thing I 'hate' about you, missy…",
  revealedMessage: "I hate how you don't message me properly! 😭 You take so long to reply or leave me waiting, and you don't even realize how much I look forward to hearing from you! Every single time your message pops up, it brings a big smile to my face. So please... text me more, okay? 🥺💗",
  emoji: "💬",
};

export const ReasonsLoveModal: React.FC<ReasonsLoveModalProps> = ({ onClose }) => {
  // Track open state for each card independently
  const [openedCards, setOpenedCards] = useState<Record<number, boolean>>({});
  // Track revealed history so user gets completion progress
  const [everRevealed, setEverRevealed] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    soundManager.playSparkle();
    const willBeOpen = !openedCards[id];

    setOpenedCards((prev) => ({
      ...prev,
      [id]: willBeOpen,
    }));

    if (willBeOpen) {
      setEverRevealed((prev) => {
        const next = { ...prev, [id]: true };
        // Check if all 7 have been opened
        if (Object.keys(next).length === 7) {
          confetti({
            particleCount: 60,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#f9a8d4', '#f472b6', '#e879f9', '#c084fc', '#86efac', '#fde68a', '#ff6b9d'],
          });
        }
        return next;
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      soundManager.playPop();
      onClose();
    }
  };

  const openedCount = Object.keys(everRevealed).length;
  const isAllOpened = openedCount === 7;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reasons-heading"
    >
      {/* Scrapbook Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl p-4 sm:p-7 border-4 border-pink-200/90 shadow-[0_20px_50px_rgba(244,114,182,0.25)] flex flex-col items-center text-center cursor-default z-10 my-4 sm:my-8 animate-fade-up select-none"
      >
        {/* Top Decorative Vintage Washi Tape */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 washi-tape-purple px-6 py-1 rounded-xs text-xs font-heading font-bold text-purple-950 tracking-wider shadow-xs">
          A LITTLE SCRAPBOOK CONFESSION ♡
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

        {/* Header Section */}
        <div className="w-full mt-2 mb-4">
          {/* Subtle Progress Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/90 border border-pink-200 rounded-full text-pink-800 text-xs font-heading font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>{openedCount} of 7 notes opened</span>
            {isAllOpened ? (
              <span className="text-pink-600">🎉 All read!</span>
            ) : (
              <span className="text-pink-500">✨</span>
            )}
          </div>

          <h1
            id="reasons-heading"
            className="text-2xl sm:text-3xl font-heading font-extrabold text-[#701a75] tracking-tight leading-tight"
          >
            6 Reasons I Love You ♡
          </h1>

          <p className="mt-1 text-sm sm:text-base font-hand font-bold text-pink-700">
            Tap each little note to open it.
          </p>
        </div>

        {/* 6 Reasons Grid: 2 columns on desktop, 1 column on mobile */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 my-2 text-left">
          {REASONS.map((card) => {
            const isOpen = Boolean(openedCards[card.id]);
            const wasRead = Boolean(everRevealed[card.id]);

            const tapeClass =
              card.tapeColor === 'pink'
                ? 'washi-tape-pink text-pink-900'
                : card.tapeColor === 'purple'
                ? 'washi-tape-purple text-purple-900'
                : 'washi-tape-yellow text-teal-900';

            return (
              <div
                key={card.id}
                id={`reason-card-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(card.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(card.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                className={`relative bg-[#FFFBF5] rounded-2xl p-4 sm:p-5 border-2 ${
                  isOpen ? 'border-pink-400 shadow-md ring-2 ring-pink-200' : 'border-pink-200/80 shadow-xs hover:border-pink-300'
                } transition-all duration-300 cursor-pointer flex flex-col justify-between group active:scale-99 ${card.rotation}`}
              >
                {/* Washi Tape Header */}
                <div
                  className={`absolute -top-2.5 left-4 ${tapeClass} px-3 py-0.5 rounded-xs text-[10px] font-heading font-bold tracking-wider`}
                >
                  {card.numberStr}
                </div>

                {/* Read indicator mark */}
                {wasRead && !isOpen && (
                  <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[10px] font-hand font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                    <Check className="w-3 h-3 text-pink-600" />
                    <span>Read ♡</span>
                  </div>
                )}

                {/* Card Title & Emoji Header */}
                <div className="mt-1 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl select-none">{card.emoji}</span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#831843]">
                      {card.title}
                    </h3>
                  </div>

                  <span className="text-pink-400 group-hover:text-pink-600 transition-colors p-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </div>

                {/* Card Content: Teaser vs Unfolded Message */}
                {!isOpen ? (
                  <p className="mt-2 text-xs sm:text-sm font-hand font-medium text-pink-800/80 leading-relaxed italic">
                    “{card.teaser}”
                  </p>
                ) : (
                  <div className="mt-3 pt-3 border-t border-pink-200/70 animate-paper-unfold bg-pink-50/50 p-3 rounded-xl">
                    <p className="text-xs sm:text-sm font-hand font-bold text-[#701a75] leading-relaxed">
                      “{card.message}”
                    </p>
                  </div>
                )}

                {/* Bottom Fold / Open prompt */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-heading font-semibold text-pink-600">
                  <span>{isOpen ? 'Tap to fold note 💌' : 'Tap to unfold full note ✨'}</span>
                  <span className="text-xs opacity-75">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 7th Distinct Yellow Vintage Sticky Note: "What I Hate the Most…" */}
        <div className="w-full my-3 px-1">
          <div
            id="reason-card-7"
            onClick={(e) => {
              e.stopPropagation();
              toggleCard(SEVENTH_NOTE.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(SEVENTH_NOTE.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={Boolean(openedCards[SEVENTH_NOTE.id])}
            className={`relative bg-[#FEF9C3] rounded-2xl p-5 sm:p-6 border-2 ${
              openedCards[SEVENTH_NOTE.id]
                ? 'border-yellow-400 ring-3 ring-yellow-200/80 shadow-lg'
                : 'border-yellow-300 shadow-md hover:border-yellow-400'
            } text-left cursor-pointer transition-all duration-300 -rotate-0.5 hover:rotate-0 active:scale-99 group select-none`}
          >
            {/* Top Yellow Pushpin / Tape Stamp */}
            <div className="absolute -top-3 left-6 bg-amber-200 text-amber-900 border border-amber-300 px-3.5 py-0.5 rounded-xs text-[10px] font-heading font-bold shadow-xs">
              {SEVENTH_NOTE.teaserBadge}
            </div>

            {/* Read checkmark for note 7 */}
            {everRevealed[SEVENTH_NOTE.id] && !openedCards[SEVENTH_NOTE.id] && (
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-hand font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                <Heart className="w-3 h-3 fill-amber-700 text-amber-700" />
                <span>Opened ♡</span>
              </div>
            )}

            {/* Header: Title and Teaser */}
            <div className="mt-1 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{SEVENTH_NOTE.emoji}</span>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-amber-950">
                  {SEVENTH_NOTE.title}
                </h3>
              </div>

              <span className="text-amber-700 p-1 group-hover:scale-110 transition-transform">
                {openedCards[SEVENTH_NOTE.id] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </span>
            </div>

            {/* Teaser vs Complete Heartfelt Reveal */}
            {!openedCards[SEVENTH_NOTE.id] ? (
              <div className="mt-2.5">
                <p className="text-xs sm:text-sm font-hand font-bold text-amber-900 leading-relaxed italic">
                  “{SEVENTH_NOTE.initialTeaser}”
                </p>
                <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-amber-200/70 hover:bg-amber-300 rounded-lg text-xs font-heading font-bold text-amber-950 transition-colors">
                  <span>Tap to reveal the truth 🤫</span>
                  <span>✨</span>
                </div>
              </div>
            ) : (
              <div className="mt-3.5 pt-3 border-t border-amber-300/80 animate-paper-unfold bg-amber-100/60 p-3.5 sm:p-4 rounded-xl">
                <p className="text-xs sm:text-sm font-hand font-bold text-amber-950 leading-relaxed sm:leading-loose">
                  “{SEVENTH_NOTE.revealedMessage}”
                </p>
                <div className="mt-3 text-[11px] font-heading font-semibold text-amber-800 flex items-center justify-between">
                  <span>♡ Fold this note back up</span>
                  <span>▲</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Return to Scrapbook Action Button */}
        <div className="mt-5 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="back-to-scrapbook-from-reasons"
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-heading font-bold text-sm cute-btn flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Our Scrapbook</span>
          </button>
        </div>

        <p className="text-[11px] text-pink-400 font-hand font-medium mt-3">
          Tap anywhere outside to return to your scrapbook surprises 🌸
        </p>
      </div>
    </div>
  );
};
