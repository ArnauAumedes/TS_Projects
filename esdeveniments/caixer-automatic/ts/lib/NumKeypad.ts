export class NumKeypad extends HTMLElement {
  private value: number = 0;

  constructor() {
    super();
    // Inicialitzar els valors
    this.value = 0;
  }

  connectedCallback() {
    // Renderitzar HTML y display
    this.render();
    this.updateDisplay();
    // Afegir listeners als buttons
    this.addEventListener("click", this.onButtonClick);
    window.addEventListener("keydown", this.onKeyDown);
  }

  disconectedCallback() {
    // Limpiar los listeners
    this.removeEventListener("click", this.onButtonClick);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  private render() {
    // Crear el HTML del display + buttons
    this.innerHTML = `
        <div class="display">${this.value}</div>
        <div class="keypad">
            <button data-key="0.01">
                <img src="media/1c.png" alt="1" />
            </button>
            <button data-key="0.02">
                <img src="media/2c.png" alt="2" />
            </button>
            <button data-key="0.05">
                <img src="media/5c.png" alt="5" />
            </button>
            <button data-key="0.10">
                <img src="media/10c.png" alt="10" />
            </button>
            <button data-key="0.20">
                <img src="media/20c.png" alt="20" />
            </button>
            <button data-key="0.50">
                <img src="media/50c.png" alt="50" />
            </button>
            <button data-key="1.00">
                <img src="media/1e.png" alt="1" />
            </button>
            <button data-key="2.00">
                <img src="media/2e.png" alt="2" />
            </button>
            <button data-key="5.00">
                <img src="media/5e.png" alt="5" />
            </button>
            <button data-key="10.00">
                <img src="media/10e.png" alt="10" />
            </button>
            <button data-key="20.00">
                <img src="media/20e.png" alt="20" />
            </button>
            <button data-key="50.00">
                <img src="media/50e.png" alt="50" />
            </button>
        </div>
    `;
  }

  private onButtonClick = (e: MouseEvent) => {
    // Manejar els esdeveniments de ratolí en els buttons
    const button = (e.target as HTMLElement).closest("button");
    if (!button) return;
    const key = button.getAttribute("data-key");
    // Si no hay key salir del evento
    if (!key) return;
    // logica dels buttons
    if (key === "del") {
      // si es "del", elimina el útlimo digito
      this.value = 0;
    } else if (key === "ok") {
      // Si es "ok", lo añade
      this.emitOk();
    } else {
      // Si es un número el suma al valor actual
      this.value += parseFloat(key);
    }
    this.updateDisplay();
  };

  private onKeyDown = (e: KeyboardEvent) => {
    // Manejar els esdeveniments de teclat
    if (e.key === "Backspace") {
      // Si es la tecla "backspace" elimina l'ultim numero
      this.value = 0;
    } else if (e.key === "Enter") {
      // Si es la tecta enter, afegeix el numero
      this.emitOk();
    } else if (e.key === "Tab") {
      // Cambia el focus de los buttons
      e.preventDefault();
      this.focusNextButton();
      return;
    } else if (e.key === "Tab" && e.ctrlKey) {
      e.preventDefault();
      this.focusPrevButton();
      return;
    } 
  };

  private updateDisplay() {
    // Actualitzar el display amb el valor a actualizar
    const display = this.querySelector(".display");
    if (display) display.textContent = this.value.toFixed(2) + " €";
  }

  private emitOk() {
    // Actualizar l'event personalitzar amb el valor rebut
    this.dispatchEvent(
      new CustomEvent("ok", {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  }

  private focusNextButton() {
    // Canvia el focus al següent botó
    const buttons = Array.from(this.querySelectorAll("button"));
    // Obtenir l'element actiu i el seu índex
    const active = document.activeElement;
    // Aplica index a tots els buttons
    const idx = buttons.indexOf(active as HTMLButtonElement);
    // Logica per canviar el focus
    const nextIdx = (idx + 1) % buttons.length;
    (buttons[nextIdx] as HTMLButtonElement).focus();
  }

  private focusPrevButton() {
    const buttons = Array.from(this.querySelectorAll("button"));
    const active = document.activeElement;
    const idx = buttons.indexOf(active as HTMLButtonElement);
    const prevIdx = (idx - 1 + buttons.length) % buttons.length;
    (buttons[prevIdx] as HTMLButtonElement).focus();
  }
}
// Afegir als custom Elements el nostre component web
customElements.define("num-keypad", NumKeypad);
