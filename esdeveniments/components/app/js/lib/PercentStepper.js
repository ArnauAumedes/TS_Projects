export class PercentStepper extends HTMLElement {
    constructor() {
        super();
        this.onClick = (e) => {
            const target = e.target;
            const action = target.getAttribute("data-action");
            if (action === "increase")
                this.stepUp();
            if (action === "decrease")
                this.stepDown();
        };
        this.onKeyDown = (e) => {
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
    render() {
        if (this.innerHTML.trim())
            return;
        this.innerHTML = `
            <button type="button" data-action="decrease" aria-label="Decrease">−</button>
            <span data-value>0%</span>
            <button type="button" data-action="increase" aria-label="Increase">+</button>
        `;
    }
    stepUp() {
        this.value = Math.min(this.value + this.step, 100);
        this.emitChange();
    }
    stepDown() {
        this.value = Math.max(this.value - this.step, 0);
        this.emitChange();
    }
    emitChange() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    updateDisplay() {
        const span = this.querySelector("[data-value]");
        if (span) {
            span.textContent = `${this.value}%`;
        }
    }
    updateAria() {
        this.setAttribute("aria-valuenow", String(this.value));
    }
    get value() {
        return Number(this.getAttribute("value")) || 0;
    }
    set value(val) {
        this.setAttribute("value", String(val));
    }
    get step() {
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
