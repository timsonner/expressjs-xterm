const WebSocket = require('ws')
var os = require('os');
var pty = require('node-pty');

const wss = new WebSocket.Server({ port: 6060 })

console.log("Web socket is up and running...")

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    //   cwd: process.env.HOME,
    env: process.env,
});
wss.on('connection', ws => {
    console.log("new session")
    ws.on('message', command => {
        ptyProcess.write(command);
    })

    ptyProcess.on('data', function (data) {
        ws.send(data)
        console.log(data);

    });
})

const express = require('express')
const path = require('path')
const app = express()
let port = 3000

app.get('/', (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname,'/index.html'))
    } catch (error) {
        console.log('ERROR GETTING INDEX.HTML', error)
        res.sendStatus(400)
    }
})

app.get('/index.js', (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname,'/index.js'))
    } catch (error) {
        console.log('ERROR GETTING INDEX.JS', error)
        res.sendStatus(400)
    }
})

app.get('/css', (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname,'/node_modules/xterm/css/xterm.css'))
    } catch (error) {
        console.log('ERROR GETTING INDEX.JS', error)
        res.sendStatus(400)
    }
})

app.get('/xterm.js', (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname,'/node_modules/xterm/lib/xterm.js'))
    } catch (error) {
        console.log('ERROR GETTING XTERM.JS', error)
        res.sendStatus(400)
    }
})

// try using a rout to send the sigint to ptyProcess
app.get('/kill', (req, res) => {
    try {
        ptyProcess.write('^C')
        res.status(200).send('kill')
    } catch (error) {
        console.log('ERROR GETTING XTERM.JS', error)
        res.sendStatus(400)
    }
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

module.exports = {ptyProcess}