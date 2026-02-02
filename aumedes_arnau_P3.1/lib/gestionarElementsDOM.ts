// GESTIONAR ELEMENTS DEL DOM
/**
 * Funcio per crear un element HTML
 * @param tagName Nom de l'etiqueta
 * @param br (opcional): Si es vol afegir un salt de linia abans de l'element
 * @returns L'element HTML creat
 */
export function createElement(tagName: string, br?: string): HTMLElement {
  const element = document.createElement(tagName);
  br ? document.body.appendChild(document.createElement("br")) : null;
  return document.body.appendChild(element);
}

/**
 * Funcio per crear un element HTML amb text
 * @param tagName Nom de l'etiqueta
 * @param textContent Text a dins de l'element
 * @param br (opcional): Si es vol afegir un salt de linia abans de l'element
 * @returns L'element HTML creat amb text
 */
export function createElementWithText(
  tagName: string,
  textContent: string,
  br?: string
): HTMLElement {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  br ? document.body.appendChild(document.createElement("br")) : null;
  return document.body.appendChild(element);
}

/**
 * Funcio per modificar atributs d'un element HTML
 * @param element Element HTML al que s'hi vol afegir l'atribut
 * @param attrs Objecte amb els atributs i els seus valors
 */
export function setAttributes(
  element: HTMLElement,
  attrs: { [key: string]: string }
) {
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

/**
 * Funcio per moure un element abans d'un altre
 * @param parent Element pare
 * @param element Element a moure
 */
export function moveBefore(element: Node, reference: Node): void {
  reference.parentNode?.insertBefore(element, reference);
}

/**
 * Funcio per moure un element despres d'un altre
 * @param parent Element pare
 * @param element Element a moure
 */
export function moveAfter(element: Node, reference: Node): void {
  reference.parentNode?.insertBefore(element, reference.nextSibling);
}

/**
 * Funcio per moure un element al principi d'un altre
 * @param parent Element pare
 * @param element Element a moure
 */
export function moveFirst(parent: Node, element: Node): void {
  parent.insertBefore(element, parent.firstChild);
}

/**
 * Funcio per moure un element al final d'un altre
 * @param parent Element pare
 * @param element Element a moure
 */
export function moveLast(parent: Node, element: Node): void {
  parent.appendChild(element);
}

