// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, webContents, dialog } = require('electron')
const path = require('path')
const url = require('url');
const shell = require('electron').shell
const env = process.env.NODE_ENV || 'development';
const { Menu } = require('electron');
Menu.setApplicationMenu(null);
var ipc = require('electron').ipcMain;
const WindowPosition = require( 'electron-window-position');
//require('electron-reload')(__dirname);

let mainWindow = null;
let childWindow = null;
let toolbarWindow = null;
var position = new WindowPosition();

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    show: false,
    frame:false,
    icon: path.join(__dirname, '/LOGO_ZOE_360_con_modulos.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
  }); 

  // and load the index.html of the app.
  mainWindow.loadFile('src/login.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  function createChildWindow() {
    childWindow = new BrowserWindow({
      width: 900,
      height: 620,
      modal: true,
      show: false,
      transparent: true,
      frame: false,
      resizable: true,
      parent: mainWindow, 
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
  
    childWindow.loadFile("src/config_language.html");

    //childWindow.webContents.openDevTools()
    
    childWindow.once("ready-to-show", () => {
      childWindow.show();
    });
  }

  ipcMain.on("openChildWindow", (event, arg) => {
    createChildWindow();
  });

  function reloadWindow() {
    mainWindow.reload();
  }

  ipcMain.on("reloadWindow", (event, arg) => {
    reloadWindow();
  })
    
  /*var splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });

  splash.loadFile('/src/splash.html');
  splash.center();
  setTimeout(function () {
    splash.close();
    mainWindow.center();
    mainWindow.show();
  }, 15000); */

  const onCloseMainWindow = (event) => {
    var pos = position.display.bounds.width;
    var posy = position.display.bounds.height;
    toolbarWindow = new BrowserWindow({
        width: 150,
        height: 200,
        x:pos - 150, 
        y:posy - 200,
        minHeight:150, maxHeight:150,
        minWidth:200, maxWidth:200,
        resize: true,
        type: 'toolbar',
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          contextIsolation: false,
          nodeIntegration: true
        }
    });
  
    toolbarWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/boton360.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('close', (event) => {
      toolbarWindow.destroy();
    });

    mainWindow.on("restore", (event) => {
      toolbarWindow.destroy();
    });
  };

  mainWindow.on('minimize', onCloseMainWindow);
  mainWindow.on ('blur', () => { mainWindow.minimize(); });
  

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  })
  // and load the index.html of the app.
  // mainWindow.loadFile('src/login.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  /*
  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
          {label: 'Adjust Notification Value'},
          {
              label: 'Zoé It Customs',
              click() {
                shell.openExternal('https://www.zoeitcustoms.com/es/')
              }
          },
          {type: 'separator'},
          {
              label: 'Exit',
              click() {
                app.quit()
              }
          },
          {
              label: 'Info'
          }
      ]
    }
  ])

  Menu.setApplicationMenu(menu);
  */
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

});
//restaurar ventana
ipcMain.on('restore', () => { 
  mainWindow.restore();
});
//minimizar ventana
ipcMain.on('minimizar', () => { 
  mainWindow.minimize();
});
//maximizar ventana
ipcMain.on('maximizar', () => { 
  if(mainWindow.isMaximized()){
    mainWindow.restore();
  }else{
    mainWindow.maximize();
  }
});
//cerrar ventana
ipcMain.on('cerrar', () => { 
  mainWindow.close();
});
ipcMain.on('cerrarConfig', () => { 
  childWindow.close();
});

ipcMain.on('close-me', (evt, arg) => {
  // close our app!
   app.quit();
});

// Abrir la ruta de anexo 24
/*ipcMain.handle("loadExplorer", () => {
  shell.openExternal("file://c:/Program Files/WinRAR/WinRAR.exe");
});*/

// Proceso para cerrar la app
/*ipcMain.handle('quit-app', () => {
  app.quit();
});*/

/*ipcMain.handle('txt', () => {
  var fs = require('fs');
  var array = fs.readFileSync('../ZOE-360-app/src/conf.txt').toString().split("\n");

  let zoeExp = document.getElementById('zoe-exp');
  

})*/

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Tu también puedes ponerlos en archivos separados y requerirlos aquí.