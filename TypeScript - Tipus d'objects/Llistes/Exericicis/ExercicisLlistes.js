import { isNumber } from "../../../utils/ErrorManager.js";
/**
 * EXERCICI 8:
 * Genera un array d'elements aleatoris
 * @param n Nombre d'elements que tindrà l'array
 * @returns Un array d'elements aleatoris
 */
export function arrayAleatori(n) {
    // Comprovem que n és un nombre enter positiu i dins d'un rang raonable
    if (!isNumber(n, 1, 100000) || !Number.isInteger(n)) {
        throw new Error("El paràmetre ha de ser un nombre enter positiu i dins d'un rang raonable");
    }
    // Generem l'array amb nombres aleatoris entre 1 i 1.000.000
    const array = [];
    for (let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * 1000000) + 1);
    }
    // Comprovem que funciona
    mostrarArray(array);
    // Retornem l'array generat
    return array;
}
/**
 * Mostra els elements d'un array amb ," "
 * @param array Array de números a mostrar
 */
export function mostrarArray(array) {
    console.log("Elements de l'array:");
    console.log(array.join(", "));
}
export function filtrarPares(array) {
    // Crear dos arrays per a parells i imparells
    let filteredArrayPar = [];
    let filteredArrayImpar = [];
    // Filtrar els nombres parells
    array.forEach(num => {
        if (num % 2 === 0) {
            filteredArrayPar.push(num);
        }
        else {
            filteredArrayImpar.push(num);
        }
    });
    // Comprobar resultats
    mostrarArray(filteredArrayPar);
    mostrarArray(filteredArrayImpar);
    // Retornar els arrays filtrats
    return filteredArrayPar;
}
console.log("Array de 10 elements aleatoris:");
arrayAleatori(10);
console.log("Array filtrats parells i imparells:");
filtrarPares(arrayAleatori(10));
