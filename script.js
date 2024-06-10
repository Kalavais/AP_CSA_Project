let answer = "tapir"; // Change back to "tapir"
let currentRow = 0;
let currentTile = 0;
let gameActive = true;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

function createBoard() {
    for (let i = 0; i < 5; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("data-index", i);
        board.appendChild(tile);
    }
}

function createKeyboard() {
    const keys = "qwertyuiopasdfghjklzxcvbnm";
    keys.split("").forEach((key) => {
        const keyButton = document.createElement("button");
        keyButton.textContent = key;
        keyButton.classList.add("key");
        keyButton.setAttribute("data-key", key);
        keyButton.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(keyButton);
    });
}

function handleKeyPress(key) {
    if (!gameActive || currentTile >= 5) return;
    const tile = board.querySelector(`[data-index="${currentTile}"]`);
    tile.textContent = key.toUpperCase();
    currentTile++;
}

function handleEnterPress() {
    if (!gameActive || currentTile < 5) return;
    const tiles = Array.from(board.querySelectorAll(".tile"));
    const guess = tiles.map((tile) => tile.textContent.toUpperCase()).join("");
    
    const correctLetters = [...new Set(answer)].filter(letter => guess.includes(letter));
    const correctPositions = answer.split("").filter((letter, index) => guess[index] === letter);

    tiles.forEach((tile, index) => {
        if (correctPositions.includes(tile.textContent.toUpperCase())) {
            tile.classList.add("correct");
        } else if (correctLetters.includes(tile.textContent.toUpperCase())) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    });

    if (guess === answer.toUpperCase()) {
        displayMessage("Congratulations! You guessed the word!");
        gameActive = false;
        restartButton.style.display = "block";
    }

    currentRow++;
    currentTile = 0;

    if (currentRow >= 6) {
        displayMessage(`Game over! The word was: ${answer}`);
        gameActive = false;
        restartButton.style.display = "block";
    }
}

function displayMessage(msg) {
    message.textContent = msg;
}

function restartGame() {
    answer = "tapir"; // Reset back to "tapir"
    currentRow = 0;
    currentTile = 0;
    gameActive = true;
    message.textContent = "";
    restartButton.style.display = "none";
    const tiles = board.querySelectorAll(".tile");
    tiles.forEach((tile) => {
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    });
}

createBoard();
createKeyboard();

document.addEventListener("keydown", (e) => {
    if (!gameActive) return;
    if (e.key === "Enter") {
        handleEnterPress();
    } else if (e.key.match(/^[a-z]$/) && e.key.length === 1) {
        handleKeyPress(e.key);
    }
});

restartButton.addEventListener("click", restartGame);
