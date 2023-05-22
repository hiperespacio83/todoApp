const ulListado = document.querySelector('#listado');

function cargarListado (pLista,pDom) {
    pLista.forEach(element => {
        printOneElement(element,pDom);
    });
}

function printOneElement (pElement,pDom) {

    let color = " ";
    

    if (pElement.prioridad === 'diaria') {
        color = 'list-group-item-success';
    } else if (pElement.prioridad === 'mensual') {
        color = 'list-group-item-primary';
    } else {
        color = 'list-group-item-danger';
    }

    pDom.innerHTML+=`<li class="list-group-item ${color} d-flex justify-content-between">${pElement.titulo}<button id="eliminar" class="btn btn-danger">Eliminar</button></li>`;
}

// function getTaskListLocalStorage() {
//     const taskList = JSON.parse(localStorage.getItem('listaTareas'))
//     if (taskList !== null) {
//         cargarListado(taskList,ulListado);
//         return taskList;
//         //tengo algo guardado en el localstorage
//     }
//     return [];
// }

// listaTareas=getTaskListLocalStorage();

cargarListado(listaTareas,ulListado);

let id = 0;

const selectPrioridad = document.querySelector('#prioridad2');

selectPrioridad.addEventListener('change',selectPriority);

function selectPriority (event) {

    ulListado.innerHTML = " ";

    let prioridad = event.target.value;

    if ( prioridad !== " ") {
        let listafiltrada = filtrarByPriority(listaTareas,prioridad);
        cargarListado(listafiltrada,ulListado);
    } else {
        cargarListado(listaTareas,ulListado);
    }

}


function filtrarByPriority(list, prioridad) {
    return list.filter(element => element.prioridad === prioridad);
}

const inputTarea = document.querySelector('#tarea2');
inputTarea.addEventListener('input',handleKeyPress);

function handleKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 3) {
      event.preventDefault(); // Evita que se envíe el formulario

      ulListado.innerHTML=" ";

      let tarea = event.target.value;

      if (tarea!==" ") {
        let listafiltrada = searchTask(listaTareas,tarea);
        cargarListado(listafiltrada,ulListado);
      } else {
        cargarListado(listaTareas,ulListado);
      }
      
      console.log("Se pulsó la tecla Enter");
    }
  }

  function searchTask (list,tarea) {
    return list.filter(element => element.titulo.toLowerCase().includes(tarea.toLowerCase()));
  }

  let prioridad=" ";
  let titulo=" ";
  const inputTarea1 = document.querySelector('#tarea1');
  
  const selectPrioridad1 = document.querySelector('#prioridad1');


  inputTarea1.addEventListener('input',crearTituloTarea);

  function crearTituloTarea(event) {
    titulo = event.target.value;
  }
  selectPrioridad1.addEventListener('change',crearPrioridad);

  function crearPrioridad(event) {
    prioridad = event.target.value;
  }

 

  const btnGuardar = document.querySelector('#btn');

  btnGuardar.addEventListener('click',addNewTarea);

  

  function addNewTarea () {
    const tarea = new Tarea(id,titulo,prioridad);
    id++;
    listaTareas.push(tarea);
    ulListado.innerHTML=" ";
    cargarListado(listaTareas,ulListado);
  }

 
