# Guardar i carregar arxius amb JavaScript

Aquesta documentació recull la teoria i els patrons per guardar i carregar arxius en aplicacions web, per utilitzar-los en el projecte de mapes interactius.

---

## Guardar un arxiu de text

Amb JavaScript es poden generar arxius (imatges, documents...) i oferir la possibilitat de descarregar-los.

Un mètode senzill per descarregar un arxiu de tipus text seria el següent:

```javascript
// filename: nom de l'arxiu que es descarregarà
// text: text que es guardarà en l'arxiu
function download(filename, text) {
    // Crear un objecte similar a un arxiu format per bytes
    const file = new Blob([text], {type: 'text/plain'});

    // Crear un link "fantasma" (no s'afegirà realment al document)
    const a = document.createElement('a');

    // Crear una URL que representa l'arxiu a descarregar
    a.href = URL.createObjectURL(file);
    // Indicar el nom de l'arxiu que es descarregarà
    a.download = filename;
    // Simular un clic sobre l'enllaç
    a.click();
    // Eliminar el link "fantasma"
    URL.revokeObjectURL(a.href);
}
```

Després, només cal associar un gestor per l'esdeveniment `click` a un objecte (botó, imatge...) i cridar des d'aquest gestor a `download` passant-li el nom de l'arxiu i el text que es vol guardar en l'arxiu:

```javascript
document.getElementById("descarregar").addEventListener("click", function(){
    download("arxiu.txt", "Hello World!");
});
```

Buscant per Internet es poden trobar llibreries per generar documents de tot tipus, per exemple fulls de càlcul a partir d'una taula HTML, documents de text a partir del contingut d'una web...

---

## Guardar una imatge

Si es vol guardar una imatge generada (per exemple, un dibuix que ha fet l'usuari), el mètode és molt semblant, però cal agafar les dades del `<canvas>` i convertir la imatge a base64 per crear una URL:

```javascript
// filename: nom de l'arxiu que es descarregarà
// canvas: canvas on està la imatge
function download(filename, canvas) {
    // Crear un link "fantasma" (no s'afegirà realment al document)
    const a = document.createElement('a');

    // Posar com a URL la imatge del canvas en format base64 (.95 és la qualitat)
    a.href = canvas.toDataURL('image/jpeg', .95);
    // Indicar el nom de l'arxiu que es descarregarà
    a.download = filename;
    // Simular un clic sobre l'enllaç
    a.click();
    // Eliminar el link "fantasma"
    URL.revokeObjectURL(a.href);
}
```

---

## Carregar arxius utilitzant `<input type="file">`

Aquest element mostra un botó genèric amb un text indicant l'arxiu o arxius seleccionats:

```html
<input type="file" id="files" />
```

Per poder seleccionar més d'un arxiu cal afegir l'atribut `multiple` a l'etiqueta:

```html
<input type="file" id="files" multiple />
```

També es pot afegir l'atribut `accept` per triar quins tipus d'arxius es poden seleccionar:

```html
<input type="file" id="files" accept="image/*, .txt" />
```

Per millorar l'aspecte es poden utilitzar llibreries o amagar-lo i crear un botó o imatge lligat a aquest element utilitzant una etiqueta `<label>`:

```html
<input type="file" id="files" hidden />
<button><label for="files">Selecciona arxiu</label></button>

<input type="file" id="files" hidden />
<label for="files"><img src="load.svg"></label>
```

### Gestionar els arxius seleccionats

Quan s'ha seleccionat un arxiu, es genera l'esdeveniment `change` per l'element `input`, per tant s'ha de crear un gestor per processar l'arxiu seleccionat.

Aquest gestor es pot associar dins del codi HTML o, preferiblement, dins del mateix script:

```html
<input type="file" id="files" onchange="handleFileSelect(event)" />
```

```javascript
document.getElementById("files").addEventListener("change", handleFileSelect);
```

L'objectiu de l'esdeveniment (`event.target`) conté la propietat `files`, que és un array amb les dades de cada arxiu seleccionat.

En el gestor es poden comprovar els arxius seleccionats: el tipus, la mida... i llegir l'arxiu.

Per poder llegir un arxiu cal utilitzar un objecte de tipus **FileReader**.

Els objectes d'aquest tipus tenen mètodes per llegir diferents tipus d'arxius: `readAsText()`, `readAsDataURL()`...

```javascript
// Objecte per llegir arxius
let reader = new FileReader();

// Gestor de <input type="file"> per l'esdeveniment 'change'
function handleFileSelect(evt) {
    let files = evt.target.files;
    // Comprovacions (tipus d'arxiu, mida...)
    // ...
    // OPCIÓ A: llegir arxiu de tipus text (.txt, .svg, .json, ...)
    reader.readAsText(files[0]);
    // OPCIÓ B: llegir URL de l'arxiu (.jpg, .png, ...)
    reader.readAsDataURL(files[0]);

    input.value = ""; // Permetrà tornar a carregar el mateix arxiu
}
```

### Carregar els arxius i afegir-los al document

Per detectar quan s'ha acabat de carregar un arxiu, es sobrecarrega la propietat **onload** (esdeveniment `load`) amb una funció que afegeixi el text o la imatge al document.

L'objectiu de l'esdeveniment (`event.target`) conté la propietat **result**, que conté l'arxiu en format text o la URL, depenent de la funció utilitzada per llegir-lo.

- Si s'ha llegit un arxiu de text (per exemple una imatge SVG), es pot afegir directament dins d'un element.
- Si s'ha llegit la URL, es pot afegir en un element tipus `<img>` utilitzant l'atribut `src`, per exemple.

```javascript
// Processar i/o mostrar l'arxiu quan s'hagi carregat
reader.onload = function(evt) {
    let mapa = document.getElementById("mapa");
    // OPCIÓ A: afegir contingut tipus text dins d'un element del document
    mapa.innerHTML = evt.target.result;
    // OPCIÓ B: crear un element <img> amb la URL obtinguda i afegir-la al document
    let img = document.createElement("img");
    img.src = evt.target.result;
    mapa.appendChild(img);
};
```

Els objectes de tipus FileReader també tenen esdeveniments per indicar quan s'inicia la descàrrega (`loadstart`), quan finalitza, encara que sigui amb un error (`loadend`) i per indicar el progrés (`progress`).

Sovint, tot aquest codi es junta definint els gestors com a funcions anònimes, però potser queda un codi massa llarg i no es veu tant clar.

---

## Carregar arxius utilitzant Drag & Drop

En aquest cas, cal crear un element sobre el qual deixar anar els arxius que s'arrosseguen.

Aquest element ha de capturar els esdeveniments **dragover** i **drop**.

- En el gestor de **dragover** només s'ha d'evitar que es realitzi l'acció per defecte.
- En el gestor de **drop** també s'ha d'evitar l'acció per defecte i és on es gestiona la càrrega dels arxius.

Els arxius es troben en l'array **`event.dataTransfer.files`** de l'esdeveniment (quan es feia amb un objecte `input`, els arxius es trobaven en l'array `files` de l'objecte `event.target`).

A partir d'aquí, tot funciona igual:

1. Fer les comprovacions de tipus i mida de l'arxiu.
2. Llegir l'arxiu utilitzant un objecte de tipus **FileReader**.
3. Esperar que es carregui i ficar-lo dins del document o processar-lo, si cal.

---

## Component o mòdul per guardar/carregar?

**Recomanació: crear un mòdul d’utilitats (no un component visual).**

- **Mòdul (FileIO / fileUtils)**: convé tenir la lògica de guardar i carregar en un sol lloc:
  - **Reutilitzable**: el mateix `downloadText`, `readFileAsText`, etc. es poden usar des del mapa, des de la barra d’eines o des d’un futur panell d’opcions.
  - **Responsabilitat única**: el `InteractiveMap` (o altres components) no es carreguen de Blob, FileReader, URL.revokeObjectURL...
  - **Fàcil de provar i mantenir**: canvis de validació, tipus MIME o missatges d’error en un sol fitxer.
- **Component visual**: no cal un custom element només per “guardar/carregar”. Els botons i l’`<input type="file">` poden estar al HTML o dins del propi `InteractiveMap`; el que criden són les funcions del mòdul.

En resum: **sí és bo agrupar-ho**, però com a **mòdul de funcions** (o objecte amb mètodes), no com a component de la interfície. El projecte inclou `ts/lib/FileIO.ts` amb aquesta idea.

---

## Lògica “l’usuari tria el mapa” (pas a pas)

Flux implementat al projecte: l’usuari escull un arxiu SVG i `InteractiveMap` el mostra.

1. **HTML**  
   - Afegir un `<input type="file" id="map-file" accept=".svg,image/svg+xml" hidden>`.  
   - Un `<label for="map-file">Tria un mapa (SVG)</label>` obre el selector d’arxius en fer clic.

2. **InteractiveMap**  
   - Mètode públic `loadMapFromContent(svgText: string)`: rep el contingut SVG en text, neteja el mapa actual (zones, etiquetes, listeners), fa el parse amb `DOMParser`, extreu les zones, insereix l’SVG i crea les etiquetes arrossegables.  
   - Així el component pot mostrar tant un mapa carregat per URL (`map-src`) com un mapa carregat des d’un arxiu triat per l’usuari.

3. **Script (punt d’entrada)**  
   - Obtenir referències a l’`#map-file` i a `<interactive-map>`.  
   - En l’esdeveniment `change` de l’input, cridar `handleFileSelectAsText(evt, callback)` del mòdul FileIO.  
   - En el callback, rebre el text de l’arxiu i cridar `mapComponent.loadMapFromContent(svgText)`.

4. **Resum del flux**  
   - L’usuari fa clic a “Tria un mapa” → s’obre el diàleg d’arxius.  
   - Triar un .svg → es dispara `change` → FileIO llegeix l’arxiu com a text → el script rep el text i crida `loadMapFromContent(svgText)` → el component neteja, parseja i mostra el nou mapa.

---

## Resum per al projecte de mapes interactius

- **Descarregar text**: `Blob` + `URL.createObjectURL()` + `<a download>` + `click()`.
- **Descarregar imatge de canvas**: `canvas.toDataURL()` + `<a download>` + `click()`.
- **Carregar arxius**: `<input type="file">` o zona Drag & Drop → esdeveniment `change` / `drop` → `FileReader.readAsText()` o `readAsDataURL()` → gestor `onload` amb `evt.target.result`.
