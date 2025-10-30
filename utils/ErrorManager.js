/**
 * Comprova si un valor és un número vàlid dins d'un rang opcional.
 * @param value - El valor a comprovar (pot ser un string o un número)
 * @param min - Valor mínim (opcional)
 * @param max - Valor màxim (opcional)
 * @returns True si el valor és un número vàlid, false en cas contrari
 */
export function isNumber(value, min, max) {
    // Comprovar si el valor és null o undefined
    if (value === null || value === undefined) {
        return false;
    }
    // Convertir string a número si és necessari
    if (typeof value === 'string') {
        // Eliminar espais en blanc
        value = value.trim();
        // Comprovar si la cadena està buida després de l'eliminació d'espais
        if (value === '') {
            return false;
        }
        // Substituir coma per punt per al decimal
        let sValue = value.replace(',', '.');
        value = parseFloat(sValue);
    }
    // Comprovar si és un número vàlid
    if (isNaN(value)) {
        return false;
    }
    // Comprovar valor mínim si s'ha proporcionat
    if (min !== undefined && value < min) {
        return false;
    }
    // Comprovar valor màxim si s'ha proporcionat
    if (max !== undefined && value > max) {
        return false;
    }
    // Si totes les comprovacions passen, és un número vàlid
    return true;
}
//# sourceMappingURL=ErrorManager.js.map