let answer = "tapir";
let attempts = 0;
const maxAttempts = 6;

function handleKey(letter) {
    const guessInput = document.getElementById("guessInput");
    guessInput.value += letter.toUpperCase();
}

function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }

    attempts++;
    const result = checkGuessWord(answer, guess);
    displayFeedback(result);

    if (result.every(letter => letter === "G")) {
        setTimeout(() => {
            alert(`Congratulations! You guessed the word: ${answer}`);
        }, 100);
    } else if (attempts >= maxAttempts) {
        setTimeout(() => {
            alert(`Out of attempts! The word was: ${answer}`);
        }, 100);
    }
}

function checkGuessWord(answer, guess) {
    const result = [];
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess[i]) {
            result.push("G"); // Correct letter and position (Green)
        } else if (answer.includes(guess[i])) {
            result.push("Y"); // Correct letter but wrong position (Yellow)
        } else {
            result.push("R"); // Incorrect letter (Red)
        }
    }
    return result;
}

function displayFeedback(result) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.innerHTML = result
        .map(letter => `<span class="${letter === "G" ? "green" : letter === "Y" ? "yellow" : "red"}">${letter}</span>`)
        .join(" ");
}
