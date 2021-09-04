/* jshint esversion: 6 */
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(express.static('tictactoe892'));

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

var players = [];

var serverGameBoard;

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile('index.html', {root: __dirname});
});

io.on('connection', (socket) => {
    socket.userId = assignId(players);
    players.push(socket);
    io.to(socket.id).emit('set id', socket.userId);
    console.log(`A user connected with ID ${socket.userId}!`);
    printIds(players);

    if (socket.userId < 2) {
        console.log(`Resetting board`);
        io.emit('reset board');
    }
    



    socket.on('clicked box', (index) => {
        //serverGameBoard = gameBoard;
        console.log(`Box ${index} was clicked!`);
        io.emit('clicked box', index);
    });

    socket.on('disconnect', () => {
        players = players.filter((player) => player != socket);
        console.log('User disconnected.');
    });
});


app.get('/script.js', (req, res) => {
    res.statusCode = 200;
    res.sendFile('script.js', {root: __dirname});
});


app.get('/styles.css', (req, res) => {
    res.statusCode = 200;
    res.sendFile('styles.css', {root: __dirname});
});


server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});



function assignId(players) {
    let id = 0;
    
    while (players.some((player) => player.userId == id)) {
        id++;
    }

    return id;
}

function printIds(players) {
    let ids = [];

    for (var i = 0; i < players.length; i++) {
        ids.push(players[i].userId);
    }

    console.log(ids);
}
