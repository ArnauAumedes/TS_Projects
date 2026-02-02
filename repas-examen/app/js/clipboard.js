import { setAttributes } from "./lib/gestionarElementsDOM.js";
import { setupCopyButton, setupPasteButton } from "./lib/gestionarClipboard.js";
// // Crear un objecte complex a partir de parts d'index.html
// const complexContainer = document.createElement("div");
// setAttributes(complexContainer, {
//   id: "copyTarget",
//   style:
//     "border:2px solid #666; padding:12px; margin-top:12px; display:inline-block;",
// });
// // Afegir títol
// const title = document.createElement("h2");
// title.textContent = "Bloc complex per copiar";
// complexContainer.appendChild(title);
// // Clonar i afegir el DIV existent
// const myDiv = document.getElementById("myDiv");
// if (myDiv) complexContainer.appendChild(myDiv.cloneNode(true));
// // Clonar i afegir la imatge
// const myImg = document.getElementById("myImg");
// if (myImg) complexContainer.appendChild(myImg.cloneNode(true));
// // Clonar i afegir l'enllaç
// const myLink = document.getElementById("myLink");
// if (myLink) complexContainer.appendChild(myLink.cloneNode(true));
// // Clonar i afegir la taula
// const myTable = document.getElementById("myTable");
// if (myTable) complexContainer.appendChild(myTable.cloneNode(true));
// // Afegir el contenidor al document
// document.body.appendChild(complexContainer);
// Contenidor de botons copia/enganxa
const buttons = document.createElement("div");
setAttributes(buttons, { style: "margin-top:12px;" });
document.body.appendChild(buttons);
// Botó copiar
const btnCopy = document.createElement("button");
btnCopy.textContent = "📋 Copiar bloc";
buttons.appendChild(btnCopy);
// Botó enganxar
const btnPaste = document.createElement("button");
btnPaste.textContent = "📥 Enganxar al final";
setAttributes(btnPaste, { style: "margin-left:8px;" });
buttons.appendChild(btnPaste);
// Configurar comportament dels botons
// Si tens fulls d'estils externs, pots passar els noms: ["general.css", "taules.css"]
setupCopyButton(btnCopy, document.body /*, ["general.css", "taules.css"]*/);
setupPasteButton(btnPaste, document.body);
