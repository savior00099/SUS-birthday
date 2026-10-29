import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ArrowLeft, Disc3 } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { RetroCassetteSticker } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';

export interface MusicPlayerModalProps {
  onClose: () => void;
  audio?: HTMLAudioElement | null;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  volume?: number;
  onVolumeChange?: (val: number) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  currentTime?: number;
  duration?: number;
}

export const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({
  onClose,
  audio: _audio,
  isPlaying: externalIsPlaying,
  onTogglePlay: externalTogglePlay,
  volume: externalVolume,
  onVolumeChange: externalVolumeChange,
  isMuted: externalIsMuted,
  onToggleMute: externalToggleMute,
  currentTime: externalCurrentTime,
  duration: externalDuration,
}) => {
  const { music } = birthdayConfig;
  const isControlled = externalTogglePlay !== undefined;

  // Internal fallback state if not controlled
  const [internalPlaying, setInternalPlaying] = useState(false);
  const [isMusicBoxMode, setIsMusicBoxMode] = useState(false);
  const [internalTime, setInternalTime] = useState(0);
  const [internalDuration, setInternalDuration] = useState(30);
  const [internalVolume, setInternalVolume] = useState(0.8);
  const [internalMuted, setInternalMuted] = useState(false);
  const internalAudioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = isControlled ? !!externalIsPlaying : internalPlaying;
  const currentTime = isControlled ? (externalCurrentTime || 0) : internalTime;
  const duration = isControlled ? (externalDuration || 30) : internalDuration;
  const volume = isControlled ? (externalVolume ?? 0.8) : internalVolume;
  const isMuted = isControlled ? !!externalIsMuted : internalMuted;

  useEffect(() => {
    if (isControlled) return;

    const localAudio = new Audio(music.audioSrc);
    internalAudioRef.current = localAudio;
    localAudio.volume = internalVolume;

    const handleLoaded = () => {
      if (localAudio.duration && !isNaN(localAudio.duration)) {
        setInternalDuration(localAudio.duration);
      }
    };
    const handleTime = () => setInternalTime(localAudio.currentTime);
    const handleEnd = () => {
      setInternalPlaying(false);
      setInternalTime(0);
    };

    localAudio.addEventListener('loadedmetadata', handleLoaded);
    localAudio.addEventListener('timeupdate', handleTime);
    localAudio.addEventListener('ended', handleEnd);

    return () => {
      localAudio.pause();
      localAudio.removeEventListener('loadedmetadata', handleLoaded);
      localAudio.removeEventListener('timeupdate', handleTime);
      localAudio.removeEventListener('ended', handleEnd);
      soundManager.stopMusicBox();
    };
  }, [music.audioSrc, isControlled]);

  const togglePlay = () => {
    soundManager.playPop();
    if (isControlled && externalTogglePlay) {
      externalTogglePlay();
    } else {
      if (internalPlaying) {
        if (isMusicBoxMode) soundManager.stopMusicBox();
        else if (internalAudioRef.current) internalAudioRef.current.pause();
        setInternalPlaying(false);
      } else {
        if (isMusicBoxMode) {
          soundManager.playHappyBirthdayMusicBox(
            (curr, tot) => {
              setInternalTime(curr);
              setInternalDuration(tot);
            },
            () => {
              setInternalPlaying(false);
              setInternalTime(0);
            }
          );
          setInternalPlaying(true);
        } else if (internalAudioRef.current) {
          internalAudioRef.current.play()
            .then(() => setInternalPlaying(true))
            .catch(() => setIsMusicBoxMode(true));
        }
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isControlled && externalVolumeChange) {
      externalVolumeChange(val);
    } else {
      setInternalVolume(val);
      if (internalAudioRef.current) internalAudioRef.current.volume = val;
      setInternalMuted(val === 0);
    }
  };

  const toggleMute = () => {
    soundManager.playPop();
    if (isControlled && externalToggleMute) {
      externalToggleMute();
    } else {
      setInternalMuted(!internalMuted);
      if (internalAudioRef.current) {
        internalAudioRef.current.muted = !internalMuted;
      }
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playPop();
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center p-3 sm:p-6 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-pink-200 my-auto text-left flex flex-col cursor-default animate-fade-up"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-pink-200/80 mb-3">
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs sm:text-sm font-heading font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Close Player</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-purple-950">
              Our Little Soundtrack 📼
            </h2>
            <p className="text-xs font-hand text-pink-600 font-bold">
              Special song playing for Humo ♡
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

        {/* Cassette Graphic & Player Body */}
        <div className="w-full bg-[#FFFDF9] rounded-2xl p-5 border-2 border-pink-200/80 shadow-md flex flex-col items-center">
          {/* Animated Cassette Tape */}
          <div className="relative my-2">
            <RetroCassetteSticker className="w-36 h-36 sm:w-44 sm:h-44" isPlaying={isPlaying} />
          </div>

          {/* Track Info */}
          <div className="text-center mt-1">
            <h3 className="text-lg font-heading font-bold text-purple-950 flex items-center justify-center gap-1.5">
              <span>{isMusicBoxMode ? music.musicBoxTitle : music.songTitle}</span>
              <Disc3 className={`w-4 h-4 text-purple-500 ${isPlaying ? 'animate-spin' : ''}`} />
            </h3>
            <p className="text-xs font-hand font-semibold text-pink-600 mt-0.5">
              {isMusicBoxMode ? 'Synthesized Birthday Bells ✨' : music.artist}
            </p>
          </div>

          {/* Progress Bar & Timers */}
          <div className="w-full mt-4 px-2">
            <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden border border-pink-200">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full transition-all duration-200 rounded-full"
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-heading font-medium text-purple-600 mt-1.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls: Play/Pause & Volume */}
          <div className="w-full flex items-center justify-between mt-4 px-2">
            <div className="text-[11px] font-heading font-semibold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
              {isPlaying ? 'Playing Now 🎵' : 'Paused ⏸️'}
            </div>

            {/* Big Play / Pause Button */}
            <button
              id="cassette-play-pause-btn"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-400 via-rose-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-transform active:scale-90 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-purple-600 hover:text-purple-800 cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-pink-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 accent-pink-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-[11px] font-hand font-semibold text-pink-500 mt-3">
          This melody plays gently in the background across all screens ♡
        </p>
      </div>
    </div>
  );
};
