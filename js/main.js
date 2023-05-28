const ulListado = document.querySelector('#listado');
const btnEliminar = document.querySelectorAll('.btn-danger');
btnEliminar.forEach(btn=>btn.addEventListener('click',deleteTask));




let listaTareas=getTaskListLocalStorage();
cargarListado(listaTareas,ulListado);
console.log(listaTareas);

function cargarListado (pLista,pDom) {
    ulListado.innerHTML=" ";
    pLista.forEach(element => {
        printOneElement(element,pDom);
    });
     // Guardar el array en el almacenamiento local
    localStorage.setItem('listaTareas', JSON.stringify(pLista));
}

function getTaskListLocalStorage() {
  const taskList = JSON.parse(localStorage.getItem('listaTareas'))
  if (taskList !== null) {
      cargarListado(taskList,ulListado);
      return taskList;
      //me devuelve lo que esta guardado en el localstorage
  }
  return [];
}


function printOneElement (pElement,pDom) {


    // pDom.innerHTML+=`<li class="list-group-item ${color} d-flex justify-content-between">${pElement.titulo}</li>`;

    let li = document.createElement('li');
    li.classList.add("list-group-item","d-flex","justify-content-between");
    li.innerText=pElement.titulo;

 



    let button = document.createElement('button');
    button.classList.add("btn","btn-danger");
    button.innerText="Eliminar";
    button.id=pElement.titulo;
    button.addEventListener('click', (event) => {
      //button       li    ul                       li
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  })
  if (pElement.prioridad === 'diaria') {
    li.classList.add('list-group-item-success');
} else if (pElement.prioridad === 'mensual') {
  li.classList.add('list-group-item-primary');
} else {
  li.classList.add('list-group-item-danger');
}
    li.appendChild(button);
    pDom.appendChild(li);

    // <button id="${pElement.titulo}" class="btn btn-danger">Eliminar</button>
}



// Esta es la parte donde filtramos el listado por prioridades


const selectPrioridad = document.querySelector('#prioridad2');

selectPrioridad.addEventListener('change',selectPriority);

function selectPriority (event) {

    ulListado.innerHTML = " ";

    let prioridad = event.target.value;

    if ( prioridad === "diaria" || prioridad === "mensual" || prioridad === "urgente") {
        let listafiltrada = filtrarByPriority(listaTareas,prioridad);
        cargarListado(listafiltrada,ulListado);
    } else {
        cargarListado(listaTareas,ulListado);
    }

}


function filtrarByPriority(list, prioridad) {
    return list.filter(element => element.prioridad === prioridad);
}

// Esta parte es la de busqueda por input pulsando intro

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

  // Esta es la parte de añadir nueva tarea

  let prioridad=" ";
  let titulo=" ";
  let id = 0;

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

    
    id = listaTareas.length;
    let tarea = {id : id, titulo : titulo, prioridad: prioridad};
    listaTareas.push(tarea);
   
    
    cargarListado(listaTareas,ulListado);
    selectPrioridad1.value="";
    inputTarea1.value="";
   
  }



// Esta es la parte de eliminar tarea





  function deleteTask (event) {
    
    let titulo = event.target.id;
    let listaModificada = deleteByTitle(listaTareas,titulo);
    
    cargarListado(listaModificada,ulListado);
    
    
    
    console.log(listaModificada);
    console.log(listaTareas);
    console.log(btnEliminar);

  }

  function deleteByTitle (list,titulo){
    return list.filter ( element => element.titulo !== titulo);
  }

   
