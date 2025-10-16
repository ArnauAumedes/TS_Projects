"use strict";
import { isNumber } from "../../../utils/ErrorManager.js";
/*
    CATEGORIES SEGONS L'IMC
        IMC < 16		Infrapès sever
16   <= IMC < 17		Infrapès
17   <= IMC < 18.5		Infrapès lleu
18.5 <= IMC < 25		Pes normal
25   <= IMC < 30		Sobrepès
30   <= IMC < 35		Obesitat lleu
35   <= IMC < 40		Obesitat
        IMC >= 40		Obesitat severa
*/
/**
 * Calcular l'IMC (Índex de Massa Corporal) a partir del pes i l'altura.
 *
 * @param {string} pes		Pes en Kg
 * @param {string} altura	Altura en cm
 * @return {string}			IMC-Categoria: "24,3-Pes normal"
 *							L'IMC s'ha de mostrar amb un decimal i format local
 *
 *							Exemples:
 *							80 Kg i 180 cm --> "24,7-Pes normal"
 *							81 Kg i 180 cm --> "25,0-Sobrepès"
 *							90 Kg i 173 cm --> "30,1-Obesitat lleu"
 */
function imc(pes, altura) {
    // Definim variables
    let sPes = pes.replace(",", ".");
    let sAltura = altura.replace(",", ".");
    // Managem errors
    if (!isNumber(sPes, 30, 300) || !isNumber(sAltura, 100, 250)) {
        return "Error" + "-En les dades d'entrada; pes o altura no vàlids";
    }
    // Una vegada comprovats els errors, convertim a número
    let nPes = parseFloat(sPes);
    let nAltura = parseFloat(sAltura);
    // Calculem l'IMC
    let imcValue = nPes / (nAltura / 100) ** 2;
    let imcFormatted = imcValue.toLocaleString("es-ES", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
    // Definim la categoria segons l'IMC
    if (imcValue < 16) {
        return imcFormatted + "-Infrapès sever";
    }
    else if (imcValue < 17) {
        return imcFormatted + "-Infrapès";
    }
    else if (imcValue < 18.5) {
        return imcFormatted + "-Infrapès lleu";
    }
    else if (imcValue < 25) {
        return imcFormatted + "-Pes normal";
    }
    else if (imcValue < 30) {
        return imcFormatted + "-Sobrepès";
    }
    else if (imcValue < 35) {
        return imcFormatted + "-Obesitat lleu";
    }
    else if (imcValue < 40) {
        return imcFormatted + "-Obesitat";
    }
    else {
        return imcFormatted + "-Obesitat severa";
    }
}
/**
 * Convertir unitats de longitud.
 *
 * @param {string} valor	Longitud a convertir
 * @param {string} uni1		Unitats de la longitud (mm, cm, dm, m, Dm, Hm, Km)
 * @param {string} uni2		A quines unitats s'ha de convertir (mm, cm, dm, m, Dm, Hm, Km)
 * @return {string}			Longitud convertida amb 4 dígits significatius
 *
 * 							Exemples:
 * 							12.4 Dm --> 124.0 m
 * 							12.4 Km --> 1.240e+4 m
 */
function convertidor(valor, uni1, uni2) {
    // Definim variables
    let sValor = valor.replace(",", ".");
    // Managem errors
    if (!isNumber(sValor)) {
        throw new Error("Error en les dades d'entrada; valor no vàlid");
    }
    // Convertim a número
    let nValor = parseFloat(sValor);
    // Definim les unitats i els seus factors de conversió a metres
    const unidades = {
        mm: -3, // 10^-3 metres
        cm: -2, // 10^-2 metres
        dm: -1, // 10^-1 metres
        m: 0, // base)
        Dm: 1, // 10^1 metres
        Hm: 2, // 10^2 metres
        Km: 3, // 10^3 metres
    };
    // Comprovem que les unitats són vàlides
    if (!(uni1 in unidades) || !(uni2 in unidades)) {
        throw new Error("Error en les dades d'entrada; unitat no vàlida");
    }
    // Calculem el factor de conversió
    let factor = 10 ** (unidades[uni1] - unidades[uni2]);
    // Convertim el valor
    let resultado = nValor * factor;
    // Retornem el resultat amb 4 dígits significatius
    console.log(resultado.toPrecision(4));
    return resultado.toPrecision(4);
}
/**
 * Calculadora per sumar [i multiplicar] dos números decimals amb molts dígits.
 * S'ha de fer utilitzant BigInt
 * @param {string} op		Operació a realitzar: dos números decimals sense signe (decimals separats amb punt)
 *							separats pel símbol de la suma (+) i sense espais al mig
 *							OPCIONAL: permetre fer multiplicacions (el símbol serà 'x')
 * @return {string}			Resultat de la operació
 *							OPCIONAL: eliminar zeros innecessaris
 *
 *			Exemples suma:
 * 			Operació: 999999999999999999999999999.999+999999999.9
 * 			Resultat: 1000000000000000000999999999.899
 *
 * 			Operació: 9999999999999999.9999999999999+0.0000000000001
 * 			Resultat: 10000000000000000
 *
 * 			Operació: 987654321987654321987654321987654.321+987654321987654321
 * 			Resultat: 987654321987655309641976309641975.321
 *
 * 			Operació: 0.000987654321987654321987654321987654+0.000987654321987654321
 * 			Resultat: 0.001975308643975308642987654321987654
 *
 * 			Exemples multiplicació:
 * 			Operació: 876176109618876176109.618x0
 * 			Resultat: 0
 *
 * 			Operació: 999999999999999999999999.999999x9
 * 			Resultat: 8999999999999999999999999.999991
 *
 * 			Operació: 987654321987654321987654321987654.321x98765432198.7654321
 * 			Resultat: 97546105974089315853086419953086419855540313.9789971041
 *
 * 			Operació: 0.000987654321987654321987654321987654x0.000987654321987654321
 * 			Resultat: 0.000000975461059740893158530864199530863881518365781752934
 */
function bigFloat(op) { }
/**
 * Calcula el rectangle intersecció de dos rectangles.
 * Es considera intersecció si part (o tot) d'un rectangle està dins de  l'altre.
 * No es considera intersecció si només es toquen per algun costat o cantonada.
 *
 * @param {string} rect1	x,y,w,h (coordenades i mida del primer rectangle)
 * @param {string} rect2	x,y,w,h (coordenades i mida del segon rectangle)
 * @return {string}			'false' si no hi ha intersecció, 'true' si hi ha intersecció
 * 							OPCIONAL: si hi ha intersecció, en lloc de 'true' retornar
 * 							'x,y,w,h' (coordenades i mida del rectangle intersecció)
 *
 * 							'x,y' han de ser enters
 * 							'w,h' han de ser enters i estrictament positius (>0)
 *
 * 							Exemples:
 * 							Rect 1: 0,0,10,10
 * 							Rect 2: 5,10,10,5
 * 							Resultat: false (es toquen però no hi ha intersecció)
 *
 * 							Rect 1: 4,-2,12,10
 * 							Rect 2: -2,2,10,10
 * 							Resultat: true
 *
 * 							Exemples OPCIONAL
 * 							Rect 1: 0,0,10,10
 * 							Rect 2: 5,10,10,5
 * 							Resultat: false (es toquen però no hi ha intersecció)
 *
 * 							Rect 1: 4,-2,12,10
 * 							Rect 2: -2,2,10,10
 * 							Resultat: 4,2,4,6 (rectangle resultat de la intersecció)
 */
function interseccio(rect1, rect2) { }
window.imc = imc;
window.convertidor = convertidor;
window.bigFloat = bigFloat;
window.interseccio = interseccio;
