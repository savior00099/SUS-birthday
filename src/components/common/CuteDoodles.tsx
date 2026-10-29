import React from 'react';

/**
 * Adorable puppy illustration inspired by the cute pastel reel aesthetic
 */
export const CutePuppy: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        {/* Left Ear */}
        <path
          d="M 45 65 C 20 40, 15 110, 45 115 C 55 115, 60 90, 50 65 Z"
          fill="#D6C4A5"
          stroke="#5C4033"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 40 70 C 25 55, 25 100, 42 105"
          fill="#FBCFE8"
          opacity="0.8"
        />

        {/* Right Ear */}
        <path
          d="M 155 65 C 180 40, 185 110, 155 115 C 145 115, 140 90, 150 65 Z"
          fill="#D6C4A5"
          stroke="#5C4033"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 160 70 C 175 55, 175 100, 158 105"
          fill="#FBCFE8"
          opacity="0.8"
        />

        {/* Head */}
        <ellipse
          cx="100"
          cy="95"
          rx="55"
          ry="50"
          fill="#FDFBF7"
          stroke="#5C4033"
          strokeWidth="3.5"
        />

        {/* Spot over left eye */}
        <path
          d="M 65 75 C 60 65, 80 60, 85 70 C 90 80, 80 95, 68 92 C 60 90, 62 82, 65 75 Z"
          fill="#E8D9C0"
        />

        {/* Eyes with sparkle highlights */}
        <circle cx="75" cy="92" r="7" fill="#2E1C14" />
        <circle cx="73" cy="89" r="2.5" fill="#FFFFFF" />
        <circle cx="77" cy="94" r="1.2" fill="#FFFFFF" />

        <circle cx="125" cy="92" r="7" fill="#2E1C14" />
        <circle cx="123" cy="89" r="2.5" fill="#FFFFFF" />
        <circle cx="127" cy="94" r="1.2" fill="#FFFFFF" />

        {/* Cute Blushing Cheeks */}
        <ellipse cx="62" cy="104" rx="9" ry="5.5" fill="#FDA4AF" opacity="0.65" />
        <ellipse cx="138" cy="104" rx="9" ry="5.5" fill="#FDA4AF" opacity="0.65" />

        {/* Nose */}
        <path
          d="M 95 99 C 95 97, 105 97, 105 99 C 105 104, 95 104, 95 99 Z"
          fill="#3E2723"
        />

        {/* Smile / Mouth */}
        <path
          d="M 94 103 Q 90 109 84 108"
          stroke="#5C4033"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 106 103 Q 110 109 116 108"
          stroke="#5C4033"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 100 103 L 100 108"
          stroke="#5C4033"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Tiny playful tongue */}
        <path
          d="M 96 108 Q 100 116 104 108 Z"
          fill="#FB7185"
          stroke="#5C4033"
          strokeWidth="1.5"
        />

        {/* Cute Pink Bow on head */}
        <g transform="translate(100, 48)">
          <path
            d="M 0 0 C -12 -12, -22 0, -5 6 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="2"
          />
          <path
            d="M 0 0 C 12 -12, 22 0, 5 6 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="2"
          />
          <circle cx="0" cy="2" r="4.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        </g>

        {/* Body & Paws */}
        <path
          d="M 70 140 C 70 165, 130 165, 130 140"
          fill="#FDFBF7"
          stroke="#5C4033"
          strokeWidth="3.5"
        />
        {/* Left Paw */}
        <rect
          x="65"
          y="142"
          width="26"
          height="22"
          rx="11"
          fill="#FAF4EB"
          stroke="#5C4033"
          strokeWidth="3"
        />
        {/* Right Paw */}
        <rect
          x="109"
          y="142"
          width="26"
          height="22"
          rx="11"
          fill="#FAF4EB"
          stroke="#5C4033"
          strokeWidth="3"
        />

        {/* Little Heart Tag / Collar */}
        <path
          d="M 78 138 Q 100 144 122 138"
          stroke="#E879F9"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 100 143 C 98 140, 93 140, 93 144 C 93 148, 100 152, 100 152 C 100 152, 107 148, 107 144 C 107 140, 102 140, 100 143 Z"
          fill="#F43F5E"
        />
      </svg>
    </div>
  );
};

/**
 * Cute Multi-Tier Birthday Cake with interactive blowable candles
 */
export const BirthdayCake: React.FC<{
  isBlownOut?: boolean;
  onBlowOut?: () => void;
  className?: string;
}> = ({ isBlownOut = false, onBlowOut, className = 'w-44 h-44' }) => {
  return (
    <div
      onClick={onBlowOut}
      className={`relative inline-block cursor-pointer group transition-transform active:scale-95 ${className}`}
      title="Tap the cake to make a wish & blow out the candles! 🕯️✨"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg select-none"
      >
        {/* Cake Stand / Plate */}
        <ellipse cx="100" cy="175" rx="72" ry="12" fill="#E2E8F0" />
        <ellipse cx="100" cy="172" rx="70" ry="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />

        {/* Bottom Tier */}
        <rect x="45" y="118" width="110" height="48" rx="8" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
        {/* Frosting Drips Bottom */}
        <path
          d="M 45 126 C 52 136, 58 136, 65 126 C 72 136, 78 136, 85 126 C 92 138, 98 138, 105 126 C 112 136, 118 136, 125 126 C 132 138, 138 138, 145 126 C 150 134, 153 130, 155 126 L 155 118 L 45 118 Z"
          fill="#FEF08A"
        />
        {/* Sprinkles on Bottom Tier */}
        <circle cx="60" cy="145" r="2.5" fill="#A855F7" />
        <circle cx="80" cy="152" r="2.5" fill="#3B82F6" />
        <circle cx="100" cy="144" r="2.5" fill="#EC4899" />
        <circle cx="120" cy="153" r="2.5" fill="#EAB308" />
        <circle cx="140" cy="146" r="2.5" fill="#10B981" />

        {/* Top Tier */}
        <rect x="65" y="80" width="70" height="40" rx="6" fill="#EDE9FE" stroke="#C084FC" strokeWidth="2.5" />
        {/* Frosting Drips Top */}
        <path
          d="M 65 87 C 72 95, 78 95, 84 87 C 90 97, 96 97, 102 87 C 108 96, 114 96, 120 87 C 126 95, 131 93, 135 87 L 135 80 L 65 80 Z"
          fill="#FCE7F3"
        />
        {/* Sprinkles on Top Tier */}
        <circle cx="78" cy="105" r="2" fill="#F43F5E" />
        <circle cx="100" cy="108" r="2" fill="#8B5CF6" />
        <circle cx="122" cy="104" r="2" fill="#FBBF24" />

        {/* Three Candles */}
        {/* Left Candle */}
        <rect x="78" y="55" width="6" height="26" rx="2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        <line x1="81" y1="55" x2="81" y2="50" stroke="#78350F" strokeWidth="1.5" />
        {/* Middle Candle */}
        <rect x="97" y="48" width="6" height="33" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
        <line x1="100" y1="48" x2="100" y2="43" stroke="#831843" strokeWidth="1.5" />
        {/* Right Candle */}
        <rect x="116" y="55" width="6" height="26" rx="2" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1.5" />
        <line x1="119" y1="55" x2="119" y2="50" stroke="#5B21B6" strokeWidth="1.5" />

        {/* Candle Flames or Smoke */}
        {!isBlownOut ? (
          <g className="animate-candle">
            {/* Left Flame */}
            <path
              d="M 81 49 C 78 44, 78 39, 81 35 C 84 39, 84 44, 81 49 Z"
              fill="#F97316"
            />
            <circle cx="81" cy="42" r="2" fill="#FEF08A" />

            {/* Middle Flame (Taller) */}
            <path
              d="M 100 42 C 96 36, 96 30, 100 24 C 104 30, 104 36, 100 42 Z"
              fill="#F97316"
            />
            <circle cx="100" cy="34" r="2.8" fill="#FEF08A" />

            {/* Right Flame */}
            <path
              d="M 119 49 C 116 44, 116 39, 119 35 C 122 39, 122 44, 119 49 Z"
              fill="#F97316"
            />
            <circle cx="119" cy="42" r="2" fill="#FEF08A" />
          </g>
        ) : (
          <g>
            {/* Cute Puffs of smoke when blown out */}
            <path
              d="M 81 48 Q 78 42 82 36 Q 84 32 80 28"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="3 3"
            />
            <path
              d="M 100 40 Q 104 34 98 26 Q 102 20 97 15"
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="3 3"
            />
            <path
              d="M 119 48 Q 123 42 118 36 Q 121 32 117 28"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="3 3"
            />
            {/* Sparkles around wish */}
            <text x="50" y="32" fontSize="16">✨</text>
            <text x="135" y="30" fontSize="16">💖</text>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Retro Camera Sticker
 */
export const RetroCameraSticker: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
        {/* Flash bulb / button */}
        <rect x="30" y="24" width="22" height="12" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
        <rect x="75" y="28" width="16" height="8" rx="2" fill="#F472B6" />
        {/* Camera Body */}
        <rect x="15" y="34" width="90" height="66" rx="14" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="3" />
        {/* Pastel strip across */}
        <rect x="15" y="52" width="90" height="16" fill="#FBCFE8" />
        {/* Lens circle */}
        <circle cx="60" cy="67" r="22" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="3" />
        <circle cx="60" cy="67" r="16" fill="#475569" stroke="#1E293B" strokeWidth="2" />
        <circle cx="56" cy="63" r="5" fill="#94A3B8" />
        <circle cx="53" cy="60" r="2" fill="#FFFFFF" />
        {/* Viewfinder */}
        <rect x="25" y="42" width="12" height="10" rx="3" fill="#FDFBF7" stroke="#7C3AED" strokeWidth="1.5" />
        {/* Heart icon on body */}
        <text x="83" y="86" fontSize="12">💖</text>
      </svg>
    </div>
  );
};

/**
 * Retro Cassette Tape Sticker
 */
export const RetroCassetteSticker: React.FC<{ className?: string; isPlaying?: boolean }> = ({
  className = 'w-24 h-24',
  isPlaying = false,
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
        {/* Cassette casing */}
        <rect x="12" y="30" width="96" height="62" rx="8" fill="#FDE047" stroke="#EAB308" strokeWidth="3" />
        {/* Label sticker */}
        <rect x="20" y="38" width="80" height="42" rx="4" fill="#FAF5FF" stroke="#C084FC" strokeWidth="2" />
        <path d="M 28 46 L 92 46" stroke="#E9D5FF" strokeWidth="2" />
        <text x="32" y="44" fontSize="6" fill="#9333EA" fontWeight="bold">OUR SPECIAL JAM 🎵</text>
        {/* Window for tape */}
        <rect x="34" y="50" width="52" height="22" rx="4" fill="#334155" />
        {/* Left Tape Reel */}
        <g className={isPlaying ? 'animate-spin-slow origin-[46px_61px]' : ''}>
          <circle cx="46" cy="61" r="7" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="46" cy="61" r="3" fill="#0F172A" />
          <line x1="46" y1="54" x2="46" y2="68" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="39" y1="61" x2="53" y2="61" stroke="#CBD5E1" strokeWidth="1" />
        </g>
        {/* Right Tape Reel */}
        <g className={isPlaying ? 'animate-spin-slow origin-[74px_61px]' : ''}>
          <circle cx="74" cy="61" r="7" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="74" cy="61" r="3" fill="#0F172A" />
          <line x1="74" y1="54" x2="74" y2="68" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="67" y1="61" x2="81" y2="61" stroke="#CBD5E1" strokeWidth="1" />
        </g>
        {/* Cassette bottom trapezoid */}
        <path d="M 26 92 L 34 82 L 86 82 L 94 92 Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
        <circle cx="42" cy="87" r="2.5" fill="#475569" />
        <circle cx="78" cy="87" r="2.5" fill="#475569" />
      </svg>
    </div>
  );
};

/**
 * Cute Envelope Sticker
 */
export const LoveLetterSticker: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
        {/* Envelope back */}
        <rect x="18" y="32" width="84" height="58" rx="6" fill="#FDF4FF" stroke="#F472B6" strokeWidth="3" />
        {/* Fold lines */}
        <path d="M 18 32 L 60 66 L 102 32" stroke="#F472B6" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 18 90 L 50 60" stroke="#FBCFE8" strokeWidth="2" />
        <path d="M 102 90 L 70 60" stroke="#FBCFE8" strokeWidth="2" />
        {/* Heart Seal */}
        <g transform="translate(60, 64) scale(0.9)">
          <path
            d="M 0 -2 C -6 -10, -16 -4, -14 4 C -12 12, 0 18, 0 18 C 0 18, 12 12, 14 4 C 16 -4, 6 -10, 0 -2 Z"
            fill="#FB7185"
            stroke="#BE123C"
            strokeWidth="1.5"
          />
        </g>
        {/* Cute Sparkle / Stamp */}
        <rect x="80" y="36" width="16" height="18" rx="2" fill="#FEF9C3" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 2" />
        <text x="84" y="49" fontSize="10">🌸</text>
      </svg>
    </div>
  );
};

/**
 * Cute Gift Box Sticker
 */
export const GiftBoxSticker: React.FC<{ className?: string; isOpen?: boolean }> = ({
  className = 'w-24 h-24',
  isOpen = false,
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
        {/* Box base */}
        <rect x="25" y="52" width="70" height="50" rx="6" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3" />
        {/* Vertical ribbon on base */}
        <rect x="54" y="52" width="12" height="50" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />

        {/* Box Lid - tilts if open */}
        <g
          className={isOpen ? 'transition-transform duration-500 origin-[20px_50px] -rotate-45 -translate-y-4' : 'transition-transform duration-500'}
        >
          <rect x="20" y="40" width="80" height="15" rx="4" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="3" />
          <rect x="54" y="40" width="12" height="15" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Bow on lid */}
          <path
            d="M 60 40 C 50 25, 34 32, 48 38 C 55 41, 60 40, 60 40 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          <path
            d="M 60 40 C 70 25, 86 32, 72 38 C 65 41, 60 40, 60 40 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          <circle cx="60" cy="40" r="4.5" fill="#FBBF24" stroke="#CA8A04" strokeWidth="1.5" />
        </g>

        {isOpen && (
          <g>
            <text x="35" y="42" fontSize="16">✨</text>
            <text x="75" y="38" fontSize="16">💖</text>
            <text x="52" y="24" fontSize="18">🎉</text>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Cute Stack of Love Notes & Confession Sticker
 */
export const LoveNotesSticker: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
        {/* Back note (yellow) tilted */}
        <rect x="24" y="30" width="70" height="65" rx="6" fill="#FEF9C3" stroke="#FBBF24" strokeWidth="2" transform="rotate(-6 59 62)" />
        {/* Middle note (purple/pink) */}
        <rect x="25" y="26" width="70" height="66" rx="6" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" transform="rotate(4 60 59)" />
        {/* Front note (cream) straight */}
        <rect x="25" y="28" width="70" height="66" rx="6" fill="#FFFDF8" stroke="#FB7185" strokeWidth="2.5" />
        
        {/* Washi tape on front note */}
        <rect x="42" y="22" width="36" height="12" rx="2" fill="#F472B6" opacity="0.85" />
        
        {/* Cute lines simulating handwritten reasons */}
        <line x1="34" y1="46" x2="86" y2="46" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="56" x2="76" y2="56" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="66" x2="82" y2="66" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
        
        {/* Cute heart seal */}
        <g transform="translate(60, 78) scale(0.9)">
          <path
            d="M 0 -2 C -5 -9, -14 -4, -12 3 C -10 10, 0 16, 0 16 C 0 16, 10 10, 12 3 C 14 -4, 5 -9, 0 -2 Z"
            fill="#E11D48"
          />
        </g>
        <text x="75" y="42" fontSize="12">✨</text>
      </svg>
    </div>
  );
};

/**
 * Cute Wish Birthday Cake with Single Candle Sticker
 */
export const WishCakeSticker: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
        {/* Plate */}
        <ellipse cx="60" cy="100" rx="42" ry="7" fill="#E2E8F0" />
        <ellipse cx="60" cy="98" rx="40" ry="6" fill="#FFFDF8" stroke="#CBD5E1" strokeWidth="1.5" />
        
        {/* Cake Tier */}
        <rect x="28" y="66" width="64" height="30" rx="6" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
        {/* Frosting Drips */}
        <path
          d="M 28 72 C 34 78, 38 78, 44 72 C 50 78, 54 78, 60 72 C 66 78, 70 78, 76 72 C 82 78, 86 78, 92 72 L 92 66 L 28 66 Z"
          fill="#FFF4E6"
        />
        {/* Sprinkles */}
        <circle cx="38" cy="84" r="1.5" fill="#A855F7" />
        <circle cx="50" cy="88" r="1.5" fill="#3B82F6" />
        <circle cx="62" cy="82" r="1.5" fill="#EC4899" />
        <circle cx="74" cy="87" r="1.5" fill="#EAB308" />
        <circle cx="82" cy="81" r="1.5" fill="#10B981" />
        
        {/* Single lit candle */}
        <rect x="57" y="44" width="6" height="22" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
        <line x1="60" y1="44" x2="60" y2="39" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Candle Flame with glowing effect */}
        <g className="animate-candle">
          <ellipse cx="60" cy="32" rx="4.5" ry="7" fill="#F97316" />
          <ellipse cx="60" cy="33" rx="2.5" ry="4.5" fill="#FEF08A" />
        </g>
        
        {/* Sparkles */}
        <text x="22" y="48" fontSize="11">✨</text>
        <text x="82" y="45" fontSize="11">⭐</text>
      </svg>
    </div>
  );
};

/**
 * Fallback illustrated memory card if user photo hasn't been uploaded yet
 */
export const PhotoPlaceholderIllustration: React.FC<{
  type?: 'cafe' | 'beach' | 'laughing' | 'selfie' | 'celebrate' | 'journey';
  bg?: string;
}> = ({ type = 'laughing', bg = '#FCE7F3' }) => {
  const scenes = {
    cafe: {
      emoji: '🧋🍰',
      title: 'Coffee & Boba Dates',
      desc: 'Our favorite drinks & talks',
    },
    beach: {
      emoji: '🌅✨',
      title: 'Golden Hour Adventures',
      desc: 'Chasing pretty sunsets',
    },
    laughing: {
      emoji: '😂💖',
      title: 'Uncontrollable Laughs',
      desc: 'Inside jokes only we get',
    },
    selfie: {
      emoji: '👯‍♀️📸',
      title: 'Photo Booth Fun',
      desc: 'Crazy poses & cute smiles',
    },
    celebrate: {
      emoji: '🎉👑',
      title: 'Celebrating You',
      desc: 'Always in your corner',
    },
    journey: {
      emoji: '✈️💫',
      title: 'Forever Besties',
      desc: 'To infinity and beyond',
    },
  };

  const scene = scenes[type] || scenes.laughing;

  return (
    <div
      style={{ backgroundColor: bg }}
      className="w-full h-full min-h-[190px] flex flex-col items-center justify-center p-4 text-center rounded-md border-2 border-dashed border-purple-200"
    >
      <div className="text-4xl sm:text-5xl mb-2 animate-float-gentle select-none">
        {scene.emoji}
      </div>
      <div className="font-heading font-semibold text-purple-900 text-sm sm:text-base">
        {scene.title}
      </div>
      <div className="font-hand text-pink-700 text-sm mt-0.5">
        {scene.desc}
      </div>
      <div className="mt-2 text-[10px] text-purple-500 bg-white/70 px-2.5 py-1 rounded-full font-medium">
        Replace in public/images/ 📸
      </div>
    </div>
  );
};
