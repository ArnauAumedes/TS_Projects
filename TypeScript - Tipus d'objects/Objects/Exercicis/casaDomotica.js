"use strict";
// Sensor i Actuador (Classes pare)
class Sensor {
    constructor(nom, valor) {
        this.nom = nom;
        this.valor = valor;
    }
}
class Actuador {
    constructor(nom, atribut) {
        this.nom = nom;
        this.atribut = atribut;
    }
}
// Classes filles de Sensor
class SensorPresencia extends Sensor {
    constructor(nom, valor) {
        super(nom, valor);
    }
}
class SensorLlum extends Sensor {
    constructor(nom, valor) {
        // Cambiado a string para "dia"/"nit"
        super(nom, valor);
    }
}
class SensorTemperatura extends Sensor {
    constructor(nom, valor) {
        super(nom, valor);
    }
}
class SensorPluja extends Sensor {
    constructor(nom, valor) {
        super(nom, valor);
    }
}
class SensorFum extends Sensor {
    constructor(nom, valor) {
        super(nom, valor);
    }
}
class Rellotge extends Sensor {
    constructor(nom, valor) {
        super(nom, valor);
    }
}
// Classes filles d'Actuador
class Motor extends Actuador {
    constructor(nom, atribut) {
        super(nom, atribut);
    }
    // Funcions de Motor (pujar i baixar persianes)
    controlarPersianes(sensorPluja) {
        const pluja = sensorPluja.valor;
        if (pluja) {
            this.atribut = true; // Pujar persianes si no plou
            return "Baixades";
        }
        else {
            this.atribut = false; // Baixar persianes si plou
            return "Pujades (pluja)";
        }
    }
}
class Interruptor extends Actuador {
    constructor(nom, atribut) {
        super(nom, atribut);
    }
    // Funcions d'Interruptor (encendre i apagar llum)
    controlarLlum(sensorPresencia, sensorLlum) {
        const presencia = sensorPresencia.valor;
        const momentDelDia = sensorLlum.valor; // "dia" o "nit"
        if (presencia && momentDelDia === "nit") {
            this.atribut = true;
            return "Encesa";
        }
        else {
            this.atribut = false;
            return "Apagada";
        }
    }
}
class Extintor extends Actuador {
    constructor(nom, atribut) {
        super(nom, atribut);
    }
    // Funcions d'Extintor (activar i desactivar)
    controlarExtintor(sensorFum) {
        const fum = sensorFum.valor;
        if (fum) {
            this.atribut = true;
            return "ACTIVAT! (fum detectat)";
        }
        else {
            this.atribut = false;
            return "Desactivat";
        }
    }
}
class Calefaccio extends Actuador {
    constructor(nom, atribut) {
        super(nom, atribut);
    }
    controlarClima(sensorTemperatura) {
        const temp = sensorTemperatura.valor;
        if (temp < 20) {
            this.atribut = true;
            return `Encesa (${temp}°C), pujant a 22°C`;
        }
        else {
            this.atribut = false;
            return "Apagada";
        }
    }
}
class AireCondicionat extends Actuador {
    constructor(nom, atribut) {
        super(nom, atribut);
    }
    controlarClima(sensorTemperatura) {
        const temp = sensorTemperatura.valor;
        if (temp > 25) {
            this.atribut = true;
            return `Encès (${temp}°C) , baixant a 22°C`;
        }
        else {
            this.atribut = false;
            return "Apagat";
        }
    }
}
// Classe principal Domotica
class Domotica {
    constructor(sensors, actuadors) {
        this.autoMode = false;
        this.intervalId = null;
        this.sensors = sensors;
        this.actuadors = actuadors;
        inicialitzarEventListeners(this);
    }
}
// --- Funcions top-level que abans eren mètodes de Domotica ---
function inicialitzarEventListeners(dom) {
    // Botó aplicar lògica
    const btnAvaluar = document.getElementById("avaluar");
    if (btnAvaluar) {
        btnAvaluar.addEventListener("click", () => aplicarLogicaTotes(dom));
    }
    // Botó mode automàtic
    const btnAuto = document.getElementById("modoAutomatico");
    if (btnAuto) {
        btnAuto.addEventListener("click", () => modoAutomatico(dom));
    }
}
function actualitzarSensors(dom) {
    const habitacions = ["sala", "cuina", "dormitori", "bany", "menjador"];
    habitacions.forEach((habitacio) => {
        // Buscar sensors de cada habitació
        const sensorPresencia = dom.sensors.find((s) => s.nom === `Presencia-${habitacio}`);
        const sensorLlum = dom.sensors.find((s) => s.nom === `Llum-${habitacio}`);
        const sensorTemp = dom.sensors.find((s) => s.nom === `Temp-${habitacio}`);
        const sensorPluja = dom.sensors.find((s) => s.nom === `Pluja-${habitacio}`);
        const sensorFum = dom.sensors.find((s) => s.nom === `Fum-${habitacio}`);
        // Actualitzar amb valors del HTML
        const presenciaEl = document.getElementById(`pres-${habitacio}`);
        const llumEl = document.getElementById(`luz-${habitacio}`);
        const tempEl = document.getElementById(`temp-${habitacio}`);
        const pluviaEl = document.getElementById(`lluvia-${habitacio}`);
        const fumEl = document.getElementById(`humo-${habitacio}`);
        if (sensorPresencia && presenciaEl)
            sensorPresencia.valor = presenciaEl.checked;
        if (sensorLlum && llumEl)
            sensorLlum.valor = llumEl.value;
        if (sensorTemp && tempEl)
            sensorTemp.valor = parseInt(tempEl.value) || 0;
        if (sensorPluja && pluviaEl)
            sensorPluja.valor = pluviaEl.checked;
        if (sensorFum && fumEl)
            sensorFum.valor = fumEl.checked;
    });
}
function aplicarLogicaTotes(dom) {
    // Actualitzar sensors primer
    actualitzarSensors(dom);
    const habitacions = ["sala", "cuina", "dormitori", "bany", "menjador"];
    habitacions.forEach((habitacio) => {
        // Buscar sensors de la habitació
        const sensorPresencia = dom.sensors.find((s) => s.nom === `Presencia-${habitacio}`);
        const sensorLlum = dom.sensors.find((s) => s.nom === `Llum-${habitacio}`);
        const sensorTemp = dom.sensors.find((s) => s.nom === `Temp-${habitacio}`);
        const sensorPluja = dom.sensors.find((s) => s.nom === `Pluja-${habitacio}`);
        const sensorFum = dom.sensors.find((s) => s.nom === `Fum-${habitacio}`);
        // Buscar actuadors de la habitació
        const motor = dom.actuadors.find((a) => a.nom === `Motor-${habitacio}`);
        const interruptor = dom.actuadors.find((a) => a.nom === `Interruptor-${habitacio}`);
        const calefaccio = dom.actuadors.find((a) => a.nom === `Calefaccio-${habitacio}`);
        const aireCondicionat = dom.actuadors.find((a) => a.nom === `AC-${habitacio}`);
        const extintor = dom.actuadors.find((a) => a.nom === `Extintor-${habitacio}`);
        // Aplicar lògica
        let estatPersiana = "-";
        let estatLlum = "-";
        let estatCalefaccio = "-";
        let estatAC = "-";
        let estatExtintor = "-";
        if (motor && sensorPluja) {
            estatPersiana = motor.controlarPersianes(sensorPluja);
        }
        if (interruptor && sensorPresencia && sensorLlum) {
            estatLlum = interruptor.controlarLlum(sensorPresencia, sensorLlum);
        }
        if (calefaccio && sensorTemp) {
            estatCalefaccio = calefaccio.controlarClima(sensorTemp);
        }
        if (aireCondicionat && sensorTemp) {
            estatAC = aireCondicionat.controlarClima(sensorTemp);
        }
        if (extintor && sensorFum) {
            estatExtintor = extintor.controlarExtintor(sensorFum);
        }
        // Actualitzar interfície
        actualitzarInterficie(dom, habitacio, estatPersiana, estatLlum, estatCalefaccio, estatAC, estatExtintor);
    });
    log("Lògica aplicada a totes les habitacions");
}
// Actualitzar la interfície amb els estats dels actuadors
function actualitzarInterficie(dom, habitacio, persiana, llum, calefaccio, ac, extintor) {
    const persianaEl = document.getElementById(`act-persiana-${habitacio}`);
    const llumEl = document.getElementById(`act-llum-${habitacio}`);
    const calefaccioEl = document.getElementById(`act-calef-${habitacio}`);
    const acEl = document.getElementById(`act-ac-${habitacio}`);
    const extintorEl = document.getElementById(`act-extintor-${habitacio}`);
    if (persianaEl)
        persianaEl.textContent = persiana;
    if (llumEl)
        llumEl.textContent = llum;
    if (calefaccioEl)
        calefaccioEl.textContent = calefaccio;
    if (acEl)
        acEl.textContent = ac;
    if (extintorEl)
        extintorEl.textContent = extintor;
}
function modoAutomatico(dom) {
    dom.autoMode = !dom.autoMode;
    const btnAuto = document.getElementById("modoAutomatico");
    if (dom.autoMode) {
        if (btnAuto)
            btnAuto.textContent = "Auto (ON)";
        dom.intervalId = window.setInterval(() => {
            aplicarLogicaTotes(dom);
        }, 2000); // Actualitzar cada 2 segons
        log("Mode automàtic activat");
    }
    else {
        if (btnAuto)
            btnAuto.textContent = "Auto";
        if (dom.intervalId !== null) {
            clearInterval(dom.intervalId);
            dom.intervalId = null;
        }
        log("Mode automàtic desactivat");
    }
}
function log(missatge) {
    const logEl = document.getElementById("log");
    if (logEl) {
        const timestamp = new Date().toLocaleTimeString();
        logEl.textContent += `[${timestamp}] ${missatge}\n`;
        logEl.scrollTop = logEl.scrollHeight;
    }
}
// Inicialitzar l'aplicació quan es carregui la pàgina
document.addEventListener("DOMContentLoaded", () => {
    // Crear arrays de sensors i actuadors per totes les habitacions
    const habitacions = ["sala", "cuina", "dormitori", "bany", "menjador"];
    // Array de sensors
    const sensors = [];
    habitacions.forEach(habitacio => {
        sensors.push(new SensorPresencia(`Presencia-${habitacio}`, false));
        sensors.push(new SensorLlum(`Llum-${habitacio}`, "dia"));
        sensors.push(new SensorTemperatura(`Temp-${habitacio}`, 21));
        sensors.push(new SensorPluja(`Pluja-${habitacio}`, false));
        sensors.push(new SensorFum(`Fum-${habitacio}`, false));
    });
    // Array d'actuadors
    const actuadors = [];
    habitacions.forEach(habitacio => {
        actuadors.push(new Motor(`Motor-${habitacio}`, false));
        actuadors.push(new Interruptor(`Interruptor-${habitacio}`, false));
        actuadors.push(new Calefaccio(`Calefaccio-${habitacio}`, false));
        actuadors.push(new AireCondicionat(`AC-${habitacio}`, false));
        actuadors.push(new Extintor(`Extintor-${habitacio}`, false));
    });
    // Crear objecte domotica amb els dos arrays
    const casa = new Domotica(sensors, actuadors);
});
//# sourceMappingURL=casaDomotica.js.map