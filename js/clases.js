/*
Autores: 
Francisco Lorenzo Bonanni (299134)
Aitana Alvarez (340201)
*/

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

    verificarDuplicidadCarrera(nombre) {
        let flag = false;
        for(let i=0;i<this.carreras.length;i++ || !flag) {
            if (this.carreras[i].nombre === nombre) {
                flag = true;
            }
        }
        return flag;
    }

    verificarDuplicidadPatrocinador(patrocinador) {
        let duplicado = false;
        for (let i = 0; i < this.patrocinadores.length;i++ || !duplicado) {
            if (this.patrocinadores[i].nombre === patrocinador.nombre) {
                this.patrocinadores[i].rubro = patrocinador.rubro;
                this.patrocinadores[i].carreras = patrocinador.carreras;
                duplicado = true;
            }
        }
        return duplicado;
    }

    verificarDuplicidadCorredor(cedula) {
        let flag = false;
        for(let i=0;i<this.corredores.length;i++ || !flag) {
            if (this.corredores[i].cedula === cedula) {
                flag = true;
            }
        }
        return flag;
    }

    validarInscripcion(corredor, carrera) {
        debugger;
        let flag = true;
        let cont = 0;
        if(corredor.fechaFicha < carrera.fecha) {
            alert("La fecha de la ficha médica del corredor está vencida.");
            flag = false;
        } else if(flag) {
            for(let i=0;i<this.inscripciones.length;i++) {
                if(this.inscripciones[i].carreras.nombre == carrera.nombre) {
                    cont++;
                }
            }
            if(cont >= carrera.cupo) {
                alert("La carrera " + carrera.nombre + " ya ha alcanzado su cupo máximo de inscripciones.");
                flag = false;
            } else if(flag) {
                for (let i = 0; i < this.inscripciones.length; i++ && flag) {
                    if (this.inscripciones[i].corredores.cedula === corredor.cedula &&
                        this.inscripciones[i].carreras.nombre === carrera.nombre) {
                            alert("El corredor ya está inscripto en esta carrera.");
                            flag = false;
                    }
                }
            }
        }
        return flag;
    }

    getPatrocinadores(nombreCarrera) {
        let patrocinadores = [];
        for (let i = 0; i < this.patrocinadores.length; i++) {
            if (this.patrocinadores[i].carreras.includes(nombreCarrera)) {
                patrocinadores.push(this.patrocinadores[i].toString());
            }
        }
        return patrocinadores;
    }
    getCantidadInscripciones(nombreCarrera) {
    let contador = 0;
    for (let i = 0; i < this.inscripciones.length; i++) {
        if (this.inscripciones[i].carreras.nombre === nombreCarrera) {
            contador = contador + 1;
        }
    }
    return contador;
};

    getCantidadCarrerasPorDepartamento(departamento) {
        let cantidad = 0;
        for (let i = 0; i < this.carreras.length; i++) {
            if (this.carreras[i].departamento == departamento) {
                cantidad++;
            }
        }
        return cantidad;
    }
    getCantidadInscripcionesPorDepartamento(departamento) {
        let cantidad = 0;
        for (let i = 0; i < this.inscripciones.length; i++) {
            if (this.inscripciones[i].carreras.departamento == departamento) {
                cantidad++;
            }
        }
        return cantidad;
    }
}

class Carrera {
    constructor(nombre, depto, fecha, cupo) {
        this.nombre = nombre;
        this.departamento = depto;
        this.fecha = fecha;
        this.cupo = cupo;
        this.numero = 1;
    }
}

class Corredor {
    constructor(nombre, edad, cedula, fecFicha, tipo) {
        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fechaFicha = fecFicha;
        this.tipo = tipo;
        this.numero = {};
    }

    toString() {
        return "Nombre: " + this.nombre + " " + this.edad + " años, CI: " + this.cedula + " Ficha Médica " + this.fechaFicha + " " + this.tipo;   
    }

    getIdentificacion() {
        return this.nombre + " " + this.cedula;
    }

    darNumero(nombreCarrera, numero) {
        this.numero[nombreCarrera] = numero;
    }

    getNumero(nombreCarrera) {
        return this.numero[nombreCarrera];
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

    toString() {
        return this.nombre + " (" + this.rubro + ")";
    }
}
