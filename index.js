"use strict";

//button event listeners
const instructions = document.querySelector(".instructions");
const markerXBtn = document.querySelector(".markerX");
markerXBtn.addEventListener("click", () => {
  Game.start(markerXBtn.textContent);
  markerXBtn.textContent = "Player 1: X";
  markerOBtn.textContent = "Player 2: O";
  markerOBtn.disabled = true;
  markerXBtn.disabled = true;
  instructions.classList.add("invisible");
  markerOBtn.classList.add("not-allowed");
  markerXBtn.classList.add("not-allowed");
  markerOBtn.style.opacity = 1;
  markerXBtn.style.opacity = 1;
});
const markerOBtn = document.querySelector(".markerO");
markerOBtn.addEventListener("click", () => {
  Game.start(markerOBtn.textContent);
  markerOBtn.textContent = "Player 1: O";
  markerXBtn.textContent = "Player 2: X";
  markerXBtn.disabled = true;
  markerOBtn.disabled = true;
  markerOBtn.classList.add("not-allowed");
  markerXBtn.classList.add("not-allowed");
  instructions.classList.add("invisible");
  markerOBtn.style.opacity = 1;
  markerXBtn.style.opacity = 1;
});
const restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
  Game.restart();
});

//game logic
const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = (chosenMarker) => {
    if (chosenMarker === "X") {
      players = [createPlayer("x"), createPlayer("o")];
    } else {
      players = [createPlayer("o"), createPlayer("x")];
    }

    currentPlayerIndex = 0;
    gameOver = false;
    GameBoard.render();
  };

  const handleClick = (event) => {
    if (gameOver) return;

    let index = event.target.id;

    let marker = players[currentPlayerIndex].marker;

    if (GameBoard.accessBoard()[index] !== "") return;

    GameBoard.update(index, marker);
    DisplayController.display(marker);

    if (
      checkForWin(GameBoard.accessBoard(), players[currentPlayerIndex].marker)
    ) {
      gameOver = true;
      DisplayController.gameStatus(`${players[currentPlayerIndex].marker} won`);
    } else if (checkForTie(GameBoard.accessBoard())) {
      gameOver = true;
      DisplayController.gameStatus("it is a tie");
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      GameBoard.accessBoard()[i] = "";
    }
    GameBoard.render();
    document.querySelector(".display").textContent = "";
    gameOver = true;
    markerXBtn.textContent = "X";
    markerOBtn.textContent = "O";
    markerOBtn.disabled = false;
    markerXBtn.disabled = false;
    markerOBtn.classList.remove("not-allowed");
    markerXBtn.classList.remove("not-allowed");
    instructions.classList.remove("invisible");
  };

  return {
    start,
    handleClick,
    restart,
  };
})();

//create players
const createPlayer = (marker) => {
  return {
    marker,
  };
};

//board logic
const GameBoard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHtml = "";
    _board.forEach((marker, index) => {
      boardHtml += `<div class="cell" id=${index}>${marker}</div>`;
    });
    document.querySelector(".board").innerHTML = boardHtml;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.addEventListener("click", Game.handleClick));
  };

  const update = (index, marker) => {
    _board[index] = marker;
    render();
  };

  const accessBoard = () => _board;

  return {
    render,
    update,
    accessBoard,
  };
})();

//check for winner
const checkForWin = (board) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
};

//check for tie
const checkForTie = (board) => {
  return board.every((cell) => cell !== "");
};

//display logic
const DisplayController = (() => {
  const display = (marker) => {
    if (marker === "o") {
      document.querySelector(".display").textContent = "X's turn";
    } else {
      document.querySelector(".display").textContent = "O's turn";
    }
  };

  const gameStatus = (message) => {
    document.querySelector(".display").textContent = message;
  };

  return {
    display,
    gameStatus,
  };
})();
