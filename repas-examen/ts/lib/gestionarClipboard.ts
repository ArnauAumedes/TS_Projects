// GESTIONAR PORTAPAPERS (Clipboard API)

/**
 * Extreu estils CSS dels fulls indicats i els retorna dins d'una etiqueta <style>.
 * Si no es passa cap llista, intentarà afegir tots els estils accessibles.
 */
export function getStyles(fileNames: string[] = []): string {
	let styles = "";

	for (const sheet of Array.from(document.styleSheets)) {
		try {
			const href = sheet.href;
			if (fileNames.length && href) {
				const file = href.substring(href.lastIndexOf("/") + 1);
				if (!fileNames.includes(file)) continue;
			}

			const rules = sheet.cssRules;
			if (!rules) continue;
			for (const rule of Array.from(rules)) {
				styles += rule.cssText + "\n";
			}
		} catch (err) {
			// Alguns fulls poden ser cross-origin; s'ignoren silenciosament
			continue;
		}
	}

	return styles ? `<style>\n${styles}</style>\n` : "";
}

/**
 * Copia un element HTML al portapapers incloent estils opcionalment.
 * Usa Clipboard API; requereix context segur (https o localhost).
 */
export async function copyElementWithStyles(
	element: HTMLElement,
	styleFiles: string[] = []
): Promise<void> {
	if (!navigator.clipboard || !navigator.clipboard.write) {
		throw new Error("Clipboard API no disponible en aquest navegador");
	}

	const html = getStyles(styleFiles) + element.outerHTML;
	const blob = new Blob([html], { type: "text/html" });

	await navigator.clipboard.write([
		new ClipboardItem({
			"text/html": blob,
			"text/plain": new Blob([element.textContent ?? ""], {
				type: "text/plain",
			}),
		}),
	]);
}

/**
 * Llegeix del portapapers i insereix el contingut al final del contenidor indicat.
 * Intenta primer text/html; si no, afegeix text pla.
 */
export async function pasteIntoContainer(container: HTMLElement): Promise<void> {
	if (!navigator.clipboard) {
		throw new Error("Clipboard API no disponible en aquest navegador");
	}

	// Si es pot llegir ítems rics
	if (navigator.clipboard.read) {
		const items = await navigator.clipboard.read();
		for (const item of items) {
			if (item.types.includes("text/html")) {
				const blob = await item.getType("text/html");
				const html = await blob.text();
				const wrapper = document.createElement("div");
				wrapper.innerHTML = html;
				container.appendChild(wrapper);
				return;
			}
		}
	}

	// Fallback a text pla
	const text = await navigator.clipboard.readText();
	const pre = document.createElement("pre");
	pre.textContent = text;
	container.appendChild(pre);
}

/**
 * Assigna la logica de copiar a un botó.
 * Mostra un feedback curt en text del botó.
 */
export function setupCopyButton(
	button: HTMLButtonElement,
	elementToCopy: HTMLElement,
	styleFiles: string[] = []
): void {
	button.title = "Copiar al portapapers";

	button.addEventListener("click", async () => {
		const original = button.textContent;
		try {
			await copyElementWithStyles(elementToCopy, styleFiles);
			button.textContent = "Copiat";
		} catch (err) {
			console.error(err);
			alert("No s'ha pogut copiar al portapapers.\n" + err);
		} finally {
			setTimeout(() => {
				button.textContent = original ?? "Copy";
			}, 1200);
		}
	});
}

/**
 * Assigna la logica d'enganxar a un botó, afegint el contingut al contenidor.
 */
export function setupPasteButton(
	button: HTMLButtonElement,
	targetContainer: HTMLElement
): void {
	button.title = "Enganxar des del portapapers";

	button.addEventListener("click", async () => {
		try {
			await pasteIntoContainer(targetContainer);
		} catch (err) {
			console.error(err);
			alert("No s'ha pogut enganxar des del portapapers.\n" + err);
		}
	});
}
