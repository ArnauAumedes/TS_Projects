import { crearGraficBarres, ModeAnimacioBarres } from "./lib/gestionarGrafics.js";

// Ejemplo de valores
const valors = [240, 80, 120];

// Crear contenedor para el gráfico
const contenedor = document.createElement("div");
contenedor.id = "grafic-barres-demo";
contenedor.style.margin = "40px auto";
contenedor.style.width = "220px";
document.body.appendChild(contenedor);

// Selector de modo de animación
const selector = document.createElement("select");
const modes: { value: ModeAnimacioBarres; label: string }[] = [
	{ value: "primeres-interval", label: "Primera barra immediata, següents cada 0.5s" },
	{ value: "consecutiu", label: "Barres consecutives" },
	{ value: "simultani-ritme", label: "Simultànies, mateix ritme" },
	{ value: "simultani-mateix-temps", label: "Simultànies, acaben alhora" },
];
modes.forEach((m) => {
	const opt = document.createElement("option");
	opt.value = m.value;
	opt.textContent = m.label;
	selector.appendChild(opt);
});
selector.style.display = "block";
selector.style.margin = "0 auto 20px auto";
contenedor.appendChild(selector);

// Botón para animar
const btn = document.createElement("button");
btn.textContent = "Animar gràfic";
btn.style.display = "block";
btn.style.margin = "0 auto 20px auto";
contenedor.appendChild(btn);

// Contenedor SVG (se limpia y recrea cada vez)
let svgContainer: HTMLElement = contenedor;

function animarGrafic() {
	// Limpiar SVG anterior
	const oldSVG = contenedor.querySelector("svg");
	if (oldSVG) oldSVG.remove();
	crearGraficBarres(valors, svgContainer, selector.value as ModeAnimacioBarres, 1000);
}

btn.addEventListener("click", animarGrafic);

// Animar al cargar por defecto
animarGrafic();
