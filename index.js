"use strict";

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
    let index = event.target.id;
    let marker = players[currentPlayerIndex].marker;

    if (GameBoard.accessBoard()[index] !== "") return;

    GameBoard.update(index, marker);
    DisplayController.display(marker);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      GameBoard.accessBoard()[i] = "";
    }
    GameBoard.render();
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

const DisplayController = (() => {
  const display = (marker) => {
    if (marker === "o") {
      document.querySelector(".display").textContent = "X's turn";
    } else {
      document.querySelector(".display").textContent = "O's turn";
    }
  };

  return {
    display,
  };
})();

const createPlayer = (marker) => {
  return {
    marker,
  };
};

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
