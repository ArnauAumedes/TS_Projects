import { setAttributes } from "./lib/gestionarElementsDOM.js";
import { createTable, moveColumn } from "./lib/gestionarTaulesHTML.js";
// Dades de la taula amb fletes
const tableData = [
    ["", "", "", "<", "<"],
    ["", "", "<", "<", ""],
    ["<", "<", "", "", ""],
    ["", "", "<", "<", ""],
    ["", "", "", "<", "<"],
];
// Crear taula
const table = createTable(tableData, { border: "1" });
document.body.appendChild(table);
// Crear contenidor per als botons
const buttonContainer = document.createElement("div");
setAttributes(buttonContainer, { style: "margin-top: 20px;" });
document.body.appendChild(buttonContainer);
// Crear botó Esquerra
const btnEsquerra = document.createElement("button");
btnEsquerra.textContent = "Esquerra";
buttonContainer.appendChild(btnEsquerra);
// Crear botó Dreta
const btnDreta = document.createElement("button");
btnDreta.textContent = "Dreta";
setAttributes(btnDreta, { style: "margin-left: 10px;" });
buttonContainer.appendChild(btnDreta);
// Event listeners per als botons
btnEsquerra.addEventListener("click", () => {
    moveColumn(table, 0, table.rows[0].cells.length - 1);
});
btnDreta.addEventListener("click", () => {
    moveColumn(table, table.rows[0].cells.length - 1, 0);
});
