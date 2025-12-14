/**
 * Mòdul per gestionar taules HTML de manera simple.
 * Utilitza les funcions helpers de `gestionarElements` quan calgui.
 */
import { createElement, append, getAllAttributes, setAttr } from './gestionarElements';

export interface TableOptions {
    id?: string;
    classes?: string[];
    attrs?: Record<string, string>;
}

export type TableData = Array<Array<string>>;

/**
 * Crea una taula amb opcions i dades inicials.
 * Retorna l'element `<table>` creat.
 */
export function createTable(options?: TableOptions, data?: TableData): HTMLTableElement {
    const table = createElement('table', { classes: options?.classes, attrs: options?.attrs, id: options?.id }) as HTMLTableElement;
    const tbody = createElement('tbody') as HTMLTableSectionElement;
    append(table, tbody);

    if (data && data.length) {
        fillTable(table, data);
    }

    return table;
}

/**
 * Omple una taula amb una matriu de dades (array de files, cada fila és array de cels).
 * Les dades es converteixen a strings i s'esborren els continguts anteriors del tbody.
 */
export function fillTable(table: HTMLTableElement, data: TableData): void {
    // Assegurar-se que existeix tbody
    let tbody = table.tBodies[0];
    if (!tbody) {
        tbody = createElement('tbody') as HTMLTableSectionElement;
        append(table, tbody);
    }
    // Netejar
    tbody.innerHTML = '';

    for (const rowData of data) {
        const tr = createElement('tr') as HTMLTableRowElement;
        for (const cellData of rowData) {
            const td = createElement('td', { text: String(cellData) }) as HTMLTableCellElement;
            append(tr, td);
        }
        append(tbody, tr);
    }
}

/**
 * Escriu un valor en una cel·la determinada (filaIndex, colIndex).
 * Retorna true si la cel·la existeix i s'ha modificat, false en cas contrari.
 */
export function setCell(table: HTMLTableElement, rowIndex: number, colIndex: number, value: string): boolean {
    const row = table.rows[rowIndex];
    if (!row) return false;
    const cell = row.cells[colIndex];
    if (!cell) return false;
    cell.textContent = value;
    return true;
}

/**
 * Inserta una fila a la taula en una posició determinada (si pos és undefined s'afegeix al final).
 * `rowData` és opcional i conté valors per a les cel·les.
 */
export function insertRow(table: HTMLTableElement, pos?: number, rowData?: string[]): HTMLTableRowElement {
    const tbody = table.tBodies[0] ?? table.appendChild(createElement('tbody') as HTMLTableSectionElement);
    const index = (pos === undefined) ? -1 : pos;
    const tr = tbody.insertRow(index);
    if (rowData && rowData.length) {
        for (const cellValue of rowData) {
            const td = createElement('td', { text: String(cellValue) }) as HTMLTableCellElement;
            append(tr, td);
        }
    }
    return tr;
}

/**
 * Esborra una fila en la posició indicada. Retorna true si s'ha esborrat.
 */
export function deleteRow(table: HTMLTableElement, pos: number): boolean {
    if (pos < 0 || pos >= table.rows.length) return false;
    table.deleteRow(pos);
    return true;
}

/**
 * Inserta una columna en la posició indicada (per a totes les files).
 * Si `colIndex` és undefined s'afegeix al final. `values` pot contenir valors per a cada fila.
 */
export function insertColumn(table: HTMLTableElement, colIndex?: number, values?: string[]): void {
    const rows = Array.from(table.rows);
    const index = (colIndex === undefined) ? -1 : colIndex;
    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const cell = row.insertCell(index);
        cell.textContent = values && values[r] !== undefined ? String(values[r]) : '';
    }
}

/**
 * Esborra la columna `colIndex` (si existeix) de totes les files.
 * Retorna true si la columna existia i s'ha eliminat.
 */
export function deleteColumn(table: HTMLTableElement, colIndex: number): boolean {
    const rows = Array.from(table.rows);
    if (rows.length === 0) return false;
    // Comprovar si algun row té la cel·la
    let exists = false;
    for (const row of rows) {
        if (colIndex >= 0 && colIndex < row.cells.length) { exists = true; break; }
    }
    if (!exists) return false;
    for (const row of rows) {
        if (colIndex >= 0 && colIndex < row.cells.length) row.deleteCell(colIndex);
    }
    return true;
}

/**
 * Mou una columna de `fromIndex` a `toIndex`.
 * Si toIndex és <0 s'insereix al principi, si >= numCols s'insereix al final.
 */
export function moveColumn(table: HTMLTableElement, fromIndex: number, toIndex: number): void {
    const rows = Array.from(table.rows);
    if (rows.length === 0) return;
    const numCols = Math.max(...rows.map(r => r.cells.length));
    const target = Math.max(0, Math.min(toIndex, numCols - 1));
    for (const row of rows) {
        if (fromIndex < 0 || fromIndex >= row.cells.length) continue;
        const cell = row.cells[fromIndex];
        // crear nova cel·la al destí i moure el contingut
        const newCell = row.insertCell(target);
        newCell.innerHTML = cell.innerHTML;
        // eliminar antiga cel·la (considerar l'offset si s'insereix abans)
        const removeIndex = (target <= fromIndex) ? fromIndex + 1 : fromIndex;
        row.deleteCell(removeIndex);
    }
}

/**
 * Retorna la matriu de dades actual de la taula (array de arrays de strings).
 */
export function readTable(table: HTMLTableElement): TableData {
    const rows = Array.from(table.rows);
    return rows.map(r => Array.from(r.cells).map(c => c.textContent ?? ''));
}

/**
 * Omple una fila existent amb valors (si la fila no té suficients cel·les, s'afegeixen).
 */
export function fillRow(row: HTMLTableRowElement, values: string[]): void {
    for (let i = 0; i < values.length; i++) {
        if (i < row.cells.length) {
            row.cells[i].textContent = values[i];
        } else {
            const td = createElement('td', { text: String(values[i]) }) as HTMLTableCellElement;
            append(row, td);
        }
    }
}

/**
 * Afegir atributs a la taula des d'un objecte (helper). Manté atributs existents.
 */
export function setTableAttributes(table: HTMLTableElement, attrs: Record<string,string>): void {
    for (const [k,v] of Object.entries(attrs)) setAttr(table, k, v);
}

export default {
    createTable,
    fillTable,
    setCell,
    insertRow,
    deleteRow,
    insertColumn,
    deleteColumn,
    moveColumn,
    readTable,
    fillRow,
    setTableAttributes
};
