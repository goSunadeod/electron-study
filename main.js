// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 渲染进程可以使用node
      enableRemoteModule: true // 开启remote
    }
  })

  // 加载应用的 index.html
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL(`file://${__dirname}/index.html`);


  // 启用开发者工具
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  ipcMain.on('asynchronous-message', (event, arg) => {
    const reply = arg.split('').reverse().join('');
    console.log('reply: ', reply);
    // 发送消息到主进程
    event.sender.send('asynchronous-reply', reply);
  });
})

// 关闭所有窗口时退出 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
