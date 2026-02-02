// GESTIONAR MODE PANTALLA COMPLETA

/**
 * Verifica si el navegador supota l'API Fullscreen
 * @returns true si la API està disponible, false en cas contrari
 */
export function isFullscreenEnabled(): boolean {
  return document.fullscreenEnabled;
}

/**
 * Comprova si es troba en mode pantalla completa
 * @returns true si es troba en pantalla completa, false en cas contrari
 */
export function isFullscreenActive(): boolean {
  return document.fullscreenElement !== null;
}

/**
 * Canvia entre mode pantalla completa i normal
 * @param element Element a visualitzar en pantalla completa (per defecte, todo el document)
 */
export function toggleFullscreen(element: Element = document.documentElement): void {
  if (isFullscreenActive()) {
    document.exitFullscreen();
  } else {
    element.requestFullscreen().catch((err) => {
      console.error(`Error intentant activar pantalla completa: ${err.message}`);
    });
  }
}

/**
 * Actualitza la icona d'un botó segons l'estat de pantalla completa
 * @param button Botó a actualitzar
 * @param iconFullscreen Icona o text per al mode pantalla completa
 * @param iconNormal Icona o text per al mode normal
 */
export function updateFullscreenIcon(
  button: HTMLElement,
  iconFullscreen: string = "⛶",
  iconNormal: string = "✕"
): void {
  if (isFullscreenActive()) {
    button.textContent = iconNormal;
    button.title = "Sortir de pantalla completa";
  } else {
    button.textContent = iconFullscreen;
    button.title = "Pantalla completa";
  }
}

/**
 * Configura un botó per controlar el mode pantalla completa
 * @param button Botó a configurar
 * @param element Element a visualitzar en pantalla completa (per defecte, todo el document)
 * @param iconFullscreen Icona o text per al mode pantalla completa
 * @param iconNormal Icona o text per al mode normal
 */
export function setupFullscreenButton(
  button: HTMLElement,
  element: Element = document.documentElement,
  iconFullscreen: string = "⛶",
  iconNormal: string = "✕"
): void {
  if (!isFullscreenEnabled()) {
    console.warn("L'API Fullscreen no està disponible en aquest navegador");
    return;
  }

  // Inicialitzar icona
  updateFullscreenIcon(button, iconFullscreen, iconNormal);

  // Event listener per al botó
  button.addEventListener("click", () => {
    toggleFullscreen(element);
  });

  // Event listener per detectar canvis de pantalla completa
  document.addEventListener("fullscreenchange", () => {
    updateFullscreenIcon(button, iconFullscreen, iconNormal);
  });

  // Manejar errors de pantalla completa
  document.addEventListener("fullscreenerror", () => {
    console.error("Error al canviar mode de pantalla completa");
  });
}
