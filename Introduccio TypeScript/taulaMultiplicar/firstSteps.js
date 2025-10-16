"use strict";

// Taules dels números 'start' fins a 'stop' en 'ncol' columnes
function taules(start, stop, ncol) {
    let html = '<table><tr>'; // Inici de la taula
    let count = 0; // Comptador de columnes

    for (let num = start; num <= stop; num++) {
        html += '<td><strong>Taula del ' + num + '</strong><br><hr>'; // Crear columna i Capçalera
        for (let i = 1; i <= 10; i++) {
            html += num + ' x ' + i + ' = ' + (num * i) + '<br>'; // Taula de multiplicar
        }
        html += '</td>'; // Tanca la columna
        count++;
        if (count / ncol === 1) {
            html += '</tr><tr>'; // Nova fila
            count = 0; // Reinicia el comptador de columnes
        }
    }
    html += '</tr></table>'; // Tanca la taula
    return html;
}

// Genera les taules de multiplicar en funció dels paràmetres seleccionats
function mostrar() {
    let start = parseInt(document.getElementById("start").value);
    let stop = parseInt(document.getElementById("stop").value);
    let ncol = parseInt(document.getElementById("ncol").value);
    let tm = document.getElementById("tm");
    tm.innerHTML = taules(start, stop, ncol);
}