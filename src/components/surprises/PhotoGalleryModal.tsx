import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig, type GalleryPhoto } from '../../config/birthdayConfig';
import { PhotoPlaceholderIllustration } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';
import { useTapHearts } from '../common/FloatingPetals';

// ─── Confetti helper with the emoji palette colours ───────────────────────────
const burstConfetti = (origin?: { x?: number; y?: number }) => {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: origin?.y ?? 0.65, x: origin?.x ?? 0.5 },
    colors: ['#f9a8d4', '#f472b6', '#e879f9', '#c084fc', '#86efac', '#fde68a', '#ff6b9d'],
    shapes: ['circle'],
    scalar: 1.1,
  });
};

// ─── 3-D Flip Card ────────────────────────────────────────────────────────────
interface FlipCardProps {
  photo: GalleryPhoto;
  index: number;
  hasError: boolean;
  isLiked: boolean;
  onImageError: (id: number) => void;
  onOpen: (index: number, e: React.MouseEvent) => void;
  onLike: (id: number, e: React.MouseEvent) => void;
}

const FlipCard: React.FC<FlipCardProps> = ({
  photo, index, hasError, isLiked, onImageError, onOpen, onLike,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    soundManager.playPop();
    if (!flipped) {
      setFlipped(true);
    } else {
      onOpen(index, e);
    }
  };

  return (
    <div
      className="group"
      style={{
        perspective: '800px',
        transform: `rotate(${photo.rotation ?? 0}deg)`,
      }}
    >
      {/* Flip container */}
      <div
        onClick={handleCardClick}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          minHeight: '220px',
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 polaroid-card p-3 pb-4 rounded-xl bg-white border border-purple-100/80 flex flex-col items-center"
        >
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape-purple px-3 py-0.5 rounded-xs text-[10px] font-heading text-purple-900 z-10 flex items-center gap-1">
            <span>{photo.sticker ?? '🌸'}</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-purple-800">Polaroid</span>
          </div>

          <div className="w-full aspect-[4/3] sm:aspect-square bg-gray-50 rounded-lg overflow-hidden relative border border-gray-100 flex items-center justify-center">
            {!hasError ? (
              <img
                src={photo.url}
                alt={photo.caption}
                onError={() => onImageError(photo.id)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <PhotoPlaceholderIllustration type={photo.placeholderIllustration} bg={photo.placeholderBg} />
            )}
            {/* Like button */}
            <button
              onClick={(e) => onLike(photo.id, e)}
              className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm text-pink-500 transition-transform active:scale-90"
              title="Love this photo"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
            </button>
          </div>

          <div className="mt-2.5 text-center px-1">
            <p className="font-hand text-base sm:text-lg font-bold text-purple-950 leading-tight">
              {photo.caption}
            </p>
            {photo.date && (
              <span className="text-[10px] font-heading font-medium text-pink-500 mt-0.5 inline-block">
                🌸 {photo.date} 🌸
              </span>
            )}
          </div>

          {/* Tap hint */}
          {!flipped && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-heading text-purple-400 whitespace-nowrap animate-pulse">
              Tap to flip ✨
            </div>
          )}
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-100 via-purple-50 to-fuchsia-100 border-2 border-purple-200 flex flex-col items-center justify-center p-4 gap-2 shadow-lg"
        >
          <span className="text-3xl">🌸</span>
          <p className="font-hand text-base font-bold text-purple-800 text-center leading-snug">
            "{photo.caption}"
          </p>
          {photo.date && (
            <p className="text-xs font-heading text-pink-500">🌷 {photo.date}</p>
          )}
          <div className="flex gap-1.5 mt-1 text-lg">
            {'❤️💕✨🌸'.split('').map((e, i) => (
              <span key={i} className="animate-float-gentle" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>
          <p className="text-[10px] font-heading text-purple-400 mt-1">Tap again to view full ✨</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface PhotoGalleryModalProps {
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ onClose }) => {
  const { gallery } = birthdayConfig;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});

  const { spawnHearts, HeartBurst } = useTapHearts();

  const handleImageError = useCallback((id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  }, []);

  const handleOpenLightbox = useCallback((index: number, e: React.MouseEvent) => {
    soundManager.playPop();
    setActivePhotoIndex(index);
    // spawn hearts at click position + confetti burst
    spawnHearts(e.clientX, e.clientY);
    burstConfetti({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, [spawnHearts]);

  const handleCloseLightbox = () => {
    soundManager.playPop();
    setActivePhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    soundManager.playPop();
    setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : gallery.photos.length - 1));
    spawnHearts(e.clientX, e.clientY);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    soundManager.playPop();
    setActivePhotoIndex((prev) => (prev! < gallery.photos.length - 1 ? prev! + 1 : 0));
    spawnHearts(e.clientX, e.clientY);
  };

  const handleToggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playSparkle();
    setLikedPhotos((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        spawnHearts(e.clientX, e.clientY);
        burstConfetti({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      soundManager.playPop();
      onClose();
    }
  };

  const currentPhoto: GalleryPhoto | null =
    activePhotoIndex !== null ? gallery.photos[activePhotoIndex] : null;

  return (
    <>
      {/* Heart burst layer (fixed, on top of everything) */}
      <HeartBurst />

      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
      >
        {/* Modal Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-purple-200 my-auto text-left flex flex-col cursor-default"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-200/80">
            <button
              onClick={() => { soundManager.playPop(); onClose(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs sm:text-sm font-heading font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Surprises Menu</span>
            </button>

            <div className="text-center">
              <h2 className="text-lg sm:text-2xl font-heading font-bold text-purple-950">{gallery.title}</h2>
              <p className="text-xs sm:text-sm font-hand text-pink-600 font-bold">{gallery.subtitle}</p>
            </div>

            <button
              onClick={() => { soundManager.playPop(); onClose(); }}
              className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3-D Flip Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-6 px-1">
            {gallery.photos.map((photo, index) => (
              <FlipCard
                key={photo.id}
                photo={photo}
                index={index}
                hasError={!!imageErrors[photo.id]}
                isLiked={!!likedPhotos[photo.id]}
                onImageError={handleImageError}
                onOpen={handleOpenLightbox}
                onLike={handleToggleLike}
              />
            ))}
          </div>

          {/* Hint box */}
          <div className="mt-2 p-3 bg-purple-50/80 rounded-2xl border border-purple-200 text-center text-xs text-purple-700">
            <p className="font-heading font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              <span>Tap a card to flip it 🌸 — tap again to view full size ✨</span>
            </p>
            <p className="font-sans text-[11px] text-purple-600 mt-0.5">
              Drop photos into <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-800 font-mono">public/images/photo1.jpg</code> etc.
            </p>
          </div>
        </div>

        {/* ── Fullscreen Lightbox ── */}
        {currentPhoto && (
          <div
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-10"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-10"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-6 rounded-2xl max-w-lg w-full shadow-2xl flex flex-col items-center text-center animate-scaleUp cursor-default"
            >
              <div className="w-full max-h-[60vh] rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                {!imageErrors[currentPhoto.id] ? (
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.caption}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                ) : (
                  <div className="p-8">
                    <PhotoPlaceholderIllustration
                      type={currentPhoto.placeholderIllustration}
                      bg={currentPhoto.placeholderBg}
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 px-2">
                <p className="font-hand text-xl sm:text-2xl font-bold text-purple-950">{currentPhoto.caption}</p>
                {currentPhoto.date && (
                  <p className="text-xs font-heading font-semibold text-pink-500 mt-1">🌸 {currentPhoto.date} 🌸</p>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between w-full px-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <span>Photo {activePhotoIndex! + 1} of {gallery.photos.length}</span>
                <button
                  onClick={(e) => handleToggleLike(currentPhoto.id, e)}
                  className="flex items-center gap-1 text-pink-600 font-heading font-medium cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${likedPhotos[currentPhoto.id] ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
                  <span>{likedPhotos[currentPhoto.id] ? 'Loved! 💕' : 'Send Love ❤️'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
