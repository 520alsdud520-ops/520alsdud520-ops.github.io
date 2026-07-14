(function (root) {
  const appNamespace = (root.PortfolioSite = root.PortfolioSite || {});

  function bootstrap() {
    if (appNamespace.booted) {
      return appNamespace;
    }

    const SnakeGame = root.SnakeGame;
    if (!SnakeGame) {
      throw new Error("SnakeGame engine is missing.");
    }

    const doc = root.document;
    const navToggle = doc.querySelector(".nav-toggle");
    const nav = doc.getElementById("site-nav");
    const board = doc.getElementById("snake-board");
    const overlay = doc.querySelector('[data-role="overlay"]');
    const statusEl = doc.querySelector('[data-role="status"]');
    const scoreEl = doc.querySelector('[data-role="score"]');
    const bestScoreEl = doc.querySelector('[data-role="best-score"]');
    const startButtons = doc.querySelectorAll('[data-action="start"]');
    const pauseButtons = doc.querySelectorAll('[data-action="pause"]');
    const restartButtons = doc.querySelectorAll('[data-action="restart"]');
    const dirButtons = doc.querySelectorAll("[data-direction]");

    if (!navToggle || !nav || !board || !overlay || !statusEl || !scoreEl || !bestScoreEl) {
      return appNamespace;
    }

    const storage = root.localStorage;
    const savedBest = Number(storage.getItem(SnakeGame.STORAGE_KEY) || "0") || 0;
    const engine = SnakeGame.createSnakeEngine({ bestScore: savedBest, rng: Math.random });
    const context = board.getContext("2d");
    const boardSize = SnakeGame.BOARD_SIZE;
    const tickMs = SnakeGame.STEP_MS;
    const loopState = {
      frameId: 0,
      lastFrameAt: 0,
      accumulator: 0,
      booted: false,
      pointerStart: null,
    };

    const mediaQuery = root.matchMedia ? root.matchMedia("(max-width: 860px)") : null;

    function updateBestScore(value) {
      storage.setItem(SnakeGame.STORAGE_KEY, String(value));
      bestScoreEl.textContent = String(value);
    }

    function labelStatus(state) {
      if (state.status === "idle") {
        return "Ready";
      }

      if (state.status === "running") {
        return "Running";
      }

      if (state.status === "paused") {
        return "Paused";
      }

      if (state.status === "over") {
        if (state.gameOverReason === "wall") {
          return "Game over: wall collision";
        }

        if (state.gameOverReason === "self") {
          return "Game over: self collision";
        }

        if (state.gameOverReason === "filled") {
          return "You win!";
        }

        return "Game over";
      }

      return "Ready";
    }

    function resizeBoard() {
      const rect = board.getBoundingClientRect();
      const size = Math.max(260, Math.min(rect.width || 520, 600));
      const ratio = root.devicePixelRatio || 1;
      board.width = Math.floor(size * ratio);
      board.height = Math.floor(size * ratio);
      board.style.width = `${size}px`;
      board.style.height = `${size}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function drawBoard(state) {
      const size = board.getBoundingClientRect().width || 520;
      const cell = size / boardSize;

      context.clearRect(0, 0, size, size);

      const gradient = context.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#f7f0e4");
      gradient.addColorStop(1, "#eee0c8");
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);

      context.fillStyle = "rgba(31, 26, 22, 0.05)";
      for (let i = 1; i < boardSize; i += 1) {
        const pos = i * cell;
        context.fillRect(pos - 0.5, 0, 1, size);
        context.fillRect(0, pos - 0.5, size, 1);
      }

      state.snake.forEach((segment, index) => {
        const x = segment.x * cell;
        const y = segment.y * cell;
        context.fillStyle = index === 0 ? "#175c57" : "#2f7a73";
        roundRect(context, x + 2, y + 2, cell - 4, cell - 4, cell * 0.22);
        context.fill();
      });

      if (state.food) {
        const fx = state.food.x * cell;
        const fy = state.food.y * cell;
        context.fillStyle = "#9d6527";
        context.beginPath();
        context.arc(fx + cell / 2, fy + cell / 2, Math.max(4, cell * 0.3), 0, Math.PI * 2);
        context.fill();
      }

      if (state.status !== "running") {
        context.fillStyle = "rgba(255, 251, 242, 0.75)";
        context.fillRect(0, 0, size, size);
        context.fillStyle = "#1f1a16";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `700 ${Math.max(16, Math.round(size * 0.05))}px Aptos, Segoe UI, sans-serif`;
        context.fillText(labelStatus(state), size / 2, size / 2 - 12);
        context.font = `500 ${Math.max(12, Math.round(size * 0.03))}px Aptos, Segoe UI, sans-serif`;
        context.fillText("Use Start, Pause, Restart, arrow keys, WASD, or touch controls.", size / 2, size / 2 + 18);
      }
    }

    function roundRect(ctx, x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + height, r);
      ctx.arcTo(x + width, y + height, x, y + height, r);
      ctx.arcTo(x, y + height, x, y, r);
      ctx.arcTo(x, y, x + width, y, r);
      ctx.closePath();
    }

    function render() {
      const state = engine.getState();
      statusEl.textContent = labelStatus(state);
      scoreEl.textContent = String(state.score);
      bestScoreEl.textContent = String(state.bestScore);
      overlay.textContent =
        state.status === "running" ? "Keep going" : state.status === "paused" ? "Paused" : labelStatus(state);
      updateBestScore(state.bestScore);
      drawBoard(state);
    }

    function startGame() {
      engine.start();
      loopState.accumulator = 0;
      render();
    }

    function pauseGame() {
      engine.togglePause();
      render();
    }

    function restartGame() {
      engine.restart();
      loopState.accumulator = 0;
      render();
    }

    function queueDirection(direction) {
      const state = engine.getState();
      if (state.status === "idle" || state.status === "over") {
        engine.start();
      }

      if (state.status === "paused") {
        engine.resume();
      }

      const accepted = engine.setDirection(direction);
      if (accepted) {
        overlay.textContent = "Direction updated";
      }
      render();
      return accepted;
    }

    function isGameKey(key) {
      return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D", " "].includes(key);
    }

    function handleKeyboard(event) {
      if (!isGameKey(event.key)) {
        return;
      }

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) {
        event.preventDefault();
      }

      const state = engine.getState();

      if (event.key === " ") {
        if (state.status === "running" || state.status === "paused") {
          pauseGame();
        } else {
          startGame();
        }
        return;
      }

      const map = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        s: "down",
        S: "down",
        a: "left",
        A: "left",
        d: "right",
        D: "right",
      };

      const direction = map[event.key];
      if (direction) {
        queueDirection(direction);
      }
    }

    function handleTouchStart(event) {
      const touch = event.changedTouches[0];
      if (!touch) {
        return;
      }

      loopState.pointerStart = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(event) {
      if (!loopState.pointerStart) {
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) {
        return;
      }

      const dx = touch.clientX - loopState.pointerStart.x;
      const dy = touch.clientY - loopState.pointerStart.y;
      const distance = Math.hypot(dx, dy);
      loopState.pointerStart = null;

      if (distance < 18) {
        return;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        queueDirection(dx > 0 ? "right" : "left");
      } else {
        queueDirection(dy > 0 ? "down" : "up");
      }
    }

    function tick(timestamp) {
      if (!loopState.lastFrameAt) {
        loopState.lastFrameAt = timestamp;
      }

      const delta = timestamp - loopState.lastFrameAt;
      loopState.lastFrameAt = timestamp;

      const stateBefore = engine.getState();
      if (stateBefore.status === "running") {
        loopState.accumulator += delta;

        while (loopState.accumulator >= tickMs) {
          engine.step();
          loopState.accumulator -= tickMs;
          const current = engine.getState();
          if (current.status !== "running") {
            loopState.accumulator = 0;
            break;
          }
        }
      }

      render();
      loopState.frameId = root.requestAnimationFrame(tick);
    }

    function bindControls() {
      navToggle.addEventListener("click", () => {
        const open = nav.dataset.open === "true";
        nav.dataset.open = String(!open);
        navToggle.setAttribute("aria-expanded", String(!open));
      });

      nav.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.matches && target.matches("a")) {
          nav.dataset.open = "false";
          navToggle.setAttribute("aria-expanded", "false");
        }
      });

      doc.addEventListener("keydown", handleKeyboard, { passive: false });

      startButtons.forEach((button) => button.addEventListener("click", startGame));
      pauseButtons.forEach((button) => button.addEventListener("click", pauseGame));
      restartButtons.forEach((button) => button.addEventListener("click", restartGame));
      dirButtons.forEach((button) => {
        button.addEventListener("click", () => queueDirection(button.dataset.direction));
      });

      board.addEventListener("touchstart", handleTouchStart, { passive: true });
      board.addEventListener("touchend", handleTouchEnd, { passive: false });
      board.addEventListener("contextmenu", (event) => event.preventDefault());

      root.addEventListener("resize", () => {
        resizeBoard();
        render();
      });

      if (mediaQuery && mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", () => {
          nav.dataset.open = "false";
          navToggle.setAttribute("aria-expanded", "false");
          render();
        });
      }
    }

    function init() {
      if (loopState.booted) {
        return appNamespace;
      }

      loopState.booted = true;
      appNamespace.booted = true;
      nav.dataset.open = "false";
      navToggle.setAttribute("aria-expanded", "false");
      resizeBoard();
      render();
      bindControls();
      loopState.frameId = root.requestAnimationFrame(tick);
      appNamespace.engine = engine;
      appNamespace.render = render;
      appNamespace.startGame = startGame;
      appNamespace.pauseGame = pauseGame;
      appNamespace.restartGame = restartGame;
      appNamespace.queueDirection = queueDirection;
      appNamespace.loopState = loopState;
      return appNamespace;
    }

    appNamespace.bootstrap = init;
    appNamespace.engine = engine;

    return init();
  }

  if (root.document && root.document.readyState === "loading") {
    root.document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else if (root.document) {
    bootstrap();
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
