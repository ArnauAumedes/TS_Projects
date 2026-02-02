/**
 * Punt d'entrada de l'aplicació.
 * Importa i registra els components web i enllaça el selector de mapa
 * (input file) amb el component InteractiveMap.
 */

import "./lib/InteractiveMap.js";
import { handleFileSelectAsText } from "./lib/FileIO.js";

const mapInput = document.getElementById("map-file");

if (mapInput) {
  mapInput.addEventListener("change", (evt) => {
    handleFileSelectAsText(evt, (svgText) => {
      const mapComponent = document.querySelector("interactive-map");
      const map = mapComponent as unknown as { loadMapFromContent?(svgText: string): void };
      if (map && typeof map.loadMapFromContent === "function") {
        map.loadMapFromContent(svgText);
      }
    });
  });
}