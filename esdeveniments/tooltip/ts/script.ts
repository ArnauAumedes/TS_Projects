
// Tooltip logic: mostra missatge a la posició del ratolí amb clic dret
const tooltip = document.getElementById('tooltip') as HTMLDivElement;
let hideTimeout: number | null = null;

document.addEventListener('contextmenu', function (e: MouseEvent) {
	e.preventDefault();
	if (!tooltip) return;

	// Posiciona el tooltip a la posició del ratolí
	tooltip.style.left = e.pageX + 'px';
	tooltip.style.top = e.pageY + 'px';
	tooltip.style.display = 'block';

	// Reinicia el temporitzador si ja està visible
	if (hideTimeout) {
		clearTimeout(hideTimeout);
	}
	hideTimeout = window.setTimeout(() => {
		tooltip.style.display = 'none';
	}, 3000);
});
