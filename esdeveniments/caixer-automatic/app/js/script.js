import "./lib/NumKeypad.js";
import "./lib/CambioViewer.js"; // Importa el componente del cambio
document.addEventListener("DOMContentLoaded", () => {
    // Recoger los componentes del DOM
    const keypad = document.querySelector("num-keypad");
    const inputImporte = document.getElementById("importe-pagar");
    const cambioViewer = document.querySelector("cambio-viewer");
    if (!keypad || !inputImporte || !cambioViewer)
        return;
    keypad.addEventListener("ok", (e) => {
        const entregado = e.detail.value;
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
