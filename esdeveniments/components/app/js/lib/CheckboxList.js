export class CheckboxList extends HTMLElement {
    constructor() {
        super();
        this._items = [];
        this.onClick = (e) => {
            const checkbox = e.target.closest('[role="checkbox"]');
            if (!checkbox)
                return;
            this.toggleCheckbox(checkbox);
        };
        this.onKeyDown = (e) => {
            const target = e.target;
            if (target.getAttribute("role") !== "checkbox")
                return;
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                this.toggleCheckbox(target);
            }
        };
        this.tabIndex = 0;
        this.setAttribute("role", "listbox");
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
    }
    /**
     * Renderiza el contenido del CheckboxList
     */
    render() {
        if (this._items.length > 0) {
            // Renderizar los items proporcionados
            this.innerHTML = `<ul>
                ${this._items
                .map((item, i) => `
                    <li data-value="${item}">
                        <span role="checkbox" tabindex="0" aria-checked="false" class="checkbox"></span>
                        <span>${item}</span>
                    </li>`)
                .join("")}
            </ul>`;
        }
        else if (!this.innerHTML.trim()) {
            // Render por defecto si no hay items
            this.innerHTML = `
                <ul>
                    <li data-value="a">
                        <span role="checkbox" tabindex="0" aria-checked="false" class="checkbox"></span>
                        <span>Opció A</span>
                    </li>
                    <li data-value="b">
                        <span role="checkbox" tabindex="0" aria-checked="false" class="checkbox"></span>
                        <span>Opció B</span>
                    </li>
                </ul>
            `;
        }
        // Limpiar estados anteriores
        this.querySelectorAll('[role="checkbox"]').forEach((cb) => {
            if (cb.getAttribute("aria-checked") === "true") {
                cb.textContent = "✓";
            }
            else {
                cb.textContent = "";
            }
        });
    }
    get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
        this.render();
    }
    toggleCheckbox(checkbox) {
        const checked = checkbox.getAttribute("aria-checked") === "true";
        checkbox.setAttribute("aria-checked", String(!checked));
        // Actualiza el contenido visual
        checkbox.textContent = !checked ? "✓" : "";
        this.updateValue();
        this.emitChange();
    }
    updateValue() {
        const values = [];
        this.querySelectorAll('[role="checkbox"]').forEach((cb) => {
            if (cb.getAttribute("aria-checked") === "true") {
                const li = cb.closest("li");
                if (li === null || li === void 0 ? void 0 : li.dataset.value) {
                    values.push(li.dataset.value);
                }
            }
        });
        this.value = values.join(",");
    }
    updateAria() {
        const selected = this.value ? this.value.split(",").length : 0;
        this.setAttribute("aria-multiselectable", "true");
        this.setAttribute("aria-selected", String(selected > 0));
    }
    emitChange() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    get value() {
        return this.getAttribute("value") || "";
    }
    set value(val) {
        this.setAttribute("value", val);
    }
    /**
     * Devuelve un array con los valores seleccionados
     */
    get selectedItems() {
        if (!this.value)
            return [];
        return this.value.split(",").filter(Boolean);
    }
}
customElements.define("checkbox-list", CheckboxList);
// Uso desde fuera:
// ```html
// <checkbox-list></checkbox-list>
// <script>
//     document.querySelector("checkbox-list")?.addEventListener("change", e => {
//         console.log("Seleccionados:", e.target.value);
//     });
// </script>
