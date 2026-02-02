import { drawPolyline, drawCircle, drawSector, drawText, } from "./lib/gestionarCanvas.js";
import { createElement } from "./lib/gestionarElementsDOM.js";
// Canvas per a la cantonada en L
const canvasCorner = document.createElement("canvas");
canvasCorner.width = 120;
canvasCorner.height = 120;
document.body.appendChild(canvasCorner);
const ctxCorner = canvasCorner.getContext("2d");
if (ctxCorner) {
    // L correcta: primer línia superior a la dreta, després vertical cap avall a l'esquerra
    drawPolyline(ctxCorner, [
        { x: 16, y: 16 }, // inici, cantonada superior esquerra
        { x: 108, y: 16 }, // línia superior cap a la dreta
        { x: 16, y: 108 }, // línia vertical cap avall (esquerra)
    ], {
        lineWidth: 8,
        strokeStyle: "#00008b",
        stroke: true,
        fill: false,
    });
    // Canvas per crear un triangle
    const canvasCorner2 = document.createElement("canvas");
    canvasCorner2.width = 120;
    canvasCorner2.height = 120;
    document.body.appendChild(canvasCorner2);
    const ctxCorner2 = canvasCorner2.getContext("2d");
    if (ctxCorner2) {
        // Triangle: horizontal superior, vertical esquerra i diagonal de tornada
        drawPolyline(ctxCorner2, [
            { x: 16, y: 16 }, // inici, cantonada superior esquerra
            { x: 108, y: 16 }, // línia superior cap a la dreta
            { x: 16, y: 108 }, // línia vertical cap avall (esquerra)
        ], {
            lineWidth: 8,
            strokeStyle: "#00008b",
            stroke: true,
            fill: false,
            closePath: true, // tanca el triangle amb una diagonal
        });
    }
    // Canvas per crear un quadrat
    const canvasCorner3 = document.createElement("canvas");
    canvasCorner3.width = 120;
    canvasCorner3.height = 120;
    document.body.appendChild(canvasCorner3);
    const ctxCorner3 = canvasCorner3.getContext("2d");
    if (ctxCorner3) {
        // Cuadrat: 4 costats iguals
        drawPolyline(ctxCorner3, [
            { x: 16, y: 16 }, // cantonada superior esquerra
            { x: 108, y: 16 }, // cantonada superior dreta
            { x: 108, y: 108 }, // cantonada inferior dreta
            { x: 16, y: 108 }, // cantonada inferior esquerra
        ], {
            lineWidth: 8,
            strokeStyle: "#00008b",
            stroke: true,
            fill: false,
            closePath: true, // tanca el cuadrat
        });
    }
    // Canvas per crear un cercle
    const canvasCorner4 = document.createElement("canvas");
    canvasCorner4.width = 120;
    canvasCorner4.height = 120;
    document.body.appendChild(canvasCorner4);
    const ctxCorner4 = canvasCorner4.getContext("2d");
    if (ctxCorner4) {
        // Cercle: centre i radi
        drawCircle(ctxCorner4, 60, // cx: centre x
        60, // cy: centre y
        46, // radius
        {
            lineWidth: 8,
            strokeStyle: "#00008b",
            stroke: true,
            fill: false,
        });
    }
    // Canvas per crear un Pac-Man (sector circular amb boca)
    const canvasCorner5 = document.createElement("canvas");
    canvasCorner5.width = 120;
    canvasCorner5.height = 120;
    document.body.appendChild(canvasCorner5);
    const ctxCorner5 = canvasCorner5.getContext("2d");
    if (ctxCorner5) {
        // Pac-Man: sector amb boca cap a la dreta superior
        drawSector(ctxCorner5, 60, // cx: centre x
        60, // cy: centre y
        46, // radius
        45, // startAngleDeg: angle inicial (45° per la boca cap amunt-dreta)
        315, // endAngleDeg: angle final (315° per cobrir gairebé tot el cercle)
        {
            lineWidth: 8,
            strokeStyle: "#00008b",
            stroke: true,
            fill: false,
        });
        drawSector(ctxCorner5, 60, // cx: centre x
        60, // cy: centre y
        46, // radius
        315, // startAngleDeg: comença on acaba el Pac-Man
        405, // endAngleDeg: 45° (equivale a 405° = 45° + 360°)
        {
            lineWidth: 8,
            strokeStyle: "#00008b",
            stroke: true,
            fill: false,
        });
    }
    // Canvas per crear la paraula "Hello"
    const canvasCorner6 = document.createElement("canvas");
    canvasCorner6.width = 300;
    canvasCorner6.height = 120;
    document.body.appendChild(canvasCorner6);
    const ctxCorner6 = canvasCorner6.getContext("2d");
    if (ctxCorner6) {
        // Text "Hello" amb contorn
        drawText(ctxCorner6, "Hello", 160, // x: centre horitzontal
        80, // y: posició vertical
        {
            fontSize: 120,
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            textBaseline: "middle",
            lineWidth: 2,
            strokeStyle: "#000000",
            stroke: true,
            fill: false,
        });
    }
}
// ====== Còpies amb farciment taronja ======
const ORANGE = "#FFA500";
const BLUE = "#00008b";
// Triangle taronja
const canvasOrange2 = document.createElement("canvas");
canvasOrange2.width = 120;
canvasOrange2.height = 120;
canvasOrange2.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrange2);
const ctxOrangeNoStroke2 = canvasOrange2.getContext("2d");
if (ctxOrangeNoStroke2) {
    drawPolyline(ctxOrangeNoStroke2, [
        { x: 16, y: 16 },
        { x: 108, y: 16 },
        { x: 16, y: 108 },
    ], {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: true,
        fill: true,
        closePath: true,
    });
}
// Quadrat taronja
const canvasOrange3 = document.createElement("canvas");
canvasOrange3.width = 120;
canvasOrange3.height = 120;
canvasOrange3.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrange3);
const ctxOrangeNoStroke3 = canvasOrange3.getContext("2d");
if (ctxOrangeNoStroke3) {
    drawPolyline(ctxOrangeNoStroke3, [
        { x: 16, y: 16 },
        { x: 108, y: 16 },
        { x: 108, y: 108 },
        { x: 16, y: 108 },
    ], {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: true,
        fill: true,
        closePath: true,
    });
}
// Cercle taronja
const canvasOrange4 = document.createElement("canvas");
canvasOrange4.width = 120;
canvasOrange4.height = 120;
canvasOrange4.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrange4);
const ctxOrangeNoStroke4 = canvasOrange4.getContext("2d");
if (ctxOrangeNoStroke4) {
    drawCircle(ctxOrangeNoStroke4, 60, 60, 46, {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: true,
        fill: true,
    });
}
// Pac-Man + "quesito" taronja en el mateix canvas
const canvasOrange5 = document.createElement("canvas");
canvasOrange5.width = 120;
canvasOrange5.height = 120;
canvasOrange5.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrange5);
const ctxOrangeNoStroke5 = canvasOrange5.getContext("2d");
if (ctxOrangeNoStroke5) {
    // Cos principal (cercle amb boca)
    drawSector(ctxOrangeNoStroke5, 60, 60, 46, 45, 315, {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: true,
        fill: true,
    });
    // Quesito separat a la dreta (mateix centre i radi; arc petit)
    drawSector(ctxOrangeNoStroke5, 60, 60, 46, 315, 405, {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: true,
        fill: true,
    });
}
// Text "Hello" amb farciment taronja i contorn negre
const canvasOrange6 = document.createElement("canvas");
canvasOrange6.width = 260;
canvasOrange6.height = 120;
canvasOrange6.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrange6);
const ctxOrangeNoStroke6 = canvasOrange6.getContext("2d");
if (ctxOrangeNoStroke6) {
    drawText(ctxOrangeNoStroke6, "Hello", 130, 70, {
        fontSize: 56,
        fontFamily: "Georgia, serif",
        textAlign: "center",
        textBaseline: "middle",
        lineWidth: 3,
        fillStyle: ORANGE,
        strokeStyle: "#000",
        fill: true,
        stroke: true,
    });
}
// ====== Còpies amb farciment taronja i sense stroke======
createElement("br");
// Triangle taronja
const canvasOrangeNoStroke2 = document.createElement("canvas");
canvasOrangeNoStroke2.width = 120;
canvasOrangeNoStroke2.height = 120;
canvasOrangeNoStroke2.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrangeNoStroke2);
const ctxOrange2 = canvasOrangeNoStroke2.getContext("2d");
if (ctxOrange2) {
    drawPolyline(ctxOrange2, [
        { x: 16, y: 16 },
        { x: 108, y: 16 },
        { x: 16, y: 108 },
    ], {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: false,
        fill: true,
        closePath: true,
    });
}
// Quadrat taronja
const canvasOrangeNoStroke3 = document.createElement("canvas");
canvasOrangeNoStroke3.width = 120;
canvasOrangeNoStroke3.height = 120;
canvasOrangeNoStroke3.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrangeNoStroke3);
const ctxOrange3 = canvasOrangeNoStroke3.getContext("2d");
if (ctxOrange3) {
    drawPolyline(ctxOrange3, [
        { x: 16, y: 16 },
        { x: 108, y: 16 },
        { x: 108, y: 108 },
        { x: 16, y: 108 },
    ], {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: false,
        fill: true,
        closePath: true,
    });
}
// Cercle taronja
const canvasOrangeNoStroke4 = document.createElement("canvas");
canvasOrangeNoStroke4.width = 120;
canvasOrangeNoStroke4.height = 120;
canvasOrangeNoStroke4.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrangeNoStroke4);
const ctxOrange4 = canvasOrangeNoStroke4.getContext("2d");
if (ctxOrange4) {
    drawCircle(ctxOrange4, 60, 60, 46, {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: false,
        fill: true,
    });
}
// Pac-Man + "quesito" taronja en el mateix canvas
const canvasOrangeNoStroke5 = document.createElement("canvas");
canvasOrangeNoStroke5.width = 120;
canvasOrangeNoStroke5.height = 120;
canvasOrangeNoStroke5.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrangeNoStroke5);
const ctxOrange5 = canvasOrangeNoStroke5.getContext("2d");
if (ctxOrange5) {
    // Cos principal (cercle amb boca)
    drawSector(ctxOrange5, 60, 60, 46, 45, 315, {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: false,
        fill: true,
    });
    // Quesito separat a la dreta (mateix centre i radi; arc petit)
    drawSector(ctxOrange5, 60, 60, 46, 315, 405, {
        lineWidth: 8,
        strokeStyle: BLUE,
        fillStyle: ORANGE,
        stroke: false,
        fill: true,
    });
}
// Text "Hello" amb farciment taronja i contorn negre
const canvasOrangeNoStroke6 = document.createElement("canvas");
canvasOrangeNoStroke6.width = 260;
canvasOrangeNoStroke6.height = 120;
canvasOrangeNoStroke6.style.border = "1px solid #e0e0e0";
document.body.appendChild(canvasOrangeNoStroke6);
const ctxOrange6 = canvasOrangeNoStroke6.getContext("2d");
if (ctxOrange6) {
    drawText(ctxOrange6, "Hello", 130, 70, {
        fontSize: 56,
        fontFamily: "Georgia, serif",
        textAlign: "center",
        textBaseline: "middle",
        lineWidth: 3,
        fillStyle: ORANGE,
        strokeStyle: "#000",
        fill: true,
        stroke: false,
    });
}
