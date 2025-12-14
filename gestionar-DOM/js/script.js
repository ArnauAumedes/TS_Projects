import { createElement, append } from './gestionarDOM/components/gestionarElements.js';
import { createTable, fillTable } from './gestionarDOM/components/gestionarTaules.js';
function makeEmptyGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
}
function placePattern(grid, coords) {
    for (const [r, c] of coords) {
        if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length)
            grid[r][c] = '<';
    }
}
function gridToTableData(grid) {
    return grid.map(row => row.map(cell => cell || ''));
}
function shiftGrid(grid, delta) {
    const rows = grid.length;
    const cols = grid[0].length;
    const res = makeEmptyGrid(rows, cols);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const v = grid[r][c];
            if (!v)
                continue;
            const nc = (c + delta) % cols;
            const ncol = nc < 0 ? nc + cols : nc;
            res[r][ncol] = v;
        }
    }
    return res;
}
function createStyle() {
    const css = `
        .panel-table { border-collapse: collapse; margin: 8px 0; }
        .panel-table td { width:32px; height:32px; border:1px solid #ccc; text-align:center; vertical-align:middle; font-size:18px; }
        .panel-controls { margin:8px 0; }
        .panel-controls button { margin-right:6px; padding:6px 12px; }
    `;
    const style = createElement('style', { text: css });
    append(document.head, style);
}
document.addEventListener('DOMContentLoaded', () => {
    createStyle();
    const rows = 7;
    const cols = 7;
    // Patró inicial (coordenades on hi ha '<') — pots ajustar
    const coords = [
        [0, 4], [0, 5],
        [1, 3], [1, 4],
        [2, 1], [2, 2],
        [3, 2], [3, 3],
        [4, 4], [4, 5],
        [5, 1], [5, 2]
    ];
    let grid = makeEmptyGrid(rows, cols);
    placePattern(grid, coords);
    // Crear contenidor
    const container = createElement('div');
    const controls = createElement('div', { classes: ['panel-controls'] });
    const leftBtn = createElement('button', { text: 'Esquerra' });
    const rightBtn = createElement('button', { text: 'Dreta' });
    append(controls, leftBtn);
    append(controls, rightBtn);
    // Taula
    const table = createTable(undefined, gridToTableData(grid));
    table.classList.add('panel-table');
    append(container, controls);
    append(container, table);
    append(document.body, container);
    function render() {
        fillTable(table, gridToTableData(grid));
    }
    leftBtn.addEventListener('click', () => {
        // mou a l'esquerra => delta = -1
        grid = shiftGrid(grid, -1);
        render();
    });
    rightBtn.addEventListener('click', () => {
        // mou a la dreta => delta = +1
        grid = shiftGrid(grid, 1);
        render();
    });
});
