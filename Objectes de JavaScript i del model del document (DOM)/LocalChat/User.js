"use strict";
// Recollir les dades del html (Usuari)
const userMessageInput = document.getElementById("userMessage");
const userStorageTextarea = document.getElementById("userStorage");
const sendUserMessageButton = document.getElementById("sendUser");
// Llegir uid de la query string per identificar l'usuari
const params = new URLSearchParams(window.location.search);
const uid = params.get("uid") || "0";
const userIdLabel = document.getElementById("userIdLabel");
if (userIdLabel)
    userIdLabel.textContent = uid;
// Funcio per enviar un missatge com usuari -> escriu a localStorage en JSON
function fSendUserMessage() {
    const message = userMessageInput.value.trim();
    if (!message)
        return;
    const payload = { sender: `User ${uid}`, text: message, ts: Date.now() };
    const line = `[${new Date(payload.ts).toLocaleTimeString()}] ${payload.sender}: ${payload.text}\n`;
    // Mostrar localment (l'emissor no rep l'event 'storage')
    userStorageTextarea.value = line + userStorageTextarea.value;
    userMessageInput.value = "";
    userStorageTextarea.selectionStart = 0;
    userStorageTextarea.selectionEnd = 0;
    userStorageTextarea.scrollTop = 0;
    // Escriure al LocalStorage per notificar l'admin i les altres finestres
    try {
        localStorage.setItem("localchat_message", JSON.stringify(payload));
    }
    catch (err) {
        console.warn("No s'ha pogut escriure a localStorage:", err);
    }
}
// Escoltar events storage (rebran quan admin o altres escriguin)
window.addEventListener("storage", (ev) => {
    if (ev.key === "localchat_message" && ev.newValue) {
        try {
            const payload = JSON.parse(ev.newValue);
            const line = `[${new Date(payload.ts).toLocaleTimeString()}] ${payload.sender}: ${payload.text}\n`;
            // prepend (els mateixos que han escrit no rebran aquest event, però sí els altres)
            userStorageTextarea.value = line + userStorageTextarea.value;
            userStorageTextarea.selectionStart = 0;
            userStorageTextarea.selectionEnd = 0;
            userStorageTextarea.scrollTop = 0;
        }
        catch (err) {
            console.warn("Error parsejant localchat_message:", err);
        }
    }
    else if (ev.key === "localchat_clear") {
        // netejar el textarea quan l'admin neteja
        userStorageTextarea.value = "";
    }
});
sendUserMessageButton.addEventListener("click", fSendUserMessage);
//# sourceMappingURL=User.js.map