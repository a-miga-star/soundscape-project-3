const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

io.on('connection', socket => {
  console.log('User connected');

  socket.on('play-sound', (soundName) => {
    socket.broadcast.emit('play-sound', soundName); // Send to others
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎧 Server running at http://localhost:${PORT}`);
});
