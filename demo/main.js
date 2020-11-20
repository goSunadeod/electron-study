const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const isDev = process.env.ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  if (isDev) {
    win.loadURL(`http://localhost:3000`);
  } else {
    win.loadFile(path.resolve(__dirname, './dist/index.html'));
  }
  win.webContents.openDevTools()

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
