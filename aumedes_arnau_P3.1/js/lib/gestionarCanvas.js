// GESTIONAR CANVAS 2D
/**
 * Funcio per convertir graus a radians
 * @param deg Angle en graus
 * @returns Angle en radians
 */
export function degToRad(deg) {
    return (deg * Math.PI) / 180;
}
/**
 * Funcio per aplicar estils al context del canvas
 * @param ctx Context del canvas
 * @param opts Opcions d'estil
 */
function applyStyles(ctx, opts) {
    if (!opts)
        return;
    if (opts.lineWidth !== undefined)
        ctx.lineWidth = opts.lineWidth;
    if (opts.strokeStyle !== undefined)
        ctx.strokeStyle = opts.strokeStyle;
    if (opts.fillStyle !== undefined)
        ctx.fillStyle = opts.fillStyle;
}
/**
 * Funcio per aplicar stroke i/o fill segons les opcions
 * @param ctx Context del canvas
 * @param opts Opcions de dibuix
 */
function doStrokeFill(ctx, opts) {
    const stroke = (opts === null || opts === void 0 ? void 0 : opts.stroke) !== false; // default true
    const fill = (opts === null || opts === void 0 ? void 0 : opts.fill) === true; // default false
    if (fill)
        ctx.fill();
    if (stroke)
        ctx.stroke();
}
/**
 * Funcio per dibuixar un conjunt de línies enllaçades (polilínia)
 * @param ctx Context del canvas
 * @param points Array de punts
 * @param opts Opcions de dibuix
 * @returns void
 */
export function drawPolyline(ctx, points, opts) {
    if (!points || points.length < 2)
        return;
    applyStyles(ctx, opts);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    if (opts === null || opts === void 0 ? void 0 : opts.closePath)
        ctx.closePath();
    doStrokeFill(ctx, opts);
}
/**
 * Funcio per dibuixar un polígon (conjunt de línies tancat)
 * @param ctx Context del canvas
 * @param points Array de punts
 * @param opts Opcions de dibuix
 * @returns void
 */
export function drawPolygon(ctx, points, opts) {
    if (!points || points.length < 3)
        return;
    applyStyles(ctx, opts);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    doStrokeFill(ctx, Object.assign(Object.assign({}, opts), { closePath: true }));
}
/**
 * Funcio per dibuixar un rectangle
 * @param ctx Context del canvas
 * @param x Coordenada x de l'angle superior esquerre
 * @param y Coordenada y de l'angle superior esquerre
 * @param width Amplada del rectangle
 * @param height Alçada del rectangle
 * @param opts Opcions de dibuix
 */
export function drawRect(ctx, x, y, width, height, opts) {
    applyStyles(ctx, opts);
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    doStrokeFill(ctx, opts);
}
/**
 * Funcio per dibuixar un cercle
 * @param ctx Context del canvas
 * @param cx Coordenada x del centre
 * @param cy Coordenada y del centre
 * @param radius Radi del cercle
 * @param opts Opcions de dibuix
 */
export function drawCircle(ctx, cx, cy, radius, opts) {
    applyStyles(ctx, opts);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    doStrokeFill(ctx, opts);
}
/**
 * Funcio per dibuixar un sector circular
 * @param ctx Context del canvas
 * @param cx Coordenada x del centre
 * @param cy Coordenada y del centre
 * @param radius Radi del sector
 * @param startAngleDeg Angle d'inici en graus
 * @param endAngleDeg Angle final en graus
 * @param opts Opcions de dibuix
 */
export function drawSector(ctx, cx, cy, radius, startAngleDeg, endAngleDeg, opts) {
    applyStyles(ctx, opts);
    const start = degToRad(startAngleDeg);
    const end = degToRad(endAngleDeg);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    doStrokeFill(ctx, opts);
}
/**
 * Funcio per dibuixar text al canvas
 * @param ctx Context del canvas
 * @param text Text a dibuixar
 * @param x Coordenada x
 * @param y Coordenada y
 * @param opts Opcions de text
 */
export function drawText(ctx, text, x, y, opts) {
    const { fontSize = 16, fontFamily = "sans-serif" } = opts || {};
    ctx.save();
    applyStyles(ctx, opts);
    ctx.font = `${fontSize}px ${fontFamily}`;
    if (opts === null || opts === void 0 ? void 0 : opts.textAlign)
        ctx.textAlign = opts.textAlign;
    if (opts === null || opts === void 0 ? void 0 : opts.textBaseline)
        ctx.textBaseline = opts.textBaseline;
    const doFill = (opts === null || opts === void 0 ? void 0 : opts.fill) !== false; // default true
    const doStroke = (opts === null || opts === void 0 ? void 0 : opts.stroke) === true; // default false
    if (doFill)
        ctx.fillText(text, x, y, opts === null || opts === void 0 ? void 0 : opts.maxWidth);
    if (doStroke)
        ctx.strokeText(text, x, y, opts === null || opts === void 0 ? void 0 : opts.maxWidth);
    ctx.restore();
}
/**
 * Funcio per netejar el canvas
 * @param ctx Context del canvas
 * @param width Amplada
 * @param height Alçada
 */
export function clearCanvas(ctx, width, height) {
    const w = width !== null && width !== void 0 ? width : ctx.canvas.width;
    const h = height !== null && height !== void 0 ? height : ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
}
