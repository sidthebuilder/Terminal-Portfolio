class SoundManager {
    private audioCtx: AudioContext | null = null;
    private volume: number = 0.3; // Default volume

    constructor() {
        // Initialize AudioContext on first user interaction if needed, 
        // but browsers usually block until interaction.
        // We'll create it on the first play call if null, or try now.
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.audioCtx = new AudioContext();
        } catch (e) {
            console.warn("Web Audio API not supported", e);
        }
    }

    private initCtx() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        // Resume if suspended (browser autoplay policy)
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    public playClick() {
        if (!this.audioCtx) this.initCtx();
        if (!this.audioCtx) return;

        const t = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        // High frequency "click"
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);

        // Short burst
        gain.gain.setValueAtTime(this.volume, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.05);
    }

    public playEnter() {
        if (!this.audioCtx) this.initCtx();
        if (!this.audioCtx) return;

        const t = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        // Lower confirmation tone
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);

        gain.gain.setValueAtTime(this.volume, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.1);
    }
}

export const soundManager = new SoundManager();
