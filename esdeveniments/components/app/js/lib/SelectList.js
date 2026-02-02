export class SelectList extends HTMLElement {
    constructor() {
        super();
        this.onClick = (e) => {
            const option = e.target.closest("li");
            if (!option)
                return;
            this.selectOption(option);
        };
        this.onKeyDown = (e) => {
            var _a, _b;
            const options = Array.from(this.querySelectorAll("li"));
            const current = document.activeElement;
            const index = options.indexOf(current);
            if (e.key === "ArrowDown") {
                e.preventDefault();
                (_a = options[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                (_b = options[index - 1]) === null || _b === void 0 ? void 0 : _b.focus();
            }
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                if ((current === null || current === void 0 ? void 0 : current.tagName) === "LI") {
                    this.selectOption(current);
                }
            }
        };
        this.setAttribute("role", "listbox");
        this.tabIndex = 0;
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
        return ["value", "multiple"];
    }
    attributeChangedCallback() {
        this.updateSelection();
        this.updateAria();
    }
    render() {
        this.querySelectorAll("li").forEach(li => {
            li.setAttribute("role", "option");
            li.setAttribute("tabindex", "-1");
            li.setAttribute("aria-selected", "false");
        });
        if (!this.hasAttribute("value")) {
            this.value = "";
        }
    }
    selectOption(option) {
        const value = option.dataset.value || "";
        if (this.multiple) {
            const selected = option.getAttribute("aria-selected") === "true";
            option.setAttribute("aria-selected", String(!selected));
        }
        else {
            this.querySelectorAll("li").forEach(li => li.setAttribute("aria-selected", "false"));
            option.setAttribute("aria-selected", "true");
        }
        this.updateValue();
        this.emitChange();
    }
    updateValue() {
        const values = [];
        this.querySelectorAll('[aria-selected="true"]').forEach(li => {
            if (li instanceof HTMLElement && li.dataset.value) {
                values.push(li.dataset.value);
            }
        });
        this.value = this.multiple ? values.join(",") : values[0] || "";
    }
    updateSelection() {
        const values = this.value ? this.value.split(",") : [];
        this.querySelectorAll("li").forEach(li => {
            const selected = values.includes(li.dataset.value || "");
            li.setAttribute("aria-selected", String(selected));
            li.tabIndex = selected ? 0 : -1;
        });
    }
    updateAria() {
        this.setAttribute("aria-multiselectable", String(this.multiple));
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
    get multiple() {
        return this.hasAttribute("multiple");
    }
}
customElements.define("select-list", SelectList);
// Uso desde fuera:
// - Simple
// ```html
// <select-list>
//     <ul>
//         <li data-value="a">Opció A</li>
//         <li data-value="b">Opció B</li>
//         <li data-value="c">Opció C</li>
//     </ul>
// </select-list>
// ```
// - Múltiple
// ```html
// <select-list multiple>
//     <ul>
//         <li data-value="a">Opció A</li>
//         <li data-value="b">Opció B</li>
//         <li data-value="c">Opció C</li>
//     </ul>
// </select-list>
