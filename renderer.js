// 此文件是index.html文件所必需的，并将在该窗口的渲染器进程中执行。
//此过程中没有可用的Node.js API，因为`nodeIntegration`已关闭。 使用`preload.js`
//有选择地启用渲染中所需的功能处理。
const { remote, ipcRenderer } = window.require('electron');

// 引入 ipcRenderer 模块。
document.getElementById('button').onclick = function () {
  var message = document.getElementById('message').value;
  // 使用 ipcRenderer.send 向主进程发送消息。
  ipcRenderer.send('asynchronous-message', message);
}

// 监听主进程返回的消息
ipcRenderer.on('asynchronous-reply', function (event, arg) {
  alert(arg);
});

// 引入 remote 模块
console.log(remote, ipcRenderer)
// 获取主进程中的 BrowserWindow 对象
var BrowserWindow = remote.BrowserWindow;
// 创建一个渲染进程
var win = new BrowserWindow({ width: 500, height: 300 });
win.loadURL('http://nodejh.com');