/* jshint esversion: 6 */
const express = require('express');

const app = express();

app.use(express.static('tictactoe892'));

const port = 3000;

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile('tictactoe892/index.html', {root: __dirname});
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});