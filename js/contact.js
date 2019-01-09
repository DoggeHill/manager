const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const notifyBtn = document.getElementById('add')

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'contact.html');
    let win = new BrowserWindow({
        width: 800, height:
            600
    })
    //Disable electron security warnings TODO:this should be edited for thr security reasons
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  
    win.on('close', function () { win = null; get_names(); })
    win.loadURL(modalPath)
   // win.webContents.openDevTools()
    win.show()
    console.log('jeeej2');

})


console.log('jeeej');