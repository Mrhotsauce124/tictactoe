/* jshint esversion: 6 */
const express = require('express');

const app = express();

app.use(express.static('tictactoe892'));

const port = process.env.port || 3000;


app.get('/', (req, res) => {
    res.send("Hello, World!");
});


app.listen(port, function() {
    console.log(`Listening on Port ${port}`);
  });

/*
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile('index.html', {root: __dirname});
});

app.get('/script.js', (req, res) => {
    res.statusCode = 200;
    res.sendFile('script.js', {root: __dirname});
});


app.get('/styles.css', (req, res) => {
    res.statusCode = 200;
    res.sendFile('styles.css', {root: __dirname});
});


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});*/