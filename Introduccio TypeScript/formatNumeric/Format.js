"use strict";
/**
 * Calcular el preu final (PVP) aplicant %dte i %iva al preu base.
 *
 * @param {string} preu		Preu de l'article.
 * @param {string} dte		Percentatge de descompte en aquest article.
 * @param {string} iva		Percentatge de l'IVA en aquest article.
 *
 * @return {string}			Preu de venda de l'article.
 *							Ha de tenir dos decimals i format de moneda local ("12,50 €"),
 *							El càlcul es fa aplicant primer el descompte i després aplicant l'IVA al resultat anterior:
 *							1000 - 10% dte + 21% IVA --> "1089,00 €"
 */
function pvp(preu, dte, iva) {
    // Definim l'estil per a formatar com a moneda en euros amb 2 decimals
    let estil = {
        style: "currency",
        currency: "EUR"
  };

  // Definim els valors
  let nPreu = parseFloat(preu);
  let nDte = parseFloat(dte) / 100;
  let nIva = parseFloat(iva) / 100;

  // Control d'errors
  if (isNaN(nPreu) || isNaN(nDte) || isNaN(nIva))
    return "ERROR: només es permeten números";

  if (nPreu < 0 || nDte < 0 || nIva < 0)
    return "ERROR: números negatius no permesos";

  // Càlcul del preu final
  let preuFinal = nPreu * (1 - nDte) * (1 + nIva);

  // Resultat final formatat
  console.log(preuFinal);
  return preuFinal.toLocaleString("es-ES", estil);
}

/**
 * Calculadora amb les quatre funcions bàsiques: suma, resta, multiplicació i divisió.
 *
 * @param {string} n1		Primer número. String amb un valor numèric enter o decimal.
 * @param {string} n2		Segon número. String amb un valor numèric enter o decimal.
 * @param {string} operacio	Operació a realitzar ("+", "-", "*" o "/")
 *
 * @return {string}			Resultat de l'operació amb el màxim de decimals necessaris.
 *							Format local (utilitzant la coma per separar els decimals)
 *							2.1 - 3.9 --> "-1,7999999999999998"
 *							2.1 / 3.9 --> "0,5384615384615385"
 */
function miniCalc(n1, n2, operacio) {   
    // Definim els valors
    let num1 = parseFloat(n1);
    let num2 = parseFloat(n2);
    
    // Control d'errors
    if (isNaN(num1) || isNaN(num2))
        return "ERROR: només es permeten números";

    if (operacio !== "+" && operacio !== "-" && operacio !== "*" && operacio !== "/")
        return 'ERROR: l\'operació ha de ser "+", "-", "*" o "/"';

    if (operacio === "/" && num2 === 0)
        return "ERROR: divisió per zero";
    
    // Càlcul del resultat
    let resultat;
    switch (operacio) {
        case "+":
            resultat = num1 + num2;
            break;
        case "-":
            resultat = num1 - num2;
            break;
        case "*":
            resultat = num1 * num2;
            break;
        case "/":
            resultat = num1 / num2;
            break;
    }
    
    // Resultat final formatat
    console.log(resultat);
    return resultat.toLocaleString("es-ES", {minimumFractionDigits: 0, maximumFractionDigits: 20});
}
