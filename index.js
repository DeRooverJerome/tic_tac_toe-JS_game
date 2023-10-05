const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = document.querySelector(".board");
let playedCells = Array(9).fill("");
let current_Player = "circle";
let restartButton = document.querySelector(".restart");
let gameStillRun = true;
let message = document.querySelector(".message");

// Create the board

function createBoard() {
  playedCells.forEach((_cell, index) => {
    let cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    board.append(cellElement);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(current_Player);
  e.target.append(goDisplay);
  current_Player = current_Player === "circle" ? "cross" : "circle";
  message.textContent = `${current_Player} turn`;
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allCells = document.querySelectorAll(".cell");
  winCombinations.forEach((array) => {
    const circleWins = array.every((cell) =>
      allCells[cell].firstChild?.classList.contains(".circle")
    );
    if (circleWins) {
      message = `Circles Wins !`;
      allCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
      return;
    }
  });

  winCombinations.forEach((array) => {
    const crossWins = array.every((cell) =>
      allCells[cell].firstChild?.classList.contains(".cross")
    );
    if (crossWins) {
      message = `Cross Wins !`;
      allCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
      return;
    }
  });
}
