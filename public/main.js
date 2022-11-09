const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron")
const path = require('path')
// const fs = require('fs')

require('@electron/remote/main').initialize()

// for menu
const isMac = process.platform === 'darwin'
let openFilePath = ''

// ----------------------------------------------------END

async function handleOpen() {
  console.log('into Open file')
  const { canceled, filePaths } = await dialog.showOpenDialog()

  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

// function handleSaveText(_event, textVal) {
//   fs.writeFileSync("/Users/ccg/MySupport/CodePlace/web/markdown-editor/tests/test.md",
//     textVal.toString())
//   console.log('runing saveText')
// }

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      nodeIntegration: true,  // makd sure to use `path` and `fs` in react module
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // menu template ----------------------------------------
  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        {
          label: "open file", click: async () => {
            const filePath = await handleOpen()
            if (filePath) {
              win.webContents.send('open-file', filePath)
              openFilePath = filePath
            }
          }
        },
        {
          label: "save file", click: () => {
            if (openFilePath !== '') {
              console.log('using save file piple')
              win.webContents.send('save-file', openFilePath)
            }
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    }
  ]
  // END ---------------------------------------------



  // create menu
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  win.loadURL("http://localhost:3000")
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  // ipcMain.on('saveText', handleSaveText)  // recive message, can not return info
  // ipcMain.handle('dialog:openFile', handleOpen)  // recive message and can renturn info
  // ipcMain.on('save-content', handleSaveText)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  // clean open file path

  openFilePath = ""
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
