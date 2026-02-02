// GESTIONAR CANVAS 2D

export type Point = { x: number; y: number };

export interface StyleOptions {
  lineWidth?: number;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  fillStyle?: string | CanvasGradient | CanvasPattern;
}

export interface DrawOptions extends StyleOptions {
  stroke?: boolean; // default true
  fill?: boolean; // default false
  closePath?: boolean; // for polylines/polygons
}

export interface TextOptions extends StyleOptions {
  fontSize?: number; // px
  fontFamily?: string; // e.g. "Arial, sans-serif"
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  maxWidth?: number; // optional for fillText / strokeText
  stroke?: boolean; // default false
  fill?: boolean; // default true
}

/**
 * Funcio per convertir graus a radians
 * @param deg Angle en graus
 * @returns Angle en radians
 */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Funcio per aplicar estils al context del canvas
 * @param ctx Context del canvas
 * @param opts Opcions d'estil
 */
function applyStyles(ctx: CanvasRenderingContext2D, opts?: StyleOptions): void {
  if (!opts) return;
  if (opts.lineWidth !== undefined) ctx.lineWidth = opts.lineWidth;
  if (opts.strokeStyle !== undefined) ctx.strokeStyle = opts.strokeStyle as any;
  if (opts.fillStyle !== undefined) ctx.fillStyle = opts.fillStyle as any;
}

/**
 * Funcio per aplicar stroke i/o fill segons les opcions
 * @param ctx Context del canvas
 * @param opts Opcions de dibuix
 */
function doStrokeFill(
  ctx: CanvasRenderingContext2D,
  opts?: DrawOptions
): void {
  const stroke = opts?.stroke !== false; // default true
  const fill = opts?.fill === true; // default false

  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

/**
 * Funcio per dibuixar un conjunt de línies enllaçades (polilínia)
 * @param ctx Context del canvas
 * @param points Array de punts
 * @param opts Opcions de dibuix
 * @returns void
 */
export function drawPolyline(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  opts?: DrawOptions
): void {
  if (!points || points.length < 2) return;
  applyStyles(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  if (opts?.closePath) ctx.closePath();
  doStrokeFill(ctx, opts);
}

/**
 * Funcio per dibuixar un polígon (conjunt de línies tancat)
 * @param ctx Context del canvas
 * @param points Array de punts
 * @param opts Opcions de dibuix
 * @returns void
 */
export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  opts?: DrawOptions
): void {
  if (!points || points.length < 3) return;
  applyStyles(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  doStrokeFill(ctx, { ...opts, closePath: true });
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
export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  opts?: DrawOptions
): void {
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
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  opts?: DrawOptions
): void {
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
export function drawSector(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number,
  opts?: DrawOptions
): void {
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
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  opts?: TextOptions
): void {
  const { fontSize = 16, fontFamily = "sans-serif" } = opts || {};
  ctx.save();
  applyStyles(ctx, opts);
  ctx.font = `${fontSize}px ${fontFamily}`;
  if (opts?.textAlign) ctx.textAlign = opts.textAlign;
  if (opts?.textBaseline) ctx.textBaseline = opts.textBaseline;

  const doFill = opts?.fill !== false; // default true
  const doStroke = opts?.stroke === true; // default false

  if (doFill) ctx.fillText(text, x, y, opts?.maxWidth);
  if (doStroke) ctx.strokeText(text, x, y, opts?.maxWidth);
  ctx.restore();
}

/**
 * Funcio per netejar el canvas
 * @param ctx Context del canvas
 * @param width Amplada
 * @param height Alçada
 */
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width?: number,
  height?: number
): void {
  const w = width ?? ctx.canvas.width;
  const h = height ?? ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
}
