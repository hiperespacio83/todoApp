const ulListado = document.querySelector('#listado');

function cargarListado (pLista,pDom) {
    pLista.forEach(element => {
        printOneElement(element,pDom);
    });
}

function printOneElement (pElement,pDom) {
    pDom.innerHTML+=`<li class="list-group-item list-group-item-primary d-flex justify-content-between">${pElement.titulo}<button id="eliminar" class="btn btn-danger">Eliminar</button></li>`;

}

cargarListado(listaTareas,ulListado);