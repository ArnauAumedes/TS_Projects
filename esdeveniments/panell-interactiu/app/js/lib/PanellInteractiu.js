export class PanellInteractiu extends HTMLElement {
    constructor(panel) {
        super();
        this.selectedColor = "red";
        this.isAnimating = false;
        this.animationDirection = null;
        this.animationInterval = null;
        this.rows = 5;
        this.cols = 5;
        this.panel = [];
        this.animInterval = null;
        this.isHolding = false;
        this.holdTimeout = null;
        this.onButtonClick = (e) => {
            const target = e.target;
            // Selección de color
            const colorBtn = target.closest("button[data-color]");
            if (colorBtn) {
                this.selectedColor = colorBtn.getAttribute("data-color");
                this.updateDisplay();
                return;
            }
            // Botón de animación
            const animBtn = target.closest("button[data-dir]");
            if (animBtn) {
                const dir = animBtn.getAttribute("data-dir");
                this.toggleAnimation(dir);
                return;
            }
            // Modificación de casilla (solo si no está animando)
            if (!this.isAnimating) {
                const cell = target.closest("td[data-row][data-col]");
                if (cell) {
                    const row = parseInt(cell.getAttribute("data-row"));
                    const col = parseInt(cell.getAttribute("data-col"));
                    const current = this.panel[row][col];
                    if (current === this.selectedColor) {
                        this.panel[row][col] = "";
                    }
                    else {
                        this.panel[row][col] = this.selectedColor;
                    }
                    this.updateDisplay();
                }
            }
        };
        // Logica para manejar eventos de teclado
        this.onKeyDown = (e) => {
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
                e.preventDefault();
                let dir = "";
                if (e.key === "ArrowLeft")
                    dir = "left";
                if (e.key === "ArrowRight")
                    dir = "right";
                if (e.key === "ArrowUp")
                    dir = "up";
                if (e.key === "ArrowDown")
                    dir = "down";
                this.toggleAnimation(dir);
            }
        };
        this.onAnimButtonDown = (e) => {
            const btn = e.currentTarget;
            const dir = btn.getAttribute("data-dir");
            if (!dir)
                return;
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
        this.onAnimButtonUp = (e) => {
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
        this.onAnimButtonClick = (e) => {
            // Solo mueve una vez si NO está manteniendo el botón
            if (!this.isHolding) {
                const btn = e.currentTarget;
                const dir = btn.getAttribute("data-dir");
                if (!dir)
                    return;
                this.movePanel(dir);
                this.updateDisplay();
            }
        };
        if (panel &&
            Array.isArray(panel) &&
            panel.length > 0 &&
            Array.isArray(panel[0])) {
            this.rows = panel.length;
            this.cols = panel[0].length;
            // Convierte los objetos con style a color si es necesario
            this.panel = panel.map((row) => row.map((cell) => {
                if (!cell)
                    return "";
                if (typeof cell === "string")
                    return cell;
                if (typeof cell === "object" && cell.style) {
                    // Extrae el color del style
                    const match = cell.style.match(/background-color:\s*([^;]+)/);
                    return match ? match[1] : "";
                }
                return "";
            }));
        }
        else {
            this.rows = 5;
            this.cols = 5;
            this.panel = Array.from({ length: this.rows }, () => Array(this.cols).fill(""));
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
    render() {
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
            .map((row, i) => `
                    <tr>
                        ${row
            .map((color, j) => `
                            <td data-row="${i}" data-col="${j}" style="background:${color || "white"}"></td>
                        `)
            .join("")}
                    </tr>
                `)
            .join("")}
            </table>
        `;
    }
    addEventListeners() {
        this.addEventListener("click", this.onButtonClick);
        window.addEventListener("keydown", this.onKeyDown);
        // Añade listeners a los botones de animación
        this.querySelectorAll("button[data-dir]").forEach((btn) => {
            btn.addEventListener("mousedown", (e) => this.onAnimButtonDown(e));
            btn.addEventListener("mouseup", (e) => this.onAnimButtonUp(e));
            btn.addEventListener("mouseleave", (e) => this.onAnimButtonUp(e));
            btn.addEventListener("click", (e) => this.onAnimButtonClick(e));
        });
    }
    removeEventListeners() {
        this.removeEventListener("click", this.onButtonClick);
        window.removeEventListener("keydown", this.onKeyDown);
        this.querySelectorAll("button[data-dir]").forEach((btn) => {
            btn.removeEventListener("mousedown", (e) => this.onAnimButtonDown(e));
            btn.removeEventListener("mouseup", (e) => this.onAnimButtonUp(e));
            btn.removeEventListener("mouseleave", (e) => this.onAnimButtonUp(e));
            btn.removeEventListener("click", (e) => this.onAnimButtonClick(e));
        });
    }
    updateDisplay() {
        // Solo actualizamos la tabla y resaltamos el color seleccionado
        const table = this.querySelector("table.panel");
        if (table) {
            Array.from(table.querySelectorAll("td")).forEach((td) => {
                const row = parseInt(td.getAttribute("data-row"));
                const col = parseInt(td.getAttribute("data-col"));
                td.setAttribute("style", `background:${this.panel[row][col] || "white"}`);
            });
        }
        // Resaltar el botón de color seleccionado
        Array.from(this.querySelectorAll("button[data-color]")).forEach((btn) => {
            if (btn.getAttribute("data-color") === this.selectedColor) {
                btn.classList.add("selected");
            }
            else {
                btn.classList.remove("selected");
            }
        });
    }
    // Lógica para controlar la animación
    toggleAnimation(direction) {
        if (this.isAnimating && this.animationDirection === direction) {
            this.stopAnimation();
        }
        else {
            this.startAnimation(direction);
        }
    }
    startAnimation(direction) {
        this.stopAnimation(); // Por si ya hay una animación activa
        this.isAnimating = true;
        this.animationDirection = direction;
        this.animationInterval = window.setInterval(() => {
            this.movePanel(direction);
            this.updateDisplay();
        }, 100);
    }
    stopAnimation() {
        if (this.animationInterval !== null) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        this.isAnimating = false;
        this.animationDirection = null;
    }
    movePanel(direction) {
        // Creamos una copia del panel para modificarlo
        let newPanel = Array.from({ length: this.rows }, () => Array(this.cols).fill(""));
        if (direction === "left") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[i][(j + this.cols - 1) % this.cols] = this.panel[i][j];
                }
            }
        }
        else if (direction === "right") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[i][(j + 1) % this.cols] = this.panel[i][j];
                }
            }
        }
        else if (direction === "up") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[(i + this.rows - 1) % this.rows][j] = this.panel[i][j];
                }
            }
        }
        else if (direction === "down") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[(i + 1) % this.rows][j] = this.panel[i][j];
                }
            }
        }
        else if (direction === "top-left") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[(i + this.rows - 1) % this.rows][(j + this.cols - 1) % this.cols] = this.panel[i][j];
                }
            }
        }
        else if (direction === "top-right") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[(i + this.rows - 1) % this.rows][(j + 1) % this.cols] =
                        this.panel[i][j];
                }
            }
        }
        else if (direction === "bottom-left") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[(i + 1) % this.rows][(j + this.cols - 1) % this.cols] =
                        this.panel[i][j];
                }
            }
        }
        else if (direction === "bottom-right") {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    newPanel[(i + 1) % this.rows][(j + 1) % this.cols] = this.panel[i][j];
                }
            }
        }
        this.panel = newPanel;
    }
}
customElements.define("panell-interactiu", PanellInteractiu);
