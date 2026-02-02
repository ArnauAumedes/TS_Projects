/**********************************************************
 * ALUMNE: AUMEDES JIMENEZ, ARNAU
 **********************************************************/
import { createTable, moveColumn } from "./lib/gestionarTaulesHTML.js";
import {
  moveAfter,
  moveFirst,
  setAttributes,
} from "./lib/gestionarElementsDOM.js";
import { BarraMultimedia } from "./lib/gestionarMultimedia.js";
import {
  netejarSVG,
  crearGrupInvertit,
  afegirRectangle,
  afegirText,
} from "./lib/gestionarSVG.js";
import { setupCopyButton, setupPasteButton } from "./lib/gestionarClipboard.js";
const SIMBOLS = [
  "←",
  "→",
  "↑",
  "↓",
  "↖",
  "↗",
  "↙",
  "↘",
  ">",
  "||",
  "⇣",
  "↟",
  "⇥",
  "↺",
];

const A = { style: "background-color:#000" };
const BCDE = { style: "background-color:#0F0" };
const FGH = { style: "background-color:#FA0" };
const IJ = { style: "background-color:#F00" };

const format = [
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    A,
    BCDE,
    BCDE,
    A,
    A,
    BCDE,
    BCDE,
    A,
    A,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    A,
    FGH,
    FGH,
    FGH,
    A,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    A,
    A,
    IJ,
    IJ,
    A,
    A,
    IJ,
    IJ,
    A,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    A,
    BCDE,
    BCDE,
    BCDE,
    A,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    A,
    A,
    FGH,
    FGH,
    A,
    A,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    A,
    IJ,
    IJ,
    A,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
    undefined,
  ],
  [
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
  ],
  [
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
  ],
  [
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
  ],
  [
    undefined,
    A,
    BCDE,
    BCDE,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    A,
    A,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
  ],
  [
    undefined,
    undefined,
    A,
    BCDE,
    BCDE,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    A,
    A,
    A,
    A,
    A,
    A,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    IJ,
    IJ,
    A,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    A,
    A,
    A,
    A,
    BCDE,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    BCDE,
    BCDE,
    BCDE,
    BCDE,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    FGH,
    FGH,
    FGH,
    FGH,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    IJ,
    IJ,
    IJ,
    IJ,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    A,
    A,
    A,
    A,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
];

/**********************************************************
 * PANELL
 **********************************************************/

/**
 * Crea una taula de 16 files i 48 columnes.
 * Configura-la amb una amplada de 384 píxels i una altura de 128 píxels.
 * En el mòdul per gestionar taules, afegeix una funció per configurar
 * 	cada cel·la d'una taula utilitzant un array bidimensional.
 * 	Ha de funcionar encara que les mides de la taula i de l'array de format no siguin iguals
 * 	(pots fer la prova amb una taula de 32 files i 32 columnes i de mida 256 x 256 píxels).
 * Configura el format de cada casella de la taula utilitzant l'array 'format'.
 * Afegeix la taula dins de l'element "panell" (<div>).
 * Crea i afegeix també botons per desplaçar les caselles de la taula amunt,
 * 	avall, esquerra, dreta i en les 4 diagonals (dreta-amunt, esquerra-amunt...).
 * Crea i afegeix un botó per copiar tota la taula (incloent estils) i poder-la enganxar en una aplicació externa.
 */
function generarTaula() {
  const panell = document.getElementById("panell") as Node;

  // Crear taula
  const table = createTable(format, { border: "1" });
  setAttributes(table, { style: "width:384px; height:128px;" });
  panell.appendChild(table);
  // Crear contenidor per als botons
  const buttonContainer = document.createElement("div");
  setAttributes(buttonContainer, { style: "margin-top: 20px;" });
  panell.appendChild(buttonContainer);

  // Crear botó Esquerra
  const btnEsquerra = document.createElement("button");
  btnEsquerra.textContent = "Esquerra";
  buttonContainer.appendChild(btnEsquerra);

  // Crear botó Dreta
  const btnDreta = document.createElement("button");
  btnDreta.textContent = "Dreta";
  setAttributes(btnDreta, { style: "margin-left: 10px;" });
  buttonContainer.appendChild(btnDreta);

  // Botó copiar
  const btnCopy = document.createElement("button");
  btnCopy.textContent = "📋 Copiar bloc";
  buttonContainer.appendChild(btnCopy);

  // Botó enganxar
  const btnPaste = document.createElement("button");
  btnPaste.textContent = "📥 Enganxar al final";
  setAttributes(btnPaste, { style: "margin-left:8px;" });
  buttonContainer.appendChild(btnPaste);

  // Configurar comportament dels botons
  setupCopyButton(btnCopy, document.getElementById("panell")!);
  setupPasteButton(btnPaste, document.body);

  // Event listeners per als botons
  btnEsquerra.addEventListener("click", () => {
    moveColumn(table, 0, table.rows[0].cells.length - 1);
  });

  btnDreta.addEventListener("click", () => {
    moveColumn(table, table.rows[0].cells.length - 1, 0);
  });
}

/**********************************************************
 * MEDIA
 **********************************************************/

/**
 * Busca tots els elements d'àudio i vídeo del document i afegeix a sota els botons
 * 	per controlar play/pause, avançar/retrocedir 5 segons i pujar baixar el volum.
 * 	Ha de trobar tots els elements que hi hagi, encara que més endavant
 * 	s'afegeixin més (o se'n treguin).
 * Afegeix a la classe per crear i gestionar els botons dos botons per
 * 	augmentar/reduir la velocitat de reproducció pujant i baixant
 * 	un 10% del valor que tingui en cada moment (multiplicar o dividir per 1.1).
 * Afegeix també un botó per fer que la reproducció torni a començar automàticament.
 */
function afegirMedia() {
  // Afegir controls a tots els elements d'àudio i vídeo
  const medias = Array.from(
    document.querySelectorAll("audio, video")
  ) as HTMLMediaElement[];
  medias.forEach((media) => {
    // Evitar duplicar barra si ja existeix
    if (
      media.nextElementSibling &&
      media.nextElementSibling.classList.contains("barra-multimedia")
    )
      return;
    // Crear barra amb la classe de la llibreria
    // El contenidor serà el pare de l'element multimèdia
    const barraMultimedia = new BarraMultimedia(
      media,
      media.parentElement || undefined
    );
  });
}

/**********************************************************
 * NOTES
 **********************************************************/

/**
 * Dins de l'element SVG "notes", crea un grup (<g>) i configura'l invertint
 * 	l'eix vertical i desplaçant-lo verticalment 240 píxels.
 * Afegeix dins d'aquest grup 5 rectangles de mida 3 x 0 píxels en les posicions
 * 	1, 5, 9, 13 i 21 de les X i en la posició 0 de les Y.
 * Afegeix també el text "0" a sobre de l'últim rectangle.
 * 	Ha d'estar centrat i tenir una mida de 2px.
 * 	Per evitar que quedi invertit, s'ha d'invertir en vertical i posar la
 * 	posició vertical (altura de l'últim rectangle) en negatiu.
 * Crida la funció actualitzar().
 */
function posarNotes() {
  const svg = document.getElementById("notes") as unknown as SVGSVGElement;
  if (!svg) return;
  netejarSVG(svg);

  // Crea grup invertit i desplaçat 240px
  const g = crearGrupInvertit(svg, 240);

  // Posicions X dels rectangles
  const posX = [1, 5, 9, 13, 21];
  // Afegeix 5 rectangles de mida 3x0 a Y=0
  for (let i = 0; i < posX.length; i++) {
    afegirRectangle(g, posX[i], 0, 3, 0, { fill: "#888" });
  }

  // Text "0" centrat sobre l'últim rectangle (invertit)
  afegirText(
    g,
    posX[4] + 1.5, // centrat
    -2, // a sobre (invertit)
    "0",
    {
      "font-size": "2px",
      "text-anchor": "middle",
      fill: "#000",
    }
  );

  // Crida la funció actualitzar()
  if (typeof actualitzar === "function") actualitzar();
}

/**
 * Agafa els valors dels elements uf1, uf2, uf3 i uf4 i modifica l'altura
 * 	dels primers rectangles amb aquests valors.
 * Calcula la mitjana ponderada tenint en compte les ponderacions de cada UF:
 * 	uf1:35, uf2:38, uf3:50, uf4:42
 * Modifica l'altura de l'últim rectangle amb el valor de la mitjana ponderada.
 * El color dels rectangles ha de variar en funció del valor:
 * 	vermell: nota < 4;	taronja: nota < 6;	blau: nota < 8;	verd: altres valors.
 * Modifica el text posant el valor de la mitjana amb 1 decimal com a màxim.
 * Modifica l'escala del gràfic en funció del valor de l'element "ampliacio".
 */
function actualitzar() {
  const svg = document.getElementById("notes") as unknown as SVGSVGElement;
  if (!svg) return;
  const g = svg.querySelector("g");
  if (!g) return;

  // Recollir valors de les UFs
  const uf1 =
    Number((document.getElementById("uf1") as HTMLInputElement)?.value) || 0;
  const uf2 =
    Number((document.getElementById("uf2") as HTMLInputElement)?.value) || 0;
  const uf3 =
    Number((document.getElementById("uf3") as HTMLInputElement)?.value) || 0;
  const uf4 =
    Number((document.getElementById("uf4") as HTMLInputElement)?.value) || 0;

  // Ponderacions
  const p1 = 35,
    p2 = 38,
    p3 = 50,
    p4 = 42;
  const totalP = p1 + p2 + p3 + p4;

  // Mitjana ponderada
  const mitjana = (uf1 * p1 + uf2 * p2 + uf3 * p3 + uf4 * p4) / totalP;

  // Escala d'ampliació
  const ampliacio =
    Number((document.getElementById("ampliacio") as HTMLInputElement)?.value) ||
    1;

  // Posicions X dels rectangles
  const posX = [1, 5, 9, 13, 21];
  const valors = [uf1, uf2, uf3, uf4, mitjana];

  // Colors segons nota
  function colorNota(n: number) {
    if (n < 4) return "#F00";
    if (n < 6) return "#FA0";
    if (n < 8) return "#08F";
    return "#0A0";
  }

  // Actualitzar rectangles
  const rects = g.querySelectorAll("rect");
  rects.forEach((rect, i) => {
    const altura = valors[i] * ampliacio;
    rect.setAttribute("height", altura.toString());
    rect.setAttribute("fill", colorNota(valors[i]));
  });

  // Actualitzar text de la mitjana
  const txt = g.querySelector("text");
  if (txt) {
    txt.textContent = mitjana.toFixed(1);
    // Centrat i invertit
    txt.setAttribute("x", (posX[4] + 1.5).toString());
    txt.setAttribute("y", (-valors[4] * ampliacio - 2).toString());
  }
}

/**********************************************************
 * ORDENAR
 **********************************************************/

/**
 * Busca el primer div que contingui un element de vídeo i posa'l després
 *  del primer div que contingui un element d'àudio.
 * Ha de funcionar estiguin on estiguin els elements.
 */
function ordenar() {
  // Buscar el primer div que contingui un <audio>
  const divAudio = Array.from(document.querySelectorAll("div")).find((div) =>
    div.querySelector("audio")
  );
  // Buscar el primer div que contingui un <video>
  const divVideo = Array.from(document.querySelectorAll("div")).find((div) =>
    div.querySelector("video")
  );

  // Si ambos existen y no son el mismo
  if (divAudio && divVideo && divAudio !== divVideo) {
    // Mover el div de vídeo justo después del div de audio
    divAudio.parentNode?.insertBefore(divVideo, divAudio.nextSibling);
  }
}

/**********************************************************
 * INICIALITZACIÓ
 **********************************************************/

// Aplicar el not null (!) per fer entendre al ts que aquest valor mai podra ser null
document.getElementById("uf1")!.addEventListener("input", actualitzar);
document.getElementById("uf2")!.addEventListener("input", actualitzar);
document.getElementById("uf3")!.addEventListener("input", actualitzar);
document.getElementById("uf4")!.addEventListener("input", actualitzar);
document.getElementById("ampliacio")!.addEventListener("input", actualitzar);

ordenar(); // 1 punt
generarTaula(); // 3 punts
afegirMedia(); // 2 punts
posarNotes(); // 4 punts
