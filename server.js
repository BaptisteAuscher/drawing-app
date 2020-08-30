const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const routes = require('./routes')
const dotenv = require('dotenv')

const app = express();
const server = http.createServer(app);
const options = { /* ... */ };
const io = socketio(server);

dotenv.config('.env')
//app.engine('view', require('ejs').renderFile)
//app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes)


const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });
});

server.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
});