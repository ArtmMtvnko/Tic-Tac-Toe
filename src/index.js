import './index.html'
import './styles/index.scss'

const sells = document.querySelectorAll('.tic-tac-toe__cell')

sells.forEach(sell => sell.onclick = () => {
    if (sell.innerText !== '') return
    sell.innerText = 'X'

    let x = sell.getAttribute('x')
    let y = sell.getAttribute('y')

    board[y][x] = sell.innerText
    console.log(board)
})

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const human = 'X'
const AI = '0'

function AIMove() {
    let bestScore = -Infinity
    let bestMove
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = AI
                let score = minimax(board)
                board[i][j] = ''
                if (score > bestScore) {
                    bestScore = score
                    bestMove = { i, j }
                }
            }
        } 
    }
    board[bestMove.i][bestMove.j] = AI
}

function minimax(board, depth, isMaximize) {
    if (isWin(board)) return 1

    if (isMaximize) {

    } else {

    }
}

function isWin(board) {
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) return true
    if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) return true
    if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) return true
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) return true
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) return true
    if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) return true
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true
    return false
}

AIMove()

console.log(board)

