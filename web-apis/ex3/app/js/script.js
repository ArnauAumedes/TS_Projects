import { drawLines, drawPolygon, drawRect, drawCircle, drawSector, drawText } from "./canvasUtils/canvasUtils.js";
// Crear i afegir el canvas
const canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 400;
canvas.style.border = "1px solid black";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
// Dibuixa les figures segons la imatge (adapta les coordenades i colors segons calgui)
drawLines(ctx, [[10, 10], [90, 10], [10, 90]], 5, "navy");
drawPolygon(ctx, [[120, 10], [170, 10], [145, 60]], 5, "navy");
drawRect(ctx, 200, 10, 70, 70, 5, "navy");
drawCircle(ctx, 320, 45, 35, 5, "navy");
drawSector(ctx, 410, 45, 35, 315, 45, 5, "navy");
drawText(ctx, "Hello", 470, 65, "64px serif", 3, "navy");
drawPolygon(ctx, [[10, 110], [90, 110], [10, 190]], 5, "navy", "orange");
drawRect(ctx, 120, 110, 80, 80, 5, "navy", "orange");
drawCircle(ctx, 240, 150, 40, 5, "navy", "orange");
drawSector(ctx, 340, 150, 40, 315, 45, 5, "navy", "orange");
drawText(ctx, "Hello", 420, 170, "80px serif", 3, "orange", "orange");
