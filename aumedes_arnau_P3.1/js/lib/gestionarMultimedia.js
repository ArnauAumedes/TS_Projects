// Llibreria per gestionar controls multimèdia (audio/video)
// Permet afegir una barra de botons per controlar un element multimèdia
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BarraMultimedia_instances, _BarraMultimedia_crearBarra, _BarraMultimedia_playPausa, _BarraMultimedia_avancar, _BarraMultimedia_retrocedir, _BarraMultimedia_pujarVolum, _BarraMultimedia_baixarVolum, _BarraMultimedia_gestionarFinalReproduccio;
/**
 * BarraMultimedia: Classe per crear una barra de controls per a un element multimèdia (audio o vídeo)
 */
export class BarraMultimedia {
    /**
     * Constructor de la classe BarraMultimedia
     * @param elementOrId Element multimèdia o ID de l'element
     * @param container (opcional) Contenidor on afegir la barra de controls
     */
    constructor(elementOrId, container) {
        _BarraMultimedia_instances.add(this);
        if (typeof elementOrId === 'string') {
            const el = document.getElementById(elementOrId);
            if (!el)
                throw new Error('Element multimèdia no trobat');
            this.element = el;
        }
        else {
            this.element = elementOrId;
        }
        this.container = container || this.element.parentElement || document.body;
        this.barra = __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_crearBarra).call(this);
        this.container.appendChild(this.barra);
        __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_gestionarFinalReproduccio).call(this);
    }
}
_BarraMultimedia_instances = new WeakSet(), _BarraMultimedia_crearBarra = function _BarraMultimedia_crearBarra() {
    const barra = document.createElement('div');
    barra.className = 'barra-multimedia';
    // Botó Play/Pausa
    const btnPlay = document.createElement('button');
    btnPlay.textContent = '▶️/⏸️';
    btnPlay.title = 'Play/Pausa';
    btnPlay.addEventListener('click', () => __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_playPausa).call(this));
    barra.appendChild(btnPlay);
    // Botó Retrocedir 5s
    const btnRecul = document.createElement('button');
    btnRecul.textContent = '⏪ -5s';
    btnRecul.title = 'Retrocedir 5 segons';
    btnRecul.addEventListener('click', () => __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_retrocedir).call(this));
    barra.appendChild(btnRecul);
    // Botó Avançar 5s
    const btnAvanca = document.createElement('button');
    btnAvanca.textContent = '⏩ +5s';
    btnAvanca.title = 'Avançar 5 segons';
    btnAvanca.addEventListener('click', () => __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_avancar).call(this));
    barra.appendChild(btnAvanca);
    // Botó Volum -
    const btnVolMenys = document.createElement('button');
    btnVolMenys.textContent = '🔉 -';
    btnVolMenys.title = 'Baixar volum';
    btnVolMenys.addEventListener('click', () => __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_baixarVolum).call(this));
    barra.appendChild(btnVolMenys);
    // Botó Volum +
    const btnVolMes = document.createElement('button');
    btnVolMes.textContent = '🔊 +';
    btnVolMes.title = 'Pujar volum';
    btnVolMes.addEventListener('click', () => __classPrivateFieldGet(this, _BarraMultimedia_instances, "m", _BarraMultimedia_pujarVolum).call(this));
    barra.appendChild(btnVolMes);
    return barra;
}, _BarraMultimedia_playPausa = function _BarraMultimedia_playPausa() {
    if (this.element.paused) {
        this.element.play();
    }
    else {
        this.element.pause();
    }
}, _BarraMultimedia_avancar = function _BarraMultimedia_avancar() {
    this.element.currentTime = Math.min(this.element.currentTime + 5, this.element.duration || Infinity);
}, _BarraMultimedia_retrocedir = function _BarraMultimedia_retrocedir() {
    this.element.currentTime = Math.max(this.element.currentTime - 5, 0);
}, _BarraMultimedia_pujarVolum = function _BarraMultimedia_pujarVolum() {
    this.element.volume = Math.min(this.element.volume + 0.1, 1);
}, _BarraMultimedia_baixarVolum = function _BarraMultimedia_baixarVolum() {
    this.element.volume = Math.max(this.element.volume - 0.1, 0);
}, _BarraMultimedia_gestionarFinalReproduccio = function _BarraMultimedia_gestionarFinalReproduccio() {
    this.element.addEventListener('ended', () => {
        // Quan acaba la reproducció, posem a 0 el temps
        this.element.currentTime = 0;
    });
};
