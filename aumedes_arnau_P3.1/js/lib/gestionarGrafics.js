/**
 * Gestionar gràfics de barres animats
 * Permet crear i animar gràfics de barres amb diferents modes d'animació.
 *
 * Modes d'animació:
 * 1. Primera barra immediata, següents cada 0.5s
 * 2. Barres consecutives (una després de l'altra)
 * 3. Totes simultànies, mateix ritme (les curtes acaben abans)
 * 4. Totes simultànies, totes acaben alhora (les llargues creixen més ràpid)
 *
 * Exemple d'ús:
 *   crearGraficBarres([240, 80, 120], document.body, 'simultani-mateix-temps');
 */
/**
 * Crea i anima un gràfic de barres dins d'un contenidor
 * @param valors Array de valors de les barres
 * @param container Element on es dibuixa el gràfic
 * @param mode Mode d'animació
 * @param tempsDurada Temps total d'animació (ms) per barra (per defecte 1000)
 */
export function crearGraficBarres(valors, container, mode = "simultani-mateix-temps", tempsDurada = 1000) {
    // Configuració bàsica
    const ampleBarra = 40;
    const separacio = 20;
    const maxAlcada = Math.max(...valors);
    const colors = ["#50e050", "#6060f0", "#f06060", "#f0c040", "#40c0f0"];
    // Crear contenidor SVG
    const ampleTotal = valors.length * ampleBarra + (valors.length - 1) * separacio;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", String(ampleTotal));
    svg.setAttribute("height", String(maxAlcada + 30));
    svg.style.display = "block";
    svg.style.margin = "30px auto";
    container.appendChild(svg);
    // Crear barres inicials (alcada 0)
    const barres = [];
    valors.forEach((valor, i) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(i * (ampleBarra + separacio)));
        rect.setAttribute("y", String(maxAlcada));
        rect.setAttribute("width", String(ampleBarra));
        rect.setAttribute("height", "0");
        rect.setAttribute("fill", colors[i % colors.length]);
        svg.appendChild(rect);
        barres.push(rect);
        // Etiqueta valor
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(i * (ampleBarra + separacio) + ampleBarra / 2));
        text.setAttribute("y", String(maxAlcada + 20));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "14");
        text.textContent = String(valor);
        svg.appendChild(text);
    });
    // Animacions
    if (mode === "primeres-interval") {
        // Primera barra immediata, següents cada 0.5s
        barres.forEach((rect, i) => {
            setTimeout(() => {
                animarBarra(rect, valors[i], maxAlcada, tempsDurada);
            }, i * 500);
        });
    }
    else if (mode === "consecutiu") {
        // Barres consecutives (una després de l'altra)
        let idx = 0;
        const animarSeguent = () => {
            if (idx < barres.length) {
                animarBarra(barres[idx], valors[idx], maxAlcada, tempsDurada, () => {
                    idx++;
                    animarSeguent();
                });
            }
        };
        animarSeguent();
    }
    else if (mode === "simultani-ritme") {
        // Totes simultànies, mateix ritme (les curtes acaben abans)
        barres.forEach((rect, i) => {
            animarBarra(rect, valors[i], maxAlcada, tempsDurada * (valors[i] / maxAlcada));
        });
    }
    else if (mode === "simultani-mateix-temps") {
        // Totes simultànies, totes acaben alhora (les llargues creixen més ràpid)
        barres.forEach((rect, i) => {
            animarBarra(rect, valors[i], maxAlcada, tempsDurada);
        });
    }
}
/**
 * Anima una barra SVG des d'alçada 0 fins a valor
 * @param rect Element SVGRect
 * @param valor Alçada final
 * @param maxAlcada Alçada màxima del gràfic
 * @param durada Temps d'animació (ms)
 * @param callback Opcional, cridat al final
 */
function animarBarra(rect, valor, maxAlcada, durada, callback) {
    const start = performance.now();
    function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / durada, 1);
        const alcada = valor * progress;
        rect.setAttribute("y", String(maxAlcada - alcada));
        rect.setAttribute("height", String(alcada));
        if (progress < 1) {
            requestAnimationFrame(frame);
        }
        else {
            if (callback)
                callback();
        }
    }
    requestAnimationFrame(frame);
}
