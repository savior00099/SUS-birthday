import React from 'react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Floating Blossom 1 */}
      <span
        className="absolute text-xl sm:text-2xl text-pink-300 opacity-70 animate-float-slow"
        style={{ top: '7%', left: '8%', animationDelay: '0s' }}
      >
        🌸
      </span>

      {/* Floating Sparkle 1 */}
      <span
        className="absolute text-base sm:text-lg text-yellow-300 opacity-60 animate-float-gentle"
        style={{ top: '14%', right: '12%', animationDelay: '1s' }}
      >
        ✨
      </span>

      {/* Floating Daisy Petal */}
      <span
        className="absolute text-lg sm:text-xl opacity-60 animate-float-slow"
        style={{ top: '38%', left: '4%', animationDelay: '2.5s' }}
      >
        🌼
      </span>

      {/* Floating Flower Petal */}
      <span
        className="absolute text-base opacity-50 animate-float-gentle"
        style={{ top: '55%', right: '7%', animationDelay: '1.8s' }}
      >
        🌸
      </span>

      {/* Floating Soft Tulip */}
      <span
        className="absolute text-lg opacity-55 animate-float-slow"
        style={{ top: '75%', left: '6%', animationDelay: '1.2s' }}
      >
        🌷
      </span>

      {/* Floating Heart 1 */}
      <span
        className="absolute text-lg text-pink-400 opacity-50 animate-float-gentle"
        style={{ top: '88%', right: '14%', animationDelay: '2.8s' }}
      >
        💗
      </span>

      {/* Gentle Floating Star */}
      <span
        className="absolute text-sm text-yellow-400 opacity-55 animate-float-slow"
        style={{ top: '92%', left: '20%', animationDelay: '0.7s' }}
      >
        ⭐
      </span>
    </div>
  );
};
