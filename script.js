/*jshint esversion: 6 */



// Global variables for X and O symbols
var X = "&#10006;";
var O = "O";
// Game board module
const gameBoard = (() => {
    let grid = document.getElementById("game-board");

    // The state of the board is controlled by an array of divs that detect clicks and display symbols
    let state = [];
    for (var i = 0; i < 9; i++) {
        let newBox = createGameBox();
        state.push(newBox);
    }
    

    const display = () => {
        grid.innerHTML = ``;
        for (var i = 0; i < state.length; i++) {
            state[i].displayBox(grid);
        }
    };

    return {display};
})();

// Factory function for a single box of the tic tac toe grid
function createGameBox() {
    let gameBox = document.createElement("div");
    gameBox.classList.add("game-box");
    gameBox.innerHTML = X;

    const setState = (symbol) => {
        gameBox.innerHTML = symbol;
    };

    const displayBox = (grid) => {
        grid.appendChild(gameBox);
    };

    return {setState, displayBox};
}


gameBoard.display();