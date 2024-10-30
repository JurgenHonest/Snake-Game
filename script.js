const board = document.getElementById("board");
const filler = board.getContext("2d");

const score = document.querySelector(".score");

const sqr = 20;
const box = 20;

const snake = [
  { x: 5 * box, y: 5 * box },
  { x: 6 * box, y: 5 * box },
  { x: 7 * box, y: 5 * box },
  { x: 8 * box, y: 5 * box },
];
let food = Food();
let direction = "RIGHT";
let game;
let isGameOver = false;

function updating() {
  const head = { ...snake[0] }; //naya tauko to add infront of the changed position

  if (direction === "LEFT") head.x -= sqr;
  if (direction === "UP") head.y -= sqr;
  if (direction === "RIGHT") head.x += sqr;
  if (direction === "DOWN") head.y += sqr;

  function isOutOfBounds(position) {
    return (
      position.x < 0 ||
      position.x >= board.width ||
      position.y < 0 ||
      position.y >= board.height
    );
  }

  if (isOutOfBounds(head)) {
    gameOver();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    food = Food();
    score.textContent = scoreincrease();
  } else {
    snake.unshift(head);
    snake.pop();
  }
}
function scoreincrease() {
  currentValue = parseInt(score.textContent, 10);
  currentValue++;
  return (score.textContent = currentValue);
}
function movement(event) {
  if (event.key === "ArrowUp" || event.key === "W" || event.key === "w") {
    // direction !== "Down" doesn't work , curerntly no solutions
    direction = "UP";
  } else if (
    event.key === "ArrowDown" ||
    event.key === "s" ||
    event.key === "S"
  ) {
    direction = "DOWN";
  } else if (
    event.key === "ArrowLeft" ||
    event.key === "a" ||
    event.key === "A"
  ) {
    direction = "LEFT";
  } else if (
    event.key === "ArrowRight" ||
    event.key === "d" ||
    event.key === "D"
  ) {
    direction = "RIGHT";
  }
}

function drawing() {
  filler.clearRect(0, 0, board.width, board.height); // Clear canvas

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      filler.fillStyle = "black";
    } else if (i === 1 || i === snake.length - 1) {
      filler.fillStyle = "white";
    } else {
      filler.fillStyle = "gray";
    }

    filler.fillRect(snake[i].x, snake[i].y, sqr, sqr);
  }
  filler.fillStyle = "red";
  filler.fillRect(food.x, food.y, sqr, sqr);
}

function loop() {
  updating();
  drawing();
}

function gameOver() {
  clearInterval(game);
  isGameOver = true;
  document.getElementById("message").textContent = "Game Over!";
  document.getElementById("btnRestart").style.display = "block"; // Show restart button
  document.getElementById("btnRestart").style.opacity = 1; // Show restart button
  // document.getElementById("btn").style.opacity = "1"; // Show start button again
}
function Food() {
  let position;
  while (true) {
    position = {
      x: Math.floor(Math.random() * (board.width / sqr)) * sqr,
      y: Math.floor(Math.random() * (board.height / sqr)) * sqr,
    };

    const collidesWithSnake = snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
    if (!collidesWithSnake) {
      break;
    }
  }
  return position;
}

function startGame() {
  if (isGameOver) {
    // Reset game state
    snake.length = 2;
    snake[0] = { x: 5 * box, y: 5 * box };
    snake[1] = { x: 6 * box, y: 5 * box };
    snake[2] = { x: 7 * box, y: 5 * box };
    snake[3] = { x: 8 * box, y: 5 * box };

    direction = "RIGHT";
    isGameOver = false;
    document.getElementById("message").textContent = "";
  }

  document.getElementById("btn").style.opacity = "0"; // Hide start button
  document.getElementById("btn").style.display = "none"; // Hide start button
  game = setInterval(loop, 100);
  document.addEventListener("keydown", movement);
}

const btnRestart = document.getElementById("btnRestart");

btnRestart.addEventListener("click", () => {
  btnRestart.style.opacity = "0";
  startGame();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btnRestart.click();
  }
});
