const chalk = require('chalk')
const argv = require('yargs').argv

width = argv.width
height = argv.height

const randomState = (width, height) => {
  const grid = []
  for (let y = 0; y < height; y++) {
    grid.push([])
    for (let x = 0; x < width; x++) {
      grid[y][x] = Math.round(Math.random())
    }
  }
  return grid
}

const render = (board) => {
  let print = ''
  for (let y = 0; y < height; y++) {
    let currentLine = ''
    for (let x = 0; x < width; x++) {
      if (board[y][x] === 0) {
        currentLine += chalk.red('█')
      } else {
        currentLine += chalk.green('█')
      }
    }
    print += currentLine + '\n'
  }
  console.log(print)
  return board
}

const isAlive = (board, height, width) => {
  let exists = false
  if (board[height] && board[height][width]) {
    exists = true
  }
  if (exists && board[height][width] === 1) {
    return 1
  } else {
    return 0
  }
}

const nextBoardState = (board) => {
  render(board)
  const newBoard = []
  for (let y = 0; y < height; y++) {
    newBoard.push([])
    for (let x = 0; x < width; x++) {
      let sum = 0

      sum = isAlive(board, y - 1, x) + isAlive(board, y - 1, x + 1) + isAlive(board, y, x + 1) + isAlive(board, y + 1, x + 1) + isAlive(board, y + 1, x) + isAlive(board, y + 1, x - 1) + isAlive(board, y, x - 1) + isAlive(board, y - 1, x - 1)

      if (board[y][x] === 1 && sum === 2) {
        newBoard[y][x] = 1
      } else if (sum === 3) {
        newBoard[y][x] = 1
      } else {
        newBoard[y][x] = 0
      }
    }
  }

  render(newBoard)
  nextBoardState(newBoard)
}

nextBoardState(randomState(width, height))
