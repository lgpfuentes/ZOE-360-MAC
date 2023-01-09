const fs = require('fs');
const path = require("path");
const { shell } = require('electron')
var ini = require('ini');

/* -------- CONFIG.INI ---------*/
var config = ini.parse(fs.readFileSync(path.resolve(__dirname, "../src/config.ini"), 'utf-8'));

/*---- Anexo 24 ----*/
var anexo30 = config.Anexo30;
var anexo24ruta = config.Anexo24.path;

/*---- Directory ----*/
let inputPath = document.getElementById('inputPath');
let savePath = document.getElementById('savePath');

inputPath.value = path.resolve(__dirname, anexo24ruta);
/*console.log(inputPath.value)*/

/*savePath.addEventListener('', e => {
    config.Anexo24.path = inputPath.value.replace(/\\/g, "/");
    fs.writeFileSync((path.resolve(__dirname, "../src/config.ini")), ini.stringify(config))
})
*/

