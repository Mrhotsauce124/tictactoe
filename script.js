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

    const reset = () => {
        for (var i = 0; i < state.length; i++) {
            state[i].setState("");
            state[i].removeWinColor();
        }
    };

    // Checks if any of the win conditions were met or the board is full
    const checkResult = () => {

        if (!isWin() && isFull()) {
            return "draw";
        }
    };


    function isFull() {
        for (var i = 0; i < state.length; i++) {
            if (state[i].getState() == "") return false;
        }
        return true;
    }

    function isWin() {
        // Created local variables before OR'ing them together in order to make sure all win patterns are colored
        let rowWin = checkRows();
        let columnWin = checkColumns();
        let diagonalWin = checkDiagonals();

        if (rowWin || columnWin || diagonalWin) return true;
        else return false;
    }

    function checkRows() {
        let win = false;
        // Loop over rows
        for (var i = 0; i < state.length; i += 3) {
            // Check if all elements in the row are nonempty and the same, color them if they are
            if (state[i].getState() != "") {

                if (state[i].getState() == state[i+1].getState() && state[i+1].getState() == state[i+2].getState()) {

                    state[i].setWinColor();
                    state[i+1].setWinColor();
                    state[i+2].setWinColor();
                    win = true;

                }
            }
        }

        return win;

    }

    function checkColumns() {
        let win = false;
        // Loop over rows
        for (var i = 0; i < 3; i += 1) {
            // Check if all elements in the row are nonempty and the same, color them if they are
            if (state[i].getState() != "") {

                if (state[i].getState() == state[i+3].getState() && state[i+3].getState()== state[i+6].getState()) {

                    state[i].setWinColor();
                    state[i+3].setWinColor();
                    state[i+6].setWinColor();
                    win = true;

                }
            }
        }

        return win;

    }

    function checkDiagonals() {
        let win = false;
        if (state[4].getState() != "") {
            if (state[0].getState() == state[4].getState() && state[4].getState() == state[8].getState()) {
                state[0].setWinColor();
                state[4].setWinColor();
                state[8].setWinColor();
            }

            if (state[2].getState() == state[4].getState() && state[4].getState() == state[6].getState()) {
                state[2].setWinColor();
                state[4].setWinColor();
                state[6].setWinColor();
            }

        } 
        return win;
    }

    return {display, checkResult, reset};
})();


// Factory function for a single box of the tic tac toe grid
function createGameBox() {
    let gameBox = document.createElement("div");
    gameBox.classList.add("game-box");
    gameBox.innerHTML = "";
    gameBox.addEventListener("click", updateBox);


    function updateBox() {
        if (gameBox.innerHTML != "") return;
        else {
            updateSymbol();
            updateTurn();
        }
    }

    function updateSymbol() {
        gameBox.innerHTML = currentTurn? O : X;
    }

    const setState = (symbol) => {
        gameBox.innerHTML = symbol;
    };

    const getState = () => {
        return gameBox.innerHTML;
    };

    const displayBox = (grid) => {
        grid.appendChild(gameBox);
    };

    const setWinColor = () => {
        gameBox.classList.add("win-color");
    };

    const removeWinColor = () => {
        gameBox.classList.remove("win-color");
    };


    const endGame = (result) => {

    };
    

    return {setState, displayBox, getState, setWinColor, removeWinColor};
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
    gameBoard.checkResult();
    currentTurn = !currentTurn;
}

