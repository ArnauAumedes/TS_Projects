import { createElement, createElementWithText, setAttributes, moveAfter, moveBefore, moveFirst, } from "./lib/gestionarElementsDOM.js";
// Crear un element de qualsevol tipus (<p>, <div>, <span>, <strong>, <em>, <ul>, <li>...) amb un text a dins (o un element qualsevol).
createElementWithText("h1", "DOM Elements Practice");
const div = createElementWithText("div", "This is a styled div element.");
setAttributes(div, {
    style: "color:blue; border: 1px solid black; width: 200px; height: 100px; background-color: lightgray; margin-bottom: 10px;",
});
const img = createElement("img", "br");
setAttributes(img, {
    alt: "Placeholder Image",
    style: "width:100px; height:100px;",
});
const a = createElementWithText("a", "Go to OpenAI", "br");
setAttributes(a, {
    href: "https://www.openai.com",
    target: "_blank",
});
// Moure elements dins del DOM
// Estructura inicial:
const firstParagraph = createElementWithText("p", "First Paragraph", "br");
const secondParagraph = createElementWithText("p", "Second Paragraph");
const thirdParagraph = createElementWithText("p", "Third Paragraph");
// Estructura final desitjada:
// <p>Second Paragraph</p>
// <p>First Paragraph</p>
// <p>Third Paragraph</p>
// Crear div pare per contenir els paragrafs
const parentDiv = createElement("div", "br");
setAttributes(parentDiv, {
    style: "border: 1px solid red; padding: 10px; margin-top: 10px;",
});
document.body.appendChild(parentDiv);
const firstParagraphMoved = createElementWithText("p", "First Paragraph Moved", "br");
const secondParagraphMoved = createElementWithText("p", "Second Paragraph Moved", "br");
const thirdParagraphMoved = createElementWithText("p", "Third Paragraph Moved", "br");
parentDiv.appendChild(firstParagraphMoved);
parentDiv.appendChild(secondParagraphMoved);
parentDiv.appendChild(thirdParagraphMoved);
moveBefore(secondParagraphMoved, firstParagraphMoved);
moveAfter(thirdParagraphMoved, firstParagraphMoved);
moveFirst(parentDiv, thirdParagraphMoved);
