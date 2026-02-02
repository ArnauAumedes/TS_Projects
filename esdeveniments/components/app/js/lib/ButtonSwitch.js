export class ButtonSwitch extends HTMLElement {
    constructor() {
        super();
        this.toggle = () => {
            this.checked = !this.checked;
            this.dispatchEvent(new Event("change", { bubbles: true }));
        };
        this.onKeyDown = (e) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                this.toggle();
            }
        };
        this.tabIndex = 0;
        this.setAttribute("role", "switch");
    }
    connectedCallback() {
        this.render();
        this.updateAria();
        this.addEventListener("click", this.toggle);
        this.addEventListener("keydown", this.onKeyDown);
    }
    disconnectedCallback() {
        this.removeEventListener("click", this.toggle);
        this.removeEventListener("keydown", this.onKeyDown);
    }
    static get observedAttributes() {
        return ["checked"];
    }
    attributeChangedCallback() {
        this.updateAria();
    }
    render() {
        if (!this.innerHTML.trim()) {
            this.textContent = "Switch";
        }
    }
    updateAria() {
        this.setAttribute("aria-checked", String(this.checked));
    }
    get checked() {
        return this.hasAttribute("checked");
    }
    set checked(value) {
        if (value) {
            this.setAttribute("checked", "");
        }
        else {
            this.removeAttribute("checked");
        }
    }
}
customElements.define("button-switch", ButtonSwitch);
// Uso desde fuera:
// ```html
// <button-switch id="sw"></button-switch>
// <script type="module">
// const sw = document.getElementById("sw");
// sw.addEventListener("change", () => {
//     console.log("Estado:", sw.checked);
// });
// </script>
