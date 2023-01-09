const ipc3 = window.require('electron').ipcRenderer;
const español = document.getElementById('español');
const english = document.getElementById('english');
const langMenu = document.querySelector('.language__menu');
const langControl = langMenu.querySelectorAll('.language__control');
const espanol = document.getElementById('espanol');
const ingles = document.getElementById('ingles');
const dark = document.getElementById('oscuro');
const dinamico = document.getElementById('dinamico');
const sencillo = document.getElementById('sencillo');
const currentTheme = localStorage.getItem("theme");

let savedLang = localStorage.getItem('lang')

if(espanol && ingles){
  if(savedLang === 'en'){
    ingles.classList.add('active-lang');
  }
  if(savedLang === 'es'){
    espanol.classList.add('active-lang');
  }
}

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if(sencillo  && dinamico && dark){
    if(currentTheme === 'sencillo'){
      sencillo.classList.add('active-theme');
    }
    if(currentTheme === 'dinamico'){
      dinamico.classList.add('active-theme');
    }
    if(currentTheme === 'dark'){
      dark.classList.add('active-theme');
    }
  }
}

// idioma default
const defaultLocale = savedLang;


// idioma activo
let locale;

// se llena con las traducciones
let translations = {};

document.addEventListener("DOMContentLoaded", () => {

  // Traduce la app 
  setLocale(defaultLocale);
  bindLocaleSwitcher(defaultLocale);
});

// Carga las traducciones dado el idioma y la traduccion
async function setLocale(newLocale) {

  if (newLocale === locale) return;

  const newTranslations =

    await fetchTranslationsFor(newLocale);

  locale = newLocale;

  translations = newTranslations;

  translatePage();

}

// Adjunta las traducciones desde un archivo JSON object

async function fetchTranslationsFor(newLocale) {

  const response = await fetch(`../src/lang/${newLocale}.json`);

  return await response.json();

}

// Reemplaza el texto de cada elemento con el atributo data-i18n-key 
function translatePage() {

  document.querySelectorAll("[data-i18n-key]").forEach(translateElement);

}

// Traducir el elemento
function translateElement(element) {

  const key = element.getAttribute("data-i18n-key");

  const translation = translations[key];

  element.innerText = translation;
  element.placeholder = translation;
}

// Cuando el usuario selecciona un idioma,
// se cargan las traducciones y actualiza el app
function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector("[data-i18n-switcher]");
  const langControl = langMenu.querySelectorAll('.language__control');
  
  if(switcher){
    switcher.value = initialValue;
    langControl.forEach(e => {
      e.addEventListener("click", (event) => {
          setLocale(event.target.value);
          localStorage.setItem('lang', event.target.value);
          langControl.forEach(lang => {
            lang.classList.remove("active-lang")
          });
          e.classList.add("active-lang");
          ipc3.send('reloadWindow'); 
      })
    })

    switcher.onchange = (e) => {
      //console.log(e.target.value);

      setLocale(e.target.value);
      localStorage.setItem('lang', e.target.value);
    };
  }

}



if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

function changeBackground(theme) {
  //obtenemos los elementos que tienen la clase active-theme
  var active = document.getElementsByClassName('active-theme');
  //obtenemos el elemento que se selecciono
  var tobeactive = document.getElementById(theme);
  //Con el ciclo for quitamos la clase active theme a todos los elementos que la tengan
  for (let i = 0; i < active.length; i++) {
    active[i].classList.remove('active-theme');  
  }

  if(theme == 'sencillo'){
    document.documentElement.setAttribute("data-theme", "sencillo");
    localStorage.setItem("theme", "sencillo");
    tobeactive.classList.add('active-theme');
  }
  if(theme == 'oscuro'){
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    tobeactive.classList.add('active-theme');
  }
  if(theme == 'dinamico'){
    document.documentElement.setAttribute("data-theme", "dinamico");
    localStorage.setItem("theme", "dinamico");
    tobeactive.classList.add('active-theme');
  }

  ipc3.send('reloadWindow'); 

}
