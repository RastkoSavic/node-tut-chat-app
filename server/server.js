// Node Modules
const path = require('path');
const http = require('http');

// External Modules
const express = require('express');
const socketIO = require('socket.io');

// Utils Modules
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

// Setup Constants
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// Setup Variables
var app = express();
var server = http.createServer((app));
var io = socketIO(server);
var users = new Users();

// Express Setup
app.use(express.static(publicPath));

// Connection Event
io.on('connection', (socket) => {

    // Join Event
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // Join Emits
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
        socket.broadcast.to(params.room)
            .emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    // Create Message Event
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {

            // Emit New Message
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    // Create Location Message
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        // Emit New Location Message
        io.to(user.room)
            .emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });

    // Disconnect Event
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {

            // Disconnect Emits
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

// Server Start
server.listen(port, () => {
    console.log(`Server is up up up on port ${port}`);
});
