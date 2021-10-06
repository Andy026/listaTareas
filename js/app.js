let formulario = document.querySelector('#formTareas');
let tarea = document.querySelector('#tarea');
let tareas = [];

formulario.addEventListener('submit', guardarTarea);
tarea.addEventListener('blur', () => {validarCampoRequerido(tarea)})

cargaInicial();

function validarCampoRequerido(input) {
    console.log(input);
    if (input.value.trim().length > 0 && input.value.trim().length >= 3) {
        //console.log("el dato es correcto");
        input.className = "form-control is-valid";
        return true;
    } else {
        console.log("el dato es erroneo");
        input.className = "form-control is-invalid";
        return false;
    }
}

function guardarTarea (e) {
    e.preventDefault();
    if (validarCampoRequerido) {
        agregarTarea();
    } else {
        console.log('error');
    }
}

function limpiarFormulario () {
    //limpia los value de los elementos del form
    formulario.reset();
    //limpiar las clases de cada elemento del form
    tarea.className = 'form-control'
    //terminar de limpiar los inputs
}

function cargaInicial() {
    //si hay algo en localstorage lo llamo con getitem y si no hay nada llamamos a un array vacio
    tareas = JSON.parse(localStorage.getItem("tareasKey")) || [];
    //console.log(productos);
  
    //llamar a la función que crea filas
    tareas.forEach(itemProducto => {
      crearFila(itemProducto);
    })
}

function crearFila(itemProducto) {
    console.log(itemProducto);
    //traigo el nodo padre que sería el tbody
    let tabla = document.querySelector("#tablaTareas");
    //console.log(tabla);
    tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.tarea}</th>
  </tr>`;
  }

class Tarea {
    constructor(tarea){
    this.tarea = tarea;
    }
}

function agregarTarea () {
    let nuevaTarea = new Tarea (tarea.value)
    tareas.push(nuevaTarea);
    //console.log(tareas);
    localStorage.setItem('tareasKey', JSON.stringify(tareas));
    //limpiar el formulario
    limpiarFormulario();
    crearFila(nuevaTarea);

}
