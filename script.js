const answer = "tapir";
let attempts = 0;

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

    if (result === "GGGGG") {
        alert(`Congratulations! You guessed the word: ${answer}`);
    } else if (attempts >= 6) {
        alert(`Out of attempts! The word was: ${answer}`);
    }
}

function checkGuessWord(answer, guess) {
    let result = "";
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess[i]) {
            result += "G"; // Correct letter and position (Green)
        } else if (answer.includes(guess[i])) {
            result += "Y"; // Correct letter but wrong position (Yellow)
        } else {
            result += "R"; // Incorrect letter (Red)
        }
    }
    return result;
}

function displayFeedback(result) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.innerHTML = result
        .split("")
        .map(letter => `<span class="${letter === "G" ? "green" : letter === "Y" ? "yellow" : "red"}">${letter}</span>`)
        .join(" ");
    
    const wordGrid = document.getElementById("wordGrid");
    const wordBlocks = wordGrid.querySelectorAll(".word-block");

    for (let i = 0; i < result.length; i++) {
        const color = result[i] === "G" ? "green" : result[i] === "Y" ? "yellow" : "red";
        wordBlocks[i].style.backgroundColor = color;
    }
}
