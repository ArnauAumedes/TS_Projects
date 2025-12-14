// Función para obtener los estilos CSS embebidos de la página
function getStyles(): string {
	let styles = '';
	for (const sheet of Array.from(document.styleSheets)) {
		try {
			if (sheet.cssRules) {
				for (const rule of Array.from(sheet.cssRules)) {
					styles += rule.cssText + '\n';
				}
			}
		} catch (e) {
			// Puede lanzar error por CORS en hojas externas, ignorar
		}
	}
	return `<style>\n${styles}</style>\n`;
}

// Copiar el DIV con estilos al portapapeles
async function copyDivWithStyles() {
	const div = document.getElementById('complex-object');
	if (!div) return;
	const styles = getStyles();
	const html = styles + div.outerHTML;
	try {
		await navigator.clipboard.write([
			new ClipboardItem({
				'text/html': new Blob([html], { type: 'text/html' }),
				'text/plain': new Blob([div.innerText], { type: 'text/plain' })
			})
		]);
		alert('DIV copiat al portapapers!');
	} catch (err) {
		alert('Error al copiar al portapapers: ' + err);
	}
}

document.getElementById('copy-btn')?.addEventListener('click', copyDivWithStyles);

// Pegar el contenido HTML del portapapeles al final del body
async function pasteClipboardContent() {
	try {
		const clipboardItems = await navigator.clipboard.read();
		for (const item of clipboardItems) {
			if (item.types.includes('text/html')) {
				const blob = await item.getType('text/html');
				const html = await blob.text();
				const temp = document.createElement('div');
				temp.innerHTML = html;
				// Añadir solo el contenido relevante (por ejemplo, el DIV copiado)
				const pasted = temp.querySelector('#complex-object') || temp.firstElementChild;
				if (pasted) {
					document.body.appendChild(pasted.cloneNode(true));
				} else {
					// Si no hay un div específico, añadir todo el HTML
					document.body.insertAdjacentHTML('beforeend', html);
				}
				return;
			}
		}
		// Si no hay HTML, intentar pegar como texto plano
		const text = await navigator.clipboard.readText();
		if (text) {
			const p = document.createElement('p');
			p.textContent = text;
			document.body.appendChild(p);
		}
	} catch (err) {
		alert('Error al enganxar del portapapers: ' + err);
	}
}

document.getElementById('paste-btn')?.addEventListener('click', pasteClipboardContent);
