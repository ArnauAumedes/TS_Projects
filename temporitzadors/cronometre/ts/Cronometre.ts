// TypeScript library for a stopwatch (cronòmetre) with MM:SS.D format and state management

export type CronometreState = 'stop' | 'pause' | 'run';

export interface CronometreOptions {
  onTick?: (formatted: string, minutes: number, seconds: number, tenths: number) => void;
  onStateChange?: (state: CronometreState) => void;
  onMark?: (mark: string) => void;
  onReset?: () => void;
}

export class Cronometre {
  private state: CronometreState = 'stop';
  private intervalId: number | null = null;
  private startTimestamp: number = 0;
  private elapsedMs: number = 0;
  private marks: string[] = [];
  private options: CronometreOptions;

  constructor(options: CronometreOptions = {}) {
    this.options = options;
  }

  getState(): CronometreState {
    return this.state;
  }

  getMarks(): string[] {
    return [...this.marks];
  }

  getTime(): { minutes: number; seconds: number; tenths: number } {
    const ms = this.state === 'run' ? Date.now() - this.startTimestamp + this.elapsedMs : this.elapsedMs;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const tenths = Math.floor((ms % 1000) / 100);
    return { minutes, seconds, tenths };
  }

  getFormattedTime(): string {
    const { minutes, seconds, tenths } = this.getTime();
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
  }

  private tick = () => {
    if (this.options.onTick) {
      const { minutes, seconds, tenths } = this.getTime();
      this.options.onTick(this.getFormattedTime(), minutes, seconds, tenths);
    }
  };

  start() {
    if (this.state === 'run') {
      // Mark current time
      const mark = this.getFormattedTime();
      this.marks.unshift(mark);
      if (this.options.onMark) this.options.onMark(mark);
      return;
    }
    // Start or resume
    this.state = 'run';
    this.startTimestamp = Date.now();
    this.intervalId = window.setInterval(this.tick, 100);
    if (this.options.onStateChange) this.options.onStateChange(this.state);
    this.tick();
  }

  pause() {
    if (this.state === 'run') {
      this.elapsedMs += Date.now() - this.startTimestamp;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.state = 'pause';
      if (this.options.onStateChange) this.options.onStateChange(this.state);
    } else if (this.state === 'pause') {
      this.start();
    }
  }

  reset() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.state = 'stop';
    this.elapsedMs = 0;
    this.startTimestamp = 0;
    this.marks = [];
    if (this.options.onReset) this.options.onReset();
    if (this.options.onStateChange) this.options.onStateChange(this.state);
    this.tick();
  }
}
