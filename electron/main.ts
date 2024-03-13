import { app, BrowserWindow, dialog, Menu, MessageBoxOptions } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })
  const menu = Menu.buildFromTemplate([
    {
      label: 'Archivo',
      submenu: [
        { label: 'Nuevo' },
        { label: 'Abrir' },
        { label: 'Recargar', role: 'reload' },
        { label: 'Opciones de desarrollo', role: 'toggleDevTools' },
        { label: 'Guardar' },
        { type: 'separator' },
        { label: 'Salir', accelerator: 'Ctrl+Shift+F4', click: () => app.quit() },
        {
          label: 'Ayuda', submenu:
            [
              { label: 'Acerca de', click: showAboutDialog }
            ]
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { label: 'Deshacer', role: 'undo' },
        { label: 'Rehacer', role: 'redo' },
        { type: 'separator' },
        { label: 'Cortar', role: 'cut' },
        { label: 'Copiar', role: 'copy' },
        { label: 'Pegar', role: 'paste' }
      ]
    },
    // ... Puedes agregar más elementos aquí.
  ]);
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.setMenu(menu);
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.setMenu(menu);
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

//
function showAboutDialog() {

  const options: MessageBoxOptions = {
    type: 'info',
    buttons: ['OK'],
    title: 'Acerca de',
    message: 'Agile flow - V1.0.0',
    detail: 'Agile Flow es una aplicación diseñada para llevar un control de las tareas asignadas, facilitando el seguimiento de las actividades y mejorar la productividad. Agile Flow ofrece una experiencia de usuario fluida y eficiente en múltiples plataformas.'
  };
  dialog.showMessageBox(options);
}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
