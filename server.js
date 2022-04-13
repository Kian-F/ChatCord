const path = require('path')
const http = require('http')
// create a server
const express = require('express')
const socketio = require('socket.io')

//initialize a variable called app and set that to express
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// set static folder / __dirname is the current directory
app.use(express.static(path.join(__dirname, 'public')))

//Run when client connects / io.on listen to an event
io.on('connection', socket => {
  // emit welcome current user
  socket.emit('message', 'welcome to ChatCord')

  //Broadcast when a user is connected / This is to all clients except the clients that connecting
  socket.broadcast.emit('message', 'A user has joined the chat room')

  // Runs when client disconnect
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat room')
  })

  //Listen for chatMessage
  socket.on('chatMessage', msg => {
    io.emit('message', msg)
  })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=> console.log(`server listening on port ${PORT}`))