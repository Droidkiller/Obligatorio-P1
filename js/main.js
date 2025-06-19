/*
Autores: 
Francisco Lorenzo Bonanni (299134)
Aitana Alvarez (340201)
*/

window.addEventListener('load', inicio);
var sistema = new Sistema();
function inicio() {
    const bttnDatos = document.getElementById('bttnDatos');
    const bttnEstadisticas = document.getElementById('bttnEstadisticas');
    const bttnAgregarCarrera = document.getElementById('bttnAgregarCarrera');
    const bttnAgregarPatrocinador = document.getElementById('bttnAgregarPatrocinador');
    const bttnAgregarCorredor = document.getElementById('bttnAgregarCorredor');
    const bttnInscripcion = document.getElementById('bttnInscripcion'); 

    bttnAgregarCarrera.addEventListener('click', agregarCarrera);
    bttnAgregarPatrocinador.addEventListener('click', agregarPatrocinador);
    bttnAgregarCorredor.addEventListener('click', agregarCorredor);
    bttnEstadisticas.addEventListener('click', mostrarEstadisticas)
    bttnDatos.addEventListener('click', mostrarDatos);
    bttnInscripcion.addEventListener('click', agregarInscripcion);
}


function agregarCarrera() {
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
    
function agregarPatrocinador() {
    let form = document.getElementById('formPatrocinador');
    let nombre = document.getElementById('nombrePatrocinador').value;
    
    if(form.checkValidity()) {
        let patrocinador = new Patrocinador(nombre);
        console.log(patrocinador);
        sistema.agregarPatrocinador(patrocinador);
        form.reset();
        alert('Patrocinador agregado exitosamente');
    } else {
        alert('No se pudo agregar el patrocinador. Revise los datos ingresados.');
    }
}

function agregarCorredor() {
    let form = document.getElementById('formCorredor');
    let nombre = document.getElementById('nombreCorredor').value;
    let edad = document.getElementById('edad').value;
    let cedula = document.getElementById('cedula').value;
    let fecFicha = document.getElementById('fechaMedica').value;
    let tipo = document.querySelector('input[type = radio]:checked').value;

    if(form.checkValidity()) {
        let corredor = new Corredor(nombre, edad, cedula, fecFicha, tipo);
        console.log(corredor);
        sistema.agregarCorredor(corredor);
        form.reset();
        let select = document.getElementById('corredoresRegistrados');
        let option = document.createElement('option');
        option.value = corredor.cedula;
        option.text = corredor.getIdentificacion();
        select.appendChild(option);
        alert('Corredor agregado exitosamente');
    } else {
        alert('No se pudo agregar el corredor. Revise los datos ingresados.');
    }
}
function agregarInscripcion() {
    debugger
    let form = document.getElementById('ingresoInscripciones');
    let cedula = document.getElementById('corredoresRegistrados').value;
    let nombreCarrera = document.getElementById('carrerasRegistradas').value;

    if (!form.checkValidity()) {
        alert('Complete todos los datos de inscripción.');
        return;
    }

    let tempCorredores = [];
    let corArray = sistema.corredores;
    for (let i = 0; i < corArray.length; i++) {
        if (corArray[i].cedula === cedula) tempCorredores.push(corArray[i]);
    }
    let tempCarreras = [];
    let carArray = sistema.carreras;
    for (let i = 0; i < carArray.length; i++) {
        if (carArray[i].nombre === nombreCarrera) tempCarreras.push(carArray[i]);
    }
    if (tempCorredores.length === 0 || tempCarreras.length === 0) {
        alert('Corredor o carrera no encontrado.');
        return;
    }
    let corredor = tempCorredores[0];
    let carrera = tempCarreras[0];
    
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