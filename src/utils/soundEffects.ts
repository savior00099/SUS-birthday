/**
 * Sound effects utility using standard Web Audio API
 * No external sound files required! Works natively in modern browsers.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicBoxOscillators: OscillatorNode[] = [];
  private isMusicBoxPlaying: boolean = false;
  private musicBoxTimeout: number | null = null;

  private getContext(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Cute soft button tap sound
   */
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not permitted or interrupted
    }
  }

  /**
   * Playful rejection boop
   */
  playBoop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  /**
   * Sweet magical sparkle chime (e.g. for unlocking code or opening gift)
   */
  playSparkle() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.06);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + index * 0.06);
        osc.stop(ctx.currentTime + index * 0.06 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Candle blow-out whoosh sound
   */
  playBlowOut() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // White noise buffer for gentle puff
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.35);
    } catch {
      // ignore
    }
  }

  /**
   * Synthesized dreamy music box "Happy Birthday" melody
   * Runs in a loop or single cycle with callback progress
   */
  playHappyBirthdayMusicBox(
    onProgress?: (currentTime: number, duration: number) => void,
    onEnded?: () => void
  ) {
    this.stopMusicBox();
    const ctx = this.getContext();
    if (!ctx) return;

    this.isMusicBoxPlaying = true;

    // Happy birthday melody notes & durations
    // Note frequencies in Hz
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00;
    const C5 = 523.25, Bb4 = 466.16;

    const melody: Array<{ freq: number; dur: number }> = [
      { freq: C4, dur: 0.35 },
      { freq: C4, dur: 0.15 },
      { freq: D4, dur: 0.5 },
      { freq: C4, dur: 0.5 },
      { freq: F4, dur: 0.5 },
      { freq: E4, dur: 1.0 },

      { freq: C4, dur: 0.35 },
      { freq: C4, dur: 0.15 },
      { freq: D4, dur: 0.5 },
      { freq: C4, dur: 0.5 },
      { freq: G4, dur: 0.5 },
      { freq: F4, dur: 1.0 },

      { freq: C4, dur: 0.35 },
      { freq: C4, dur: 0.15 },
      { freq: C5, dur: 0.5 },
      { freq: A4, dur: 0.5 },
      { freq: F4, dur: 0.5 },
      { freq: E4, dur: 0.5 },
      { freq: D4, dur: 0.8 },

      { freq: Bb4, dur: 0.35 },
      { freq: Bb4, dur: 0.15 },
      { freq: A4, dur: 0.5 },
      { freq: F4, dur: 0.5 },
      { freq: G4, dur: 0.5 },
      { freq: F4, dur: 1.2 },
    ];

    const totalDuration = melody.reduce((acc, note) => acc + note.dur, 0);
    let timeOffset = ctx.currentTime + 0.1;

    melody.forEach((note) => {
      // Music box sound = primary sine + harmonic overtone with fast attack and warm decay
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(note.freq, timeOffset);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.freq * 2, timeOffset);

      gain.gain.setValueAtTime(0.18, timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + note.dur * 0.9);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(timeOffset);
      osc2.start(timeOffset);
      osc1.stop(timeOffset + note.dur);
      osc2.stop(timeOffset + note.dur);

      this.musicBoxOscillators.push(osc1, osc2);
      timeOffset += note.dur;
    });

    const startTime = Date.now();
    const interval = window.setInterval(() => {
      if (!this.isMusicBoxPlaying) {
        clearInterval(interval);
        return;
      }
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= totalDuration) {
        clearInterval(interval);
        this.isMusicBoxPlaying = false;
        if (onEnded) onEnded();
      } else {
        if (onProgress) onProgress(elapsed, totalDuration);
      }
    }, 100);

    this.musicBoxTimeout = window.setTimeout(() => {
      clearInterval(interval);
      this.isMusicBoxPlaying = false;
      if (onEnded) onEnded();
    }, totalDuration * 1000 + 500);
  }

  stopMusicBox() {
    this.isMusicBoxPlaying = false;
    if (this.musicBoxTimeout) {
      clearTimeout(this.musicBoxTimeout);
      this.musicBoxTimeout = null;
    }
    this.musicBoxOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.musicBoxOscillators = [];
  }
}

export const soundManager = new SoundManager();
