(function (root, factory) {
  const api = factory();
  root.SnakeGame = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const BOARD_SIZE = 20;
  const STEP_MS = 120;
  const STORAGE_KEY = "portfolio-snake-best-score";

  const DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  function sameCell(a, b) {
    return a && b && a.x === b.x && a.y === b.y;
  }

  function oppositeDirection(a, b) {
    return (
      (a === "up" && b === "down") ||
      (a === "down" && b === "up") ||
      (a === "left" && b === "right") ||
      (a === "right" && b === "left")
    );
  }

  function createSnake() {
    const center = Math.floor(BOARD_SIZE / 2);
    return [
      { x: center, y: center },
      { x: center - 1, y: center },
      { x: center - 2, y: center },
    ];
  }

  function createOccupancyMap(snake) {
    const map = new Set();
    snake.forEach((segment) => map.add(`${segment.x}:${segment.y}`));
    return map;
  }

  function createFood(snake, rng = Math.random) {
    const occupied = createOccupancyMap(snake);
    const cells = [];

    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        const key = `${x}:${y}`;
        if (!occupied.has(key)) {
          cells.push({ x, y });
        }
      }
    }

    if (!cells.length) {
      return null;
    }

    const index = Math.floor(rng() * cells.length);
    return cells[index];
  }

  function createInitialState(bestScore = 0, rng = Math.random) {
    const snake = createSnake();

    return {
      status: "idle",
      score: 0,
      bestScore,
      boardSize: BOARD_SIZE,
      stepMs: STEP_MS,
      direction: "right",
      pendingDirection: "right",
      snake,
      food: createFood(snake, rng),
      gameOverReason: "",
      lastTickAt: 0,
    };
  }

  function cloneState(state) {
    return {
      ...state,
      snake: state.snake.map((segment) => ({ ...segment })),
      food: state.food ? { ...state.food } : null,
    };
  }

  function advance(state, rng = Math.random) {
    if (state.status !== "running") {
      return cloneState(state);
    }

    const nextDirection = state.pendingDirection || state.direction;
    const currentDirection = state.direction;
    const direction = oppositeDirection(currentDirection, nextDirection)
      ? currentDirection
      : nextDirection;

    const delta = DIRECTIONS[direction];
    const head = state.snake[0];
    const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

    const outOfBounds =
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.x >= state.boardSize ||
      nextHead.y >= state.boardSize;

    if (outOfBounds) {
      return {
        ...cloneState(state),
        status: "over",
        direction,
        pendingDirection: direction,
        gameOverReason: "wall",
      };
    }

    const willGrow = sameCell(nextHead, state.food);
    const bodyToCheck = willGrow ? state.snake : state.snake.slice(0, -1);
    const selfHit = bodyToCheck.some((segment) => sameCell(segment, nextHead));

    if (selfHit) {
      return {
        ...cloneState(state),
        status: "over",
        direction,
        pendingDirection: direction,
        gameOverReason: "self",
      };
    }

    const nextSnake = [nextHead, ...state.snake.map((segment) => ({ ...segment }))];

    if (!willGrow) {
      nextSnake.pop();
    }

    const nextScore = willGrow ? state.score + 1 : state.score;
    const nextBest = Math.max(state.bestScore, nextScore);
    const nextFood = willGrow ? createFood(nextSnake, rng) : state.food;

    if (willGrow && !nextFood) {
      return {
        ...cloneState(state),
        status: "over",
        score: nextScore,
        bestScore: nextBest,
        snake: nextSnake,
        direction,
        pendingDirection: direction,
        gameOverReason: "filled",
      };
    }

    return {
      ...cloneState(state),
      status: "running",
      score: nextScore,
      bestScore: nextBest,
      snake: nextSnake,
      food: nextFood,
      direction,
      pendingDirection: direction,
      gameOverReason: "",
    };
  }

  function createSnakeEngine({ bestScore = 0, rng = Math.random } = {}) {
    let state = createInitialState(bestScore, rng);

    function reset(nextBestScore = state.bestScore) {
      state = createInitialState(nextBestScore, rng);
      return getState();
    }

    function start() {
      if (state.status === "running") {
        return getState();
      }

      if (state.status === "idle" || state.status === "over") {
        state = createInitialState(state.bestScore, rng);
      }

      state.status = "running";
      state.lastTickAt = 0;
      return getState();
    }

    function pause() {
      if (state.status === "running") {
        state.status = "paused";
      }
      return getState();
    }

    function resume() {
      if (state.status === "paused") {
        state.status = "running";
      }
      return getState();
    }

    function togglePause() {
      if (state.status === "running") {
        return pause();
      }

      if (state.status === "paused") {
        return resume();
      }

      return getState();
    }

    function restart() {
      state = createInitialState(state.bestScore, rng);
      state.status = "running";
      return getState();
    }

    function setDirection(direction) {
      if (!DIRECTIONS[direction]) {
        return false;
      }

      if (state.status === "over") {
        return false;
      }

      const effectiveDirection = state.pendingDirection || state.direction;
      if (oppositeDirection(effectiveDirection, direction)) {
        return false;
      }

      state.pendingDirection = direction;
      return true;
    }

    function step() {
      state = advance(state, rng);
      return getState();
    }

    function markBestScore(value) {
      state.bestScore = Math.max(state.bestScore, value);
      return getState();
    }

    function getState() {
      return cloneState(state);
    }

    return {
      BOARD_SIZE,
      STEP_MS,
      STORAGE_KEY,
      DIRECTIONS,
      createInitialState,
      advance,
      createFood,
      start,
      pause,
      resume,
      togglePause,
      restart,
      reset,
      setDirection,
      step,
      markBestScore,
      getState,
    };
  }

  return {
    BOARD_SIZE,
    STEP_MS,
    STORAGE_KEY,
    DIRECTIONS,
    sameCell,
    oppositeDirection,
    createSnake,
    createFood,
    createInitialState,
    advance,
    createSnakeEngine,
  };
});
