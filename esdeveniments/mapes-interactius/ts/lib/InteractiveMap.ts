/**
 * Tipus per a cada zona del mapa (path amb id/name).
 */
interface MapZone {
    id: string;
    name: string;
  }
  
  /**
   * Component web que mostra un mapa SVG interactiu: es llegeixen les zones
   * del mapa (elements amb id/name), es creen DIVs arrossegables i es validen
   * les deixades sobre les zones correctes.
   */
  export class InteractiveMap extends HTMLElement {
    /** Ruta a l'arxiu SVG del mapa (atribut del component). */
    private mapSrc: string = "";
    /** Zones extretes del SVG (path amb id i name). */
    private zones: MapZone[] = [];
    /** Referència al contenidor del SVG (per inserir el mapa carregat). */
    private mapContainer: HTMLElement | null = null;
    /** Referència al contenidor de les etiquetes (DIVs arrossegables). */
    private labelsContainer: HTMLElement | null = null;
    /** SVG carregat com a document (per poder consultar i clonar). */
    private svgDoc: Document | null = null;
    /** Comptador de deixades incorrectes per zona (zoneId -> nombre de fallos). */
    private wrongDropsByZone: Map<string, number> = new Map();

    constructor() {
      super();
    }
  
    connectedCallback() {
      this.mapSrc = this.getAttribute("map-src") ?? "";
      this.render();
      this.attachListeners();
      if (this.mapSrc) this.loadMap();
    }
  
    disconnectedCallback() {
      this.removeListeners();
    }
  
    /**
     * Crea l’estructura HTML del component: zona d’etiquetes + zona del mapa.
     */
    private render() {
      this.innerHTML = `
        <div class="interactive-map__layout">
          <aside class="interactive-map__labels" aria-label="Etiquetes per col·locar">
            <div class="interactive-map__labels-inner"></div>
          </aside>
          <div class="interactive-map__map" role="img" aria-label="Mapa"></div>
        </div>
        <div class="interactive-map__message" role="status" aria-live="polite"></div>
      `;
      this.labelsContainer = this.querySelector(".interactive-map__labels-inner");
      this.mapContainer = this.querySelector(".interactive-map__map");
    }
  
    /**
     * Carrega l’SVG des de mapSrc, extreu les zones (id/name) i afegeix
     * el mapa i els DIVs al DOM.
     */
    private async loadMap() {
      try {
        const res = await fetch(this.mapSrc);
        const text = await res.text();
        this.loadMapFromContent(text);
      } catch (e) {
        if (this.mapContainer) {
          this.mapContainer.textContent = "No s'ha pogut carregar el mapa.";
        }
      }
    }

    /**
     * Carrega un mapa a partir del contingut SVG en format text.
     * Permet que l'usuari trii un arxiu .svg i el component el mostri.
     * Es pot cridar des de fora (p. ex. des del gestor d'un input type="file").
     */
    loadMapFromContent(svgText: string): void {
      if (!this.mapContainer || !this.labelsContainer) return;
      const cleanText = (svgText ?? "").replace(/^\uFEFF/, "");
      this.removeListeners();
      this.mapContainer.innerHTML = "";
      this.labelsContainer.innerHTML = "";
      this.zones = [];
      this.wrongDropsByZone = new Map();
      this.svgDoc = null;
      const parser = new DOMParser();
      this.svgDoc = parser.parseFromString(cleanText, "image/svg+xml");
      const svgEl = this.svgDoc.querySelector("svg");
      if (!svgEl) {
        this.mapContainer.textContent = "L'arxiu no sembla un SVG vàlid.";
        return;
      }
      this.zones = this.extractZones(this.svgDoc);
      this.insertMap();
      this.createLabelDivs();
    }

    /**
     * Recorre l’SVG i retorna un array amb { id, name } de cada element
     * que tingui id o name (típicament <path> en mapes). Només es consideren
     * fills del mapa (p. ex. path), no l’arrel svg.
     */
    private extractZones(doc: Document): MapZone[] {
      const zones: MapZone[] = [];
      const elements = doc.querySelectorAll("svg [id], svg [name]");
      elements.forEach((el) => {
        if (el.tagName === "svg") return;
        const id = el.getAttribute("id");
        const name = el.getAttribute("name");
        const label = (name || id || "").trim();
        if (!label) return;
        zones.push({
          id: (id || name || "").trim(),
          name: (name || id || "").trim(),
        });
      });
      return zones;
    }
  
    /**
     * Insereix una còpia de l’SVG dins del contenidor del mapa per poder
     * afegir listeners i estils als paths.
     */
    private insertMap() {
      if (!this.svgDoc || !this.mapContainer) return;
      const svg = this.svgDoc.querySelector("svg");
      if (!svg) return;
      const clone = svg.cloneNode(true) as SVGElement;
      clone.classList.add("interactive-map__svg");
      this.mapContainer.appendChild(clone);
      this.makeZonesDropTargets(clone);
    }
  
    /**
     * Crea un DIV per a cada zona i l’afegeix al contenidor d’etiquetes.
     * Cada DIV és arrossegable i duu el nom (o id) de la zona.
     */
    private createLabelDivs() {
      if (!this.labelsContainer) return;
      this.zones.forEach((zone) => {
        const div = document.createElement("div");
        div.className = "interactive-map__label";
        div.draggable = true;
        div.textContent = zone.name;
        div.dataset.zoneId = zone.id;
        div.setAttribute("role", "button");
        div.setAttribute("tabindex", "0");
        this.labelsContainer!.appendChild(div);
      });
    }
  
    /**
     * Afegeix als elements del SVG que tenen id o name els esdeveniments de drag
     * (dragover, dragenter, dragleave, drop) per permetre deixar els DIVs i
     * ressaltar la zona.
     */
    private makeZonesDropTargets(svg: SVGElement) {
      const elements = svg.querySelectorAll("[id], [name]");
      elements.forEach((path) => {
        const el = path as SVGElement;
        if (el === svg) return;
        el.classList.add("interactive-map__zone");
        el.setAttribute("data-drop-zone", "true");
  
        el.addEventListener("dragenter", this.onZoneDragEnter);
        el.addEventListener("dragover", this.onZoneDragOver);
        el.addEventListener("dragleave", this.onZoneDragLeave);
        el.addEventListener("drop", this.onZoneDrop);
      });
    }
  
    private attachListeners() {
      this.addEventListener("dragstart", this.onLabelDragStart);
      this.addEventListener("dragend", this.onLabelDragEnd);
    }
  
    private removeListeners() {
      this.removeEventListener("dragstart", this.onLabelDragStart);
      this.removeEventListener("dragend", this.onLabelDragEnd);
      if (!this.mapContainer) return;
      const paths = this.mapContainer.querySelectorAll(".interactive-map__zone");
      paths.forEach((path) => {
        path.removeEventListener("dragenter", this.onZoneDragEnter as EventListener);
        path.removeEventListener("dragover", this.onZoneDragOver as EventListener);
        path.removeEventListener("dragleave", this.onZoneDragLeave as EventListener);
        path.removeEventListener("drop", this.onZoneDrop as EventListener);
      });
    }
  
    private onLabelDragStart = (e: DragEvent) => {
      const label = (e.target as HTMLElement).closest(".interactive-map__label");
      if (!label) return;
      const zoneId = (label as HTMLElement).dataset.zoneId;
      if (!zoneId) return;
      e.dataTransfer!.setData("text/plain", zoneId);
      e.dataTransfer!.effectAllowed = "move";
      label.classList.add("interactive-map__label--dragging");
    };
  
    private onLabelDragEnd = (e: DragEvent) => {
      const label = (e.target as HTMLElement).closest(".interactive-map__label");
      if (label) label.classList.remove("interactive-map__label--dragging");
      this.clearZoneHighlights();
    };
  
    private onZoneDragEnter = (e: DragEvent) => {
      e.preventDefault();
      (e.currentTarget as SVGElement).classList.add("interactive-map__zone--over");
    };
  
    private onZoneDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    };
  
    private onZoneDragLeave = (e: DragEvent) => {
      (e.currentTarget as SVGElement).classList.remove("interactive-map__zone--over");
    };
  
    /** Normalitza un id per comparar (trim + unifica apòstrofs). */
    private normalizeZoneId(s: string): string {
      return (s ?? "")
        .trim()
        .replace(/\u2019/g, "'")  // cometa tipogràfica → apòstrof ASCII
        .replace(/&apos;/g, "'");
    }

    private onZoneDrop = (e: DragEvent) => {
      e.preventDefault();
      const zone = e.currentTarget as SVGElement;
      zone.classList.remove("interactive-map__zone--over");

      const zoneId = this.normalizeZoneId(zone.getAttribute("id") || zone.getAttribute("name") || "");
      const draggingLabel = this.querySelector(".interactive-map__label--dragging") as HTMLElement | null;
      const draggedId = this.normalizeZoneId(
        (draggingLabel?.dataset.zoneId ?? e.dataTransfer?.getData("text/plain") ?? "")
      );
      const zoneName = (zone.getAttribute("name") || zone.getAttribute("id") || zoneId).trim();

      if (zoneId !== draggedId) {
        const count = (this.wrongDropsByZone.get(zoneId) ?? 0) + 1;
        this.wrongDropsByZone.set(zoneId, count);
        if (count >= 3) {
          zone.style.fill = "#c62828";
          zone.style.filter = "brightness(0.95)";
          this.showWrongZoneReveal(zoneName);
          const labelToRemove = Array.from(this.querySelectorAll(".interactive-map__label")).find(
            (el) => this.normalizeZoneId((el as HTMLElement).dataset.zoneId ?? "") === zoneId
          );
          if (labelToRemove) labelToRemove.remove();
          this.checkAllDone();
        }
        return;
      }

      const label = Array.from(this.querySelectorAll(".interactive-map__label")).find(
        (el) => this.normalizeZoneId((el as HTMLElement).dataset.zoneId ?? "") === draggedId
      );
      if (label) {
        label.remove();
        zone.style.fill = "#4caf50";
        zone.style.filter = "brightness(1.05)";
        this.showCongratulations();
        this.checkAllDone();
      }
    };
  
    private clearZoneHighlights() {
      this.querySelectorAll(".interactive-map__zone--over").forEach((el) => {
        el.classList.remove("interactive-map__zone--over");
      });
    }
  
    private showCongratulations() {
      const msg = this.querySelector(".interactive-map__message");
      if (!msg) return;
      msg.textContent = "Molt bé!";
      msg.classList.add("interactive-map__message--visible");
      setTimeout(() => {
        msg.textContent = "";
        msg.classList.remove("interactive-map__message--visible");
      }, 1500);
    }

    private showWrongZoneReveal(zoneName: string) {
      const msg = this.querySelector(".interactive-map__message");
      if (!msg) return;
      msg.textContent = `Era: ${zoneName}`;
      msg.classList.add("interactive-map__message--visible");
      setTimeout(() => {
        msg.textContent = "";
        msg.classList.remove("interactive-map__message--visible");
      }, 2500);
    }
  
    private checkAllDone() {
      const remaining = this.querySelectorAll(".interactive-map__label");
      if (remaining.length === 0) {
        const msg = this.querySelector(".interactive-map__message");
        if (msg) {
          msg.textContent = "Enhorabona! Has completat el mapa.";
          msg.classList.add("interactive-map__message--visible", "interactive-map__message--success");
        }
      }
    }
  }
  
  customElements.define("interactive-map", InteractiveMap);
  