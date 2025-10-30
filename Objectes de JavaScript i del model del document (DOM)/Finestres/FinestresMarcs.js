"use strict";
import { informacio } from "../informacio/informacio.js";
/******************************************************
 * EN AQUEST APARTAT PODEU AFEGIR O MODIFICAR FUNCIONS *
 ******************************************************/
/**
 * Retorna informació sobre el sistema.
 *
 * @return {string}				Descripció en l'enunciat
 */
function informacioSistema() {
    return informacio();
}
/**
 * Mostra informació o la web d'una URL en un frame.
 *
 * @param {string} url				URL que es vol mostrar o en blanc per mostrar informació
 * @param {HTMLIFrameElement} f		Element iframe on mostrar la URL o la informació
 *
 * Més detalls en l'enunciat
 */
function setFrame(url, f) {
    try {
        url = url.trim();
        if (url === "") {
            f.srcdoc = informacioSistema();
        }
        else {
            f.src = url;
        }
    }
    catch (error) {
        window.addEventListener('error', () => {
            alert(`Error en carregar la URL: ${error}`);
        });
    }
}
/**
 * Mostra informació o la web d'una URL en un frame o finestra.
 *
 * @param {string} url				URL que es vol mostrar o en blanc per mostrar informació
 * @param {string} name				nom de la nova pestanya: frame, window, diferent dels anteriors o en blanc
 * @param {HTMLIFrameElement} f		Element iframe on mostrar la URL o la informació si name = frame
 *
 * Més detalls en l'enunciat
 */
function newWindow(url, name, f) {
    if (name === "window") {
        window.open(url);
    }
    else if (name === "frame") {
        setFrame(url, f);
    }
    else {
        // Comportament per defecte
        informacioSistema();
    }
}
/************************************************
 * FINAL DE L'APARTAT ON PODEU FER MODIFICACIONS *
 ************************************************/
function sF() {
    let url = document.getElementById('winURL').value;
    let f = document.getElementById('fr0');
    setFrame(url, f);
}
function nW() {
    let url = document.getElementById('winURL').value;
    let name = document.getElementById('winName').value;
    let f = document.getElementById('fr0');
    newWindow(url, name, f);
}
// Exponer funciones globalmente para que onclick del HTML funcione
window.sF = sF;
window.nW = nW;
//# sourceMappingURL=FinestresMarcs.js.map