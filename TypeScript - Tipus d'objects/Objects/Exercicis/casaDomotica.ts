// Sensor i Actuador (Classes pare)
class Sensor {
  nom: string;
  valor: number | boolean | string;

  constructor(nom: string, valor: number | boolean | string) {
    this.nom = nom;
    this.valor = valor;
  }
}

class Actuador {
  nom: string;
  atribut: boolean;

  constructor(nom: string, atribut: boolean) {
    this.nom = nom;
    this.atribut = atribut;
  }
}

// Classes filles de Sensor
class SensorPresencia extends Sensor {
  constructor(nom: string, valor: boolean) {
    super(nom, valor);
  }
}

class SensorLlum extends Sensor {
  constructor(nom: string, valor: string) {
    // Cambiado a string para "dia"/"nit"
    super(nom, valor);
  }
}

class SensorTemperatura extends Sensor {
  constructor(nom: string, valor: number) {
    super(nom, valor);
  }
}

class SensorPluja extends Sensor {
  constructor(nom: string, valor: boolean) {
    super(nom, valor);
  }
}

class SensorFum extends Sensor {
  constructor(nom: string, valor: boolean) {
    super(nom, valor);
  }
}

class Rellotge extends Sensor {
  constructor(nom: string, valor: number) {
    super(nom, valor);
  }
}

// Classes filles d'Actuador
class Motor extends Actuador {
  constructor(nom: string, atribut: boolean) {
    super(nom, atribut);
  }

  // Funcions de Motor (pujar i baixar persianes)
  controlarPersianes(sensorPluja: SensorPluja): string {
    const pluja = sensorPluja.valor as boolean;

    if (pluja) {
      this.atribut = true; // Pujar persianes si no plou
      return "Baixades";
    } else {
      this.atribut = false; // Baixar persianes si plou
      return "Pujades (pluja)";
    }
  }
}

class Interruptor extends Actuador {
  constructor(nom: string, atribut: boolean) {
    super(nom, atribut);
  }

  // Funcions d'Interruptor (encendre i apagar llum)
  controlarLlum(
    sensorPresencia: SensorPresencia,
    sensorLlum: SensorLlum
  ): string {
    const presencia = sensorPresencia.valor as boolean;
    const momentDelDia = sensorLlum.valor; // "dia" o "nit"

    if (presencia && momentDelDia === "nit") {
      this.atribut = true;
      return "Encesa";
    } else {
      this.atribut = false;
      return "Apagada";
    }
  }
}

class Extintor extends Actuador {
  constructor(nom: string, atribut: boolean) {
    super(nom, atribut);
  }

  // Funcions d'Extintor (activar i desactivar)
  controlarExtintor(sensorFum: SensorFum): string {
    const fum = sensorFum.valor as boolean;

    if (fum) {
      this.atribut = true;
      return "ACTIVAT! (fum detectat)";
    } else {
      this.atribut = false;
      return "Desactivat";
    }
  }
}

class Calefaccio extends Actuador {
  constructor(nom: string, atribut: boolean) {
    super(nom, atribut);
  }

  controlarClima(
    sensorTemperatura: SensorTemperatura
  ): string {
    const temp = sensorTemperatura.valor as number;

    if (temp < 20) {
      this.atribut = true;
      return `Encesa (${temp}°C), pujant a 22°C`;
    } else {
      this.atribut = false;
      return "Apagada";
    }
  }
}

class AireCondicionat extends Actuador {
  constructor(nom: string, atribut: boolean) {
    super(nom, atribut);
  }

  controlarClima(
    sensorTemperatura: SensorTemperatura
  ): string {
    const temp = sensorTemperatura.valor as number;

    if (temp > 25) {
      this.atribut = true;
      return `Encès (${temp}°C) , baixant a 22°C`;
    } else {
      this.atribut = false;
      return "Apagat";
    }
  }
}

// Classe principal Domotica
class Domotica {
  sensors: Sensor[];
  actuadors: Actuador[];
  autoMode: boolean = false;
  intervalId: number | null = null;

  constructor(sensors: Sensor[], actuadors: Actuador[]) {
    this.sensors = sensors;
    this.actuadors = actuadors;
    this.inicialitzarEventListeners();
  }

  inicialitzarEventListeners(): void {
    // Botó aplicar lògica
    const btnAvaluar = document.getElementById("avaluar");
    if (btnAvaluar) {
      btnAvaluar.addEventListener("click", () => this.aplicarLogicaTotes());
    }

    // Botó mode automàtic
    const btnAuto = document.getElementById("modoAutomatico");
    if (btnAuto) {
      btnAuto.addEventListener("click", () => this.modoAutomatico());
    }
  }

  // Actualitzar tots els sensors amb valors de la interfície
  actualitzarSensors(): void {
    const habitacions = ["sala", "cuina", "dormitori", "bany", "menjador"];
    
    habitacions.forEach(habitacio => {
      // Buscar sensors de cada habitació
      const sensorPresencia = this.sensors.find(s => s.nom === `Presencia-${habitacio}`) as SensorPresencia;
      const sensorLlum = this.sensors.find(s => s.nom === `Llum-${habitacio}`) as SensorLlum;
      const sensorTemp = this.sensors.find(s => s.nom === `Temp-${habitacio}`) as SensorTemperatura;
      const sensorPluja = this.sensors.find(s => s.nom === `Pluja-${habitacio}`) as SensorPluja;
      const sensorFum = this.sensors.find(s => s.nom === `Fum-${habitacio}`) as SensorFum;

      // Actualitzar amb valors del HTML
      const presenciaEl = document.getElementById(`pres-${habitacio}`) as HTMLInputElement;
      const llumEl = document.getElementById(`luz-${habitacio}`) as HTMLSelectElement;
      const tempEl = document.getElementById(`temp-${habitacio}`) as HTMLInputElement;
      const pluviaEl = document.getElementById(`lluvia-${habitacio}`) as HTMLInputElement;
      const fumEl = document.getElementById(`humo-${habitacio}`) as HTMLInputElement;

      if (sensorPresencia && presenciaEl) sensorPresencia.valor = presenciaEl.checked;
      if (sensorLlum && llumEl) sensorLlum.valor = llumEl.value;
      if (sensorTemp && tempEl) sensorTemp.valor = parseInt(tempEl.value);
      if (sensorPluja && pluviaEl) sensorPluja.valor = pluviaEl.checked;
      if (sensorFum && fumEl) sensorFum.valor = fumEl.checked;
    });
  }

  aplicarLogicaTotes(): void {
    // Actualitzar sensors primer
    this.actualitzarSensors();

    const habitacions = ["sala", "cuina", "dormitori", "bany", "menjador"];
    
    habitacions.forEach(habitacio => {
      // Buscar sensors de la habitació
      const sensorPresencia = this.sensors.find(s => s.nom === `Presencia-${habitacio}`) as SensorPresencia;
      const sensorLlum = this.sensors.find(s => s.nom === `Llum-${habitacio}`) as SensorLlum;
      const sensorTemp = this.sensors.find(s => s.nom === `Temp-${habitacio}`) as SensorTemperatura;
      const sensorPluja = this.sensors.find(s => s.nom === `Pluja-${habitacio}`) as SensorPluja;
      const sensorFum = this.sensors.find(s => s.nom === `Fum-${habitacio}`) as SensorFum;

      // Buscar actuadors de la habitació
      const motor = this.actuadors.find(a => a.nom === `Motor-${habitacio}`) as Motor;
      const interruptor = this.actuadors.find(a => a.nom === `Interruptor-${habitacio}`) as Interruptor;
      const calefaccio = this.actuadors.find(a => a.nom === `Calefaccio-${habitacio}`) as Calefaccio;
      const aireCondicionat = this.actuadors.find(a => a.nom === `AC-${habitacio}`) as AireCondicionat;
      const extintor = this.actuadors.find(a => a.nom === `Extintor-${habitacio}`) as Extintor;

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
      this.actualitzarInterficie(habitacio, estatPersiana, estatLlum, estatCalefaccio, estatAC, estatExtintor);
    });

    this.log("Lògica aplicada a totes les habitacions");
  }

  // Actualitzar la interfície amb els estats dels actuadors
  actualitzarInterficie(habitacio: string, persiana: string, llum: string, calefaccio: string, ac: string, extintor: string): void {
    const persianaEl = document.getElementById(`act-persiana-${habitacio}`);
    const llumEl = document.getElementById(`act-llum-${habitacio}`);
    const calefaccioEl = document.getElementById(`act-calef-${habitacio}`);
    const acEl = document.getElementById(`act-ac-${habitacio}`);
    const extintorEl = document.getElementById(`act-extintor-${habitacio}`);

    if (persianaEl) persianaEl.textContent = persiana;
    if (llumEl) llumEl.textContent = llum;
    if (calefaccioEl) calefaccioEl.textContent = calefaccio;
    if (acEl) acEl.textContent = ac;
    if (extintorEl) extintorEl.textContent = extintor;
  }

  modoAutomatico(): void {
    this.autoMode = !this.autoMode;
    const btnAuto = document.getElementById("modoAutomatico");

    if (this.autoMode) {
      if (btnAuto) btnAuto.textContent = "Auto (ON)";
      this.intervalId = window.setInterval(() => {
        this.aplicarLogicaTotes();
      }, 2000); // Actualitzar cada 2 segons
      this.log("Mode automàtic activat");
    } else {
      if (btnAuto) btnAuto.textContent = "Auto";
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.log("Mode automàtic desactivat");
    }
  }

  log(missatge: string): void {
    const logEl = document.getElementById("log");
    if (logEl) {
      const timestamp = new Date().toLocaleTimeString();
      logEl.textContent += `[${timestamp}] ${missatge}\n`;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }
}

// Inicialitzar l'aplicació quan es carregui la pàgina
document.addEventListener("DOMContentLoaded", () => {
  // Crear arrays de sensors i actuadors per totes les habitacions
  const habitacions = ["sala", "cuina", "dormitori", "bany", "menjador"];
  
  // Array de sensors
  const sensors: Sensor[] = [];
  habitacions.forEach(habitacio => {
    sensors.push(new SensorPresencia(`Presencia-${habitacio}`, false));
    sensors.push(new SensorLlum(`Llum-${habitacio}`, "dia"));
    sensors.push(new SensorTemperatura(`Temp-${habitacio}`, 21));
    sensors.push(new SensorPluja(`Pluja-${habitacio}`, false));
    sensors.push(new SensorFum(`Fum-${habitacio}`, false));
  });

  // Array d'actuadors
  const actuadors: Actuador[] = [];
  habitacions.forEach(habitacio => {
    actuadors.push(new Motor(`Motor-${habitacio}`, false));
    actuadors.push(new Interruptor(`Interruptor-${habitacio}`, false));
    actuadors.push(new Calefaccio(`Calefaccio-${habitacio}`, false));
    actuadors.push(new AireCondicionat(`AC-${habitacio}`, false));
    actuadors.push(new Extintor(`Extintor-${habitacio}`, false));
  });

  // Crear objecte domotica amb els dos arrays
  new Domotica(sensors, actuadors);
});
