// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const {Server} = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*', // Allow all origins for development
//     methods: ['GET', 'POST'],
//   },
// });

// // Store active users
// let users = {};

// io.on('connection', socket => {
//   console.log(`User Connected: ${socket.id}`);

//   // Assign user to a unique ID
//   socket.on('join', userId => {
//     users[userId] = socket.id;
//     console.log(`User ${userId} connected with socket ID: ${socket.id}`);
//   });

//   // Listen for private messages
//   socket.on('send_message', data => {
//     const {receiverId, senderId, message} = data;
//     const receiverSocketId = users[receiverId];

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit('receive_message', {senderId, message});
//     } else {
//       console.log(`User ${receiverId} not found`);
//     }
//   });

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     for (let userId in users) {
//       if (users[userId] === socket.id) {
//         delete users[userId];
//         break;
//       }
//     }
//     console.log('User Disconnected:', socket.id);
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running on port 3000');
// });



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
  console.log(`User Connected: ${socket.id}`);

  // User joins with a unique ID
  socket.on('join', userId => {
    users[userId] = socket.id;
    console.log(`User ${userId} connected with Socket ID: ${socket.id}`);
  });

  // Handle private messaging
  socket.on('send_message', ({senderId, receiverId, message}) => {
    const receiverSocketId = users[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', {senderId, message});
    } else {
      console.log(`User ${receiverId} is not online`);
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
    console.log('User Disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
