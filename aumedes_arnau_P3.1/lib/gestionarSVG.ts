// Llibreria per gestionar SVG

/**
 * Crea un grup (<g>) dins d'un SVG amb transformació per invertir l'eix Y i desplaçar-lo
 * @param svg SVGElement on afegir el grup
 * @param translateY Quantitat de desplaçament vertical
 * @returns El grup <g> creat
 */
export function crearGrupInvertit(svg: SVGSVGElement, translateY: number): SVGGElement {
	const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	g.setAttribute('transform', `scale(1,-1) translate(0,${-translateY})`);
	svg.appendChild(g);
	return g;
}

/**
 * Afegeix un rectangle SVG a un grup
 * @param grup SVGGElement on afegir el rectangle
 * @param x Posició X
 * @param y Posició Y
 * @param width Amplada
 * @param height Alçada
 * @param attrs (opcional) Objecte d'atributs addicionals
 * @returns El rectangle SVG creat
 */
export function afegirRectangle(grup: SVGGElement, x: number, y: number, width: number, height: number, attrs?: { [key: string]: string }): SVGRectElement {
	const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	rect.setAttribute('x', x.toString());
	rect.setAttribute('y', y.toString());
	rect.setAttribute('width', width.toString());
	rect.setAttribute('height', height.toString());
	if (attrs) for (const k in attrs) rect.setAttribute(k, attrs[k]);
	grup.appendChild(rect);
	return rect;
}

/**
 * Afegeix un text SVG a un grup
 * @param grup SVGGElement on afegir el text
 * @param x Posició X
 * @param y Posició Y
 * @param text Contingut del text
 * @param attrs (opcional) Objecte d'atributs addicionals
 * @returns El text SVG creat
 */
export function afegirText(grup: SVGGElement, x: number, y: number, text: string, attrs?: { [key: string]: string }): SVGTextElement {
	const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	txt.setAttribute('x', x.toString());
	txt.setAttribute('y', y.toString());
	txt.textContent = text;
	if (attrs) for (const k in attrs) txt.setAttribute(k, attrs[k]);
	grup.appendChild(txt);
	return txt;
}

/**
 * Elimina tots els fills d'un element SVG (per reinicialitzar)
 * @param element SVGElement o SVGGElement
 */
export function netejarSVG(element: SVGElement | SVGGElement) {
	while (element.firstChild) element.removeChild(element.firstChild);
}
