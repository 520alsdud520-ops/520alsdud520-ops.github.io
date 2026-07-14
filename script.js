(function (root) {
  const appNamespace = (root.PortfolioSite = root.PortfolioSite || {});

  function safeLocalStorage() {
    try {
      const storage = root.localStorage;
      const probeKey = "__portfolio_site_probe__";
      storage.setItem(probeKey, "1");
      storage.removeItem(probeKey);
      return storage;
    } catch (error) {
      return null;
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

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
    const overlayTitle = doc.querySelector('[data-role="overlay-title"]');
    const overlayText = doc.querySelector('[data-role="overlay-text"]');
    const overlayActions = doc.querySelector('[data-role="overlay-actions"]');
    const statusEl = doc.querySelector('[data-role="status"]');
    const scoreEl = doc.querySelector('[data-role="score"]');
    const bestScoreEl = doc.querySelector('[data-role="best-score"]');
    const leaderboardEl = doc.querySelector('[data-role="leaderboard"]');
    const startButtons = doc.querySelectorAll('[data-action="start"]');
    const restartButtons = doc.querySelectorAll('[data-action="restart"]');
    const dirButtons = doc.querySelectorAll("[data-direction]");
    const sectionLinks = Array.from(doc.querySelectorAll(".site-nav a"));
    const sections = Array.from(doc.querySelectorAll(".section-panel[id]"));
    const storage = safeLocalStorage();
    const savedBest = Number(storage?.getItem(SnakeGame.STORAGE_KEY) || "0") || 0;
    const leaderboardKey = "portfolio-snake-leaderboard";
    const engine = SnakeGame.createSnakeEngine({ bestScore: savedBest, rng: Math.random });
    const context = board.getContext("2d");
    const boardSize = SnakeGame.BOARD_SIZE;
    const tickMs = SnakeGame.STEP_MS;
    const stateMemory = {
      frameId: 0,
      lastFrameAt: 0,
      accumulator: 0,
      booted: false,
      pointerStart: null,
      previousStatus: engine.getState().status,
      previousSignature: "",
      overlaySignature: "",
    };

    function loadLeaderboard() {
      if (!storage) {
        return [];
      }

      try {
        const raw = storage.getItem(leaderboardKey);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
      } catch (error) {
        return [];
      }
    }

    function saveLeaderboard(entries) {
      if (!storage) {
        return;
      }

      try {
        storage.setItem(leaderboardKey, JSON.stringify(entries.slice(0, 5)));
      } catch (error) {
        /* ignore storage failures */
      }
    }

    function recordLeaderboard(score) {
      if (!score || score < 0) {
        return;
      }

      const entries = loadLeaderboard();
      entries.push({
        score,
        achievedAt: new Date().toISOString(),
      });
      entries.sort((a, b) => b.score - a.score || new Date(b.achievedAt) - new Date(a.achievedAt));
      saveLeaderboard(entries.slice(0, 5));
      renderLeaderboard();
    }

    function renderLeaderboard() {
      if (!leaderboardEl) {
        return;
      }

      const entries = loadLeaderboard().slice(0, 5);

      if (!entries.length) {
        leaderboardEl.innerHTML = `
          <li>
            <span class="score-label">No scores yet</span>
            <span class="score-meta">Play once to start the ranking</span>
          </li>
        `;
        return;
      }

      leaderboardEl.innerHTML = entries
        .map(
          (entry, index) => `
            <li>
              <span class="score-label">#${index + 1} - ${entry.score}</span>
              <span class="score-meta">${formatDate(entry.achievedAt)}</span>
            </li>`,
        )
        .join("");
    }

    function updateBestScore(value) {
      if (!storage) {
        bestScoreEl.textContent = String(value);
        return;
      }

      try {
        storage.setItem(SnakeGame.STORAGE_KEY, String(value));
      } catch (error) {
        /* ignore storage failures */
      }

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

    function drawBoard(state) {
      const size = board.getBoundingClientRect().width || 520;
      const cell = size / boardSize;

      context.clearRect(0, 0, size, size);

      const gradient = context.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#f7f0e4");
      gradient.addColorStop(1, "#ecdcc4");
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);

      context.fillStyle = "rgba(32, 26, 21, 0.045)";
      for (let i = 1; i < boardSize; i += 1) {
        const pos = i * cell;
        context.fillRect(pos - 0.5, 0, 1, size);
        context.fillRect(0, pos - 0.5, size, 1);
      }

      state.snake.forEach((segment, index) => {
        const x = segment.x * cell;
        const y = segment.y * cell;
        context.fillStyle = index === 0 ? "#1b6660" : "#2e7a73";
        roundRect(context, x + 2, y + 2, cell - 4, cell - 4, cell * 0.22);
        context.fill();
      });

      if (state.food) {
        const fx = state.food.x * cell;
        const fy = state.food.y * cell;
        context.fillStyle = "#99601d";
        context.beginPath();
        context.arc(fx + cell / 2, fy + cell / 2, Math.max(4, cell * 0.3), 0, Math.PI * 2);
        context.fill();
      }

      if (state.status !== "running") {
        context.fillStyle = "rgba(255, 251, 244, 0.72)";
        context.fillRect(0, 0, size, size);
        context.fillStyle = "#201a15";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `700 ${Math.max(16, Math.round(size * 0.05))}px Aptos, Segoe UI, sans-serif`;
        context.fillText(labelStatus(state), size / 2, size / 2 - 12);
        context.font = `500 ${Math.max(12, Math.round(size * 0.028))}px Aptos, Segoe UI, sans-serif`;
        context.fillText("Use the board controls or press P to pause.", size / 2, size / 2 + 18);
      }
    }

    function updateOverlay(state) {
      if (!overlay || !overlayActions || !overlayTitle || !overlayText) {
        return;
      }

      const signature = `${state.status}:${state.gameOverReason}`;
      if (stateMemory.overlaySignature === signature) {
        return;
      }

      stateMemory.overlaySignature = signature;
      overlay.dataset.state = state.status;

      if (state.status === "running") {
        overlayTitle.textContent = "Keep going";
        overlayText.textContent = "Press P to pause or use the touch buttons to steer.";
        overlayActions.replaceChildren();
        return;
      }

      if (state.status === "paused") {
        overlayTitle.textContent = "Paused";
        overlayText.textContent = "Press P again to resume or use the buttons to continue.";
        overlayActions.replaceChildren();
        return;
      }

      if (state.status === "over") {
        overlayTitle.textContent = labelStatus(state);
        overlayText.textContent = "Restart inside the game area to try again.";
        const restartButton = doc.createElement("button");
        restartButton.className = "button button-primary";
        restartButton.type = "button";
        restartButton.dataset.action = "restart";
        restartButton.textContent = "Restart";
        overlayActions.replaceChildren(restartButton);
        restartButton.addEventListener("click", restartGame);
        return;
      }

      overlayTitle.textContent = "Press Start to play";
      overlayText.textContent = "Use the game buttons inside the board or press P to pause.";
      const startButton = doc.createElement("button");
      startButton.className = "button button-primary";
      startButton.type = "button";
      startButton.dataset.action = "start";
      startButton.textContent = "Start";
      overlayActions.replaceChildren(startButton);
      startButton.addEventListener("click", startGame);
    }

    function render() {
      const state = engine.getState();
      statusEl.textContent = labelStatus(state);
      scoreEl.textContent = String(state.score);
      bestScoreEl.textContent = String(state.bestScore);
      updateBestScore(state.bestScore);
      updateOverlay(state);
      drawBoard(state);

      if (state.status === "over" && stateMemory.previousStatus !== "over") {
        recordLeaderboard(state.score);
      }

      stateMemory.previousStatus = state.status;
      stateMemory.previousSignature = `${state.status}:${state.score}:${state.bestScore}:${state.gameOverReason}`;
    }

    function startGame() {
      engine.restart();
      stateMemory.accumulator = 0;
      render();
    }

    function pauseGame() {
      const state = engine.getState();
      if (state.status === "running" || state.status === "paused") {
        engine.togglePause();
        render();
      }
    }

    function restartGame() {
      engine.restart();
      stateMemory.accumulator = 0;
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
      render();
      return accepted;
    }

    function isGameKey(key) {
      return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D", "p", "P", " "].includes(key);
    }

    function handleKeyboard(event) {
      if (!isGameKey(event.key)) {
        return;
      }

      event.preventDefault();

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

      if (event.key === "p" || event.key === "P") {
        pauseGame();
        return;
      }

      if (event.key === " ") {
        const state = engine.getState();
        if (state.status === "running") {
          pauseGame();
        } else {
          startGame();
        }
        return;
      }

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

      stateMemory.pointerStart = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(event) {
      if (!stateMemory.pointerStart) {
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) {
        return;
      }

      const dx = touch.clientX - stateMemory.pointerStart.x;
      const dy = touch.clientY - stateMemory.pointerStart.y;
      const distance = Math.hypot(dx, dy);
      stateMemory.pointerStart = null;

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
      if (!stateMemory.lastFrameAt) {
        stateMemory.lastFrameAt = timestamp;
      }

      const delta = timestamp - stateMemory.lastFrameAt;
      stateMemory.lastFrameAt = timestamp;

      const stateBefore = engine.getState();
      if (stateBefore.status === "running") {
        stateMemory.accumulator += delta;

        while (stateMemory.accumulator >= tickMs) {
          engine.step();
          stateMemory.accumulator -= tickMs;
          const current = engine.getState();
          if (current.status !== "running") {
            stateMemory.accumulator = 0;
            break;
          }
        }
      }

      render();
      stateMemory.frameId = root.requestAnimationFrame(tick);
    }

    function updateActiveSection() {
      if (!sections.length || !sectionLinks.length) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const targetId = entry.target.id;
            entry.target.classList.toggle("is-active", entry.isIntersecting);

            if (entry.isIntersecting) {
              sectionLinks.forEach((link) => {
                const active = link.getAttribute("href") === `#${targetId}`;
                link.setAttribute("aria-current", active ? "page" : "false");
                if (!active) {
                  link.removeAttribute("aria-current");
                }
              });
            }
          });
        },
        {
          threshold: 0.48,
          rootMargin: "-10% 0px -35% 0px",
        },
      );

      sections.forEach((section) => observer.observe(section));
    }

    function bindControls() {
      navToggle?.addEventListener("click", () => {
        const open = nav.dataset.open === "true";
        nav.dataset.open = String(!open);
        navToggle.setAttribute("aria-expanded", String(!open));
      });

      nav?.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.matches && target.matches("a")) {
          nav.dataset.open = "false";
          navToggle.setAttribute("aria-expanded", "false");
        }
      });

      overlayActions?.addEventListener("click", (event) => {
        const target = event.target;
        if (!target || !target.matches || !target.matches("[data-action]")) {
          return;
        }

        const action = target.dataset.action;
        if (action === "start" || action === "restart") {
          startGame();
        }
      });

      window.addEventListener("keydown", handleKeyboard, { passive: false });
      window.addEventListener("resize", resizeBoard, { passive: true });

      board.addEventListener("touchstart", handleTouchStart, { passive: true });
      board.addEventListener("touchend", handleTouchEnd, { passive: true });

      startButtons.forEach((button) => button.addEventListener("click", startGame));
      restartButtons.forEach((button) => button.addEventListener("click", restartGame));
      dirButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const direction = button.dataset.direction;
          if (direction) {
            queueDirection(direction);
          }
        });
      });
    }

    function init() {
      resizeBoard();
      bindControls();
      updateActiveSection();
      renderLeaderboard();
      render();
      stateMemory.frameId = root.requestAnimationFrame(tick);
      stateMemory.booted = true;
      appNamespace.booted = true;
    }

    init();

    appNamespace.startGame = startGame;
    appNamespace.pauseGame = pauseGame;
    appNamespace.restartGame = restartGame;
    appNamespace.queueDirection = queueDirection;
    appNamespace.renderLeaderboard = renderLeaderboard;
    appNamespace.bootstrap = bootstrap;
    appNamespace.booted = true;

    return appNamespace;
  }

  try {
    bootstrap();
  } catch (error) {
    appNamespace.error = error;
    throw error;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
