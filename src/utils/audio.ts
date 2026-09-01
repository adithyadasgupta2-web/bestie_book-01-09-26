/**
 * Web Audio API synthesizer for realistic page flip sound effects,
 * sparkle chimes, trophy fanfare, candle blow, and background melody.
 */

export interface PageTurnOptions {
  direction?: 'forward' | 'backward';
  isCover?: boolean;
  multiPage?: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicOscillators: OscillatorNode[] = [];
  private musicGain: GainNode | null = null;
  private isPlayingSynthMusic: boolean = false;
  private musicTimeout: number | null = null;
  private lastPageTurnTime: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  /**
   * Realistic, tactile multi-layered page flip sound:
   * Layer 1: High-frequency crisp paper edge lift & friction
   * Layer 2: Aerodynamic curved page swoosh with resonant sweep
   * Layer 3: Paper fiber micro-texture / crinkle
   * Layer 4: Soft landing / page deck settle tap
   */
  public playPageTurn(options: PageTurnOptions = {}) {
    if (this.isMuted) return;
    const now = Date.now();
    // Debounce rapid repeated triggers within 60ms
    if (now - this.lastPageTurnTime < 60) return;
    this.lastPageTurnTime = now;

    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const currentTime = ctx.currentTime;

      const { direction = 'forward', isCover = false, multiPage = false } = options;

      // Master gain for subtle realism
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isCover ? 0.38 : 0.28, currentTime);
      masterGain.connect(ctx.destination);

      // Helper function to synthesize a single paper flip event
      const synthesizeSingleFlip = (startTime: number, speedScale: number = 1.0, isHeavy: boolean = false) => {
        const duration = (isHeavy ? 0.36 : 0.26) * speedScale;

        // 1. Noise buffer generation with pink/brownish spectral damping for natural paper
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Pink noise filter algorithm
          lastOut = (lastOut * 0.7) + (white * 0.3);
          const env = Math.sin((i / bufferSize) * Math.PI);
          output[i] = lastOut * env;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        // 2. Layer A: Aerodynamic Swoosh (Bandpass filter sweeping down)
        const swooshFilter = ctx.createBiquadFilter();
        swooshFilter.type = 'bandpass';
        swooshFilter.Q.setValueAtTime(isHeavy ? 1.5 : 2.2, startTime);

        const startFreq = direction === 'forward' ? (isHeavy ? 1400 : 1900) : (isHeavy ? 1100 : 1600);
        const endFreq = isHeavy ? 280 : 380;

        swooshFilter.frequency.setValueAtTime(startFreq, startTime);
        swooshFilter.frequency.exponentialRampToValueAtTime(
          Math.max(100, endFreq),
          startTime + duration * 0.85
        );

        const swooshGain = ctx.createGain();
        swooshGain.gain.setValueAtTime(0.001, startTime);
        swooshGain.gain.linearRampToValueAtTime(isHeavy ? 0.75 : 0.6, startTime + duration * 0.25);
        swooshGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        noiseSource.connect(swooshFilter);
        swooshFilter.connect(swooshGain);
        swooshGain.connect(masterGain);

        // 3. Layer B: Crisp Paper Edge Lift & Fiber Texture (Highpass shimmer)
        const textureSource = ctx.createBufferSource();
        textureSource.buffer = noiseBuffer;

        const highFilter = ctx.createBiquadFilter();
        highFilter.type = 'highpass';
        highFilter.frequency.setValueAtTime(isHeavy ? 2800 : 3800, startTime);

        const textureGain = ctx.createGain();
        textureGain.gain.setValueAtTime(0.001, startTime);
        textureGain.gain.linearRampToValueAtTime(0.25, startTime + duration * 0.15);
        textureGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.7);

        textureSource.connect(highFilter);
        highFilter.connect(textureGain);
        textureGain.connect(masterGain);

        // 4. Layer C: Soft Page Deck Landing / Settle Tap
        const tapOsc = ctx.createOscillator();
        const tapGain = ctx.createGain();

        tapOsc.type = isHeavy ? 'triangle' : 'sine';
        const tapFreq = isHeavy ? 140 : 190 + Math.random() * 25;
        const tapTime = startTime + duration * 0.65;

        tapOsc.frequency.setValueAtTime(tapFreq, tapTime);
        tapOsc.frequency.exponentialRampToValueAtTime(60, tapTime + 0.05);

        tapGain.gain.setValueAtTime(0.0001, tapTime);
        tapGain.gain.linearRampToValueAtTime(isHeavy ? 0.35 : 0.22, tapTime + 0.008);
        tapGain.gain.exponentialRampToValueAtTime(0.0001, tapTime + 0.06);

        tapOsc.connect(tapGain);
        tapGain.connect(masterGain);

        // Trigger nodes
        noiseSource.start(startTime);
        noiseSource.stop(startTime + duration + 0.02);
        textureSource.start(startTime);
        textureSource.stop(startTime + duration + 0.02);
        tapOsc.start(tapTime);
        tapOsc.stop(tapTime + 0.07);
      };

      if (multiPage) {
        // Multi-page riffle/flutter effect
        synthesizeSingleFlip(currentTime, 0.65, false);
        synthesizeSingleFlip(currentTime + 0.08, 0.75, false);
        synthesizeSingleFlip(currentTime + 0.17, 0.95, isCover);
      } else {
        synthesizeSingleFlip(currentTime, 1.0, isCover);
      }
    } catch {
      // AudioContext might be waiting for user gesture
    }
  }

  // Magical sparkle chime sound
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  // Fun award / trophy fanfare
  public playTrophyFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      const chord = [440, 554.37, 659.25, 880]; // A major
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.85);
      });
    } catch {
      // ignore
    }
  }

  // Candle blowing sound + celebratory chime
  public playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      // Wind / breath noise
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Follow up with sparkle after 0.5s
      setTimeout(() => {
        this.playSparkle();
      }, 500);
    } catch {
      // ignore
    }
  }

  // Soft ambient music synthesizer for Happy Birthday vibes if MP3 is loading or standalone
  public startLofiBirthdaySynth(volume: number = 0.3) {
    if (this.isPlayingSynthMusic) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      this.isPlayingSynthMusic = true;
      this.musicGain = ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : volume, ctx.currentTime);
      this.musicGain.connect(ctx.destination);

      // Happy Birthday chords sequence (F, C, C, F, Bb, F, C, F)
      const chords = [
        [349.23, 440.0, 523.25], // F major (F4, A4, C5)
        [261.63, 329.63, 392.0], // C major (C4, E4, G4)
        [261.63, 329.63, 392.0], // C major
        [349.23, 440.0, 523.25], // F major
        [233.08, 293.66, 349.23], // Bb major (Bb3, D4, F4)
        [349.23, 440.0, 523.25], // F major
        [261.63, 329.63, 392.0], // C major
        [349.23, 440.0, 523.25], // F major
      ];

      let chordIndex = 0;
      const playNextChord = () => {
        if (!this.isPlayingSynthMusic || !this.ctx || !this.musicGain) return;
        const currentChord = chords[chordIndex];
        chordIndex = (chordIndex + 1) % chords.length;

        currentChord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.4);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

          osc.connect(noteGain);
          noteGain.connect(this.musicGain!);

          osc.start();
          osc.stop(ctx.currentTime + 2.3);
        });

        this.musicTimeout = window.setTimeout(playNextChord, 2200);
      };

      playNextChord();
    } catch {
      // ignore
    }
  }

  public stopLofiBirthdaySynth() {
    this.isPlayingSynthMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
    this.musicOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // ignore
      }
    });
    this.musicOscillators = [];
  }

  public setVolume(vol: number) {
    if (this.musicGain && this.ctx && !this.isMuted) {
      this.musicGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }
}

export const soundEngine = new SoundEngine();
