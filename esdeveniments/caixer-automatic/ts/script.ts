import "./lib/NumKeypad";
import "./lib/CambioViewer"; // Importa el componente del cambio

import type { NumKeypad } from "./lib/NumKeypad";
import type { CambioViewer } from "./lib/CambioViewer";

document.addEventListener("DOMContentLoaded", () => {
    // Recoger los componentes del DOM
    const keypad = document.querySelector<NumKeypad>("num-keypad");
    const inputImporte = document.getElementById("importe-pagar") as HTMLInputElement;
    const cambioViewer = document.querySelector<CambioViewer>("cambio-viewer");

    if (!keypad || !inputImporte || !cambioViewer) return;

    keypad.addEventListener("ok", (e: Event) => {
        const entregado = (e as CustomEvent).detail.value;
        const importe = parseFloat(inputImporte.value);

        if (isNaN(importe) || importe <= 0) {
            alert("Introdueix un import a pagar vàlid.");
            return;
        }

        if (entregado < importe) {
            alert("L'import entregat és insuficient.");
            return;
        }

        const cambio = +(entregado - importe).toFixed(2);
        cambioViewer.setCambio(cambio);
    });
});