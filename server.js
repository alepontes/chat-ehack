const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket)=>{
    console.log('Novo usuario', socket);
});

http.listen(3000, function () {
    console.log('Rodando');
});