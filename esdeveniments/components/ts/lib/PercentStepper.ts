export class PercentStepper extends HTMLElement {

    constructor() {
        super();
        this.tabIndex = 0;
        this.setAttribute("role", "spinbutton");
        this.setAttribute("aria-valuemin", "0");
        this.setAttribute("aria-valuemax", "100");
    }

    connectedCallback() {
        this.render();
        this.updateAria();

        this.addEventListener("click", this.onClick);
        this.addEventListener("keydown", this.onKeyDown);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.onClick);
        this.removeEventListener("keydown", this.onKeyDown);
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback() {
        this.updateAria();
        this.updateDisplay();
    }

    private render() {
        if (this.innerHTML.trim()) return;

        this.innerHTML = `
            <button type="button" data-action="decrease" aria-label="Decrease">−</button>
            <span data-value>0%</span>
            <button type="button" data-action="increase" aria-label="Increase">+</button>
        `;
    }

    private onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const action = target.getAttribute("data-action");

        if (action === "increase") this.stepUp();
        if (action === "decrease") this.stepDown();
    };

    private onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowUp":
            case "+":
                e.preventDefault();
                this.stepUp();
                break;

            case "ArrowDown":
            case "-":
                e.preventDefault();
                this.stepDown();
                break;
        }
    };

    private stepUp() {
        this.value = Math.min(this.value + this.step, 100);
        this.emitChange();
    }

    private stepDown() {
        this.value = Math.max(this.value - this.step, 0);
        this.emitChange();
    }

    private emitChange() {
        this.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

    private updateDisplay() {
        const span = this.querySelector("[data-value]");
        if (span) {
            span.textContent = `${this.value}%`;
        }
    }

    private updateAria() {
        this.setAttribute("aria-valuenow", String(this.value));
    }

    get value(): number {
        return Number(this.getAttribute("value")) || 0;
    }

    set value(val: number) {
        this.setAttribute("value", String(val));
    }

    get step(): number {
        return Number(this.getAttribute("step")) || 5;
    }
}

customElements.define("percent-stepper", PercentStepper);

// Uso desde fuera:
// <percent-stepper value="25" step="10"></percent-stepper>
// <percent-stepper value="25" step="10"></percent-stepper>
// ```html
// <percent-stepper value="25" step="10"></percent-stepper>
// ```
// ### Accesibilidad incluida

// - `role="spinbutton"`
// - `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
// - Control por teclado:
//     - `↑ / +` incrementa
//     - `↓ / -` decrementa