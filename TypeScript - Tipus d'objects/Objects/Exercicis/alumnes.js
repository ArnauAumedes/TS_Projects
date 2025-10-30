"use strict";
// Creació d'objectes Alumne
const alumne1 = {
    nom: "Joan",
    cognoms: "García López",
    curs: 2,
    moduls: [
        {
            nomModul: "M0612 - Desenvolupament web en entorn client",
            blocs: [
                { nom: "Bloc 1 - Sintaxi del llenguatge", nota: 8 },
                { nom: "Bloc 2 - Disseny i desenvolupament", nota: 7 },
                { nom: "Bloc 3 - Programació avançada", nota: 9 }
            ]
        }
    ],
};
const alumne2 = {
    nom: "Maria",
    cognoms: "Pérez Sánchez",
    curs: 1,
    moduls: [
        {
            nomModul: "M0612 - Desenvolupament web en entorn client",
            blocs: [
                { nom: "Bloc 1 - Sintaxi del llenguatge", nota: 6 },
                { nom: "Bloc 2 - Disseny i desenvolupament", nota: 5 },
                { nom: "Bloc 3 - Programació avançada", nota: 7 }
            ]
        }
    ],
};
const alumne3 = {
    nom: "Luis",
    cognoms: "Martínez Ruiz",
    curs: 2,
    moduls: [
        {
            nomModul: "M0612 - Desenvolupament web en entorn client",
            blocs: [
                { nom: "Bloc 1 - Sintaxi del llenguatge", nota: 9 },
                { nom: "Bloc 2 - Disseny i desenvolupament", nota: 8 },
                { nom: "Bloc 3 - Programació avançada", nota: 10 }
            ]
        }
    ],
};
// Array d'alumnes
const alumnes = [alumne1, alumne2, alumne3];
// Funcio per modificar alumnes
function modificarAlumnes(alumnes) {
    // Clonar i modificar cada alumne
    const alumnesModificats = alumnes.map((alumne, index) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // Crear una còpia profunda de l'alumne
        const alumneModificat = {
            nom: alumne.nom,
            cognoms: alumne.cognoms,
            curs: alumne.curs,
            moduls: alumne.moduls.map(modul => ({
                nomModul: modul.nomModul,
                blocs: [...modul.blocs] // Clonar l'array de blocs
            }))
        };
        // Modificar segons l'índex
        if (index === 0) {
            // Primer alumne
            alumneModificat.nom = "Josep";
            alumneModificat.cognoms = "Fernández Vila";
            // Afegir un nou mòdul
            alumneModificat.moduls.push({
                nomModul: "M09 - Projecte",
                blocs: [{ nom: "Bloc - Projecte", nota: 8 }]
            });
            // Canviar notes dels blocs existents
            if ((_a = alumneModificat.moduls[0]) === null || _a === void 0 ? void 0 : _a.blocs[0]) {
                alumneModificat.moduls[0].blocs[0].nota = 9; // Bloc 1 nota de 8 a 9
            }
            if ((_b = alumneModificat.moduls[0]) === null || _b === void 0 ? void 0 : _b.blocs[1]) {
                alumneModificat.moduls[0].blocs[1].nota = 8; // Bloc 2 nota de 7 a 8
            }
        }
        else if (index === 1) {
            // Segon alumne
            alumneModificat.nom = "Marta";
            alumneModificat.cognoms = "López González";
            alumneModificat.curs = 2; // Canviar de curs 1 a 2
            // Treure el primer bloc del primer mòdul
            if (((_c = alumneModificat.moduls[0]) === null || _c === void 0 ? void 0 : _c.blocs.length) > 0) {
                alumneModificat.moduls[0].blocs = alumneModificat.moduls[0].blocs.slice(1);
            }
            // Canviar notes
            if ((_d = alumneModificat.moduls[0]) === null || _d === void 0 ? void 0 : _d.blocs[0]) {
                alumneModificat.moduls[0].blocs[0].nota = 6; // Bloc nota de 5 a 6
            }
            if ((_e = alumneModificat.moduls[0]) === null || _e === void 0 ? void 0 : _e.blocs[1]) {
                alumneModificat.moduls[0].blocs[1].nota = 8; // Bloc nota de 7 a 8
            }
        }
        else if (index === 2) {
            // Tercer alumne
            alumneModificat.nom = "Carlos";
            alumneModificat.cognoms = "Rodríguez Martín";
            // Afegir dos nous mòduls
            alumneModificat.moduls.push({
                nomModul: "M10 - Empresa",
                blocs: [{ nom: "Bloc - Empresa", nota: 7 }]
            });
            alumneModificat.moduls.push({
                nomModul: "M11 - Anglès",
                blocs: [{ nom: "Bloc - Anglès", nota: 6 }]
            });
            // Modificar notes existents
            if ((_f = alumneModificat.moduls[0]) === null || _f === void 0 ? void 0 : _f.blocs[0]) {
                alumneModificat.moduls[0].blocs[0].nota = 10; // Bloc 3: de 9 -> 10
            }
            if ((_g = alumneModificat.moduls[0]) === null || _g === void 0 ? void 0 : _g.blocs[1]) {
                alumneModificat.moduls[0].blocs[1].nota = 9; // Bloc 2 nota de 8 a 9
            }
            if ((_h = alumneModificat.moduls[0]) === null || _h === void 0 ? void 0 : _h.blocs[2]) {
                alumneModificat.moduls[0].blocs[2].nota = 9; // Bloc 3: de 10 -> 9
            }
        }
        return alumneModificat;
    });
    return alumnesModificats;
}
// Executar la funció i mostrar resultats
const alumnesClonatsIModificats = modificarAlumnes(alumnes);
// Funció per mostrar alumnes
function mostrarAlumne(alumne) {
    console.log(`\n--- ${alumne.nom} ${alumne.cognoms} ---`);
    console.log(`Curs: ${alumne.curs}`);
    console.log("Mòduls:");
    alumne.moduls.forEach(modul => {
        console.log(`  - ${modul.nomModul}:`);
        modul.blocs.forEach(bloc => {
            console.log(`    * ${bloc.nom}: ${bloc.nota}`);
        });
    });
}
// Mostrar alumnes originals
console.log("=== ALUMNES ORIGINALS ===");
alumnes.forEach(mostrarAlumne);
// Mostrar alumnes modificats
console.log("\n=== ALUMNES CLONATS I MODIFICATS ===");
alumnesClonatsIModificats.forEach(mostrarAlumne);
// Funció per calcular la mitjana de notes d'un alumne
function calcularMitjanaModul(alumne) {
    alumne.moduls.forEach(modul => {
        const total = modul.blocs.reduce((sum, bloc) => sum + bloc.nota, 0);
        modul.notaModul = modul.blocs.length > 0 ? total / modul.blocs.length : 0;
    });
    return alumne;
}
//# sourceMappingURL=alumnes.js.map