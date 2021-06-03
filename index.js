const express = require('express')
const app = express()
const cors = require('cors')
//const ws = require('ws')
const SocketIO = require('socket.io')
const Game = require('./game')

const corsOptions = {
    origin: 'http://localhost:8080'
}
//const wsServer = new ws.Server({ noServer: true });

app.use(cors())//corsOptions
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use((req, res, next) => {
//    res.wss = wsServer
//    next()
//})

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Rock-Paper-Scissors API'
    })
})

const http = require('http').createServer(app)
const io=SocketIO(http, {
    cors: {}
})

/*const messages = [];
io.on('connection', (socket) => {
    console.log('Got a connection!')

    socket.on('message', (arg) => {
        console.log('Received message: ', arg)
        //setTimeout(() => {
        //    socket.emit('serverMessage', 'Hello frm server')//send to 1 client
        //},2000)
        
        const message = `${socket.id} is on screen ${arg.screen}`
        messages.push(message)
        io.emit('serverMessage', message)//send to all clients
    })
    socket.emit('serverMessages', messages)//send to single client
})*/

let game = new Game(io)
const PORT = process.env.PORT || 8081

//wsServer.on('connection', socket => {
//    socket.on('message', message => console.log(message));
//})

const server = http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

//server.on('upgrade', (request, socket, head) => {
//    wsServer.handleUpgrade(request, socket, head, socket => {
//        wsServer.emit('connection', socket, request)
//    })
//})

