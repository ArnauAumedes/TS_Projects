export class TabList extends HTMLElement {
    constructor() {
        super();
        this.onClick = (e) => {
            const tab = e.target.closest('[role="tab"]');
            if (!tab)
                return;
            this.active = tab.dataset.tab || "";
            this.emitChange();
        };
        this.onKeyDown = (e) => {
            const tab = e.target;
            if (tab.getAttribute("role") !== "tab")
                return;
            const tabs = Array.from(this.querySelectorAll('[role="tab"]'));
            const index = tabs.indexOf(tab);
            let next;
            if (e.key === "ArrowRight")
                next = tabs[index + 1];
            if (e.key === "ArrowLeft")
                next = tabs[index - 1];
            if (next) {
                e.preventDefault();
                this.active = next.dataset.tab || "";
                next.focus();
                this.emitChange();
            }
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                this.active = tab.dataset.tab || "";
                this.emitChange();
            }
        };
    }
    connectedCallback() {
        this.render();
        this.updateTabs();
        this.addEventListener("click", this.onClick);
        this.addEventListener("keydown", this.onKeyDown);
    }
    disconnectedCallback() {
        this.removeEventListener("click", this.onClick);
        this.removeEventListener("keydown", this.onKeyDown);
    }
    static get observedAttributes() {
        return ["active"];
    }
    attributeChangedCallback() {
        this.updateTabs();
    }
    render() {
        const tabs = this.querySelectorAll('[role="tab"]');
        const panels = this.querySelectorAll('[role="tabpanel"]');
        tabs.forEach(tab => {
            tab.setAttribute("tabindex", "-1");
            tab.setAttribute("aria-selected", "false");
        });
        panels.forEach(panel => {
            panel.hidden = true;
        });
        // if (!this.hasAttribute("active") && tabs.length) {
        //     const first = tabs[0] as HTMLElement;
        //     this.active = first.dataset.tab || "";
        // }
    }
    updateTabs() {
        const active = this.active;
        this.querySelectorAll('[role="tab"]').forEach(tab => {
            const isActive = tab.getAttribute("data-tab") === active;
            tab.setAttribute("aria-selected", String(isActive));
            tab.setAttribute("tabindex", isActive ? "0" : "-1");
        });
        this.querySelectorAll('[role="tabpanel"]').forEach(panel => {
            panel.hidden = panel.getAttribute("data-tab") !== active;
        });
    }
    emitChange() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    get active() {
        return this.getAttribute("active") || "";
    }
    set active(value) {
        this.setAttribute("active", value);
    }
}
customElements.define("tab-list", TabList);
// Uso desde fuera:
// ```html
// <tab-list>
//     <div role="tablist">
//         <button role="tab" data-tab="general">General</button>
//         <button role="tab" data-tab="settings">Configuració</button>
//         <button role="tab" data-tab="about">Sobre</button>
//     </div>
//     <section role="tabpanel" data-tab="general">
//         Contingut General
//     </section>
//     <section role="tabpanel" data-tab="settings">
//         Contingut Configuració
//     </section>
//     <section role="tabpanel" data-tab="about">
//         Contingut Sobre
//     </section>
// </tab-list>
// ```
