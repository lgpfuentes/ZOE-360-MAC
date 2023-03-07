const electron = require('electron')
const path = require('path')
const notifyBtn = document.getElementById('anexo24');
var input_pass_login = document.getElementById("password_login");
var eye_login = document.getElementById("eye_login");

const $ = require("jquery");
const ipc = electron.ipcRenderer;

eye_login.addEventListener("click", function(){
  if(input_pass_login.type == "password"){
    input_pass_login.type = "text";
    eye_login.style.opacity = 0.8;
    eye_login.title = "Ocultar contraseña";
  }else{
    input_pass_login.type = "password";
    eye_login.style.opacity = 0.2;
    eye_login.title = "Mostrar contraseña";
  }
});

function maximizar(){
    ipc.send("maximizar", "maximizar ventana");
}
function minimizar(){
    ipc.send("minimizar", "minimizar ventana");
}
function cerrar(){
    ipc.send("cerrar", "cerrar ventana");
    localStorage.user = '';
    localStorage.company = '';
    localStorage.password = '';
    localStorage.name = '';
    localStorage.lastName = '';
    localStorage.phone = '';
    localStorage.email = '';
    localStorage.removeItem('contador');
}
/*notifyBtn.addEventListener('click', (event) => {
    createBrowserWindow();
});*/

$("#login__form").on( "submit", function( event ) {
    event.preventDefault();
    localStorage.user = document.getElementById("user").value;
    localStorage.password = document.getElementById("password_login").value;
    location.href = 'menu.html';
});

function createBrowserWindow() {
    const modalPath = path.join('file://', __dirname, 'index.html')
    const childWindow = window.open(modalPath, 'modal', 'width=800,height=400');
    childWindow.on('close', () => {childWindow = null})
}