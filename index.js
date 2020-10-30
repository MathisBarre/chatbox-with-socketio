const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('Nouvel utilisateur connecté');
  socket.broadcast.emit('user connected')
  socket.on('chat message', (msg) => {
    console.log('Chat message : ' + msg);
    socket.broadcast.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
    socket.broadcast.emit('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('Http server listening on *:3000')
})