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
let restartButton = document
  .querySelector(".restart")
  .addEventListener("click", restartGame);
let gameStillRun = true;
let message = document.querySelector(".message");

// Creation board avec une classe cell et un id de l'index pour chaque cell

function createBoard() {
  message.textContent = `Welcome, ${current_Player} begin`;
  playedCells.forEach((_, index) => {
    let cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.id = index;
    cellElement.addEventListener("click", addPone);
    board.append(cellElement);
  });
}
createBoard();

// Evenement au clic pour ajouter une div de classe circle ou cross

function addPone(e) {
  if (!gameStillRun) {
    return;
  }
  const PoneDisplay = document.createElement("div");
  PoneDisplay.classList.add(current_Player);
  e.target.append(PoneDisplay);
  playedCells[e.target.id] = current_Player;
  current_Player = current_Player === "circle" ? "cross" : "circle";
  message.textContent = `${current_Player}'s turn`;
  e.target.removeEventListener("click", addPone);
  checkWin();
}

// Condition de victoire

function checkWin() {
  let isDraw = true;
  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (
      playedCells[a] &&
      playedCells[a] === playedCells[b] &&
      playedCells[a] === playedCells[c]
    ) {
      message.textContent = `${playedCells[a]} wins!`;
      gameStillRun = false;
      return;
    }
  }
  for (const cell of playedCells) {
    if (cell === "") {
      isDraw = false;
      return;
    }
  }
  if (isDraw) {
    message.textContent = `It's a draw !`;
    gameStillRun = false;
  }
}

// On restart la game

function restartGame() {
  playedCells = Array(9).fill("");
  current_Player = "circle";
  gameStillRun = true;
  message.textContent = `Welcome, ${current_Player} begin`;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.addEventListener("click", addPone);
  });
}
restartGame();
