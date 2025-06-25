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

    document.getElementById('idCarreraConsulta')
        .addEventListener('change', consultarInscriptos);
    document.getElementById('idOrdenNombre')
        .addEventListener('change', consultarInscriptos);
    document.getElementById('idOrdenNumero')
        .addEventListener('change', consultarInscriptos);

    google.charts.load('current', {
        'packages': ['geochart']
    });
    google.charts.setOnLoadCallback(dibujarMapa);
    document.querySelectorAll('input[name="mapa"]').forEach(radio => {
        radio.addEventListener('change', dibujarMapa);
    });
    consultarInscriptos();
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
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const texto = 
                'Número: ' + carrera.numero + '\n' +
                'Nombre: ' + corredor.nombre + ' ' + corredor.edad + ', CI: ' + corredor.cedula + ' ' + corredor.fechaFicha + '\n' +
                corredor.tipo + '\n' +
                'Carrera: ' + carrera.nombre + ' en ' + carrera.departamento + ' el ' + carrera.fecha + ' Cupo: ' + carrera.cupo + '\n' +
                sistema.getPatrocinadores(carrera.nombre);
            doc.text(doc.splitTextToSize(texto, 180), 10, 10);
            doc.save('inscripcion.pdf');
            alert('Número: ' + carrera.numero + 
                "\nNombre: " + corredor.nombre + " " + corredor.edad + " años, CI: " + corredor.cedula + " Ficha Medica " + corredor.fechaFicha +
                "\n" + corredor.tipo + 
                "\nCarrera: " + carrera.nombre + " en " + carrera.departamento + " el " + carrera.fecha + " Cupo: " + carrera.cupo +
                "\n" + sistema.getPatrocinadores(carrera.nombre)
            );
            carrera.numero++;
        }
    } else {
        alert('Complete todos los datos de inscripción.');
    }    
}

function dibujarMapa() {
    let selected = document.querySelector('input[name="mapa"]:checked').value;
    let dataRows = [];

    if (selected == 'mapaCarreras') {
        dataRows = dataRows.concat(getCarrerasPorDepartamento());
    } else {
        dataRows = dataRows.concat(getInscripcionesPorDepartamento());
    }

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Region');
    data.addColumn('number', selected == 'mapaCarreras' ? 'Carreras' : 'Inscripciones');
    data.addColumn({type: 'string', role: 'tooltip'});
    data.addRows(dataRows);

    const options = {
        region: 'UY',
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: {
            minValue: 0,
            maxValue: 1,
            colors: ['#e0f3f8', '#08306b'] // light blue to dark blue
        },
        width: 600,
        height: 400 
    };

    const chart = new google.visualization.GeoChart(document.getElementById('containerMapa'));
    chart.draw(data, options);
}

function getCarrerasPorDepartamento() {
    const departamentos = [
        ['UY-MO', 'Montevideo'],
        ['UY-AR', 'Artigas'],
        ['UY-CA', 'Canelones'],
        ['UY-CL', 'Cerro Largo'],
        ['UY-CO', 'Colonia'],
        ['UY-DU', 'Durazno'],
        ['UY-FD', 'Florida'],
        ['UY-FS', 'Flores'],
        ['UY-LA', 'Lavalleja'],
        ['UY-MA', 'Maldonado'],
        ['UY-PA', 'Paysandú'],
        ['UY-RN', 'Río Negro'],
        ['UY-RO', 'Rocha'],
        ['UY-RV', 'Rivera'],
        ['UY-SA', 'Salto'],
        ['UY-SJ', 'San José'],
        ['UY-SO', 'Soriano'],
        ['UY-TA', 'Tacuarembó'],
        ['UY-TT', 'Treinta y Tres']
    ];

    let resultados = [];
    for (let i = 0; i < departamentos.length; i++) {
        let [codigo, nombre] = departamentos[i];
        let cantidad = sistema.getCantidadCarrerasPorDepartamento(nombre);
        resultados.push([codigo, cantidad, `${nombre}: ${cantidad} carreras`]);
    }

    return resultados;
}


function getInscripcionesPorDepartamento() {
    const departamentos = [
        ['UY-MO', 'Montevideo'],
        ['UY-AR', 'Artigas'],
        ['UY-CA', 'Canelones'],
        ['UY-CL', 'Cerro Largo'],
        ['UY-CO', 'Colonia'],
        ['UY-DU', 'Durazno'],
        ['UY-FD', 'Florida'],
        ['UY-FS', 'Flores'],
        ['UY-LA', 'Lavalleja'],
        ['UY-MA', 'Maldonado'],
        ['UY-PA', 'Paysandú'],
        ['UY-RN', 'Río Negro'],
        ['UY-RO', 'Rocha'],
        ['UY-RV', 'Rivera'],
        ['UY-SA', 'Salto'],
        ['UY-SJ', 'San José'],
        ['UY-SO', 'Soriano'],
        ['UY-TA', 'Tacuarembó'],
        ['UY-TT', 'Treinta y Tres']
    ];

    let resultados = [];
    for (let i = 0; i < departamentos.length; i++) {
        let [codigo, nombre] = departamentos[i];
        let cantidad = sistema.getCantidadInscripcionesPorDepartamento(nombre);
        resultados.push([codigo, cantidad, `${nombre}: ${cantidad} inscripciones`]);
    }

    return resultados;
}

function mostrarEstadisticas() {
    const divEstadisticas = document.getElementById('containerEstadisticas');
    const divDatos = document.getElementById('containerDatos');
    divDatos.style.display = 'none';
    divEstadisticas.style.display = 'block';
    bttnDatos.style.backgroundColor = '#f0f0f0';
    bttnEstadisticas.style.backgroundColor = 'red';
    actualizarCarrerasConMasInscriptos();
    promedio();
    actualizarCarrerasSinInscriptos();
    let porcentajeElite = calcularPorcentajeElite();
    document.getElementById('idPorcentajeElite').innerHTML = porcentajeElite + '%';

}

function mostrarDatos() {
    const divEstadisticas = document.getElementById('containerEstadisticas');
    const divDatos = document.getElementById('containerDatos');
    divDatos.style.display = 'block';
    divEstadisticas.style.display = 'none';
    bttnDatos.style.backgroundColor = 'red';
    bttnEstadisticas.style.backgroundColor = '#f0f0f0';
}
function actualizarCarrerasConMasInscriptos() {
    let ul = document.getElementById("IdMasInscriptos");
    ul.innerHTML = "";  // limpio la lista

    let listaConConteo = [];
    for (let i = 0; i < sistema.carreras.length; i++) {
        let carrera = sistema.carreras[i];
        let cont = 0;
        for (let j = 0; j < sistema.inscripciones.length; j++) {
            if (sistema.inscripciones[j].carreras.nombre === carrera.nombre) {
                cont = cont + 1;
            }
        }
        listaConConteo.push({ carrera: carrera, cantidad: cont });
    }

    let maxInscriptos = 0;
    for (let i = 0; i < listaConConteo.length; i++) {
        if (listaConConteo[i].cantidad > maxInscriptos) {
            maxInscriptos = listaConConteo[i].cantidad;
        }
    }
    if (maxInscriptos === 0) {
        let li = document.createElement("li");
        li.textContent = "sin datos";
        ul.appendChild(li);
        return;
    }

    for (let i = 0; i < listaConConteo.length; i++) {
        if (listaConConteo[i].cantidad === maxInscriptos) {
            let carrera = listaConConteo[i].carrera;
            let li = document.createElement("li");
            li.textContent = carrera.nombre
                              + " en " + carrera.departamento
                              + " el " + carrera.fecha
                              + " Cupo: " + carrera.cupo
                              + "\n" + 'Inscriptos: ' + sistema.getCantidadInscripciones(carrera.nombre);
            ul.appendChild(li);
        }
    }
}
function calcularPromedioInscriptosPorCarrera() {
    let totalInscriptos = 0;
    for (let i = 0; i < sistema.inscripciones.length; i++) {
        totalInscriptos = totalInscriptos + 1;
    }
    let cantidadCarreras = sistema.carreras.length;
    let promedio = 0;
    if (cantidadCarreras > 0) {
        promedio = totalInscriptos / cantidadCarreras;
    }
    return promedio;
}

function promedio() {
    // obtengo el promedio y lo redondeo a 2 decimales
    let promedio = calcularPromedioInscriptosPorCarrera().toFixed(2);
    document.getElementById("idPromedioInscripto").innerHTML = promedio.toString();
}

function actualizarCarrerasSinInscriptos() {
    let carrerasSinInscriptos = [];
    for (let i = 0; i < sistema.carreras.length; i++) {
        let carrera = sistema.carreras[i];
        let cont = 0;
        for (let j = 0; j < sistema.inscripciones.length; j++) {
            if (sistema.inscripciones[j].carreras.nombre === carrera.nombre) {
                cont = cont + 1;
            }
        }
        if (cont === 0) {
            carrerasSinInscriptos.push(carrera);
        }
    }
    carrerasSinInscriptos.sort(function(a, b) {
        if (a.fecha < b.fecha) {
            return -1;
        } else {
            return 1;
        }
    });

    let ul = document.getElementById("IdOrdenados");
    ul.innerHTML = "";  // limpio lista previa

    for (let i = 0; i < carrerasSinInscriptos.length; i++) {
        let carrera = carrerasSinInscriptos[i];
        let li = document.createElement("li");
        let texto = carrera.nombre +
                    ' en ' + carrera.departamento +
                    ' el ' + carrera.fecha +
                    ' Cupo: ' + carrera.cupo;
        li.textContent = texto;
        ul.appendChild(li);
    }
}
function calcularPorcentajeElite() {
    let cantidadElite = 0;
    let totalCorredores = sistema.corredores.length;
    let porcentajeFinal = '0.00';

    if (totalCorredores > 0) {
        for (let i = 0; i < sistema.corredores.length; i++) {
            if (sistema.corredores[i].tipo === 'Elite') {
                cantidadElite++;
            }
        }
        let porcentaje = (cantidadElite * 100) / totalCorredores;
        porcentajeFinal = porcentaje.toFixed(2);
    }

    return porcentajeFinal;
}

function consultarInscriptos() {
  let selectCarrera = document.getElementById('idCarreraConsulta');
  let nombreCarrera = selectCarrera.value;
  let lista = [];

  for (let i = 0; i < sistema.inscripciones.length; i++) {
    if (sistema.inscripciones[i].carreras.nombre === nombreCarrera) {
      lista.push(sistema.inscripciones[i]);
    }
  }

  if (document.getElementById('idOrdenNombre').checked) {
    lista.sort(function(a, b) {
      if (a.corredores.nombre < b.corredores.nombre) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    lista.sort(function(a, b) {
      if (a.carreras.numero < b.carreras.numero) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  let tabla = document.getElementById('tablaDatos');
  let viejoTbody = tabla.querySelector('tbody');
  if (viejoTbody) {
    tabla.removeChild(viejoTbody);
  }

  let tbody = document.createElement('tbody');
  for (let i = 0; i < lista.length; i++) {
    let ins = lista[i];
    let fila = document.createElement('tr');

    if (ins.corredores.tipo === 'Elite') {
      fila.classList.add('elite');
    }

    let tdNombre  = document.createElement('td');
    let tdEdad    = document.createElement('td');
    let tdCedula  = document.createElement('td');
    let tdFicha   = document.createElement('td');
    let tdNumero  = document.createElement('td');

    tdNombre.textContent = ins.corredores.nombre;
    tdEdad.textContent   = ins.corredores.edad;
    tdCedula.textContent = ins.corredores.cedula;
    tdFicha.textContent  = ins.corredores.fechaFicha;
    tdNumero.textContent = ins.carreras.numero;

    fila.appendChild(tdNombre);
    fila.appendChild(tdEdad);
    fila.appendChild(tdCedula);
    fila.appendChild(tdFicha);
    fila.appendChild(tdNumero);
    tbody.appendChild(fila);
  }

  tabla.appendChild(tbody);
}