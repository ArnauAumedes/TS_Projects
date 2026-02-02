    export class SortableList extends HTMLElement {

    private draggedItem: HTMLElement | null = null;

    constructor() {
        super();
        this.setAttribute("role", "list");
    }

    connectedCallback() {
        this.render();
        this.updateAria();

        this.addEventListener("dragstart", this.onDragStart);
        this.addEventListener("dragover", this.onDragOver);
        this.addEventListener("drop", this.onDrop);
        this.addEventListener("keydown", this.onKeyDown);
    }

    disconnectedCallback() {
        this.removeEventListener("dragstart", this.onDragStart);
        this.removeEventListener("dragover", this.onDragOver);
        this.removeEventListener("drop", this.onDrop);
        this.removeEventListener("keydown", this.onKeyDown);
    }

    private render() {
        this.querySelectorAll("li").forEach(li => {
            li.setAttribute("role", "listitem");
            li.setAttribute("tabindex", "0");
            li.setAttribute("draggable", "true");
            li.setAttribute("aria-grabbed", "false");
        });
    }

    private onDragStart = (e: DragEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "LI") return;

        this.draggedItem = target;
        target.setAttribute("aria-grabbed", "true");
        e.dataTransfer?.setData("text/plain", "");
    };

    private onDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    private onDrop = (e: DragEvent) => {
        e.preventDefault();

        const target = (e.target as HTMLElement).closest("li") as HTMLElement;
        if (!target || !this.draggedItem || target === this.draggedItem) return;

        const list = target.parentElement;
        if (!list) return;

        const items = Array.from(list.children);
        const targetIndex = items.indexOf(target);
        const draggedIndex = items.indexOf(this.draggedItem);

        if (draggedIndex < targetIndex) {
            list.insertBefore(this.draggedItem, target.nextSibling);
        } else {
            list.insertBefore(this.draggedItem, target);
        }

        this.cleanupDragState();
        this.emitChange();
    };

    private onKeyDown = (e: KeyboardEvent) => {
        const item = e.target as HTMLElement;
        if (item.tagName !== "LI") return;

        const list = item.parentElement;
        if (!list) return;

        if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = item.previousElementSibling;
            if (prev) list.insertBefore(item, prev);
            this.emitChange();
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = item.nextElementSibling;
            if (next) list.insertBefore(next, item);
            this.emitChange();
        }
    };

    private cleanupDragState() {
        this.querySelectorAll("li").forEach(li => {
            li.setAttribute("aria-grabbed", "false");
        });

        this.draggedItem = null;
    }

    private updateAria() {
        this.setAttribute("aria-dropeffect", "move");
    }

    private emitChange() {
        this.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

    get values(): string[] {
        return Array.from(this.querySelectorAll("li")).map(li => li.textContent?.trim() || "");
    }
}

customElements.define("sortable-list", SortableList);

// Uso desde fuera:
// ```html
// <sortable-list>
//     <ul>
//         <li draggable="true">Element A</li>
//         <li draggable="true">Element B</li>
//         <li draggable="true">Element C</li>
//     </ul>
// </sortable-list>