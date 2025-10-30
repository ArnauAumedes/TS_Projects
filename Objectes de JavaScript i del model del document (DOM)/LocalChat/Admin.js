"use strict";
// Recollir les dades del html
const adminMessageInput = document.getElementById("adminMessage");
const sendAdminButton = document.getElementById("sendAdmin");
const adminStorageTextarea = document.getElementById("adminStorage");
const createUsersButton = document.getElementById("createUsers");
const closeUsersButton = document.getElementById("closeUsers");
const cleanChatButton = document.getElementById("cleanChat");
// Variable per mantenir la referència a la finestra de l'usuari
let userWindows = [null, null];
// Enviar missatge des de l'admin: actualitza admin, escriu al LocalStorage per notificar els altres
function fSendAdminMessage() {
    const message = adminMessageInput.value.trim();
    if (!message)
        return;
    const payload = { sender: "Admin", text: message, ts: Date.now() };
    const line = `[${new Date(payload.ts).toLocaleTimeString()}] ${payload.sender}: ${payload.text}\n`;
    // Mostrar al admin (prepend)
    adminStorageTextarea.value = line + adminStorageTextarea.value;
    adminMessageInput.value = "";
    adminStorageTextarea.selectionStart = 0;
    adminStorageTextarea.selectionEnd = 0;
    adminStorageTextarea.scrollTop = 0;
    // Escriure al LocalStorage perquè les finestres user rebin l'event storage
    try {
        localStorage.setItem("localchat_message", JSON.stringify(payload));
    }
    catch (err) {
        console.warn("No s'ha pogut escriure a localStorage:", err);
    }
    // IMPORTANT: no actualitzem directament els DOM de les finestres "user" aquí
    // perquè això provoca que els missatges arribin doble (una vegada per
    // l'escriptura directe i una vegada més per l'event "storage").
    // Deixem que la sincronització es faci via LocalStorage + event "storage".
}
function fCreateUsers() {
    var _a;
    const urlBase = "user.html";
    const width = Math.floor(screen.availWidth / 2);
    const height = Math.floor(screen.availHeight / 2);
    // intentar abrir dos ventanas con nombres distintos
    const w1 = window.open(`${urlBase}?uid=1`, `LocalChatUser1_${Date.now()}`, `left=${width},top=0,width=${width},height=${height}`);
    console.log("w1:", w1);
    const w2 = window.open(`${urlBase}?uid=2`, `LocalChatUser2_${Date.now()}`, `left=${width},top=${height},width=${width},height=${height}`);
    console.log("w2:", w2);
    // asignar a userWindows si se han creado
    userWindows[0] = w1 || userWindows[0];
    userWindows[1] = w2 || userWindows[1];
    // notificar si el navegador ha bloqueado alguna
    const blocked = (!w1) || (!w2);
    if (blocked) {
        alert("Alguna finestra no s'ha pogut obrir (popup bloquejat?). Permet pop-ups per la pàgina o prova obrint les finestres manualment.");
    }
    else {
        // opcional: portar al davant la primera creada
        (_a = userWindows[0]) === null || _a === void 0 ? void 0 : _a.focus();
    }
}
function fCloseUsers() {
    // Tanca la finestra de l'usuari si existeix
    userWindows.forEach((window, index) => {
        if (window && !window.closed) {
            window.close();
            userWindows[index] = null;
        }
    });
}
// Netejar xat: netejar admin i notificar via LocalStorage; reobrir tancades
function fCleanChat() {
    adminStorageTextarea.value = "";
    try {
        localStorage.setItem("localchat_clear", String(Date.now()));
    }
    catch (err) {
        console.warn("No s'ha pogut escriure a localStorage:", err);
    }
    // netejar les finestres obertes i reobrir si estan tancades
    userWindows.forEach((win, i) => {
        try {
            // No netegem directament el DOM de les finestres user: enviem l'event
            // localchat_clear perquè cada user es netegi via 'storage'. Si la finestra
            // està tancada la reobrim.
            if (!win || win.closed) {
                // reobrir la finestra tancada
                userWindows[i] = window.open(`user.html?uid=${i + 1}`, `LocalChatUser_reopen_${i}_${Date.now()}`, `left=${Math.floor(screen.availWidth / 2)},top=${i * Math.floor(screen.availHeight / 2)},width=${Math.floor(screen.availWidth / 2)},height=${Math.floor(screen.availHeight / 2)}`);
            }
        }
        catch (err) {
            console.warn("Error netejant/reobrint user window:", err);
        }
    });
}
// Escoltar storage events: quan un user escriu al localStorage arribarà aquí
window.addEventListener("storage", (ev) => {
    if (ev.key === "localchat_message" && ev.newValue) {
        try {
            const payload = JSON.parse(ev.newValue);
            const line = `[${new Date(payload.ts).toLocaleTimeString()}] ${payload.sender}: ${payload.text}\n`;
            // prepend al admin
            adminStorageTextarea.value = line + adminStorageTextarea.value;
            adminStorageTextarea.selectionStart = 0;
            adminStorageTextarea.selectionEnd = 0;
            adminStorageTextarea.scrollTop = 0;
            // IMPORTANT: no actualitzem directament les finestres "user" aquí per la
            // mateixa raó (duplicació). Cada "user" té un listener 'storage' i s'actualitza
            // quan detecta la clau "localchat_message".
        }
        catch (err) {
            console.warn("Payload no vàlid a localchat_message:", err);
        }
    }
    else if (ev.key === "localchat_clear") {
        // netejar admin (els users rebran també l'event i es netejaran)
        adminStorageTextarea.value = "";
    }
});
sendAdminButton.addEventListener("click", fSendAdminMessage);
createUsersButton.addEventListener("click", fCreateUsers);
closeUsersButton.addEventListener("click", fCloseUsers);
cleanChatButton.addEventListener("click", fCleanChat);
//# sourceMappingURL=Admin.js.map