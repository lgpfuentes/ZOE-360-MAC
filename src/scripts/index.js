const electron = require('electron')
const path = require('path')
const notifyBtn = document.getElementById('anexo24');

const $ = require("jquery");
const ipc = electron.ipcRenderer;

function maximizar(){
    ipc.send("maximizar", "maximizar ventana");
}
function minimizar(){
    ipc.send("minimizar", "minimizar ventana");
}
function cerrar(){
    ipc.send("cerrar", "cerrar ventana");
    localStorage.user = '';
    localStorage.password = '';
    localStorage.name = '';
    localStorage.lastName = '';
    localStorage.phone = '';
    localStorage.email = '';
}
/*notifyBtn.addEventListener('click', (event) => {
    createBrowserWindow();
});*/

$("#login__form").on( "submit", function( event ) {
    event.preventDefault();
    localStorage.user = document.getElementById("user").value;
    localStorage.password = document.getElementById("password").value;
    location.href = 'menu.html';
});

function createBrowserWindow() {
    const modalPath = path.join('file://', __dirname, 'index.html')
    const childWindow = window.open(modalPath, 'modal', 'width=800,height=400');
    childWindow.on('close', () => {childWindow = null})
}