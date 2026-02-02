export class SortableList extends HTMLElement {
    constructor() {
        super();
        this.draggedItem = null;
        this.onDragStart = (e) => {
            var _a;
            const target = e.target;
            if (target.tagName !== "LI")
                return;
            this.draggedItem = target;
            target.setAttribute("aria-grabbed", "true");
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", "");
        };
        this.onDragOver = (e) => {
            e.preventDefault();
        };
        this.onDrop = (e) => {
            e.preventDefault();
            const target = e.target.closest("li");
            if (!target || !this.draggedItem || target === this.draggedItem)
                return;
            const list = target.parentElement;
            if (!list)
                return;
            const items = Array.from(list.children);
            const targetIndex = items.indexOf(target);
            const draggedIndex = items.indexOf(this.draggedItem);
            if (draggedIndex < targetIndex) {
                list.insertBefore(this.draggedItem, target.nextSibling);
            }
            else {
                list.insertBefore(this.draggedItem, target);
            }
            this.cleanupDragState();
            this.emitChange();
        };
        this.onKeyDown = (e) => {
            const item = e.target;
            if (item.tagName !== "LI")
                return;
            const list = item.parentElement;
            if (!list)
                return;
            if (e.key === "ArrowUp") {
                e.preventDefault();
                const prev = item.previousElementSibling;
                if (prev)
                    list.insertBefore(item, prev);
                this.emitChange();
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = item.nextElementSibling;
                if (next)
                    list.insertBefore(next, item);
                this.emitChange();
            }
        };
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
    render() {
        this.querySelectorAll("li").forEach(li => {
            li.setAttribute("role", "listitem");
            li.setAttribute("tabindex", "0");
            li.setAttribute("draggable", "true");
            li.setAttribute("aria-grabbed", "false");
        });
    }
    cleanupDragState() {
        this.querySelectorAll("li").forEach(li => {
            li.setAttribute("aria-grabbed", "false");
        });
        this.draggedItem = null;
    }
    updateAria() {
        this.setAttribute("aria-dropeffect", "move");
    }
    emitChange() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    get values() {
        return Array.from(this.querySelectorAll("li")).map(li => { var _a; return ((_a = li.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
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
