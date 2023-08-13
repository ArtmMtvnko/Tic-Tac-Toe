import './index.html'
import './styles/index.scss'


const human = 'X'
const AI = 'O'

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const boardBody = document.querySelector('.tic-tac-toe__body')
const cells = document.querySelectorAll('.tic-tac-toe__cell')

const resetBtn = document.querySelector('#resetBtn')
const gameResultField = document.querySelector('#gameResult')

resetBtn.onclick = () => {
    boardBody.classList.remove('cover')

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = ''
        }
    }

    cells.forEach(cell => cell.innerText = '')
}

cells.forEach(cell => cell.addEventListener('click', () => {
    if (cell.innerText !== '') return
    cell.innerText = human

    let x = cell.getAttribute('x')
    let y = cell.getAttribute('y')

    board[y][x] = human
    
    let isWin = checkWinner(board)
    if (isWin !== null) {
        boardBody.classList.add('cover')
        gameResultField.innerText = isWin + ' wins!'
    } else {
        AIMove()
    }
}))

function convertToLinerArr(row, column) {
    return 3 * row + column
}

function AIMove() {
    let bestScore = -Infinity
    let move
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = AI
                let score = minimax(board, 0, false) // false
                board[i][j] = ''
                if (score > bestScore) {
                    bestScore = score
                    move = { i, j }
                }
            }
        } 
    }
    board[move.i][move.j] = AI
    cells[convertToLinerArr(move.i, move.j)].innerText = board[move.i][move.j]
}

const scores = {
    X: -1,
    O: 1,
    tie: 0
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinner(board)
    if (result !== null) {
        return scores[result]
    }

    if (isMaximizing) {
        let bestScore = -Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = AI
                    let score = minimax(board, depth + 1, false)
                    board[i][j] = ''
                    bestScore = Math.max(score, bestScore)
                }
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = human
                    let score = minimax(board, depth + 1, true)
                    board[i][j] = ''
                    bestScore = Math.min(score, bestScore)
                }
            }
        }
        return bestScore
    }
}

function equals3(a, b, c) {
    return (a === b && b === c && a !== '')
}

function checkWinner(board) {
    let winner = null

    // Rows
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0]
        }
    }
    
    // Columns
    for (let j = 0; j < 3; j++) {
        if (equals3(board[0][j], board[1][j], board[2][j])) {
            winner = board[0][j]
        }
    }

    // Diagonals
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0]
    }
    if (equals3(board[0][2], board[1][1], board[2][0])) {
        winner = board[0][2]
    }
    
    let freeSpaceCounter = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                freeSpaceCounter++
            }
        }
    }
    if (freeSpaceCounter === 0 && winner === null) return 'tie'
    
    return winner
}