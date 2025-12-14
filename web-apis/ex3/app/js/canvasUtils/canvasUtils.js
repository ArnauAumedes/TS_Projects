export function drawLines(ctx, points, lineWidth = 2, strokeStyle = "black") {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();
}
export function drawPolygon(ctx, points, lineWidth = 2, strokeStyle = "black", fillStyle) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}
export function drawRect(ctx, x, y, w, h, lineWidth = 2, strokeStyle = "black", fillStyle) {
    ctx.beginPath();
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, w, h);
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.strokeRect(x, y, w, h);
}
export function drawCircle(ctx, x, y, r, lineWidth = 2, strokeStyle = "black", fillStyle) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}
export function drawSector(ctx, x, y, r, startAngle, endAngle, lineWidth = 2, strokeStyle = "black", fillStyle) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, startAngle * Math.PI / 180, endAngle * Math.PI / 180);
    ctx.closePath();
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}
export function drawText(ctx, text, x, y, font = "48px serif", lineWidth = 2, strokeStyle = "black", fillStyle) {
    ctx.font = font;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fillText(text, x, y);
    }
    ctx.strokeText(text, x, y);
}
