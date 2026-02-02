import { Cronometre } from "./lib/gestionarCronometre.js";
import { d_start, d_mark, d_pause, d_reset } from "./lib/cronometreIcons.js";
// Crear contenedor principal
const container = document.createElement("div");
container.style.margin = "30px auto";
container.style.width = "220px";
container.style.textAlign = "center";
document.body.appendChild(container);
// Display del tiempo
const display = document.createElement("div");
display.style.fontSize = "2em";
display.style.marginBottom = "10px";
display.textContent = "00:00.0";
container.appendChild(display);
// Contenedor de botones
const btns = document.createElement("div");
btns.style.display = "flex";
btns.style.justifyContent = "center";
btns.style.gap = "10px";
container.appendChild(btns);
// Botón Start/Pause/Mark
const btnStart = document.createElement("button");
btnStart.innerHTML = d_start;
btns.appendChild(btnStart);
// Botón Reset
const btnReset = document.createElement("button");
btnReset.innerHTML = d_reset;
btns.appendChild(btnReset);
// Lista de marcas
const marquesDiv = document.createElement("div");
marquesDiv.style.marginTop = "15px";
container.appendChild(marquesDiv);
function updateDisplay(temps) {
    display.textContent = temps;
}
function updateMarques(marques) {
    marquesDiv.innerHTML = "";
    marques.forEach((m) => {
        const marca = document.createElement("div");
        marca.innerHTML = `${d_mark} <span style='font-family:monospace'>${m}</span>`;
        marquesDiv.appendChild(marca);
    });
}
const crono = new Cronometre(updateDisplay, updateMarques);
btnStart.addEventListener("click", () => {
    if (crono.getEstat() === "run") {
        crono.start(); // Marca
        btnStart.innerHTML = d_pause;
    }
    else if (crono.getEstat() === "pause") {
        crono.pause();
        btnStart.innerHTML = d_pause;
    }
    else {
        crono.start();
        btnStart.innerHTML = d_pause;
    }
});
btnReset.addEventListener("click", () => {
    crono.reset();
    btnStart.innerHTML = d_start;
});
// Permitir pausar con el mismo botón
btnStart.addEventListener("dblclick", () => {
    if (crono.getEstat() === "run") {
        crono.pause();
        btnStart.innerHTML = d_start;
    }
});
