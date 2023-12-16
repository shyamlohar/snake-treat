const KEYCODES = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
};

class Game {
  BOARD_SIZE = 10;
  board = [];
  treatCordinates;
  snakeData = {
    length: 1,
    noTreatsConsumed: 0,
    coordinatesOfSnake: [{ x: 10, y: 1 }],
  };
  //   direction can be x or y
  directionOfSnake = "right";

  constructor(containerSelector) {
    this.initBoard(containerSelector);
  }

  startGame() {
    //
  }

  updatePositionOfSnake() {
    //
  }

  handleKeyPress() {
    //
  }

  checkIfGameOver() {
    //
  }

  spawnTreat() {
    //
    const randomColId = Math.floor(Math.random() * 9) + 1;
    const randomRowId = Math.floor(Math.random() * 9) + 1;

    console.log({ randomColId, randomRowId });

    const treatCell = document.querySelector(
      `#board > div:nth-child(${randomColId * randomRowId})`
    );

    treatCell.classList.add("treat");
  }

  onTreatConsumption() {}

  initBoard(containerSelector) {
    const container = document.querySelector(containerSelector);
    console.log(container);
    for (let row = this.BOARD_SIZE; row >= 1; row--) {
      for (let col = 1; col <= this.BOARD_SIZE; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-cords", `${row}-${col}`);
        container.appendChild(cell);
      }
    }

    this.spawnTreat();
    this.renderInitialPositionOfSnake();
    this.attachEventListener();
  }

  renderInitialPositionOfSnake() {
    const snakeCell = document.querySelector(".cell");

    snakeCell.classList.add("snake-present");
  }

  attachEventListener() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case KEYCODES.ARROW_DOWN:
          this.updateSnakePositon("bottom");
          break;
        case KEYCODES.ARROW_UP:
          this.updateSnakePositon("top");
          break;
        case KEYCODES.ARROW_LEFT:
          this.updateSnakePositon("left");
          break;
        case KEYCODES.ARROW_RIGHT:
          this.updateSnakePositon("right");
          break;
        default:
          break;
      }
    });
  }

  getNextCordinatesOfHead(direction, currentCordinates) {
    let nextCordinates = { ...currentCordinates };
    switch (direction) {
      case "right":
        nextCordinates.y = currentCordinates.y + 1;
        break;
      case "bottom":
        nextCordinates.x = currentCordinates.x - 1;
        break;
      case "top":
        nextCordinates.x = currentCordinates.x + 1;
        break;
      case "left":
        nextCordinates.y = currentCordinates.y - 1;
        break;
      default:
        break;
    }
    return nextCordinates;
  }

  updateSnakePositon(direction) {
    this.directionOfSnake = direction;
    const headPositionOfSnake = this.snakeData.coordinatesOfSnake.length - 1;

    const headCordinates =
      this.snakeData.coordinatesOfSnake[headPositionOfSnake];
    const tailCordinates = this.snakeData.coordinatesOfSnake[0];

    const updatedCordinates = this.getNextCordinatesOfHead(
      direction,
      headCordinates
    );
    console.log({ updatedCordinates });
    this.snakeData.coordinatesOfSnake.push(updatedCordinates);
    this.snakeData.coordinatesOfSnake.shift();
    this.updateSnakeHead(updatedCordinates);
    this.removeSnakeTail(tailCordinates);
  }

  //   TODO: refactor this to one single func with better name
  removeSnakeTail(cordinates) {
    const targetdCell = document.querySelector(
      `[data-cords='${cordinates.x}-${cordinates.y}']`
    );
    targetdCell.classList.remove("snake-present");
  }

  updateSnakeHead(cordinates) {
    const targetdCell = document.querySelector(
      `[data-cords='${cordinates.x}-${cordinates.y}']`
    );

    targetdCell.classList.add("snake-present");

    const isTreatPresent = targetdCell.classList.contains("treat");

    if (isTreatPresent) {
      const nextCordinates = this.getNextCordinatesOfHead(
        direction,
        cordinates
      );
      const tailCordinates = this.snakeData.coordinatesOfSnake[0];
      this.snakeData.coordinatesOfSnake.push(nextCordinates);
      this.updateSnakeHead(nextCordinates);
      this.removeSnakeTail(tailCordinates);
    }
  }
}

const game = new Game("#board");
