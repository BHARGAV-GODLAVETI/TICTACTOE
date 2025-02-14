const board = document.getElementById("board");
const message = document.getElementById("message");
const winnerText = document.getElementById("winner-text");
const playAgainButton = document.getElementById("play-again");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        if (cell) {
            cellElement.dataset.value = cell;
        }
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameState[index] !== "" || checkWinner()) return;
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.dataset.value = currentPlayer;
    event.target.classList.add("taken");
    
    if (checkWinner()) {
        winnerText.textContent = `${currentPlayer} Wins!`;
        message.style.display = "block";
        playAgainButton.style.display = "block";
        return;
    }

    if (!gameState.includes("")) {
        winnerText.textContent = "It's a Draw!";
        message.style.display = "block";
        playAgainButton.style.display = "block";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.style.display = "none";
    playAgainButton.style.display = "none";
    createBoard();
}

createBoard();
