const { contextBridge, ipcMain, ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }


})

// Index Bridge para invocar la función de abrir Explorador
/*let indexBridge = {
  loadExplorer: async () => {
    await ipcRenderer.invoke("loadExplorer");
  }
}

contextBridge.exposeInMainWorld("indexBridge", indexBridge);

// Evento para cerrar app
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('close-app').addEventListener('click', () => {
      ipcRenderer.invoke('quit-app');
  });
});

  //zoeExp.href = array[0];

window.addEventListener('DOMContentLoaded', () => {
  let zoeExp = document.getElementById('zoe-exp');
  ipcRenderer.invoke('txt');
})*/
