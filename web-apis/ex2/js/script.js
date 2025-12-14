"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Función para obtener los estilos CSS embebidos de la página
function getStyles() {
    let styles = '';
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            if (sheet.cssRules) {
                for (const rule of Array.from(sheet.cssRules)) {
                    styles += rule.cssText + '\n';
                }
            }
        }
        catch (e) {
            // Puede lanzar error por CORS en hojas externas, ignorar
        }
    }
    return `<style>\n${styles}</style>\n`;
}
// Copiar el DIV con estilos al portapapeles
function copyDivWithStyles() {
    return __awaiter(this, void 0, void 0, function* () {
        const div = document.getElementById('complex-object');
        if (!div)
            return;
        const styles = getStyles();
        const html = styles + div.outerHTML;
        try {
            yield navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([html], { type: 'text/html' }),
                    'text/plain': new Blob([div.innerText], { type: 'text/plain' })
                })
            ]);
            alert('DIV copiat al portapapers!');
        }
        catch (err) {
            alert('Error al copiar al portapapers: ' + err);
        }
    });
}
(_a = document.getElementById('copy-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', copyDivWithStyles);
// Pegar el contenido HTML del portapapeles al final del body
function pasteClipboardContent() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clipboardItems = yield navigator.clipboard.read();
            for (const item of clipboardItems) {
                if (item.types.includes('text/html')) {
                    const blob = yield item.getType('text/html');
                    const html = yield blob.text();
                    const temp = document.createElement('div');
                    temp.innerHTML = html;
                    // Añadir solo el contenido relevante (por ejemplo, el DIV copiado)
                    const pasted = temp.querySelector('#complex-object') || temp.firstElementChild;
                    if (pasted) {
                        document.body.appendChild(pasted.cloneNode(true));
                    }
                    else {
                        // Si no hay un div específico, añadir todo el HTML
                        document.body.insertAdjacentHTML('beforeend', html);
                    }
                    return;
                }
            }
            // Si no hay HTML, intentar pegar como texto plano
            const text = yield navigator.clipboard.readText();
            if (text) {
                const p = document.createElement('p');
                p.textContent = text;
                document.body.appendChild(p);
            }
        }
        catch (err) {
            alert('Error al enganxar del portapapers: ' + err);
        }
    });
}
(_b = document.getElementById('paste-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', pasteClipboardContent);
