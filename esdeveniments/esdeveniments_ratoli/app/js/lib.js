"use strict";
/**
 * Funció per obtenir la posició del ratolí dins d'un element HTML
 * @param div Element HTML on es vol obtenir la posició del ratolí
 * @param tipo Tipus de coordenades: "offset", "client", "page", "screen"
 * @returns void
 */
function mousePosition(div, tipo = "offset") {
    if (div) {
        div.addEventListener("mousemove", (e) => {
            let x = 0, y = 0;
            switch (tipo) {
                case "offset":
                    x = e.offsetX;
                    y = e.offsetY;
                    break;
                case "client":
                    x = e.clientX;
                    y = e.clientY;
                    break;
                case "page":
                    x = e.pageX;
                    y = e.pageY;
                    break;
                case "screen":
                    x = e.screenX;
                    y = e.screenY;
                    break;
            }
            div.textContent = `Posició del ratolí (${tipo}): X=${x}, Y=${y}`;
        });
    }
}
const divScale = document.getElementById("mouseScale");
mousePosition(divScale, "offset");
/**
 * Funció per detectar el moviment de la rodeta del ratolí
 * @param div Element HTML on es mostrarà el moviment de la rodeta
 * @param callback Funció opcional que es crida quan es mou la rodeta
 * @returns void
 */
function mouseWheel(div, callback) {
    if (div) {
        div.addEventListener("wheel", (e) => {
            e.preventDefault();
            const direction = e.deltaY < 0 ? "up" : "down";
            div.textContent = `Moviment de la rodeta: ${direction === "up" ? "amunt" : "avall"}`;
            if (callback)
                callback(direction, e);
        }, { passive: false });
    }
}
/**
 * Funció per detectar l'estat dels botons del ratolí
 * @param div Element HTML on es mostrarà l'estat dels botons
 * @param callback Funció opcional que es crida quan canvia l'estat dels botons
 * @returns void
 */
function mouseButtons(div, callback) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    if (!div)
        return;
    function updateButtons(e) {
        const left = (e.buttons & 1) !== 0;
        const right = (e.buttons & 2) !== 0;
        if (div) {
            div.textContent = `Botó principal: ${left ? "PREMUT" : "no"} | Botó secundari: ${right ? "PREMUT" : "no"}`;
        }
        if (callback)
            callback({ left, right }, e);
    }
    div.addEventListener("mousedown", updateButtons);
    div.addEventListener("mouseup", updateButtons);
    div.addEventListener("mouseleave", () => {
        div.textContent = "Botó principal: no | Botó secundari: no";
    });
    // Evitar menú contextual del botón derecho
    div.addEventListener("contextmenu", (e) => e.preventDefault());
}
/**
 * Funció per detectar l'estat dels botons del ratolí i mostrar tecles especials premudes
 * @param div Element HTML on es mostrarà l'estat dels botons i tecles
 * @param callback Funció opcional que es crida quan canvia l'estat dels botons
 * @returns void
 */
function mouseButtonsWithKeys(div, callback) {
    if (!div)
        return;
    function getSpecialKeys(e) {
        const keys = [];
        if (e.ctrlKey)
            keys.push("Ctrl");
        if (e.shiftKey)
            keys.push("Shift");
        if (e.altKey)
            keys.push("Alt");
        if (e.metaKey)
            keys.push("Meta");
        return keys;
    }
    function updateButtons(e) {
        const left = (e.buttons & 1) !== 0;
        const right = (e.buttons & 2) !== 0;
        const keys = getSpecialKeys(e);
        let msg = `Botó principal: ${left ? "PREMUT" : "no"} | Botó secundari: ${right ? "PREMUT" : "no"}`;
        if (left || right) {
            msg += keys.length
                ? ` | Tecles especials: ${keys.join(", ")}`
                : " | Tecles especials: cap";
        }
        if (div)
            div.textContent = msg;
        if (callback)
            callback({ left, right, keys }, e);
    }
    div.addEventListener("mousedown", updateButtons);
    div.addEventListener("mouseup", updateButtons);
    div.addEventListener("mouseleave", () => {
        div.textContent = "Botó principal: no | Botó secundari: no";
    });
    div.addEventListener("contextmenu", (e) => e.preventDefault());
}
// Ejemplo de uso:
mouseWheel(document.querySelector("div"));
mouseButtons(document.querySelector("div"));
mouseButtonsWithKeys(document.querySelector("div"));
