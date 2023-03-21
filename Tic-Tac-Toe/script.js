const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [ //0-based indexing as this is an array
    [0,1,2], //here are all possible winning combinations 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements  = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame() // for initial hover at the start of game

restartButton.addEventListener('click', startGame) //when click call startGame function 

function startGame(){
    circleTurn = false; // to start game with cross
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)          /*for restart*/
        cell.classList.remove(CIRCLE_CLASS)     /*for restart*/
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true}) //enables action to be executed only once.
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show') //for restart
}

function handleClick(e){
    // for a normal check of only once true : console.log('clicked')

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    // Place Mark
    placeMark(cell,currentClass)
    // Check For Win
    if(checkWin(currentClass)){
        // for a check : console.log('winner')
        endGame(false)
    }else if(isDraw()){
        // Check For Draw
        endGame(true)
    }else{
        // Switch Turns
        swapTurns()
         // To Get The Hover
        setBoardHoverClass()
    } 
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }else{
        winningMessageTextElement.innerText = `${circleTurn? "O's":"X's"} Wins!`
    }
    winningMessageElement.classList.add('show'); //last page
}

function isDraw(){
    return [...cellElements].every(cell => { /* destructing array: cellElements is not an array but to traverse it we can make it an array by
        writing it this way [...cellElements] */
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass); //to actually mark cross and zero on board
}

function swapTurns(){
    circleTurn = !circleTurn // to switch between cross and zero 
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS) //not x
    board.classList.remove(CIRCLE_CLASS) //not circle
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS) //show circle hover
    }else{
        board.classList.add(X_CLASS) //show cross hover
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => { //some - any of the combination specified, combination is an parameter here
        return combination.every(index => { 
            return cellElements[index].classList.contains(currentClass) //the combination has to be of same currentclass in order to win.
        })
    })
}