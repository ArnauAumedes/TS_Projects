// LLIBRERIA DE FUNCIONS PER A ESDEVENIMENTS DE RATOLÍ I TECLAT ESPECIALS
/**
 * Mostra la posició del ratolí dins d'un element HTML
 * @param div Element HTML on mostrar la posició
 * @param tipo Tipus de coordenades: "offset", "client", "page", "screen"
 */
export function mousePosition(div, tipo = "offset") {
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
            if (div)
                div.textContent = `Posició del ratolí (${tipo}): X=${x}, Y=${y}`;
        });
    }
}
/**
 * Detecta el moviment de la rodeta del ratolí
 * @param div Element HTML on mostrar el moviment
 * @param callback Opcional, funció a cridar amb la direcció
 */
export function mouseWheel(div, callback) {
    if (div) {
        div.addEventListener("wheel", (e) => {
            e.preventDefault();
            const direction = e.deltaY < 0 ? "up" : "down";
            if (div)
                div.textContent = `Moviment de la rodeta: ${direction === "up" ? "amunt" : "avall"}`;
            if (callback)
                callback(direction, e);
        }, { passive: false });
    }
}
/**
 * Mostra si el botó principal/secundari està premut
 * @param div Element HTML on mostrar l'estat
 * @param callback Opcional, funció a cridar amb l'estat
 */
export function mouseButtons(div, callback) {
    if (!div)
        return;
    function updateButtons(e) {
        const left = (e.buttons & 1) !== 0;
        const right = (e.buttons & 2) !== 0;
        if (div)
            div.textContent = `Botó principal: ${left ? "PREMUT" : "no"} | Botó secundari: ${right ? "PREMUT" : "no"}`;
        if (callback)
            callback({ left, right }, e);
    }
    div.addEventListener("mousedown", updateButtons);
    div.addEventListener("mouseup", updateButtons);
    div.addEventListener("mouseleave", () => {
        if (div)
            div.textContent = "Botó principal: no | Botó secundari: no";
    });
    div.addEventListener("contextmenu", (e) => e.preventDefault());
}
/**
 * Mostra l'estat dels botons i les tecles especials premudes
 * @param div Element HTML on mostrar l'estat
 * @param callback Opcional, funció a cridar amb l'estat
 */
export function mouseButtonsWithKeys(div, callback) {
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
            msg += keys.length ? ` | Tecles especials: ${keys.join(", ")}` : " | Tecles especials: cap";
        }
        if (div)
            div.textContent = msg;
        if (callback)
            callback({ left, right, keys }, e);
    }
    function resetKeys() {
        if (div)
            div.textContent = "Botó principal: no | Botó secundari: no";
    }
    div.addEventListener("mousedown", updateButtons);
    div.addEventListener("mouseup", updateButtons);
    div.addEventListener("mouseleave", resetKeys);
    div.addEventListener("contextmenu", (e) => e.preventDefault());
}
