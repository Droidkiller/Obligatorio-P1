/*
Autores: 
Francisco Lorenzo Bonanni (299134)
Aitana Alvarez (340201)
*/

window.addEventListener('load', inicio);
var sistema = new Sistema();
var numeroCarrera = 1;

function inicio() {
    const bttnDatos = document.getElementById('bttnDatos');
    const bttnEstadisticas = document.getElementById('bttnEstadisticas');
    const bttnAgregarCarrera = document.getElementById('bttnAgregarCarrera');
    const bttnAgregarPatrocinador = document.getElementById('bttnAgregarPatrocinador');
    const bttnAgregarCorredor = document.getElementById('bttnAgregarCorredor');
    const bttnInscripcion = document.getElementById('bttnInscripcion'); 

    bttnAgregarCarrera.addEventListener('click', function(event) {
        agregarCarrera(event);
    });
    bttnAgregarPatrocinador.addEventListener('click', function(event) {
        agregarPatrocinador(event);
    });
    bttnAgregarCorredor.addEventListener('click', function(event) {
        agregarCorredor(event);
    });
    bttnInscripcion.addEventListener('click', function(event) {
        agregarInscripcion(event);
    });
    bttnEstadisticas.addEventListener('click', mostrarEstadisticas)
    bttnDatos.addEventListener('click', mostrarDatos);
}


function agregarCarrera(event) {
    event.preventDefault();
    let form = document.getElementById('formCarrera');
    let nombre = document.getElementById('nombreCarrera').value;
    let depto = document.getElementById('deptoCarrera').value;
    let fecha = document.getElementById('fechaCarrera').value;
    let cupo = document.getElementById('cupoCarrera').value;
    
    if(form.checkValidity()) {
        debugger
        let carrera = new Carrera(nombre, depto, fecha, cupo);
        if(!sistema.verificarDuplicidadCarrera(carrera.nombre)) {
            console.log(carrera);
            sistema.agregarCarrera(carrera);
            let selects = document.querySelectorAll('.selectCarreras');
            selects.forEach(select => {
                let option = document.createElement('option');
                option.value = carrera.nombre;
                option.text = carrera.nombre;
                select.appendChild(option);            
            });
            form.reset();
            alert('Carrera agregada exitosamente');
        } else {
            alert('Ya existe una carrera con ese nombre. Por favor, ingrese un nombre diferente.');
        }
    } else {
        alert('No se pudo agregar la carrera. Revise los datos ingresados.');
    }
}
    
function agregarPatrocinador(event) {
    event.preventDefault();
    debugger
    let form = document.getElementById('formSponsor');
    let nombre = document.getElementById('nombreSponsor').value;
    let rubro = document.getElementById('rubroSponsor').value;
    const select = document.getElementById('carrerasSponsor');
    let carreras = Array.from(select.selectedOptions).map(option => option.value);
    
    if(form.checkValidity()) {
        let patrocinador = new Patrocinador(nombre, rubro, carreras);
        if(!sistema.verificarDuplicidadPatrocinador(patrocinador)) {
            sistema.agregarPatrocinador(patrocinador);
            console.log(patrocinador);
            form.reset();
            alert('Patrocinador agregado exitosamente');
        } else {
            console.log(patrocinador);
            alert('Se ha actualizado con éxito el patrocinador.');
        }
    } else {
        alert('No se pudo agregar el patrocinador. Revise los datos ingresados.');
    }
}

function agregarCorredor(event) {
    event.preventDefault();
    let form = document.getElementById('formCorredor');
    let nombre = document.getElementById('nombreCorredor').value;
    let edad = document.getElementById('edad').value;
    let cedula = document.getElementById('cedula').value;
    let fecFicha = document.getElementById('fechaMedica').value;
    let tipo = document.querySelector('input[type = radio]:checked').value;

    if(form.checkValidity()) {
        let corredor = new Corredor(nombre, edad, cedula, fecFicha, tipo);
        if(!sistema.verificarDuplicidadCorredor(corredor.cedula)) { 
            console.log(corredor);
            sistema.agregarCorredor(corredor);
            let select = document.getElementById('corredoresRegistrados');
            let option = document.createElement('option');
            option.value = corredor.cedula;
            option.text = corredor.getIdentificacion();
            select.appendChild(option);
            form.reset();
            alert('Corredor agregado exitosamente');
        } else {
            alert('Ya existe un corredor con esa cédula. Por favor, ingrese una cédula diferente.');
        }
    } else {
        alert('No se pudo agregar el corredor. Revise los datos ingresados.');
    }
}
function agregarInscripcion(event) {
    event.preventDefault();
    debugger;
    let form = document.getElementById('ingresoInscripciones');
    let cedula = document.getElementById('corredoresRegistrados').value;
    let nombreCarrera = document.getElementById('carrerasRegistradas').value;

    if (form.checkValidity()) {
        let flag = false;
        let corredor; 
        let corArray = sistema.corredores;
        for (let i = 0; i < corArray.length; i++ && !flag) {
            if (corArray[i].cedula === cedula) {
                corredor = corArray[i];
                flag = true;
            }
        }
        flag = false;
        let carrera;
        let carArray = sistema.carreras;
        for (let i = 0; i < carArray.length; i++ && !flag) {
            if (carArray[i].nombre === nombreCarrera) {
                carrera = carArray[i];
                flag = true;
            }
        }
        if(sistema.validarInscripcion(corredor, carrera)) {
            let inscripcion = new Inscripcion(corredor, carrera);
            sistema.agregarInscripcion(inscripcion);
            console.log(inscripcion);
            form.reset();
            alert('Número: ' + numeroCarrera + 
                "\nNombre: " + corredor.nombre + " " + corredor.edad + " años, CI: " + corredor.cedula + " Ficha Medica " + corredor.fechaFicha +
                "\n" + corredor.tipo + 
                "\nCarrera: " + carrera.nombre + " en " + carrera.departamento + " el " + carrera.fecha + " Cupo: " + carrera.cupo +
                "\n" + sistema.getPatrocinadores(carrera.nombre)
            );
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const texto = 
                'Número: ' + numeroCarrera + '\n' +
                'Nombre: ' + corredor.nombre + ' ' + corredor.edad + ', CI: ' + corredor.cedula + ' ' + corredor.fechaFicha + '\n' +
                corredor.tipo + '\n' +
                'Carrera: ' + carrera.nombre + ' en ' + carrera.departamento + ' el ' + carrera.fecha + ' Cupo: ' + carrera.cupo + '\n' +
                sistema.getPatrocinadores(carrera.nombre);
            doc.text(doc.splitTextToSize(texto, 180), 10, 10);
            doc.save('inscripcion.pdf');
        }
    } else {
        alert('Complete todos los datos de inscripción.');
    }    
}

function mostrarEstadisticas() {
    const divEstadisticas = document.getElementById('containerEstadisticas');
    const divDatos = document.getElementById('containerDatos');
    divDatos.style.display = 'none';
    divEstadisticas.style.display = 'block';
    bttnDatos.style.backgroundColor = '#f0f0f0';
    bttnEstadisticas.style.backgroundColor = 'red';
}

function mostrarDatos() {
    const divEstadisticas = document.getElementById('containerEstadisticas');
    const divDatos = document.getElementById('containerDatos');
    divDatos.style.display = 'block';
    divEstadisticas.style.display = 'none';
    bttnDatos.style.backgroundColor = 'red';
    bttnEstadisticas.style.backgroundColor = '#f0f0f0';
}