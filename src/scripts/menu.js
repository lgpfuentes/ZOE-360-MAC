const fs = require('fs');
const path = require("path");
const { shell } = require('electron');
const jsini = require('js-ini');
var ini = require('ini');
const { isEmptyObject } = require('jquery');
const { parse } = require('path');
const { url } = require('inspector');
const swal2 = require('sweetalert');
const { text } = require('stream/consumers');
const ipc2 = window.require('electron').ipcRenderer;
let zoeExp = document.getElementById('zoe-exp');
let zoe30 = document.getElementById('zoe-30');
let anexo24 = document.getElementById('anexo24');
const menuRfcExp = document.querySelector('.menu-rfc-exp');
const menuRfcA30 = document.querySelector('.menu-rfc-a30');
const menuRfcA24 = document.querySelector('.menu-rfc-a24');
const modules = document.querySelectorAll('.modules');
const rfcList1 = document.querySelector('.menu-1');
const rfcList2 = document.querySelector('.menu-2');
const rfcList3 = document.querySelector('.menu-3');
const tituloExp = document.getElementById('titleExp');
const tituloA30 = document.getElementById('titleA30');
const tituloA24 = document.getElementById('titleA24');
const pag1 = document.querySelector('.pag1');
const pag2 = document.querySelector('.pag2');
const pag3 = document.querySelector('.pag3');
let fondo = document.getElementById('fondo_pantalla');
var lenguage = localStorage.getItem('lang');
localStorage.active = fondo;

$("#imgAnexo24").attr("src", localStorage.getItem('urlAnexo24')).width(parseInt(343, 10)).height(160, 10);
$("#imganexo30").attr("src", localStorage.getItem('urlAnexo30')).width(parseInt(200, 10)).height(349, 10);
$("#imgExp").attr("src", localStorage.getItem('urlExpDigital')).width(parseInt(264, 10)).height(254, 10);

 function closeSesion(){
  swal2({
    title: lenguage == 'en' ? "Are you sure you want to log out?" : "¿Estas seguro que quieres cerrar sesión?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    buttons: [lenguage == "en" ? "Cancel" : "Cancelar", lenguage == "en" ? "Yes" : "Si"],
  })
  .then((willDelete) => {
    if (willDelete) {
        localStorage.user = '';
        localStorage.password = '';
        localStorage.name = '';
        localStorage.lastName = '';
        localStorage.Company = '';
        localStorage.phone = '';
        localStorage.email = '';
        localStorage.removeItem('contador');
        location.href = './login.html';
    } 
  });        
} 

function loadExplorer() {
    shell.openExternal(anexo24ruta);
}

/* -------- CONFIG.INI ---------*/
var config = ini.parse(fs.readFileSync(path.resolve(__dirname, "../src/config.ini"), 'utf-8'));

/*---- Anexo 30 y expedientes ----*/
var expedientes = config.Expedientes;
var anexo30 = config.Anexo30;
var anexo24ruta = config.Anexo24.path;

/*---- Anexo 24 ----*/
var configAnexo24 = ini.parse(fs.readFileSync(path.resolve(__dirname, anexo24ruta + "integra.ini"), 'utf-8'));
var empresasAnexo24 = configAnexo24.Empresas;

loopIni(expedientes, rfcList1, "modal_expedientes");
loopIni(anexo30, rfcList2, "modal_anexo_30");
//loopIni(empresasAnexo24, rfcList3, "modal_anexo_24"); Quita el acceso a anexo 24
emptyObject(expedientes, tituloExp, menuRfcExp, pag1);
emptyObject(anexo30, tituloA30, menuRfcA30, pag2);
emptyObject(empresasAnexo24, tituloA24, menuRfcA24, pag3);

function emptyObject(menu, title, list, pag) {
  const isMyObjectEmpty = Object.keys(menu).length === 0;
  
  if(isMyObjectEmpty) {
    title.innerHTML = "Opción no disponible";
    list.classList.add("empty");
    pag.classList.add("hidden");
  }
}

function loopIni(iniKey, menu, attributeId) {
  for(var key in iniKey) {    
      var empresa = config[iniKey[key]];
      const li = document.createElement("li");
      li.innerHTML = `${iniKey[key]}`;
      if(attributeId === 'modal_anexo_24'){
        li.setAttribute("data",anexo24ruta);
      }
      //if(iniKey[key] === key){
        for(var emp in empresa){
          if(emp === 'Expedientelink' && attributeId === 'modal_expedientes'){
            li.setAttribute("data",empresa[emp]);
          }
          if(emp === 'anexo30link' && attributeId === 'modal_anexo_30'){
            li.setAttribute("data",empresa[emp]);
          }
          if(emp === 'serverIP' && attributeId === 'modal_anexo_24'){
            li.setAttribute("data-ip",empresa[emp]);
          }
        }
      //}    

      li.setAttribute("data-open",attributeId);
      menu.appendChild(li);
      //console.log(li.outerHTML);    
    }
  }


/* -------- RFC MENU ---------*/

const menu_rfc_exp = document.getElementById('menu-rfc-exp');
const menu_rfc_a30 = document.getElementById('menu-rfc-a30');
const menu_rfc_a24 = document.getElementById('menu-rfc-a24');
const exit = document.getElementById('exit');

display(menu_rfc_exp, zoeExp);
display(menu_rfc_a30, zoe30);
display(menu_rfc_a24, anexo24);

function display(menu_rfc, componente) {
  componente.addEventListener('click', function() {
    menu_rfc.style.display = 'block';
  })

  window.addEventListener('mouseup',function(event){
    var pag = document.getElementById('pagination-container');
    var pagNum = document.getElementById("pagination-numbers");
    if((event.target != menu_rfc && event.target.parentNode != menu_rfc) && (event.target != pag && event.target.parentNode != pag) && (event.target != pagNum && event.target.parentNode != pagNum)){
        menu_rfc.style.display = 'none';
    }
  })
}

/* ------ Paginacion ------ */
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 3;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.className = "hidden";
  /*pageNumber.innerHTML = index;*/
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
  
const conf = document.querySelector('.configuration');

// Function that will be called on click 
// event of "Go to settings window" button
function goToSettingsWindow(){
  
  // Make sure to do ipc.send('some String'), 
  // where 'some String' must be same with 
  // the first parameter of ipcMain.on() in app.js 
  ipc2.send('openChildWindow');  
}