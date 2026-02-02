/**
 * Punt d'entrada de l'aplicació.
 * Importa i registra els components web i enllaça el selector de mapa
 * (input file) amb el component InteractiveMap.
 */
import "./lib/InteractiveMap.js";
import { handleFileSelectAsText } from "./lib/FileIO.js";
const mapInput = document.getElementById("map-file");
const mapComponent = document.querySelector("interactive-map");
if (mapInput && mapComponent && "loadMapFromContent" in mapComponent) {
    mapInput.addEventListener("change", (evt) => {
        handleFileSelectAsText(evt, (svgText) => {
            mapComponent.loadMapFromContent(svgText);
        });
    });
}
