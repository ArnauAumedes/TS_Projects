// Recollir les dades del html
const adminMessageInput = document.getElementById(
  "adminMessage"
) as HTMLInputElement;
const sendAdminButton = document.getElementById(
  "sendAdmin"
) as HTMLButtonElement;
const adminStorageTextarea = document.getElementById(
  "adminStorage"
) as HTMLTextAreaElement;
const createUsersButton = document.getElementById(
  "createUsers"
) as HTMLButtonElement;
const closeUsersButton = document.getElementById(
  "closeUsers"
) as HTMLButtonElement;
const cleanChatButton = document.getElementById(
  "cleanChat"
) as HTMLButtonElement;

// Variable per mantenir la referència a la finestra de l'usuari
let userWindows: (Window | null)[] = [null, null];

// Identificador únic per a l'admin
const ADMIN_ID = `admin_${Date.now()}`;

// Creem el canal
const canal = new BroadcastChannel("localchat_channel");

// Enviar missatge des de l'admin: actualitza admin, escriu al LocalStorage per notificar els altres
function fSendAdminMessage() {
  const message = adminMessageInput.value.trim();
  if (!message) return;

  const payload = {
    type: "message",
    sender: "Admin",
    text: message,
    ts: Date.now(),
    clientId: ADMIN_ID,
  };
  const line = `[${new Date(payload.ts).toLocaleTimeString()}] ${
    payload.sender
  }: ${payload.text}\n`;

  // Mostrar al admin (prepend)
  adminStorageTextarea.value = line + adminStorageTextarea.value;
  adminMessageInput.value = "";
  adminStorageTextarea.selectionStart = 0;
  adminStorageTextarea.selectionEnd = 0;
  adminStorageTextarea.scrollTop = 0;

  // Escriure al LocalStorage perquè les finestres user rebin l'event storage
  try {
    canal.postMessage(payload);
  } catch (err) {
    console.warn("No s'ha pogut enviar via BroadcastChannel:", err);
  }
  // IMPORTANT: no actualitzem directament els DOM de les finestres "user" aquí
  // perquè això provocaria duplicació si també reben el missatge via canal.
}

function fCreateUsers() {
  const urlBase = "user.html";

  // preguntar una sola vez cuántas ventanas abrir
  let numUsers = parseInt(
    prompt("Quantes finestres vols obrir?", String(2)) || "2",
    10
  );
  if (isNaN(numUsers) || numUsers < 1) numUsers = 2;

  // calcular disposició en quadrícula
  const cols = Math.ceil(Math.sqrt(numUsers));
  const rows = Math.ceil(numUsers / cols);
  const width = Math.floor(screen.availWidth / cols);
  const height = Math.floor(screen.availHeight / rows);

  // assegurar que userWindows té la mida correcta
  while (userWindows.length < numUsers) {
    userWindows.push(null);
  }

  // assignar cada finestra
  userWindows.slice(0, numUsers).forEach((win, i) => {
    try {
      const userID = i + 1; // uid = 1,2,...
      // calcular la posició en la graella
      const left = (i % cols) * width;
      const top = Math.floor(i / cols) * height;

      // obrir si no existeix o està tancada
      if (!win || win.closed) {
        const opened = window.open(
          `${urlBase}?uid=${userID}`,
          `LocalChatUser${userID}_${Date.now()}`,
          `left=${left},top=${top},width=${width},height=${height}`
        );
        userWindows[i] = opened || null;
        console.log(`${userID}:`, opened);
      } else {
        userWindows[i] = win;
        console.log(`Finestra d'usuari ${userID} ja oberta.`);
      }
    } catch (err) {
      console.warn("Error obrint finestra d'usuari:", err);
      userWindows[i] = userWindows[i] || null;
    }
  });

  // notificar si el navegador ha bloqueado alguna
  const blocked = userWindows.slice(0, numUsers).some((win) => win === null);
  if (blocked) {
    alert(
      "Alguna finestra no s'ha pogut obrir (popup bloquejat?). Permet pop-ups per la pàgina o prova obrint les finestres manualment."
    );
  } else {
    // opcional: portar al davant la primera creada
    userWindows[0]?.focus();
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
    canal.postMessage({ type: "clear", ts: Date.now(), clientId: ADMIN_ID });
  } catch (err) {
    console.warn("No s'ha pogut escriure a localStorage:", err);
  }

  // netejar les finestres obertes i reobrir si estan tancades
  userWindows.forEach((win, i) => {
    try {
      // Si la finestra està tancada la reobrim.
      if (!win || win.closed) {
        win?.close();
      }
      userWindows[i] = null; // Marcar com a tancada
    } catch (err) {
      console.warn("Error netejant user window:", err);
      userWindows[i] = null;
    }
  });
  // reobrim segons la longitud actual de userWindows (manté el mateix nombre)
  const numUsers = userWindows.length;
  if (numUsers > 0) {
    const cols = Math.ceil(Math.sqrt(numUsers));
    const rows = Math.ceil(numUsers / cols);
    const width = Math.floor(screen.availWidth / cols);
    const height = Math.floor(screen.availHeight / rows);

    userWindows.forEach((win, i) => {
      try {
        if (!win || win.closed) {
          const uid = i + 1;
          userWindows[i] =
            window.open(
              `user.html?uid=${uid}`,
              `LocalChatUser_reopen_${uid}_${Date.now()}`,
              `left=${(i % cols) * width},top=${
                Math.floor(i / cols) * height
              },width=${width},height=${height}`
            ) || null;
        }
      } catch (err) {
        console.warn("Error reobrint user window:", err);
        userWindows[i] = userWindows[i] || null;
      }
    });
  }
}

// Escoltar storage events: quan un user escriu al localStorage arribarà aquí
canal.addEventListener("message", (ev: MessageEvent) => {
  const data = ev.data;
  if (!data || typeof data != "object") return;

  if (data.type === "message") {
    const line = `[${new Date(data.ts).toLocaleTimeString()}] ${data.sender}: ${data.text}\n`;
    // Mostrar al admin (prepend)
    adminStorageTextarea.value = line + adminStorageTextarea.value;
    adminStorageTextarea.selectionStart = 0;
    adminStorageTextarea.selectionEnd = 0;
    adminStorageTextarea.scrollTop = 0;
  } else if (data.type === "clear") {
    // Netejar l'àrea de text
    adminStorageTextarea.value = "";
  }
});

sendAdminButton.addEventListener("click", fSendAdminMessage);
createUsersButton.addEventListener("click", fCreateUsers);
closeUsersButton.addEventListener("click", fCloseUsers);
cleanChatButton.addEventListener("click", fCleanChat);
