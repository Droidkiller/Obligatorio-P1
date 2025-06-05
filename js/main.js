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
    debugger
    let form = document.getElementById('formCarrera');
    let nombre = document.getElementById('nombreCarrera').value;
    let depto = document.getElementById('deptoCarrera').value;
    let fecha = document.getElementById('fechaCarrera').value;
    let cupo = document.getElementById('cupoCarrera').value;
    
    if(form.checkValidity()) {
        sistema.agregarCarrera(new Carrera(nombre, depto, fecha, cupo));
        form.reset();
        alert('Carrera agregada exitosamente');
    } else {
        alert('No se pudo agregar la carrera. Revise los datos ingresados.');
    }
}