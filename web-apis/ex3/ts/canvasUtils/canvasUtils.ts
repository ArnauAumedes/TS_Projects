export function drawLines(
  ctx: CanvasRenderingContext2D,
  points: Array<[number, number]>,
  lineWidth: number = 2,
  strokeStyle: string = "black"
) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();
}

export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  points: Array<[number, number]>,
  lineWidth: number = 2,
  strokeStyle: string = "black",
  fillStyle?: string
) {
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

export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  lineWidth: number = 2,
  strokeStyle: string = "black",
  fillStyle?: string
) {
  ctx.beginPath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, w, h);
  }
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.strokeRect(x, y, w, h);
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  lineWidth: number = 2,
  strokeStyle: string = "black",
  fillStyle?: string
) {
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

export function drawSector(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  startAngle: number, endAngle: number,
  lineWidth: number = 2,
  strokeStyle: string = "black",
  fillStyle?: string
) {
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

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number, y: number,
  font: string = "48px serif",
  lineWidth: number = 2,
  strokeStyle: string = "black",
  fillStyle?: string
) {
  ctx.font = font;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillText(text, x, y);
  }
  ctx.strokeText(text, x, y);
}