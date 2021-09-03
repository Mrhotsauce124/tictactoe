/* jshint esversion: 6 */
const express = require('express');

const app = express();

app.use(express.static('tictactoe892'));

const PORT = process.env.PORT || 3000;

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


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});