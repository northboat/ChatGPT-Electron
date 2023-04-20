// preload.js

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  send: (jsonData) => ipcRenderer.invoke('send', jsonData),
});

//将消息显示在网页上
function setMessageInnerHTML(name, msg) {
  document.getElementById("message").innerHTML += "<strong>" + name + ":</strong><br>"
  document.getElementById('message').innerHTML += msg + '<br><br>';
}

ipcRenderer.on('back', (event, arg) => {
  // console.log('渲染进程收到的消息:',arg)
  setMessageInnerHTML('ChatGPT', arg)
})