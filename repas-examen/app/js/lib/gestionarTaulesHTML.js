import { setAttributes } from "./gestionarElementsDOM.js";
// GESTIONAR TAULES HTML
/**
 * Funcio per crear una taula HTML
 * @param data Matriu de dades per a les files i columnes
 * @param attrs (opcional): Objecte amb els atributs i els seus valors per a la taula
 * @returns La taula HTML creada
 */
export function createTable(data, attrs) {
    const table = document.createElement("table");
    if (attrs)
        setAttributes(table, attrs);
    const tbody = document.createElement("tbody");
    data.forEach(rowData => {
        const tr = document.createElement("tr");
        rowData.forEach(cellData => {
            const td = document.createElement("td");
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}
/**
 * Funcio per omplir una cel·la d'una taula HTML
 * @param td Cel·la de la taula HTML
 * @param value Valor a assignar a la cel·la
 */
export function fillCell(td, value) {
    td.textContent = value;
}
/**
 * Funcio per moure una columna d'una taula HTML
 * @param table Taula HTML
 * @param fromIndex Index de la columna a moure
 * @param toIndex Index on es vol moure la columna
 */
export function moveColumn(table, fromIndex, toIndex) {
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].children;
        const cell = cells[fromIndex];
        if (cell) {
            rows[i].removeChild(cell);
            if (toIndex >= cells.length) {
                rows[i].appendChild(cell);
            }
            else {
                rows[i].insertBefore(cell, cells[toIndex]);
            }
        }
    }
}
