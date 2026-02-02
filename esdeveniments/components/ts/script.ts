import "./lib/ButtonSwitch.js";
import "./lib/CheckboxList.js";
import "./lib/ExpandableList.js";
import "./lib/PercentStepper.js";
import "./lib/SelectList.js";
import "./lib/SortableList.js";
import "./lib/TabList.js";

import type { TabList } from "./lib/TabList.js";
import type { SortableList } from "./lib/SortableList.js";
import type { SelectList } from "./lib/SelectList.js";
import type { PercentStepper } from "./lib/PercentStepper.js";
import type { ButtonSwitch } from "./lib/ButtonSwitch.js";
import type { CheckboxList } from "./lib/CheckboxList.js";
import type { ExpandableList } from "./lib/ExpandableList.js";

// Lógica para ButtonSwitch
document.addEventListener("DOMContentLoaded", () => {
  const sw = document.getElementById("sw") as ButtonSwitch;
  const state = document.getElementById("switch-state");
  function updateState() {
    state!.textContent = sw.checked ? "Encès" : "Apagat";
  }
  sw.addEventListener("change", updateState);
  updateState();
});

// Lógica para CheckboxList
document.addEventListener("DOMContentLoaded", () => {
  const sw = document.getElementById("sw") as ButtonSwitch;
  const state = document.getElementById("switch-state");
  function updateState() {
    state!.textContent = sw.checked ? "Encès" : "Apagat";
  }
  sw.addEventListener("change", updateState);
  updateState();

  // Usar el checkbox-list ya presente en el HTML
  const cbList = document.getElementById("cb-list") as CheckboxList;
  cbList.items = ["Opció 1", "Opció 2", "Opció 3"];

  let cbState = cbList.querySelector("#cb-state") as HTMLSpanElement;
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
  const expList = document.getElementById("exp-list") as ExpandableList;
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
  const ps = document.getElementById("ps") as PercentStepper;
  const psValue = document.getElementById("ps-value");

  function updatePsValue() {
    psValue!.textContent = `Valor: ${ps.value}%`;
  }

  ps.addEventListener("change", updatePsValue);
  updatePsValue();
});
// Lógica para SelectList Simple
document.addEventListener("DOMContentLoaded", () => {
  const slSimple = document.getElementById("sl-simple") as SelectList;
  const slSimpleValue = document.getElementById("sl-simple-value");

  function updateSlSimpleValue() {
    slSimpleValue!.textContent = `Seleccionat: ${slSimple.value}`;
  }

  slSimple.addEventListener("change", updateSlSimpleValue);
  updateSlSimpleValue();
});

// Lógica para SelectList Múltiple
document.addEventListener("DOMContentLoaded", () => {
  const slMultiple = document.getElementById("sl-multiple") as SelectList;
  const slMultipleValue = document.getElementById("sl-multiple-value");

  function updateSlMultipleValue() {
    slMultipleValue!.textContent = slMultiple.value
      ? `Seleccionats: ${slMultiple.value.split(",").join(", ")}`
      : "Cap seleccionat";
  }

  slMultiple.addEventListener("change", updateSlMultipleValue);
  updateSlMultipleValue();
});
// Lógica para SortableList
document.addEventListener("DOMContentLoaded", () => {
  const sortable = document.getElementById("sortable") as SortableList;
  const sortableValues = document.getElementById("sortable-values");

  function updateSortableValues() {
    sortableValues!.textContent = `Ordre: ${sortable.values.join(", ")}`;
  }

  sortable.addEventListener("change", updateSortableValues);
  updateSortableValues();
});

// Lógica para TabList
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.getElementById("tabs") as TabList;
    const tabActive = document.getElementById("tab-active");

    function updateTabActive() {
        tabActive!.textContent = `Activa: ${tabs.active}`;
        if (!tabs.active) {
            tabActive!.textContent = `Activa: cap`;
        }
    }

    tabs.addEventListener("change", updateTabActive);
    updateTabActive();
});