// GESTIONAR PORTAPAPERS (Clipboard API)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Extreu estils CSS dels fulls indicats i els retorna dins d'una etiqueta <style>.
 * Si no es passa cap llista, intentarà afegir tots els estils accessibles.
 */
export function getStyles(fileNames = []) {
    let styles = "";
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            const href = sheet.href;
            if (fileNames.length && href) {
                const file = href.substring(href.lastIndexOf("/") + 1);
                if (!fileNames.includes(file))
                    continue;
            }
            const rules = sheet.cssRules;
            if (!rules)
                continue;
            for (const rule of Array.from(rules)) {
                styles += rule.cssText + "\n";
            }
        }
        catch (err) {
            // Alguns fulls poden ser cross-origin; s'ignoren silenciosament
            continue;
        }
    }
    return styles ? `<style>\n${styles}</style>\n` : "";
}
/**
 * Copia un element HTML al portapapers incloent estils opcionalment.
 * Usa Clipboard API; requereix context segur (https o localhost).
 */
export function copyElementWithStyles(element_1) {
    return __awaiter(this, arguments, void 0, function* (element, styleFiles = []) {
        var _a;
        if (!navigator.clipboard || !navigator.clipboard.write) {
            throw new Error("Clipboard API no disponible en aquest navegador");
        }
        const html = getStyles(styleFiles) + element.outerHTML;
        const blob = new Blob([html], { type: "text/html" });
        yield navigator.clipboard.write([
            new ClipboardItem({
                "text/html": blob,
                "text/plain": new Blob([(_a = element.textContent) !== null && _a !== void 0 ? _a : ""], {
                    type: "text/plain",
                }),
            }),
        ]);
    });
}
/**
 * Llegeix del portapapers i insereix el contingut al final del contenidor indicat.
 * Intenta primer text/html; si no, afegeix text pla.
 */
export function pasteIntoContainer(container) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!navigator.clipboard) {
            throw new Error("Clipboard API no disponible en aquest navegador");
        }
        // Si es pot llegir ítems rics
        if (navigator.clipboard.read) {
            const items = yield navigator.clipboard.read();
            for (const item of items) {
                if (item.types.includes("text/html")) {
                    const blob = yield item.getType("text/html");
                    const html = yield blob.text();
                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = html;
                    container.appendChild(wrapper);
                    return;
                }
            }
        }
        // Fallback a text pla
        const text = yield navigator.clipboard.readText();
        const pre = document.createElement("pre");
        pre.textContent = text;
        container.appendChild(pre);
    });
}
/**
 * Assigna la logica de copiar a un botó.
 * Mostra un feedback curt en text del botó.
 */
export function setupCopyButton(button, elementToCopy, styleFiles = []) {
    button.title = "Copiar al portapapers";
    button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const original = button.textContent;
        try {
            yield copyElementWithStyles(elementToCopy, styleFiles);
            button.textContent = "Copiat";
        }
        catch (err) {
            console.error(err);
            alert("No s'ha pogut copiar al portapapers.\n" + err);
        }
        finally {
            setTimeout(() => {
                button.textContent = original !== null && original !== void 0 ? original : "Copy";
            }, 1200);
        }
    }));
}
/**
 * Assigna la logica d'enganxar a un botó, afegint el contingut al contenidor.
 */
export function setupPasteButton(button, targetContainer) {
    button.title = "Enganxar des del portapapers";
    button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield pasteIntoContainer(targetContainer);
        }
        catch (err) {
            console.error(err);
            alert("No s'ha pogut enganxar des del portapapers.\n" + err);
        }
    }));
}
