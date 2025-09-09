const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onAddTask: (callback) => ipcRenderer.on('add-task', callback),
  onShuffleTasks: (callback) => ipcRenderer.on('shuffle-tasks', callback)
})
