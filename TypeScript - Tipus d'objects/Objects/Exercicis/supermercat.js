let productes = [
    { codi: 1, descripcio: "Poma", preu: 0.5, pes: 0.2 },
    { codi: 2, descripcio: "Llet", preu: 1.2, volum: 1 },
    { codi: 3, descripcio: "Pa", preu: 1.0, pes: 0.5, dte: 10 },
    { codi: 4, descripcio: "Aigua", preu: 0.8, volum: 1 },
    { codi: 5, descripcio: "Formatge", preu: 2.5, pes: 0.3, dte: 5 },
];
const poma = { codi: 1, descripcio: "Poma", preu: 0.5, pes: 0.2 };
const llet = { codi: 2, descripcio: "Llet", preu: 1.2, volum: 1 };
const pera = { codi: 6, descripcio: "Pera", preu: 0.6, pes: 0.25 };
const iogurt = {
    codi: 7,
    descripcio: "Iogurt",
    preu: 0.9,
    volum: 1,
    dte: 15,
};
/**
 * Mostra la informació d'un producte
 * @param producte Producte a mostrar
 */
export function mostrarProducte(producte) {
    const info = [
        `Codi: ${producte.codi}`,
        `Descripcio: ${producte.descripcio}`,
        `Preu: ${producte.preu} €`,
    ];
    if (producte.pes)
        info.push(`Pes: ${producte.pes} g`);
    if (producte.volum)
        info.push(`Volum: ${producte.volum} l`);
    if (producte.dte) {
        let producteDte = producte.preu; // Preu inicial
        producteDte *= 1 - producte.dte / 100;
        info.push(`Descompte: ${producteDte.toPrecision(2)} €`);
    }
    console.log(info.join("\n"));
}
/**
 * Mostra la informació de tots els productes
 * @param productes Array de productes a mostrar
 */
export function mostrarTotsProductes(productes) {
    productes.forEach(mostrarProducte);
}
/**
 * Busca un producte per codi
 * @param codi Codi del producte a buscar
 * @returns Si el producte existeix, retorna el producte. Si no, retorna undefined
 */
export function buscarProducteRepetit(codi) {
    // Comprovar que el codi no existeix ja
    if (productes.find((p) => p.codi === codi)) {
        console.log(`El codi del producte ${codi} ja existeix.`);
        return; // Aturar l'execució si el codi ja existeix
    }
}
/**
 * Valida un producte
 * @param producte Producte a validar
 */
export function errorHandler(producte) {
    if (producte.codi <= 0 || !Number.isInteger(producte.codi)) {
        throw new Error("El codi ha de ser un nombre enter positiu.");
    }
    if (producte.preu < 0 || isNaN(producte.preu)) {
        throw new Error("El preu ha de ser un nombre positiu.");
    }
    if (producte.pes !== undefined && (producte.pes <= 0 || isNaN(producte.pes))) {
        throw new Error("El pes ha de ser un nombre positiu.");
    }
    if (producte.volum !== undefined && (producte.volum <= 0 || isNaN(producte.volum))) {
        throw new Error("El volum ha de ser un nombre positiu.");
    }
    if (producte.dte !== undefined && (producte.dte < 0 || producte.dte > 100 || isNaN(producte.dte))) {
        throw new Error("El descompte ha de ser un nombre entre 0 i 100.");
    }
}
/**
 * Afegeix un nou producte a l'array de productes
 * @param nouProducte Producte a afegir
 */
export function afegirProductes(nouProducte) {
    // Comprovar errors abans d'afegir
    errorHandler(nouProducte);
    // Comprovar que el codi no existeix ja
    buscarProducteRepetit(nouProducte.codi);
    // Afegir el nou producte a l'array (només si passa totes les validacions)
    productes.push(nouProducte);
    // Mostrar productes
    mostrarProducte(nouProducte);
}
/**
 * Obtenir tots els objectes que tinguin un valor determinat en un atribut concret
 * @param array Array d'objectes a buscar
 * @param atribut Nom de l'atribut a comprovar
 * @param valor Valor a buscar
 * @returns Array amb tots els objectes que compleixen la condició
 */
export function getObjectsByValue(array, atribut, valor) {
    // Comprovar que l'array no està buit
    if (array.length === 0) {
        console.log("L'array està buit.");
        return [];
    }
    // Lista de atributos válidos del tipo Producte
    const atributsValids = ['codi', 'descripcio', 'preu', 'pes', 'volum', 'dte'];
    // Validar que el atributo sea válido
    if (!atributsValids.includes(atribut)) {
        console.log(`L'atribut ${atribut} no és vàlid. Atributs vàlids: ${atributsValids.join(', ')}`);
        return [];
    }
    // Filtrar usando type assertion
    return array.filter(objecte => objecte[atribut] === valor);
}
/**
 * Busca i mostra els elements d'una llista que tenen un valor concret en un atribut
 * @param array Array de productes
 * @param atribut Atribut a comprovar
 * @param valor Valor a buscar
 */
export function buscarIMostrarPerValor(array, atribut, valor) {
    const resultats = getObjectsByValue(array, atribut, valor);
    if (resultats.length === 0) {
        console.log(`No s'han trobat productes amb ${atribut} = ${valor}`);
        return;
    }
    console.log(`Productes amb ${atribut} = ${valor}:`);
    resultats.forEach(producte => mostrarProducte(producte));
}
// Proves
console.log("Mostrar tots els productes:");
mostrarTotsProductes(productes);
console.log("\nBuscar productes amb volum = 1:");
buscarIMostrarPerValor(productes, 'volum', 1);
console.log("\nBuscar productes amb preu = 0.5:");
buscarIMostrarPerValor(productes, 'preu', 0.5);
// Afegir productes
console.log("\nAfegir productes:");
afegirProductes(poma);
afegirProductes(llet);
afegirProductes(pera);
afegirProductes(iogurt);
// Filtrar productes per atribut i valor
console.log("\nFiltrar productes amb volum = 1:");
buscarIMostrarPerValor(productes, 'volum', 1);
