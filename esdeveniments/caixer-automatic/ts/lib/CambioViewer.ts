export class CambioViewer extends HTMLElement {
  private cambio: number = 0;
  private desglose: Record<number, number> = {};
  private readonly DENOMINACIONES = [
    50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01,
  ];

  constructor() {
    super();
    this.cambio = 0;
    this.desglose = {};
  }

  connectedCallback() {
    this.render();
  }

  /**
   * Funcion setter que establece el cambio a mostrar
   * @param cambio El cambio a mostrar
   */
  public setCambio(cambio: number) {
    this.cambio = cambio;
    this.calculateDesglose();
    this.render();
  }

  public calculateDesglose() {
    let restante = +this.cambio.toFixed(2);
    this.desglose = {};

    for (const denom of this.DENOMINACIONES) {
      const cantidad = Math.floor(restante / denom);
      if (cantidad > 0) {
        this.desglose[denom] = cantidad;
        restante = +(restante - cantidad * denom).toFixed(2);
      }
    }
  }

  private render() {
    if (this.cambio <= 0) {
      this.innerHTML = `<div>No hi ha canvi a retornar.</div>`;
      return;
    }

    let html = `<div>Canvi a retornar: <strong>${this.cambio.toFixed(2)} €</strong></div>`;
    html += `<ul>`;
    for (const denom of this.DENOMINACIONES) {
      if (this.desglose[denom]) {
        html += `<li>${this.desglose[denom]} x ${denom >= 5 ? denom + " €" : denom >= 1 ? denom + " €" : denom * 100 + " cts"}</li>`;
      }
    }
    html += `</ul>`;
    this.innerHTML = html;
  }
}
customElements.define("cambio-viewer", CambioViewer);
