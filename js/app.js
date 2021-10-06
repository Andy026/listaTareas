//llamo a los elementos del html necesarios
let formulario = document.querySelector('#formTareas');
let tarea = document.querySelector('#tarea');
//creo un array vacio donde voy a poner las tareas
let tareas = [];
//les agrego un eventListener al input y form
formulario.addEventListener('submit', guardarTarea);
tarea.addEventListener('blur', () => {validarCampoRequerido(tarea)})
//ejecuto la función que trae valores agregados previamente al localStorage
cargaInicial();
//creo una función de validación simple
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
//creo la función que se encarga de tomar los datos ingresados en el formulario
function guardarTarea (e) {
    e.preventDefault();
    if (validarCampoRequerido) {
        agregarTarea();
    } else {
        console.log('error');
    }
}
//Función que limpia los valores ingresados del input
function limpiarFormulario () {
    //limpia los value de los elementos del form
    formulario.reset();
    //limpiar las clases de cada elemento del form
    tarea.className = 'form-control'
    //terminar de limpiar los inputs
}
//Funcion para traer elementos del localstorage a la sesión actual
function cargaInicial() {
    //si hay algo en localstorage lo llamo con getitem y si no hay nada llamamos a un array vacio
    tareas = JSON.parse(localStorage.getItem("tareasKey")) || [];
    //console.log(productos);
  
    //llamar a la función que crea filas
    tareas.forEach(itemProducto => {
      crearFila(itemProducto);
    })
}
//Creo una función que crea una tabla con los datos ingresados en el input
function crearFila(itemProducto) {
    console.log(itemProducto);
    //traigo el nodo padre que sería el tbody
    let tabla = document.querySelector("#tablaTareas");
    //console.log(tabla);
    tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.tarea}</th>
  </tr>`;
  }
//creo un objeto Tarea
class Tarea {
    constructor(tarea){
    this.tarea = tarea;
    }
}
//Pusheo la tarea ingresada al array, seteo la tarea en el localStorage y limpio el input del formulario
function agregarTarea () {
    let nuevaTarea = new Tarea (tarea.value)
    tareas.push(nuevaTarea);
    //console.log(tareas);
    localStorage.setItem('tareasKey', JSON.stringify(tareas));
    //limpiar el formulario
    limpiarFormulario();
    crearFila(nuevaTarea);

}
