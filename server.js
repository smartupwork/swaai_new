
const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST'],
  },
});

let users = {}; // Stores online users { userId: socketId }

io.on('connection', socket => {

  // User joins with a unique ID
  socket.on('join', userId => {
    users[userId] = socket.id;
  });

  // Handle private messaging
  socket.on('send_message', ({senderId, receiverId, message}) => {
    const receiverSocketId = users[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', {senderId, message});
    } else {
    }
  });

  // Remove user on disconnect
  socket.on('disconnect', () => {
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

server.listen(3000, () => {
});
