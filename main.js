
// Keyboard
const keys = document.querySelectorAll('#key')
const submit = document.querySelector('#key-enter')
const backspace = document.querySelector('#backspace')
const reset = document.querySelector('#reset')

// Game Board
const firstWord = document.querySelector('#word-1')
const secondWord = document.querySelector('#word-2')
const thirdWord = document.querySelector('#word-3')
const fourthWord = document.querySelector('#word-4')
const fifthWord = document.querySelector('#word-5')
const sixthWord = document.querySelector('#word-6')

const wordsDisplayed = [firstWord, secondWord, thirdWord, fourthWord, fifthWord, sixthWord]

// Set word
const wordList = ['frank', 'fraud', 'freak', 'freed', 'freer', 'fresh', 'friar', 'fried', 'frill', 'frisk', 'fritz', 'frock', 'frond', 'front', 'frost', 'froth']
let gameWord = ''
let gameActive = false

// Guesses
let currWord = []
let wordsGuessed = []

// Game States
const gamesWonDisplay = document.querySelector('#games-won')
const gamesLostDisplay = document.querySelector('#games-lost')
let gamesWon = 0
let gamesLost = 0

function setGameWord() {
    let randomNum = Math.floor(Math.random() * 16)
    gameWord = wordList[randomNum].toUpperCase()
    console.log(gameWord)
    return gameWord
}


function enterLetter(e) {
    if (gameActive) {
        const letter = e.target.innerText
        if (currWord.length < 5) {
            currWord.push(letter)
            letterOnScreen(currWord)
        } else {
            alert('Word can be only 5 letters.')
        }
    } else {
        alert('Push Play Button to Start')
    }
}

function deleteLetter(e) {
    removeOnScreen(currWord)
    currWord.pop()
}

function letterOnScreen(word) {
    let i = word.length - 1
    const selectRow = wordsGuessed.length
    const boxes = wordsDisplayed[selectRow].querySelectorAll('#letter')
    boxes[i].value = word[i]
}

function removeOnScreen(word) {
    let i = word.length - 1
    const selectRow = wordsGuessed.length
    const boxes = wordsDisplayed[selectRow].querySelectorAll('#letter')
    boxes[i].value = ""
}

function yellowOnScreen(position){
    const selectRow = wordsGuessed.length - 1
    const boxes = wordsDisplayed[selectRow].querySelectorAll('#letter')
    boxes[position].classList.add("bg-amber-300")
}

function greenOnScreen(position){
    const selectRow = wordsGuessed.length - 1
    const boxes = wordsDisplayed[selectRow].querySelectorAll('#letter')
    boxes[position].classList.add("bg-green-500")
}
function allGreen(){
    const selectRow = wordsGuessed.length
    const boxes = wordsDisplayed[selectRow].querySelectorAll('#letter')
    for (let i=0; i<5; i++) {
        boxes[i].classList.add("bg-green-500")
    }
}

function guessWord(e) {
    if (currWord.length < 5) {
        alert('Word can be only 5 letters.')
        return 0
    } else if (checkGame()) {
        if (currWord.length = 5) {
            wordsGuessed.push(currWord.join(''))
            checkGuess(currWord)
            resetCurrWord()
        } else {
            alert('Game Over.')
        }
    }
}

function resetCurrWord() {
    currWord = []
}

function checkGame() {
    if (currWord.join('') === gameWord) {
        allGreen(currWord)
        gamesWon += 1
        updateScore()
        alert(`Game Won! The word was ${gameWord}`)
        gameActive = false
        return gameActive
    } else if (wordsGuessed.length < 5) {
        return gameActive
    } else if (wordsGuessed.length === 5) {
        const lastGuess = wordsGuessed[wordsGuessed.length - 1];
        if (lastGuess === gameWord) {
            allGreen(currWord)
            gamesWon += 1
            updateScore()
            alert(`Game Won! The word was ${gameWord}`)
        } else {
            gamesLost += 1
            updateScore()
            alert(`No more guesses :( The word was ${gameWord}`)
        }
        gameActive = false
        return gameActive
    }
}

function checkGuess(word) {
    const gameWordArr = gameWord.split("")
    gameWordArr.forEach(letter => {
        if (word.includes(letter)) {
            const position = word.indexOf(letter)
            yellowOnScreen(position)
        }
    })

    for (let i=0; i<5; i++) {
        if (gameWordArr[i] === word[i]) {
            greenOnScreen(i)
        }
    }
}

function newGame() {
    const gameBoard = document.querySelectorAll('#letter')
    gameBoard.forEach((box) => {
        box.value = '' // clear values from board
        box.classList.remove('bg-amber-300', 'bg-green-500') // remove any existing color classes
    })
    wordsGuessed = []
    resetCurrWord()
    gameActive = true
    setGameWord()
}

function updateScore() {
    gamesWonDisplay.innerHTML = `<strong>Games Won: ${gamesWon}</strong>`
    gamesLostDisplay.innerHTML = `<strong>Games Lost: ${gamesLost}</strong>`
}

// Event listeners
keys.forEach(key => {
    key.addEventListener('click', enterLetter);
})

submit.addEventListener('click', guessWord)
backspace.addEventListener('click', deleteLetter)
reset.addEventListener('click', newGame)
