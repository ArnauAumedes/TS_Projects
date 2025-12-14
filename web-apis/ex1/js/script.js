"use strict";
// Fullscreen API demo: canvia icona i mode pantalla completa
document.addEventListener('DOMContentLoaded', () => {
    const botoFS = document.getElementById('botoFS');
    const iconEnter = document.getElementById('icon-enter');
    const iconExit = document.getElementById('icon-exit');
    if (!botoFS || !iconEnter || !iconExit)
        return;
    function updateIcons() {
        if (document.fullscreenElement) {
            iconEnter.style.display = 'none';
            iconExit.style.display = '';
            botoFS.setAttribute('aria-label', 'Sortir de pantalla completa');
            botoFS.setAttribute('title', 'Sortir de pantalla completa');
        }
        else {
            iconEnter.style.display = '';
            iconExit.style.display = 'none';
            botoFS.setAttribute('aria-label', 'Entrar a pantalla completa');
            botoFS.setAttribute('title', 'Pantalla completa');
        }
    }
    function fsSwap() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            document.documentElement.requestFullscreen();
        }
    }
    if (document.fullscreenEnabled) {
        botoFS.addEventListener('click', fsSwap);
        document.addEventListener('fullscreenchange', updateIcons);
        // Inicialitza icona segons estat
        updateIcons();
    }
    else {
        botoFS.disabled = true;
        botoFS.title = 'El mode pantalla completa no està disponible en aquest navegador';
    }
});
