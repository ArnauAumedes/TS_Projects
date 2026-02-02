/**
 * Mòdul d’utilitats per guardar i carregar arxius al navegador.
 * Centralitza la lògica de Blob, FileReader i descàrrega per reutilitzar-la
 * des de qualsevol part de l’aplicació (mapes interactius, barres d’eines, etc.).
 */

/**
 * Descarrega un arxiu de text amb el nom i contingut indicats.
 */
export function downloadText(filename: string, text: string, mimeType: string = "text/plain"): void {
  const file = new Blob([text], { type: mimeType });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Descarrega la imatge del canvas com a fitxer (JPEG).
 */
export function downloadImage(filename: string, canvas: HTMLCanvasElement, quality: number = 0.95): void {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg", quality);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Llegeix el primer fitxer seleccionat com a text.
 * Retorna una Promise que es resol amb el contingut o es rebutja amb un error.
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      let text = (evt.target?.result as string) ?? "";
      if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
      resolve(text);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, "UTF-8");
  });
}

/**
 * Llegeix el primer fitxer seleccionat com a Data URL (base64).
 * Útil per imatges o per inserir directament en src.
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => resolve((evt.target?.result as string) ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Opcions per configurar l’input de tipus file.
 */
export interface FileInputOptions {
  accept?: string;
  multiple?: boolean;
  /** Si és true, després de processar es reseteja l’input per poder tornar a triar el mateix arxiu. */
  resetAfterSelect?: boolean;
}

/**
 * Processa l’esdeveniment change d’un <input type="file">: llegeix el primer
 * fitxer com a text i crida el callback amb el resultat.
 */
export function handleFileSelectAsText(
  evt: Event,
  onLoaded: (text: string) => void,
  options: FileInputOptions = {}
): void {
  const input = evt.target as HTMLInputElement;
  const files = input.files;
  if (!files?.length) return;
  const file = files[0];
  readFileAsText(file).then((text) => {
    onLoaded(text);
    if (options.resetAfterSelect !== false) input.value = "";
  });
}

/**
 * Processa l’esdeveniment change d’un <input type="file">: llegeix el primer
 * fitxer com a Data URL i crida el callback amb el resultat.
 */
export function handleFileSelectAsDataURL(
  evt: Event,
  onLoaded: (dataUrl: string) => void,
  options: FileInputOptions = {}
): void {
  const input = evt.target as HTMLInputElement;
  const files = input.files;
  if (!files?.length) return;
  const file = files[0];
  readFileAsDataURL(file).then((dataUrl) => {
    onLoaded(dataUrl);
    if (options.resetAfterSelect !== false) input.value = "";
  });
}

/**
 * Converteix l’array de fitxers d’un esdeveniment drop (Drag & Drop) al format
 * que esperen les funcions de lectura. Útil per reutilitzar la mateixa lògica
 * que amb <input type="file">.
 */
export function getFilesFromDrop(evt: DragEvent): File[] {
  evt.preventDefault();
  const dt = evt.dataTransfer;
  if (!dt?.files) return [];
  return Array.from(dt.files);
}

/**
 * Afegeix als gestors dragover/drop d’un element el comportament bàsic
 * (evitar acció per defecte) i, en drop, crida el callback amb la llista de fitxers.
 */
export function setupDropZone(
  element: HTMLElement,
  onDrop: (files: File[]) => void
): () => void {
  const prevent = (e: DragEvent) => e.preventDefault();
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = getFilesFromDrop(e);
    if (files.length) onDrop(files);
  };
  element.addEventListener("dragover", prevent);
  element.addEventListener("drop", handleDrop);
  return () => {
    element.removeEventListener("dragover", prevent);
    element.removeEventListener("drop", handleDrop);
  };
}
