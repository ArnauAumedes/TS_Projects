// GESTIONAR CRONOMETRE
// Permite crear y controlar un cronómetro con estados: stop, pause, run

export type EstatCronometre = 'stop' | 'pause' | 'run';

export class Cronometre {
	private estat: EstatCronometre = 'stop';
	private tempsInicial: number = 0;
	private tempsPausat: number = 0;
	private intervalId: number | null = null;
	private marques: string[] = [];
	private onUpdate: (temps: string) => void;
	private onMark: (marques: string[]) => void;

	constructor(onUpdate: (temps: string) => void, onMark: (marques: string[]) => void) {
		this.onUpdate = onUpdate;
		this.onMark = onMark;
	}

	private formatTemps(ms: number): string {
		const totalDecimes = Math.floor(ms / 100);
		const decimes = totalDecimes % 10;
		const totalSeconds = Math.floor(ms / 1000);
		const seconds = totalSeconds % 60;
		const minutes = Math.floor(totalSeconds / 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${decimes}`;
	}

	private tick = () => {
		if (this.estat === 'run') {
			const ara = Date.now();
			const ms = ara - this.tempsInicial + this.tempsPausat;
			this.onUpdate(this.formatTemps(ms));
		}
	};

	start() {
		if (this.estat === 'stop') {
			this.tempsInicial = Date.now();
			this.tempsPausat = 0;
			this.marques = [];
			this.onMark(this.marques);
		} else if (this.estat === 'pause') {
			this.tempsInicial = Date.now();
		} else if (this.estat === 'run') {
			// Añadir marca
			const ara = Date.now();
			const ms = ara - this.tempsInicial + this.tempsPausat;
			this.marques.unshift(this.formatTemps(ms));
			this.onMark(this.marques);
			return;
		}
		this.estat = 'run';
		this.intervalId = window.setInterval(this.tick, 100);
	}

	pause() {
		if (this.estat === 'run') {
			const ara = Date.now();
			this.tempsPausat += ara - this.tempsInicial;
			this.estat = 'pause';
			if (this.intervalId !== null) {
				clearInterval(this.intervalId);
				this.intervalId = null;
			}
		} else if (this.estat === 'pause') {
			this.start();
		}
	}

	reset() {
		this.estat = 'stop';
		this.tempsInicial = 0;
		this.tempsPausat = 0;
		this.marques = [];
		this.onMark(this.marques);
		this.onUpdate(this.formatTemps(0));
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	getEstat(): EstatCronometre {
		return this.estat;
	}
}
