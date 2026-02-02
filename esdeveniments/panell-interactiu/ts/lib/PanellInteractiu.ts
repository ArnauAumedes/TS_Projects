type PanelCell = string | { style: string } | undefined;

export class PanellInteractiu extends HTMLElement {
  private selectedColor: string = "red";
  private isAnimating: boolean = false;
  private animationDirection: string | null = null;
  private animationInterval: number | null = null;
  private rows: number = 5;
  private cols: number = 5;
  private panel: string[][] = [];
  private animInterval: number | null = null;
  private isHolding: boolean = false;
  private holdTimeout: number | null = null;

  constructor(panel?: PanelCell[][]) {
    super();
    if (
      panel &&
      Array.isArray(panel) &&
      panel.length > 0 &&
      Array.isArray(panel[0])
    ) {
      this.rows = panel.length;
      this.cols = panel[0].length;
      // Convierte los objetos con style a color si es necesario
      this.panel = panel.map((row) =>
        row.map((cell) => {
          if (!cell) return "";
          if (typeof cell === "string") return cell;
          if (typeof cell === "object" && cell.style) {
            // Extrae el color del style
            const match = cell.style.match(/background-color:\s*([^;]+)/);
            return match ? match[1] : "";
          }
          return "";
        }),
      );
    } else {
      this.rows = 5;
      this.cols = 5;
      this.panel = Array.from({ length: this.rows }, () =>
        Array(this.cols).fill(""),
      );
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
    this.stopAnimation();
  }

  private render() {
    // Renderizamos los botones de color y animación, y la tabla
    this.innerHTML = `
            <div class="controls">
                <button data-color="red" style="background:red"></button>
                <button data-color="green" style="background:green"></button>
                <button data-color="blue" style="background:blue"></button>
                <button data-color="black" style="background:black"></button>
            </div>
            <div class="animation">
                <button data-dir="left">⬅️</button>
                <button data-dir="right">➡️</button>
                <button data-dir="up">⬆️</button>
                <button data-dir="down">⬇️</button>
                <button data-dir="top-left">↖️</button>
                <button data-dir="top-right">↗️</button>
                <button data-dir="bottom-left">↙️</button>
                <button data-dir="bottom-right">↘️</button>
            </div>
            <table class="panel">
                ${this.panel
                  .map(
                    (row, i) => `
                    <tr>
                        ${row
                          .map(
                            (color, j) => `
                            <td data-row="${i}" data-col="${j}" style="background:${color || "white"}"></td>
                        `,
                          )
                          .join("")}
                    </tr>
                `,
                  )
                  .join("")}
            </table>
        `;
  }

  private addEventListeners() {
    this.addEventListener("click", this.onButtonClick);
    window.addEventListener("keydown", this.onKeyDown);

    // Añade listeners a los botones de animación
    this.querySelectorAll("button[data-dir]").forEach((btn) => {
      btn.addEventListener("mousedown", (e) =>
        this.onAnimButtonDown(e as MouseEvent),
      );
      btn.addEventListener("mouseup", (e) =>
        this.onAnimButtonUp(e as MouseEvent),
      );
      btn.addEventListener("mouseleave", (e) =>
        this.onAnimButtonUp(e as MouseEvent),
      );
      btn.addEventListener("click", (e) =>
        this.onAnimButtonClick(e as MouseEvent),
      );
    });
  }

  private removeEventListeners() {
    this.removeEventListener("click", this.onButtonClick);
    window.removeEventListener("keydown", this.onKeyDown);

    this.querySelectorAll("button[data-dir]").forEach((btn) => {
      btn.removeEventListener("mousedown", (e) =>
        this.onAnimButtonDown(e as MouseEvent),
      );
      btn.removeEventListener("mouseup", (e) =>
        this.onAnimButtonUp(e as MouseEvent),
      );
      btn.removeEventListener("mouseleave", (e) =>
        this.onAnimButtonUp(e as MouseEvent),
      );
      btn.removeEventListener("click", (e) =>
        this.onAnimButtonClick(e as MouseEvent),
      );
    });
  }

  private onButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Selección de color
    const colorBtn = target.closest("button[data-color]");
    if (colorBtn) {
      this.selectedColor = colorBtn.getAttribute("data-color")!;
      this.updateDisplay();
      return;
    }

    // Botón de animación
    const animBtn = target.closest("button[data-dir]");
    if (animBtn) {
      const dir = animBtn.getAttribute("data-dir")!;
      this.toggleAnimation(dir);
      return;
    }

    // Modificación de casilla (solo si no está animando)
    if (!this.isAnimating) {
      const cell = target.closest("td[data-row][data-col]");
      if (cell) {
        const row = parseInt(cell.getAttribute("data-row")!);
        const col = parseInt(cell.getAttribute("data-col")!);
        const current = this.panel[row][col];
        if (current === this.selectedColor) {
          this.panel[row][col] = "";
        } else {
          this.panel[row][col] = this.selectedColor;
        }
        this.updateDisplay();
      }
    }
  };

  private updateDisplay() {
    // Solo actualizamos la tabla y resaltamos el color seleccionado
    const table = this.querySelector("table.panel");
    if (table) {
      Array.from(table.querySelectorAll("td")).forEach((td) => {
        const row = parseInt(td.getAttribute("data-row")!);
        const col = parseInt(td.getAttribute("data-col")!);
        td.setAttribute(
          "style",
          `background:${this.panel[row][col] || "white"}`,
        );
      });
    }
    // Resaltar el botón de color seleccionado
    Array.from(this.querySelectorAll("button[data-color]")).forEach((btn) => {
      if (btn.getAttribute("data-color") === this.selectedColor) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  }

  // Lógica para controlar la animación

  private toggleAnimation(direction: string) {
    if (this.isAnimating && this.animationDirection === direction) {
      this.stopAnimation();
    } else {
      this.startAnimation(direction);
    }
  }

  private startAnimation(direction: string) {
    this.stopAnimation(); // Por si ya hay una animación activa
    this.isAnimating = true;
    this.animationDirection = direction;
    this.animationInterval = window.setInterval(() => {
      this.movePanel(direction);
      this.updateDisplay();
    }, 100);
  }

  private stopAnimation() {
    if (this.animationInterval !== null) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.isAnimating = false;
    this.animationDirection = null;
  }

  private movePanel(direction: string) {
    // Creamos una copia del panel para modificarlo
    let newPanel = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(""),
    );
    if (direction === "left") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[i][(j + this.cols - 1) % this.cols] = this.panel[i][j];
        }
      }
    } else if (direction === "right") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[i][(j + 1) % this.cols] = this.panel[i][j];
        }
      }
    } else if (direction === "up") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[(i + this.rows - 1) % this.rows][j] = this.panel[i][j];
        }
      }
    } else if (direction === "down") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[(i + 1) % this.rows][j] = this.panel[i][j];
        }
      }
    } else if (direction === "top-left") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[(i + this.rows - 1) % this.rows][
            (j + this.cols - 1) % this.cols
          ] = this.panel[i][j];
        }
      }
    } else if (direction === "top-right") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[(i + this.rows - 1) % this.rows][(j + 1) % this.cols] =
            this.panel[i][j];
        }
      }
    } else if (direction === "bottom-left") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[(i + 1) % this.rows][(j + this.cols - 1) % this.cols] =
            this.panel[i][j];
        }
      }
    } else if (direction === "bottom-right") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          newPanel[(i + 1) % this.rows][(j + 1) % this.cols] = this.panel[i][j];
        }
      }
    }
    this.panel = newPanel;
  }

  // Logica para manejar eventos de teclado

  private onKeyDown = (e: KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      let dir = "";
      if (e.key === "ArrowLeft") dir = "left";
      if (e.key === "ArrowRight") dir = "right";
      if (e.key === "ArrowUp") dir = "up";
      if (e.key === "ArrowDown") dir = "down";
      this.toggleAnimation(dir);
    }
  };

  private onAnimButtonDown = (e: MouseEvent) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const dir = btn.getAttribute("data-dir");
    if (!dir) return;
    this.isHolding = false;
    // Espera 200ms antes de iniciar la animación continua
    this.holdTimeout = window.setTimeout(() => {
      this.isHolding = true;
      this.stopAnimation();
      this.animInterval = window.setInterval(() => {
        this.movePanel(dir);
        this.updateDisplay();
      }, 100);
    }, 200);
  };

  private onAnimButtonUp = (e: MouseEvent) => {
    // Si el usuario soltó antes de 200ms, no se inicia la animación continua
    if (this.holdTimeout !== null) {
      clearTimeout(this.holdTimeout);
      this.holdTimeout = null;
    }
    this.isHolding = false;
    if (this.animInterval !== null) {
      clearInterval(this.animInterval);
      this.animInterval = null;
    }
  };

  private onAnimButtonClick = (e: MouseEvent) => {
    // Solo mueve una vez si NO está manteniendo el botón
    if (!this.isHolding) {
      const btn = e.currentTarget as HTMLButtonElement;
      const dir = btn.getAttribute("data-dir");
      if (!dir) return;
      this.movePanel(dir);
      this.updateDisplay();
    }
  };
}
customElements.define("panell-interactiu", PanellInteractiu);
