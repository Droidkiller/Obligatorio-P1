class Sistema {
    constructor() {
        this.carreras = [];
        this.corredores = [];
        this.inscripciones = [];
        this.patrocinadores = [];
    }

    agregarCarrera(carrera) {
        this.carreras.push(carrera);
    }

    agregarCorredor(corredor) {
        this.corredores.push(corredor);
    }

    agregarInscripcion(inscripcion) {
        this.inscripciones.push(inscripcion);
    }

    agregarPatrocinador(patrocinador) {
        this.patrocinadores.push(patrocinador);
    }
}

class Carrera {
    constructor(nombre, depto, fecha, cupo) {
        this.nombre = nombre;
        this.departamento = depto;
        this.fecha = fecha;
        this.cupo = cupo;
    }
}

class Corredor {
    constructor(nombre, edad, cedula, fecFicha, tipo) {
        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fechaFicha = fecFicha;
        this.tipo = tipo;
    }

    toString() {
        return "Nombre: " + this.nombre + " " + this.edad + " años, CI: " + this.cedula + " Ficha Médica " + this.fechaFicha + " " + this.tipo;   
    }
}

class Inscripcion {
    constructor(corredores, carreras) {
        this.corredores = corredores;
        this.carreras = carreras; 
    }
}

class Patrocinador {
    constructor(nombre, rubro, carreras) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carreras = carreras;
    }
}
