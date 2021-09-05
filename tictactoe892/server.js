/* jshint esversion: 6 */

var X = "&#10006;";
var O = "O";

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(express.static('tictactoe892'));

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

var players = [];

var serverState = [];

for (var i = 0; i < 9; i++) {
    serverState.push("");
} 






var turn = 0;

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
        resetState();
    }

    else {
        io.to(socket.id).emit('set board', {state: serverState, turn: turn});
    }
    

    socket.on('clicked box', (data) => {
        serverState = data.state;
        serverState[data.index] = data.turn? O : X;
        turn = !data.turn;
        console.log(serverState);
        console.log(`Box ${data.index} was clicked!`);
        io.emit('clicked box', serverState);
    });

    socket.on('restart requested', (senderId) => {
        console.log('Restart requested, forwarding request...');
        let receiverId = !senderId;
        receiverSocket = players.filter((player) => player.userId == receiverId)[0];
        io.to(receiverSocket.id).emit('restart requested');
    });

    socket.on('restart accepted', () => {
        console.log('Restart accepted, resetting...');
        resetState();
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


function resetState() {
    for (var i = 0; i < 9; i++) {
        serverState[i] = "";
    }
    io.emit('reset board');
}