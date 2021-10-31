const api = "https://rickandmortyapi.com/api/character";

const getData = (apiUrl) => {
  //fetch recibe un Request info que seria la informacion del la url
  return (
    fetch(apiUrl)
      //Obtenemos la informacion de la url cuando esta responde conexito de lo contrario utilizamos el cath para capturar el error
      .then((response) => response.json())
      //Convertimos la informacion en un json
      .then((json) => {
        printData(json), printPagination(json.info);
      })
      .catch((error) => {
        console.log(error);
      })
  );
};
// Construyo una arrow function para imprimir los datos que son pasados en getData
const printData = (data) => {
  let html = "";
  //Recorremos el array de datos con un forEach
  data.results.forEach((character) => {
    //Construimos el html con la estuctura de las cards
    html += `
      <div class="col-4 mt-2">
        <div class="card bg-success" style="width:13 rem;">
          <img src="${character.image}" class="card-img-top rounded-circle  " alt="...">
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text ">Genero: ${character.gender} <br> Status: ${character.status}<br> Species: ${character.species}<br> Origin: ${character.origin.name}</p>

          </div>
        </div>
      </div>
    `;
  });
  //Insertamos el incremento de los datos en el html especificado en el id infoCharacters que es un div container
  document.getElementById("infoCharacters").innerHTML = html;
};

// Construyo una arrow function para imprimir la paginacion que son pasados en getData o por el evento submit
const printPagination = (info) => {
  //Inicializacion del la variable html
  let html = "";
  //Realizacion de un ternario para saber si la pagina tiene pagina siguiente o atras como una Lista doblemente enlazada
  let prevDisabled = info.prev == null ? "disabled" : "";
  let nextDisabled = info.next == null ? "disabled" : "";
  //Construimos el html con la estructura de la paginacion
  html += `
    <li class="page-item ${prevDisabled}">
      <a class="page-link " style="cursor:pointer;" onclick="getData('${info.prev}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8.854 11.646l5.792-5.792a.5.5 0 01.854.353v11.586a.5.5 0 01-.854.353l-5.792-5.792a.5.5 0 010-.708z"></path></svg>Anterior</a>
    </li>
    <li class="page-item ${nextDisabled}">
      <a class="page-link" style="cursor:pointer;" onclick="getData('${info.next}')">Siguiente<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.146 12.354l-5.792 5.792a.5.5 0 01-.854-.353V6.207a.5.5 0 01.854-.353l5.792 5.792a.5.5 0 010 .708z"></path></svg></a>
    </li>
    `;
  //Insertamos la paginacion en el html
  document.getElementById("pagination").innerHTML = html;
};

//Evento que se ejecuta al cargar la pagina
getData(api);

//Evento que se ejecuta al presionar el boton submit en este caso busqueda por nombre y por status
let statusListen = document.getElementById("status");
const form = document.getElementById("formularioSearch");
form.addEventListener("submit", (e) => {
  //Prevenimos el comportamiento por defecto del formulario (Recargar pagina)
  e.preventDefault();
  //Apuntamos a los datos que contiene el formulario y los guardamos en unas variable
  let name = document.getElementById("nombre").value;
  let status = document.getElementById("status").value;
  //Construimos la url con los datos que se obtienen del formulario
  const urlChar = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`;
  const http = new XMLHttpRequest();
  //Abrimos la conexion con la url
  http.open("GET", urlChar, true);
  //Enviamos la peticion
  http.send();
  //Escuchamos el cambio de estado de la peticion
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //Obtenemos la informacion de la peticion
      let div = document.getElementById("infoCharacters");
      //Remuevo la informacion que renderizo getData para mostrar la busqueda
      while (div.firstChild) {
        //elimino todos los hijos del div
        div.removeChild(div.firstChild);
      }
      let data = JSON.parse(this.responseText);
      //Imprimo la paginacion de la busqueda
      printPagination(data.info);
      //Imprimo la informacion de la busqueda
      printData(data);
    }
  };
});
