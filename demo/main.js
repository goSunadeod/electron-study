const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  ipcMain.on('asynchronous-message', (event, arg) => {
    const reply = arg.split('').reverse().join('');
    console.log('reply: ', reply);
    event.sender.send('asynchronous-reply', reply);
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
