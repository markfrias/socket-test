const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    
        socket.broadcast.emit('user connected', 'someone connected')
    
  
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user disconnected', "Someone disconnected. Sad." );
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    
});

http.listen(3000, () =>{
    console.log('Listening on *:3000');
});