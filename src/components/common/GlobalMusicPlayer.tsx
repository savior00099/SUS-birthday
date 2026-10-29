import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { MusicPlayerModal } from '../surprises/MusicPlayerModal';
import { soundManager } from '../../utils/soundEffects';

interface GlobalMusicPlayerProps {
  autoStartTrigger?: boolean;
}

export const GlobalMusicPlayer: React.FC<GlobalMusicPlayerProps> = ({ autoStartTrigger }) => {
  const { music } = birthdayConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(music.audioSrc);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [music.audioSrc]);

  // Attempt to start music when triggered (e.g. user clicks YES or unlocks password)
  useEffect(() => {
    if (autoStartTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser prevented autoplay before interaction
        });
    }
  }, [autoStartTrigger]);

  const togglePlay = () => {
    soundManager.playPop();

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
          soundManager.playHappyBirthdayMusicBox(
            () => {},
            () => setIsPlaying(false)
          );
          setIsPlaying(true);
        });
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMute = !isMuted;
    audioRef.current.muted = newMute;
    setIsMuted(newMute);
  };

  return (
    <>
      {/* Floating Pill on all screens */}
      <aside
        aria-label="Background Music"
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 select-none animate-fadeIn"
      >
        <div
          onClick={() => {
            soundManager.playSparkle();
            setShowModal(true);
          }}
          className={`group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full cursor-pointer transition-all duration-300 shadow-lg border backdrop-blur-md ${
            isPlaying
              ? 'bg-pink-500/90 hover:bg-pink-600 text-white border-pink-300 ring-2 ring-pink-300/40'
              : 'bg-white/90 hover:bg-white text-pink-700 border-pink-200 hover:shadow-md'
          }`}
          title="Click to open music player & details"
        >
          {/* Animated Vinyl Icon */}
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            ) : (
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
            )}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
            )}
          </div>

          {/* Song text info */}
          <div className="flex flex-col text-left pr-1">
            <span className="text-[11px] sm:text-xs font-heading font-bold leading-tight max-w-[110px] sm:max-w-[150px] truncate">
              {isPlaying ? music.songTitle : 'Play Song 🎵'}
            </span>
            <span className={`text-[9px] font-hand font-bold leading-tight ${isPlaying ? 'text-pink-100' : 'text-pink-500'}`}>
              {isPlaying ? 'Playing ♡ tap to customize' : 'For Humo ♡'}
            </span>
          </div>

          {/* Inline Play/Pause Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? 'Pause background song' : 'Play background song'}
            className={`p-1 sm:p-1.5 rounded-full transition-transform active:scale-90 cursor-pointer ${
              isPlaying
                ? 'bg-white/20 hover:bg-white/30 text-white'
                : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
            }`}
            title={isPlaying ? 'Pause song' : 'Play song'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Inline Mute Button */}
          {isPlaying && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-1 sm:p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-transform active:scale-90 cursor-pointer hidden sm:block"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </aside>

      {/* Full Music Player Modal (when tapped) */}
      {showModal && (
        <MusicPlayerModal
          onClose={() => {
            soundManager.playPop();
            setShowModal(false);
          }}
          audio={audioRef.current}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          currentTime={currentTime}
          duration={duration}
        />
      )}
    </>
  );
};
