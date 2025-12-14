// INTERFACES
/* Creation / insertion / removal */
/**
 * Opcions que s'utilitzen per crear un element amb `createElement`.
 *
 * - `id`: identificador opcional per assignar a l'element.
 * - `classes`: array opcional de noms de classe a afegir (s'utilitza `classList.add`).
 * - `attrs`: registre opcional amb parells nom d'atribut → valor a establir a l'element.
 * - `text`: textContent opcional per a l'element.
 * - `html`: innerHTML opcional per a l'element (sobrescriu el contingut fill).
 */
export interface CreateOptions {
    id?: string;
    classes?: string[];
    attrs?: Record<string, string>;
    text?: string;
    html?: string;
}

// FUNCTIONS
/**
 * Retorna l'element arrel del document (`<html>`).
 * @returns L'`Element` arrel (`document.documentElement`).
 */
export function getDocumentRoot(): Element {
    return document.documentElement;
}

/**
 * Retorna l'element `<head>` del document.
 * @returns L'`HTMLHeadElement` o `null` si no està disponible.
 */
export function getHead(): HTMLHeadElement | null {
    return document.head;
}

// export function getBody(): HTMLBodyElement | null {
//     return document.body;
// }

/**
 * Retorna una col·lecció viva amb tots els enllaços `<a>` del document.
 * Equival a `document.links`.
 * @returns `HTMLCollectionOf<HTMLAnchorElement>`.
 */
export function getLinks(): HTMLCollectionOf<HTMLAnchorElement> {
    return document.links as HTMLCollectionOf<HTMLAnchorElement>;
}

/**
 * Retorna una col·lecció viva amb tots els formularis `<form>` del document.
 * Equival a `document.forms`.
 * @returns `HTMLCollectionOf<HTMLFormElement>`.
 */
export function getForms(): HTMLCollectionOf<HTMLFormElement> {
    return document.forms as HTMLCollectionOf<HTMLFormElement>;
}

/**
 * Retorna una col·lecció viva amb totes les imatges `<img>` del document.
 * Equival a `document.images`.
 * @returns `HTMLCollectionOf<HTMLImageElement>`.
 */
export function getImages(): HTMLCollectionOf<HTMLImageElement> {
    return document.images as HTMLCollectionOf<HTMLImageElement>;
}

/**
 * Retorna un nom llegible per al `nodeType` d'un node.
 * Útil per a depuració.
 * @param node Node a inspeccionar.
 * @returns Una cadena com 'ELEMENT_NODE', 'TEXT_NODE', etc.
 */
export function nodeTypeName(node: Node): string {
    switch (node.nodeType) {
        case Node.ELEMENT_NODE: return 'ELEMENT_NODE';
        case Node.TEXT_NODE: return 'TEXT_NODE';
        case Node.COMMENT_NODE: return 'COMMENT_NODE';
        case Node.DOCUMENT_NODE: return 'DOCUMENT_NODE';
        default: return `TYPE_${node.nodeType}`;
    }
}

/**
 * Guard de tipus que comprova si un `Node` és un `Element`.
 * @param node Node a comprovar.
 * @returns `true` si el node és de tipus element.
 */
export function isElementNode(node: Node): node is Element {
    return node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Drecera per a `document.getElementById` amb retorn tipat.
 * @param id Identificador a cercar.
 * @returns L'element amb el tipus genèric especificat o `null`.
 */
export function getById<T extends HTMLElement = HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
}

/**
 * Fer una consulta al document amb `querySelector`.
 * @param selector Selector CSS.
 * @returns El primer `Element` que coincideixi o `null`.
 */
export function query(selector: string): Element | null {
    return document.querySelector(selector);
}

/**
 * Fer una consulta al document amb `querySelectorAll` i retornar un array.
 * @param selector Selector CSS.
 * @returns Un array d'elements que coincideixin.
 */
export function queryAll(selector: string): Element[] {
    return Array.from(document.querySelectorAll(selector));
}

/* Classes */
/**
 * Afegir una classe a un element mitjançant `classList.add`.
 * @param el Element objectiu.
 * @param className Nom de la classe a afegir.
 */
export function addClass(el: Element, className: string): void {
    el.classList.add(className);
}

/**
 * Eliminar una classe d'un element mitjançant `classList.remove`.
 * @param el Element objectiu.
 * @param className Nom de la classe a eliminar.
 */
export function removeClass(el: Element, className: string): void {
    el.classList.remove(className);
}

/**
 * Alternar una classe en un element amb `classList.toggle`.
 * @param el Element objectiu.
 * @param className Nom de la classe a alternar.
 * @returns `true` si la classe està ara present, `false` altrament.
 */
export function toggleClass(el: Element, className: string): boolean {
    return el.classList.toggle(className);
}

/**
 * Comprovar si un element té una classe mitjançant `classList.contains`.
 * @param el Element objectiu.
 * @param className Nom de la classe a comprovar.
 * @returns `true` si la classe està present.
 */
export function hasClass(el: Element, className: string): boolean {
    return el.classList.contains(className);
}

/* Attributes & data- */
export function hasAttr(el: Element, name: string): boolean {
    return el.hasAttribute(name);
}
/**
 * Comprovar si un element té un atribut determinat.
 * @param el Element objectiu.
 * @param name Nom de l'atribut.
 * @returns `true` si l'atribut existeix.
 */

export function getAttr(el: Element, name: string): string | null {
    return el.getAttribute(name);
}
/**
 * Obtenir el valor d'un atribut d'un element.
 * @param el Element objectiu.
 * @param name Nom de l'atribut.
 * @returns El valor de l'atribut o `null`.
 */

export function setAttr(el: Element, name: string, value: string): void {
    el.setAttribute(name, value);
}
/**
 * Establir un atribut a un element.
 * @param el Element objectiu.
 * @param name Nom de l'atribut.
 * @param value Valor de l'atribut.
 */

export function removeAttr(el: Element, name: string): void {
    el.removeAttribute(name);
}
/**
 * Eliminar un atribut d'un element.
 * @param el Element objectiu.
 * @param name Nom de l'atribut a eliminar.
 */

export function setData(el: HTMLElement, key: string, value: string): void {
    // key without "data-"
    (el.dataset as DOMStringMap)[key] = value;
}
/**
 * Assignar un atribut `data-*` mitjançant el `dataset` de l'element.
 * @param el HTMLElement objectiu.
 * @param key Clau de dades (sense el prefix `data-`).
 * @param value Valor a assignar.
 */

export function getData(el: HTMLElement, key: string): string | undefined {
    return (el.dataset as DOMStringMap)[key];
}
/**
 * Llegir un atribut `data-*` des del `dataset` d'un element.
 * @param el HTMLElement objectiu.
 * @param key Clau de dades (sense el prefix `data-`).
 * @returns El valor com a string o `undefined`.
 */


export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options?: CreateOptions
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag) as HTMLElementTagNameMap[K];
    if (!options) return el;
    if (options.id) el.id = options.id;
    if (options.classes) el.classList.add(...options.classes);
    if (options.attrs) {
        for (const [k, v] of Object.entries(options.attrs)) el.setAttribute(k, v);
    }
    if (options.text !== undefined) el.textContent = options.text;
    if (options.html !== undefined) el.innerHTML = options.html;
    return el;
}

export function append(parent: Element, child: Node): void {
    parent.appendChild(child);
}

export function remove(el: Node): void {
    if (el.parentNode) el.parentNode.removeChild(el);
}

/* Visibility / styles */
export function hide(el: HTMLElement): void {
    el.style.display = 'none';
}

export function show(el: HTMLElement, display: string = ''): void {
    el.style.display = display;
}

export function setStyle(el: HTMLElement, prop: string, value: string): void {
    // accepts camelCase or CSS property name
    try {
        // @ts-ignore
        el.style[prop] = value;
    } catch {
        el.style.setProperty(prop, value);
    }
}

export function getStyle(el: HTMLElement, prop: string, computed = false): string {
    if (computed) {
        return getComputedStyle(el).getPropertyValue(prop) || '';
    }
    // @ts-ignore
    return el.style[prop] || '';
}

export function getComputedStyleValue(el: HTMLElement, prop: string): string {
    return getComputedStyle(el).getPropertyValue(prop);
}

export function setCssText(el: HTMLElement, cssText: string): void {
    el.style.cssText = cssText;
}

/* Utilities */
export function getAllAttributes(el: Element): Record<string, string> {
    const out: Record<string, string> = {};
    for (const attr of Array.from(el.attributes)) {
        out[attr.name] = attr.value;
    }
    return out;
}