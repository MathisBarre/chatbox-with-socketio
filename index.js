const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const _ = require('lodash')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('Nouvel utilisateur connecté');
  socket.broadcast.emit('user connected')

  socket.on('chat message', (payload) => {
    console.log('Chat message : ' + payload.message);
    socket.broadcast.emit('chat message', payload);
  })

  socket.on('newUser', (pseudo) => {
    socket.emit('newUser', pseudo);
  })

  socket.on('removeUser', (pseudo) => {
    socket.emit('removeUser', pseudo);
  })

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
    socket.broadcast.emit('user disconnected')
  })
})
const port = process.env.PORT || 5000
http.listen(port, () => {
  console.log(`Http server listening on https://localhost:${port}`)
})