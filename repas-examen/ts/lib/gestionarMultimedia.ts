// Llibreria per gestionar controls multimèdia (audio/video)
// Permet afegir una barra de botons per controlar un element multimèdia

/**
 * BarraMultimedia: Classe per crear una barra de controls per a un element multimèdia (audio o vídeo)
 */
export class BarraMultimedia {
	private element: HTMLMediaElement;
	private container: HTMLElement;
	private barra: HTMLDivElement;

    /**
     * Constructor de la classe BarraMultimedia
     * @param elementOrId Element multimèdia o ID de l'element
     * @param container (opcional) Contenidor on afegir la barra de controls
     */
	constructor(elementOrId: string | HTMLMediaElement, container?: HTMLElement) {
		if (typeof elementOrId === 'string') {
			const el = document.getElementById(elementOrId) as HTMLMediaElement | null;
			if (!el) throw new Error('Element multimèdia no trobat');
			this.element = el;
		} else {
			this.element = elementOrId;
		}
		this.container = container || this.element.parentElement || document.body;
		this.barra = this.#crearBarra();
		this.container.appendChild(this.barra);
		this.#gestionarFinalReproduccio();
	}
    /**
     * Crear la barra de controls multimèdia
     * @returns Element div que conté la barra de controls
     */
	#crearBarra(): HTMLDivElement {
		const barra = document.createElement('div');
		barra.className = 'barra-multimedia';

		// Botó Play/Pausa
		const btnPlay = document.createElement('button');
		btnPlay.textContent = '▶️/⏸️';
		btnPlay.title = 'Play/Pausa';
		btnPlay.addEventListener('click', () => this.#playPausa());
		barra.appendChild(btnPlay);

		// Botó Retrocedir 5s
		const btnRecul = document.createElement('button');
		btnRecul.textContent = '⏪ -5s';
		btnRecul.title = 'Retrocedir 5 segons';
		btnRecul.addEventListener('click', () => this.#retrocedir());
		barra.appendChild(btnRecul);

		// Botó Avançar 5s
		const btnAvanca = document.createElement('button');
		btnAvanca.textContent = '⏩ +5s';
		btnAvanca.title = 'Avançar 5 segons';
		btnAvanca.addEventListener('click', () => this.#avancar());
		barra.appendChild(btnAvanca);

		// Botó Volum -
		const btnVolMenys = document.createElement('button');
		btnVolMenys.textContent = '🔉 -';
		btnVolMenys.title = 'Baixar volum';
		btnVolMenys.addEventListener('click', () => this.#baixarVolum());
		barra.appendChild(btnVolMenys);

		// Botó Volum +
		const btnVolMes = document.createElement('button');
		btnVolMes.textContent = '🔊 +';
		btnVolMes.title = 'Pujar volum';
		btnVolMes.addEventListener('click', () => this.#pujarVolum());
		barra.appendChild(btnVolMes);

		return barra;
	}

    /**
     * Funcions per als controls multimèdia
     */
	#playPausa() {
		if (this.element.paused) {
			this.element.play();
		} else {
			this.element.pause();
		}
	}

	#avancar() {
		this.element.currentTime = Math.min(this.element.currentTime + 5, this.element.duration || Infinity);
	}

	#retrocedir() {
		this.element.currentTime = Math.max(this.element.currentTime - 5, 0);
	}

	#pujarVolum() {
		this.element.volume = Math.min(this.element.volume + 0.1, 1);
	}

	#baixarVolum() {
		this.element.volume = Math.max(this.element.volume - 0.1, 0);
	}

    /**
     * Gestionar l'esdeveniment de final de reproducció
     */
	#gestionarFinalReproduccio() {
		this.element.addEventListener('ended', () => {
			// Quan acaba la reproducció, posem a 0 el temps
			this.element.currentTime = 0;
		});
	}
}
