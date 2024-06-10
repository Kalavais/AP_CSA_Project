const answer = [
  "abide", "admit", "adopt", "adult", "agent", "alarm", "album", "alert", "allow", "alone",
  "along", "alter", "amend", "ample", "angel", "anger", "angle", "annex", "apple", "argue",
  "arise", "armed", "aroma", "arrow", "aspen", "asset", "avoid", "bacon", "badge", "bagel",
  "baker", "banjo", "basic", "beach", "beast", "begin", "being", "belly", "berry", "bible",
  "birth", "black", "blade", "blame", "bless", "blind", "block", "bloom", "blood", "board",
  "boast", "bonus", "booth", "brain", "brass", "brave", "bread", "break", "breed", "bring",
  "broad", "brown", "brush", "buddy", "build", "burst", "cabin", "cable", "camel", "candy",
  "canon", "cargo", "carve", "catch", "cedar", "chain", "chair", "chalk", "charm", "chart",
  "chase", "cheap", "cheat", "check", "cheer", "chess", "chief", "child", "chill", "china",
  "choir", "chose", "cigar", "claim", "class", "clean", "clear", "clerk", "click", "clock",
  "close", "coach", "coast", "color", "couch", "could", "count", "court", "cover", "crack",
  "craft", "crane", "crash", "crazy", "cream", "creek", "crime", "crisp", "crowd", "crown",
  "cruel", "crush", "curve", "daily", "dance", "death", "debit", "debut", "decal", "decay",
  "decor", "delay", "demon", "depot", "depth", "derby", "devil", "diary", "diner", "dirty",
  "ditch", "dizzy", "donor", "doubt", "draft", "drain", "drama", "dream", "dress", "drill",
  "drink", "drive", "drown", "dutch", "eager", "early", "earth", "eight", "elbow", "elder",
  "elect", "elite", "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "essay",
  "event", "every", "exact", "exile", "exist", "extra", "faith", "fault", "favor", "feast",
  "fence", "fetch", "fiber", "field", "fifth", "fifty", "fight", "final", "first", "flame",
  "flank", "flash", "fleet", "flesh", "float", "flood", "flour", "focus", "force", "forge",
  "forth", "forty", "forum", "found", "frame", "fraud", "fresh", "front", "frost", "fruit",
  "funds", "funny", "gauge", "ghost", "giant", "given", "globe", "glory", "grace", "grade",
  "grain", "grand", "grant", "grape", "grass", "grave", "great", "green", "greet", "grief",
  "gross", "group", "guard", "guess", "guest", "guide", "happy", "harsh", "heart", "heavy",
  "honey", "horse", "hotel", "house", "human", "humor", "ideal", "image", "index", "inner",
  "input", "intro", "issue", "jeans", "joint", "judge", "juice", "knife", "knock", "known",
  "label", "labor", "large", "laser", "later", "laugh", "layer", "learn", "lease", "least",
  "leave", "legal", "level", "lever", "light", "limit", "local", "lodge", "logic", "loose",
  "lucky", "lunar", "
 // You can change this to any 5-letter word you want.
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

    // Remove validation of guessWord
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
