import { setupFullscreenButton } from "./lib/gestionarPantalla.js";
import { setAttributes } from "./lib/gestionarElementsDOM.js";

// Contenidor per al botó de pantalla completa
const buttonContainer = document.createElement("div");
setAttributes(buttonContainer, { style: "margin-top: 12px;" });
document.body.appendChild(buttonContainer);

// Botó de pantalla completa amb icones d'entrada/sortida
const btnFullscreen = document.createElement("button");
buttonContainer.appendChild(btnFullscreen);

// Configurar comportament i icones del botó
setupFullscreenButton(btnFullscreen, document.documentElement, "⛶", "✕");