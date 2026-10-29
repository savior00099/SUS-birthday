import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StarParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  dx: number;
  dy: number;
  spin: number;
}

interface FloatingHeart {
  id: number;
  left: number;    // vw %
  size: number;    // px
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
  swayX: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TAP_STARS = ['✨', '⭐', '🌟', '💫', '✨', '✨', '🌟', '💫'];
const HEART_EMOJIS = ['💗', '❤️', '💕', '💖', '💓', '🩷', '💞', '💝'];

// ─── Star Particle Element ────────────────────────────────────────────────────

const StarEl: React.FC<{ p: StarParticle }> = ({ p }) => {
  const animId = `star-${p.id}`;
  const kf = `
    @keyframes ${animId} {
      0%   { transform: translate(0,0) scale(1) rotate(0deg);    opacity: 1; }
      60%  { transform: translate(${p.dx}px, ${p.dy}px) scale(1.4) rotate(${p.spin * 0.6}deg); opacity: 0.9; }
      100% { transform: translate(${p.dx * 1.3}px, ${p.dy * 1.5}px) scale(0) rotate(${p.spin}deg); opacity: 0; }
    }
  `;
  return (
    <>
      <style>{kf}</style>
      <span
        style={{
          position: 'fixed',
          left: p.x,
          top: p.y,
          fontSize: `${p.size}px`,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          animation: `${animId} 0.75s ease-out forwards`,
          zIndex: 99999,
          willChange: 'transform, opacity',
        }}
      >
        {p.emoji}
      </span>
    </>
  );
};

// ─── Floating Heart Element ───────────────────────────────────────────────────

const FloatingHeartEl: React.FC<{ h: FloatingHeart }> = ({ h }) => {
  const animId = `fhrt-${h.id}`;
  const kf = `
    @keyframes ${animId} {
      0%   { transform: translateY(0vh) translateX(0px) scale(0.8);  opacity: 0; }
      8%   { opacity: ${h.opacity}; }
      50%  { transform: translateY(-52vh) translateX(${h.swayX}px) scale(1.1); opacity: ${h.opacity}; }
      92%  { opacity: ${h.opacity * 0.5}; }
      100% { transform: translateY(-105vh) translateX(${h.swayX * 1.4}px) scale(0.6); opacity: 0; }
    }
  `;
  return (
    <>
      <style>{kf}</style>
      <span
        style={{
          position: 'fixed',
          left: `${h.left}%`,
          bottom: '-40px',
          fontSize: `${h.size}px`,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          animation: `${animId} ${h.duration}s ease-in-out ${h.delay}s infinite`,
          zIndex: 2,
          willChange: 'transform, opacity',
        }}
      >
        {h.emoji}
      </span>
    </>
  );
};

// ─── Floating Hearts Layer ────────────────────────────────────────────────────

const HEART_COUNT = 16;

// Pre-generate stable heart configs (not in render — stable reference)
const heartConfigs: FloatingHeart[] = Array.from({ length: HEART_COUNT }, (_, i) => ({
  id: i,
  left: Math.floor((i / HEART_COUNT) * 100) + Math.round(Math.random() * (100 / HEART_COUNT)),
  size: 12 + Math.round(Math.random() * 14),
  duration: 8 + Math.round(Math.random() * 10),
  delay: Math.round(Math.random() * 15),
  emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
  opacity: 0.35 + Math.round(Math.random() * 35) / 100,
  swayX: (Math.random() > 0.5 ? 1 : -1) * (20 + Math.round(Math.random() * 50)),
}));

export const FloatingHearts: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none overflow-hidden select-none"
    style={{ zIndex: 2 }}
    aria-hidden="true"
  >
    {heartConfigs.map((h) => (
      <FloatingHeartEl key={h.id} h={h} />
    ))}
  </div>
);

// ─── Global Tap Stars ─────────────────────────────────────────────────────────

/**
 * Renders ✨ star bursts on every tap/click across the whole page.
 * Uses a document-level event listener — works on every screen automatically.
 */
export const GlobalTapStars: React.FC = () => {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const nextId = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    // Skip if user clicked a button/input — don't double-up on interactive elements,
    // but still spawn on general taps
    const count = 5 + Math.floor(Math.random() * 4); // 5–8 stars per tap
    const newStars: StarParticle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8;
      const dist = 35 + Math.random() * 55;
      return {
        id: nextId.current++,
        x: e.clientX - 10,
        y: e.clientY - 10,
        emoji: TAP_STARS[Math.floor(Math.random() * TAP_STARS.length)],
        size: 14 + Math.round(Math.random() * 12),
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 20,
        spin: (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 180),
      };
    });

    setStars((prev) => [...prev, ...newStars]);
    setTimeout(() => {
      setStars((prev) => prev.filter((s) => !newStars.find((n) => n.id === s.id)));
    }, 800);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  if (stars.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 99999 }}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <StarEl key={s.id} p={s} />
      ))}
    </div>
  );
};
