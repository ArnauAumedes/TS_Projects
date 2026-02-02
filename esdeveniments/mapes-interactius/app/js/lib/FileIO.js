/**
 * Mòdul d’utilitats per guardar i carregar arxius al navegador.
 * Centralitza la lògica de Blob, FileReader i descàrrega per reutilitzar-la
 * des de qualsevol part de l’aplicació (mapes interactius, barres d’eines, etc.).
 */
/**
 * Descarrega un arxiu de text amb el nom i contingut indicats.
 */
export function downloadText(filename, text, mimeType = "text/plain") {
    const file = new Blob([text], { type: mimeType });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}
/**
 * Descarrega la imatge del canvas com a fitxer (JPEG).
 */
export function downloadImage(filename, canvas, quality = 0.95) {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg", quality);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}
/**
 * Llegeix el primer fitxer seleccionat com a text.
 * Retorna una Promise que es resol amb el contingut o es rebutja amb un error.
 */
export function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => { var _a, _b; return resolve((_b = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.result) !== null && _b !== void 0 ? _b : ""); };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}
/**
 * Llegeix el primer fitxer seleccionat com a Data URL (base64).
 * Útil per imatges o per inserir directament en src.
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => { var _a, _b; return resolve((_b = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.result) !== null && _b !== void 0 ? _b : ""); };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
/**
 * Processa l’esdeveniment change d’un <input type="file">: llegeix el primer
 * fitxer com a text i crida el callback amb el resultat.
 */
export function handleFileSelectAsText(evt, onLoaded, options = {}) {
    const input = evt.target;
    const files = input.files;
    if (!(files === null || files === void 0 ? void 0 : files.length))
        return;
    const file = files[0];
    readFileAsText(file).then((text) => {
        onLoaded(text);
        if (options.resetAfterSelect !== false)
            input.value = "";
    });
}
/**
 * Processa l’esdeveniment change d’un <input type="file">: llegeix el primer
 * fitxer com a Data URL i crida el callback amb el resultat.
 */
export function handleFileSelectAsDataURL(evt, onLoaded, options = {}) {
    const input = evt.target;
    const files = input.files;
    if (!(files === null || files === void 0 ? void 0 : files.length))
        return;
    const file = files[0];
    readFileAsDataURL(file).then((dataUrl) => {
        onLoaded(dataUrl);
        if (options.resetAfterSelect !== false)
            input.value = "";
    });
}
/**
 * Converteix l’array de fitxers d’un esdeveniment drop (Drag & Drop) al format
 * que esperen les funcions de lectura. Útil per reutilitzar la mateixa lògica
 * que amb <input type="file">.
 */
export function getFilesFromDrop(evt) {
    evt.preventDefault();
    const dt = evt.dataTransfer;
    if (!(dt === null || dt === void 0 ? void 0 : dt.files))
        return [];
    return Array.from(dt.files);
}
/**
 * Afegeix als gestors dragover/drop d’un element el comportament bàsic
 * (evitar acció per defecte) i, en drop, crida el callback amb la llista de fitxers.
 */
export function setupDropZone(element, onDrop) {
    const prevent = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const files = getFilesFromDrop(e);
        if (files.length)
            onDrop(files);
    };
    element.addEventListener("dragover", prevent);
    element.addEventListener("drop", handleDrop);
    return () => {
        element.removeEventListener("dragover", prevent);
        element.removeEventListener("drop", handleDrop);
    };
}
