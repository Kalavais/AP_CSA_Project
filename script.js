const words = ["apple", "grape", "melon", "berry", "lemon"];
const answer = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentTile = 0;
let gameActive = true;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");

function createBoard() {
    for (let i = 0; i < 30; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}`);
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

    const enterButton = document.createElement("button");
    enterButton.textContent = "Enter";
    enterButton.classList.add("key", "wide");
    enterButton.addEventListener("click", handleEnterPress);
    keyboard.appendChild(enterButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Del";
    deleteButton.classList.add("key", "wide");
    deleteButton.addEventListener("click", handleDeletePress);
    keyboard.appendChild(deleteButton);
}

function handleKeyPress(key) {
    if (!gameActive || currentTile >= 5) return;
    const tile = document.getElementById(`tile-${currentRow * 5 + currentTile}`);
    tile.textContent = key;
    currentTile++;
}

function handleDeletePress() {
    if (!gameActive || currentTile === 0) return;
    currentTile--;
    const tile = document.getElementById(`tile-${currentRow * 5 + currentTile}`);
    tile.textContent = "";
}

function handleEnterPress() {
    if (!gameActive || currentTile < 5) return;
    const guess = [];
    for (let i = 0; i < 5; i++) {
        guess.push(document.getElementById(`tile-${currentRow * 5 + i}`).textContent);
    }
    const guessWord = guess.join("");
    if (!words.includes(guessWord)) {
        alert("Invalid word!");
        return;
    }

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow * 5 + i}`);
        const key = tile.textContent;
        if (answer[i] === key) {
            tile.classList.add("correct");
        } else if (answer.includes(key)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (guessWord === answer) {
        alert("Congratulations! You guessed the word!");
        gameActive = false;
        return;
    }

    currentRow++;
    currentTile = 0;

    if (currentRow >= 6) {
        alert(`Game over! The word was: ${answer}`);
        gameActive = false;
    }
}

createBoard();
createKeyboard();

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleEnterPress();
    } else if (e.key === "Backspace") {
        handleDeletePress();
    } else if (e.key.match(/^[a-z]$/) && e.key.length === 1) {
        handleKeyPress(e.key);
    }
});
