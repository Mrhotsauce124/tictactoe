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
    gameBox.innerHTML = "";
    gameBox.addEventListener("click", updateTurn);
    gameBox.addEventListener("click", updateSymbol);

    function updateSymbol() {
        gameBox.innerHTML = currentTurn? X : O;
    }

    const setState = (symbol) => {
        gameBox.innerHTML = symbol;
    };

    const displayBox = (grid) => {
        grid.appendChild(gameBox);
    };

    return {setState, displayBox};
}


// Factory function for a player object

function createPlayer(ID_number, name = "Anonymous Player") {
    let ID = ID_number;
    let currentTurn = ID ? false : true;

    // TODO: change this to use more appropriate elements

    let playerBox = document.createElement("div");
    playerBox.classList.add(ID ? "player2-box" : "player1-box");

      
    let playerName = document.createElement("h1");
    let playerTurn = document.createElement("h2");
    

    playerBox.appendChild(playerName);
    playerBox.appendChild(playerTurn);
    playerName.textContent = name;
    playerTurn.textContent = currentTurn ? `Your turn` : `Their turn`;


    // TODO: add score
    


    const updateInfo = () => {
        playerName.textContent = name;
        playerTurn.textContent = currentTurn ? `Your turn` : `Their turn`;
    };  

    const nextTurn = () => {
        currentTurn = !currentTurn;
    };
    
    const displayInfo = () => {
        document.getElementById("main-div").appendChild(playerBox);
    };


    return {ID, currentTurn, displayInfo, nextTurn, updateInfo};

}



var player1 = createPlayer(0, "Player 1");

player1.displayInfo();

gameBoard.display();

var player2 = createPlayer(1, "Player 2");

player2.displayInfo();

var currentTurn = 0;


function updateTurn() {
    player1.nextTurn();
    player2.nextTurn();
    player1.updateInfo();
    player2.updateInfo();
    currentTurn = !currentTurn;
}

