const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/chat.html');
});

io.on('connection', (socket) => {
    socket.on('msg', (msg) => {
        socket.broadcast.emit('msg', msg);
    });
});

http.listen(3000, function () {
    console.log('Rodando');
});

