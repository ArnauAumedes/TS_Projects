// Informació sobre la pantalla:
export function informacio(): string {
  const pantalla = window.screen;
  const navegador = window.navigator;
  const urlActual = window.location;

  const html = `
  <!DOCTYPE html>
  <html lang="ca">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <style>
      body, h1, h2, h3, h4, h5 {
        font-family: "Raleway", sans-serif;
      }
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body class="w3-light-grey">
  <div class="w3-content" style="max-width:1400px">
    <!-- Header -->
    <header class="w3-container w3-center w3-padding-32">
      <h1><b>INFORMACIÓ DEL SISTEMA</b></h1>
      <p>Detalls tècnics del <span class="w3-tag">navegador i URL</span></p>
    </header>

    <!-- Grid -->
    <div class="w3-row">
      <!-- Columna principal -->
      <div class="w3-col l8 s12">
        
        <!-- Detalls de la Pantalla -->
        <div class="w3-card-4 w3-margin w3-white">
          <div class="w3-container w3-blue">
            <h3><b>Detalls de la Pantalla</b></h3>
          </div>
          <div class="w3-container">
            <p><strong>Amplada de la pantalla:</strong> ${pantalla.width}px</p>
            <p><strong>Alçada de la pantalla:</strong> ${pantalla.height}px</p>
            <p><strong>Amplada disponible:</strong> ${pantalla.availWidth}px</p>
            <p><strong>Alçada disponible:</strong> ${pantalla.availHeight}px</p>
            <p><strong>Profunditat de color:</strong> ${pantalla.colorDepth} bits</p>
            <p><strong>Resolució de píxel:</strong> ${pantalla.pixelDepth} bits</p>
          </div>
        </div>

        <!-- Detalls del Navegador -->
        <div class="w3-card-4 w3-margin w3-white">
          <div class="w3-container w3-green">
            <h3><b>Detalls del Navegador</b></h3>
          </div>
          <div class="w3-container">
            <p><strong>Agent d'usuari:</strong> ${navegador.userAgent}</p>
            <p><strong>Idioma:</strong> ${navegador.language}</p>
            <p><strong>Plataforma:</strong> ${navegador.platform}</p>
            <p><strong>Cookies habilitades:</strong> ${navegador.cookieEnabled ? 'Sí' : 'No'}</p>
          </div>
        </div>

      </div>

      <!-- Sidebar -->
      <div class="w3-col l4">
        <!-- Informació de la URL -->
        <div class="w3-card w3-margin w3-margin-top">
          <div class="w3-container w3-padding w3-orange">
            <h4><b>Informació de la URL</b></h4>
          </div>
          <ul class="w3-ul w3-white">
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Hash:</strong></span><br>
              <span class="w3-text-grey">${urlActual.hash || '(buit)'}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Host:</strong></span><br>
              <span class="w3-text-grey">${urlActual.host || '(buit)'}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Hostname:</strong></span><br>
              <span class="w3-text-grey">${urlActual.hostname || '(buit)'}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Href:</strong></span><br>
              <span class="w3-text-grey w3-small">${urlActual.href}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Origin:</strong></span><br>
              <span class="w3-text-grey">${urlActual.origin}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Pathname:</strong></span><br>
              <span class="w3-text-grey">${urlActual.pathname}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Port:</strong></span><br>
              <span class="w3-text-grey">${urlActual.port || '(per defecte)'}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Protocol:</strong></span><br>
              <span class="w3-text-grey">${urlActual.protocol}</span>
            </li>
            <li class="w3-padding-8">
              <span class="w3-large"><strong>Search:</strong></span><br>
              <span class="w3-text-grey">${urlActual.search || '(buit)'}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
  </div>
  </body>
  </html>
  `;
  
  return html;
}

// Solo asigna al body si se carga directamente (para index.html)
// document.addEventListener("DOMContentLoaded", () => {
//   document.body.innerHTML = informacio();
// });
