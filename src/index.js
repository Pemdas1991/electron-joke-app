const { app, BrowserWindow } = require('electron');
const axios = require('axios');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      
    }
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function fetchJoke() {
  axios.get('https://official-joke-api.appspot.com/random_joke')
    .then(response => {
      const setup = response.data.setup;
      const punchline = response.data.punchline;

      mainWindow.webContents.send('joke', `${setup}\n\n${punchline}`);
    })
    .catch(error => {
      console.error(error);
    });
}

exports.fetchJoke = fetchJoke;


const { ipcMain } = require('electron');

ipcMain.on('fetchJoke', () => {
  fetchJoke();
});
