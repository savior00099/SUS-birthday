import React, { useMemo, useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PetalConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
  rotation: number;
  color: string;
  shape: 'sakura' | 'round' | 'oval' | 'emoji';
  emoji?: string;
  opacity: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PETAL_COLORS = [
  '#f9a8d4', // pink-300
  '#f472b6', // pink-400
  '#e879f9', // fuchsia-400
  '#c084fc', // purple-400
  '#a5f3fc', // cyan-200
  '#fdba74', // orange-300
  '#fde68a', // amber-200
  '#86efac', // green-300
  '#f8a4c8', // soft rose
  '#ff6b9d', // hot pink
  '#ff85c1', // light pink
];

// The emoji set the user requested
const FLOATING_EMOJIS = ['❤️', '💕', '✨', '🌸', '🌷', '☘️'];

// ─── SVG Petal Shapes ─────────────────────────────────────────────────────────

const SakuraPetal: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="12" rx="6" ry="11" fill={color} opacity="0.85" transform="rotate(0 20 20)" />
    <ellipse cx="20" cy="12" rx="6" ry="11" fill={color} opacity="0.85" transform="rotate(72 20 20)" />
    <ellipse cx="20" cy="12" rx="6" ry="11" fill={color} opacity="0.85" transform="rotate(144 20 20)" />
    <ellipse cx="20" cy="12" rx="6" ry="11" fill={color} opacity="0.85" transform="rotate(216 20 20)" />
    <ellipse cx="20" cy="12" rx="6" ry="11" fill={color} opacity="0.85" transform="rotate(288 20 20)" />
    <circle cx="20" cy="20" r="4" fill="white" opacity="0.6" />
  </svg>
);

const RoundPetal: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 2 C5 8, 2 20, 15 40 C28 20, 25 8, 15 2Z" fill={color} opacity="0.8" />
  </svg>
);

const OvalPetal: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size * 0.8} height={size} viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="17" rx="10" ry="16" fill={color} opacity="0.75" />
  </svg>
);

// ─── Single Petal ─────────────────────────────────────────────────────────────

const Petal: React.FC<{ config: PetalConfig }> = ({ config }) => {
  const styleId = `petal-fp-${config.id}`;
  const keyframes = `
    @keyframes ${styleId} {
      0%   { transform: translateY(-70px) translateX(0px) rotate(${config.rotation}deg); opacity: 0; }
      8%   { opacity: ${config.opacity}; }
      92%  { opacity: ${config.opacity}; }
      100% { transform: translateY(110vh) translateX(${config.swayAmount}px) rotate(${config.rotation + 360}deg); opacity: 0; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          position: 'fixed',
          left: `${config.left}%`,
          top: '-70px',
          animation: `${styleId} ${config.duration}s ease-in-out ${config.delay}s infinite`,
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform, opacity',
          lineHeight: 1,
        }}
      >
        {config.shape === 'emoji' && (
          <span style={{ fontSize: `${config.size}px` }}>{config.emoji}</span>
        )}
        {config.shape === 'sakura' && <SakuraPetal color={config.color} size={config.size} />}
        {config.shape === 'round'  && <RoundPetal  color={config.color} size={config.size} />}
        {config.shape === 'oval'   && <OvalPetal   color={config.color} size={config.size} />}
      </div>
    </>
  );
};

// ─── Floating Petals Component ────────────────────────────────────────────────

interface FloatingPetalsProps {
  count?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ count = 20 }) => {
  const petals = useMemo<PetalConfig[]>(() => {
    const svgShapes: PetalConfig['shape'][] = ['sakura', 'round', 'oval'];
    return Array.from({ length: count }, (_, i) => {
      // Every 3rd particle is an emoji; the rest are SVG petals
      const useEmoji = i % 3 === 0;
      return {
        id: i,
        left: Math.floor((i / count) * 100) + Math.round(Math.random() * (100 / count)),
        size: useEmoji
          ? 14 + Math.round(Math.random() * 10)   // emoji font-size
          : 14 + Math.round(Math.random() * 14),  // SVG size
        duration: 7 + Math.round(Math.random() * 9),
        delay: Math.round(Math.random() * 14),
        swayAmount: (Math.random() > 0.5 ? 1 : -1) * (30 + Math.round(Math.random() * 60)),
        rotation: Math.round(Math.random() * 360),
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        shape: useEmoji ? 'emoji' : svgShapes[Math.floor(Math.random() * svgShapes.length)],
        emoji: useEmoji ? FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)] : undefined,
        opacity: 0.45 + Math.round(Math.random() * 40) / 100,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <Petal key={petal.id} config={petal} />
      ))}
    </div>
  );
};

// ─── Tap-Heart Burst (used in photo gallery) ──────────────────────────────────

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  dx: number;
  dy: number;
}

const HEART_EMOJIS = ['❤️', '💕', '🌸', '✨', '💗', '🌷'];

export const useTapHearts = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  const spawnHearts = useCallback((clientX: number, clientY: number) => {
    const newHearts: HeartParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: clientX,
      y: clientY,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      dx: (Math.random() - 0.5) * 120,
      dy: -(40 + Math.random() * 80),
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)));
    }, 900);
  }, []);

  const HeartBurst: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }} aria-hidden="true">
      {hearts.map((h) => (
        <HeartParticleEl key={h.id} particle={h} />
      ))}
    </div>
  );

  return { spawnHearts, HeartBurst };
};

const HeartParticleEl: React.FC<{ particle: HeartParticle }> = ({ particle }) => {
  const animId = `hrt-${particle.id}`;
  const kf = `
    @keyframes ${animId} {
      0%   { transform: translate(0px, 0px) scale(1);   opacity: 1; }
      80%  { transform: translate(${particle.dx}px, ${particle.dy}px) scale(1.3); opacity: 0.8; }
      100% { transform: translate(${particle.dx * 1.1}px, ${particle.dy * 1.3}px) scale(0.5); opacity: 0; }
    }
  `;
  return (
    <>
      <style>{kf}</style>
      <span
        style={{
          position: 'fixed',
          left: particle.x,
          top: particle.y,
          fontSize: '20px',
          animation: `${animId} 0.85s ease-out forwards`,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        {particle.emoji}
      </span>
    </>
  );
};
