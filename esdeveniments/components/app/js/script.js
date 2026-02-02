import "./lib/ButtonSwitch.js";
import "./lib/CheckboxList.js";
import "./lib/ExpandableList.js";
import "./lib/PercentStepper.js";
import "./lib/SelectList.js";
import "./lib/SortableList.js";
import "./lib/TabList.js";
// Lógica para ButtonSwitch
document.addEventListener("DOMContentLoaded", () => {
    const sw = document.getElementById("sw");
    const state = document.getElementById("switch-state");
    function updateState() {
        state.textContent = sw.checked ? "Encès" : "Apagat";
    }
    sw.addEventListener("change", updateState);
    updateState();
});
// Lógica para CheckboxList
document.addEventListener("DOMContentLoaded", () => {
    const sw = document.getElementById("sw");
    const state = document.getElementById("switch-state");
    function updateState() {
        state.textContent = sw.checked ? "Encès" : "Apagat";
    }
    sw.addEventListener("change", updateState);
    updateState();
    // Usar el checkbox-list ya presente en el HTML
    const cbList = document.getElementById("cb-list");
    cbList.items = ["Opció 1", "Opció 2", "Opció 3"];
    let cbState = cbList.querySelector("#cb-state");
    if (!cbState) {
        cbState = document.createElement("span");
        cbState.id = "cb-state";
        cbList.appendChild(cbState);
    }
    function updateCbState() {
        const selectedItems = cbList.selectedItems || [];
        cbState.textContent =
            selectedItems.length > 0
                ? `Seleccionats: ${selectedItems.join(", ")}`
                : "Cap seleccionat";
    }
    cbList.addEventListener("change", updateCbState);
    updateCbState();
});
// Lógica para ExpandableList
document.addEventListener("DOMContentLoaded", () => {
    const expList = document.getElementById("exp-list");
    expList.innerHTML = `
        <section>
            <header>Secció 1</header>
            <div>
                <p>Subelement A</p>
                <p>Subelement B</p>
            </div>
        </section>
        <section>
            <header>Secció 2</header>
            <div>
                <p>Subelement C</p>
            </div>
        </section>
    `;
});
// Lógica para PercentStepper
document.addEventListener("DOMContentLoaded", () => {
    const ps = document.getElementById("ps");
    const psValue = document.getElementById("ps-value");
    function updatePsValue() {
        psValue.textContent = `Valor: ${ps.value}%`;
    }
    ps.addEventListener("change", updatePsValue);
    updatePsValue();
});
// Lógica para SelectList Simple
document.addEventListener("DOMContentLoaded", () => {
    const slSimple = document.getElementById("sl-simple");
    const slSimpleValue = document.getElementById("sl-simple-value");
    function updateSlSimpleValue() {
        slSimpleValue.textContent = `Seleccionat: ${slSimple.value}`;
    }
    slSimple.addEventListener("change", updateSlSimpleValue);
    updateSlSimpleValue();
});
// Lógica para SelectList Múltiple
document.addEventListener("DOMContentLoaded", () => {
    const slMultiple = document.getElementById("sl-multiple");
    const slMultipleValue = document.getElementById("sl-multiple-value");
    function updateSlMultipleValue() {
        slMultipleValue.textContent = slMultiple.value
            ? `Seleccionats: ${slMultiple.value.split(",").join(", ")}`
            : "Cap seleccionat";
    }
    slMultiple.addEventListener("change", updateSlMultipleValue);
    updateSlMultipleValue();
});
// Lógica para SortableList
document.addEventListener("DOMContentLoaded", () => {
    const sortable = document.getElementById("sortable");
    const sortableValues = document.getElementById("sortable-values");
    function updateSortableValues() {
        sortableValues.textContent = `Ordre: ${sortable.values.join(", ")}`;
    }
    sortable.addEventListener("change", updateSortableValues);
    updateSortableValues();
});
// Lógica para TabList
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.getElementById("tabs");
    const tabActive = document.getElementById("tab-active");
    function updateTabActive() {
        tabActive.textContent = `Activa: ${tabs.active}`;
        if (!tabs.active) {
            tabActive.textContent = `Activa: cap`;
        }
    }
    tabs.addEventListener("change", updateTabActive);
    updateTabActive();
});
