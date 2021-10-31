const api = "https://rickandmortyapi.com/api/character";

const getData = (apiUrl) => {
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      printData(json), printPagination(json.info);
    })
    .catch((error) => {
      console.log(error);
    });
};

const printData = (data) => {
  let html = "";
  data.results.forEach((character) => {
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
  document.getElementById("infoCharacters").innerHTML = html;
};

const printPagination = (info) => {
  let html = "";
  let prevDisabled = info.prev == null ? "disabled" : "";
  let nextDisabled = info.next == null ? "disabled" : "";

  html += `
    <li class="page-item ${prevDisabled}">
      <a class="page-link " style="cursor:pointer;" onclick="getData('${info.prev}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8.854 11.646l5.792-5.792a.5.5 0 01.854.353v11.586a.5.5 0 01-.854.353l-5.792-5.792a.5.5 0 010-.708z"></path></svg>Anterior</a>
    </li>
    <li class="page-item ${nextDisabled}">
      <a class="page-link" style="cursor:pointer;" onclick="getData('${info.next}')">Siguiente<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.146 12.354l-5.792 5.792a.5.5 0 01-.854-.353V6.207a.5.5 0 01.854-.353l5.792 5.792a.5.5 0 010 .708z"></path></svg></a>
    </li>
    `;
  document.getElementById("pagination").innerHTML = html;
};

getData(api);

let statusListen = document.getElementById("status");
const form = document.getElementById("formularioSearch");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("nombre").value;
  let status = document.getElementById("status").value;
  const urlChar = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`;
  const http = new XMLHttpRequest();
  http.open("GET", urlChar, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var div = document.getElementById("infoCharacters");
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      let data = JSON.parse(this.responseText);
      printPagination(data.info);
      printData(data);
    }
  };
});
// namePer.addEventListener("keyup", (e) => {
//   statusListen.addEventListener("keyup", (c) => {
//     const urlChar = `https://rickandmortyapi.com/api/character/?name=${e.target.value}&status=${c.target.value}`;
//     const http = new XMLHttpRequest();
//     http.open("GET", urlChar, true);
//     http.send();
//     http.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         var div = document.getElementById("infoCharacters");
//         while (div.firstChild) {
//           div.removeChild(div.firstChild);
//         }
//         let data = JSON.parse(this.responseText);
//         printPagination(data.info);
//         printData(data);
//       }
//     };
//   });
// });
