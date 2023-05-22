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

const prioridad = document.querySelector('#prioridad2');

prioridad.addEventListener('change',selectPriority);

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

const tarea = document.querySelector('#tarea2');
tarea.addEventListener('input',handleKeyPress);

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

