const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // saveText: (textVal) => ipcRenderer.send('saveText', textVal),
  // openFile: () => ipcRenderer.invoke('dialog:openFile')
  openFile: (callback) => ipcRenderer.on('open-file', callback),
  saveFile: (callback) => ipcRenderer.on('save-file', callback),
  require: (callback) => window.require(callback)
})
