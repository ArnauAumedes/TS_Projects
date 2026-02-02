export class ExpandableList extends HTMLElement {

    constructor() {
        super();
        this.setAttribute("role", "list");
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
        return ["open"];
    }

    attributeChangedCallback() {
        this.updateAria();
    }

    private render() {
        this.querySelectorAll("section").forEach(section => {
            const header = section.querySelector("header");
            const content = section.querySelector("div");

            if (!header || !content) return;

            header.setAttribute("role", "button");
            header.setAttribute("tabindex", "0");
            header.setAttribute("aria-expanded", "false");

            content.hidden = true;
        });
    }

    private onClick = (e: MouseEvent) => {
        const header = (e.target as HTMLElement).closest("header");
        if (!header) return;

        this.toggleSection(header);
    };

    private onKeyDown = (e: KeyboardEvent) => {
        const header = e.target as HTMLElement;
        if (header.tagName !== "HEADER") return;

        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            this.toggleSection(header);
        }
    };

    private toggleSection(header: HTMLElement) {
        const section = header.closest("section");
        if (!section) return;

        const content = section.querySelector("div");
        const expanded = header.getAttribute("aria-expanded") === "true";

        header.setAttribute("aria-expanded", String(!expanded));
        if (content) content.hidden = expanded;

        this.emitChange();
    }

    private updateAria() {
        this.querySelectorAll("header").forEach(header => {
            const section = header.closest("section");
            const content = section?.querySelector("div");

            if (!content) return;

            const expanded = !content.hidden;
            header.setAttribute("aria-expanded", String(expanded));
        });
    }

    private emitChange() {
        this.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }
}

customElements.define("expandable-list", ExpandableList);

// Uso desde fuera:
// ```html
// <expandable-list>
//     <section>
//         <header>Secció 1</header>
//         <div>
//             <p>Subelement A</p>
//             <p>Subelement B</p>
//         </div>
//     </section>

//     <section>
//         <header>Secció 2</header>
//         <div>
//             <p>Subelement C</p>
//         </div>
//     </section>
// </expandable-list>