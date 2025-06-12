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
    const divDatos = document.getElementById('divDatos');
    const divEstadisticas = document.getElementById('divEstadisticas');

    bttnDatos.addEventListener('click', () => {
        divDatos.style.display = 'block';
        divEstadisticas.style.display = 'none';
        bttnDatos.style.backgroundColor = 'red';
        bttnEstadisticas.style.backgroundColor = '#f0f0f0';
    });

    bttnEstadisticas.addEventListener('click', () => {
        divDatos.style.display = 'none';
        divEstadisticas.style.display = 'block';
        bttnDatos.style.backgroundColor = '#f0f0f0';
        bttnEstadisticas.style.backgroundColor = 'red';
    });
}


function agregarCarrera() {
    let form = document.getElementById('formCarrera');
    let nombre = document.getElementById('nombreCarrera').value;
    let depto = document.getElementById('deptoCarrera').value;
    let fecha = document.getElementById('fechaCarrera').value;
    let cupo = document.getElementById('cupoCarrera').value;
    
    if(form.checkValidity()) {
        let carrera = new Carrera(nombre, depto, fecha, cupo);
        console.log(carrera);
        sistema.agregarCarrera(carrera);
        form.reset();
        alert('Carrera agregada exitosamente');
        let selects = document.querySelectorAll('.selectCarreras');
        selects.forEach(select => {
            let option = document.createElement('option');
            option.value = carrera.nombre;
            option.text = carrera.nombre;
            select.appendChild(option);            
        });
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