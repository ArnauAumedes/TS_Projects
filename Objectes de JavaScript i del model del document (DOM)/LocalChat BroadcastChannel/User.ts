// Recollir les dades del html (Usuari)
const userMessageInput = document.getElementById(
  "userMessage"
) as HTMLInputElement;
const userStorageTextarea = document.getElementById(
  "userStorage"
) as HTMLTextAreaElement;
const sendUserMessageButton = document.getElementById(
  "sendUser"
) as HTMLButtonElement;

// Llegir userID de la query string per identificar l'usuari
const params = new URLSearchParams(window.location.search);
const userID = params.get("userID") || params.get("userID") || "0";
const userIdLabel = document.getElementById(
  "userIdLabel"
) as HTMLSpanElement | null;
if (userIdLabel) userIdLabel.textContent = userID;

  // Crear un usuari únic per a aquest client
  const CLIENT_ID = `user_${userID}_${Date.now()}`;

  // Unir-se al BroadcastChannel (si està disponible)
  if (canal) {
  const canal = new BroadcastChannel("localchat_channel");
  }

// Funcio per enviar un missatge com usuari -> escriu a localStorage en JSON
function fSendUserMessage() {
  const message = userMessageInput.value.trim();
  if (!message) return;

  const payload = {
    type: "message",
    sender: `User ${userID}`,
    text: message,
    ts: Date.now(),
    clientId: CLIENT_ID,
  };
  const line = `[${new Date(payload.ts).toLocaleTimeString()}] ${payload.sender}: ${payload.text}\n`;

  // Mostrar localment (l'emissor no vol duplicats)
  userStorageTextarea.value = line + userStorageTextarea.value;
  userMessageInput.value = "";
  userStorageTextarea.selectionStart = 0;
  userStorageTextarea.selectionEnd = 0;
  userStorageTextarea.scrollTop = 0;

  try {
    canal.postMessage(payload);
  } catch (err) {
    console.warn("No s'ha pogut enviar via BroadcastChannel:", err);
  }
}

canal.addEventListener("message", (event: MessageEvent) => {
  const data = event.data; 
  if (!data || typeof data !== "object") return;

  // Ignorar els missatges que hem enviat nosaltres mateixos (ja els mostrem localment)
  if (data.clientId === CLIENT_ID) return;

  if (data.type === "message") {
    try {
      const line = `[${new Date(data.ts).toLocaleTimeString()}] ${data.sender}: ${data.text}\n`;
      userStorageTextarea.value = line + userStorageTextarea.value;
      userStorageTextarea.selectionStart = 0;
      userStorageTextarea.selectionEnd = 0;
      userStorageTextarea.scrollTop = 0;
    } catch (err) {
      console.warn("Payload no vàlid al BroadcastChannel (message):", err);
    }
  } else if (data.type === "clear") {
    userStorageTextarea.value = "";
  }

  // Tanca el canal quan es tenqui la finestra
  window.addEventListener("beforeunload", () => {
    canal.close();
  });
}); 

sendUserMessageButton.addEventListener("click", fSendUserMessage);
