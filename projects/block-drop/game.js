const ROWS = 20;
const COLS = 10;
const SCORE_KEY = "block-drop-portfolio-scores";
const SHAPES = {
  I: { shape: [[1,1,1,1]], color: 1 },
  J: { shape: [[1,0,0],[1,1,1]], color: 2 },
  L: { shape: [[0,0,1],[1,1,1]], color: 3 },
  O: { shape: [[1,1],[1,1]], color: 4 },
  S: { shape: [[0,1,1],[1,1,0]], color: 5 },
  T: { shape: [[0,1,0],[1,1,1]], color: 6 },
  Z: { shape: [[1,1,0],[0,1,1]], color: 7 }
};
const NAMES = Object.keys(SHAPES);
const POINTS = [0,100,300,500,800];
const elements = {
  board: document.querySelector("#board"),
  score: document.querySelector("#score"),
  lines: document.querySelector("#lines"),
  level: document.querySelector("#level"),
  next: document.querySelector("#next-piece"),
  overlay: document.querySelector("#game-overlay"),
  kicker: document.querySelector("#overlay-kicker"),
  title: document.querySelector("#overlay-title"),
  detail: document.querySelector("#overlay-detail"),
  nameField: document.querySelector("#name-field"),
  playerName: document.querySelector("#player-name"),
  start: document.querySelector("#start-button"),
  pause: document.querySelector("#pause-button"),
  scores: document.querySelector("#high-scores"),
  emptyScores: document.querySelector("#empty-scores"),
  sound: document.querySelector("#sound-toggle")
};

let board = emptyBoard();
let bag = [];
let piece = makePiece("T");
let nextName = "I";
let score = 0;
let lines = 0;
let level = 1;
let status = "ready";
let timer = 0;
let soundOn = false;
let audioContext;

for (let index = 0; index < ROWS * COLS; index += 1) {
  const cell = document.createElement("span");
  cell.className = "cell";
  elements.board.append(cell);
}
for (let index = 0; index < 16; index += 1) {
  const cell = document.createElement("span");
  cell.className = "mini-cell";
  elements.next.append(cell);
}

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function shuffleBag() {
  const values = [...NAMES];
  for (let index = values.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [values[index], values[other]] = [values[other], values[index]];
  }
  return values;
}

function drawName() {
  if (!bag.length) bag = shuffleBag();
  return bag.pop();
}

function makePiece(name) {
  const source = SHAPES[name];
  return {
    name,
    shape: source.shape.map((row) => [...row]),
    color: source.color,
    x: Math.floor((COLS - source.shape[0].length) / 2),
    y: -1
  };
}

function rotate(shape) {
  return shape[0].map((_, column) => shape.map((row) => row[column]).reverse());
}

function canPlace(candidate, x = candidate.x, y = candidate.y, shape = candidate.shape) {
  return shape.every((row, rowIndex) => row.every((cell, columnIndex) => {
    if (!cell) return true;
    const boardX = x + columnIndex;
    const boardY = y + rowIndex;
    return boardX >= 0 && boardX < COLS && boardY < ROWS &&
      (boardY < 0 || board[boardY][boardX] === 0);
  }));
}

function spawnNext() {
  piece = makePiece(nextName);
  nextName = drawName();
  if (!canPlace(piece)) finishGame();
}

function lockPiece() {
  const updated = board.map((row) => [...row]);
  let toppedOut = false;
  piece.shape.forEach((row, rowIndex) => row.forEach((cell, columnIndex) => {
    if (!cell) return;
    const y = piece.y + rowIndex;
    const x = piece.x + columnIndex;
    if (y < 0) toppedOut = true;
    else updated[y][x] = piece.color;
  }));
  board = updated;
  if (toppedOut) return finishGame();

  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = ROWS - remaining.length;
  while (remaining.length < ROWS) remaining.unshift(Array(COLS).fill(0));
  board = remaining;
  if (cleared) {
    lines += cleared;
    score += POINTS[cleared] * level;
    level = Math.floor(lines / 10) + 1;
    tone(520 + cleared * 90, .09);
  } else {
    tone(145, .025);
  }
  spawnNext();
  restartTimer();
  render();
}

function stepDown(reward = false) {
  if (status !== "playing") return;
  if (canPlace(piece, piece.x, piece.y + 1)) {
    piece.y += 1;
    if (reward) score += 1;
    render();
  } else {
    lockPiece();
  }
}

function move(direction) {
  if (status !== "playing") return;
  if (canPlace(piece, piece.x + direction, piece.y)) {
    piece.x += direction;
    tone(230, .018);
    render();
  }
}

function rotatePiece() {
  if (status !== "playing") return;
  const rotated = rotate(piece.shape);
  for (const offset of [0,-1,1,-2,2]) {
    if (canPlace(piece, piece.x + offset, piece.y, rotated)) {
      piece.x += offset;
      piece.shape = rotated;
      tone(340, .025);
      render();
      return;
    }
  }
}

function hardDrop() {
  if (status !== "playing") return;
  const startY = piece.y;
  while (canPlace(piece, piece.x, piece.y + 1)) piece.y += 1;
  score += Math.max(0, piece.y - startY) * 2;
  tone(105, .05);
  lockPiece();
}

function startGame() {
  board = emptyBoard();
  bag = shuffleBag();
  score = 0;
  lines = 0;
  level = 1;
  status = "playing";
  piece = makePiece(drawName());
  nextName = drawName();
  elements.overlay.hidden = true;
  elements.pause.disabled = false;
  elements.pause.textContent = "Pause game";
  restartTimer();
  render();
  elements.board.focus?.();
}

function togglePause() {
  if (status === "playing") {
    status = "paused";
    clearInterval(timer);
    showOverlay("Taking a breath", "Paused", "", false, "Keep playing");
    elements.pause.textContent = "Resume game";
  } else if (status === "paused") {
    status = "playing";
    elements.overlay.hidden = true;
    elements.pause.textContent = "Pause game";
    restartTimer();
  }
  render();
}

function finishGame() {
  status = "over";
  clearInterval(timer);
  saveScore();
  elements.pause.disabled = true;
  showOverlay("Final score", score.toLocaleString(), `${lines} lines cleared`, true, "Play again");
  tone(90, .25);
  render();
}

function showOverlay(kicker, title, detail, showName, buttonLabel) {
  elements.kicker.textContent = kicker;
  elements.title.textContent = title;
  elements.detail.textContent = detail;
  elements.detail.hidden = !detail;
  elements.nameField.hidden = !showName;
  elements.start.textContent = buttonLabel;
  elements.overlay.hidden = false;
}

function restartTimer() {
  clearInterval(timer);
  if (status === "playing") {
    timer = setInterval(() => stepDown(false), Math.max(90, 760 - (level - 1) * 65));
  }
}

function render() {
  const display = board.map((row) => [...row]);
  if (status === "playing" || status === "paused") {
    let ghostY = piece.y;
    while (canPlace(piece, piece.x, ghostY + 1)) ghostY += 1;
    piece.shape.forEach((row, rowIndex) => row.forEach((cell, columnIndex) => {
      if (!cell) return;
      const x = piece.x + columnIndex;
      const ghostRow = ghostY + rowIndex;
      const activeRow = piece.y + rowIndex;
      if (ghostRow >= 0 && display[ghostRow]?.[x] === 0) display[ghostRow][x] = -piece.color;
      if (activeRow >= 0 && display[activeRow]?.[x] !== undefined) display[activeRow][x] = piece.color;
    }));
  }
  [...elements.board.children].forEach((cell, index) => {
    const value = display[Math.floor(index / COLS)][index % COLS];
    cell.className = `cell${value > 0 ? ` filled color-${value}` : ""}${value < 0 ? ` ghost color-${Math.abs(value)}` : ""}`;
  });
  elements.score.textContent = score.toLocaleString();
  elements.lines.textContent = lines;
  elements.level.textContent = level;
  renderNext();
}

function renderNext() {
  const definition = SHAPES[nextName];
  const offsetX = Math.floor((4 - definition.shape[0].length) / 2);
  const offsetY = Math.floor((4 - definition.shape.length) / 2);
  [...elements.next.children].forEach((cell, index) => {
    const row = Math.floor(index / 4);
    const column = index % 4;
    const filled = definition.shape[row - offsetY]?.[column - offsetX] === 1;
    cell.className = filled ? `mini-cell color-${definition.color}` : "mini-cell";
  });
  elements.next.setAttribute("aria-label", `Next piece: ${nextName}`);
}

function getScores() {
  try {
    const values = JSON.parse(localStorage.getItem(SCORE_KEY) || "[]");
    return Array.isArray(values) ? values.slice(0, 5) : [];
  } catch {
    return [];
  }
}

function saveScore() {
  if (score <= 0) return;
  const entry = { name: elements.playerName.value.trim().slice(0, 12) || "Player", score, lines };
  const updated = [...getScores(), entry].sort((a, b) => b.score - a.score).slice(0, 5);
  localStorage.setItem(SCORE_KEY, JSON.stringify(updated));
  renderScores(updated);
}

function renderScores(values = getScores()) {
  elements.scores.replaceChildren();
  elements.emptyScores.hidden = values.length > 0;
  values.forEach((entry, index) => {
    const row = document.createElement("li");
    row.innerHTML = `<span class="rank">${String(index + 1).padStart(2,"0")}</span><span class="player"></span><strong>${Number(entry.score).toLocaleString()}</strong>`;
    row.querySelector(".player").textContent = entry.name;
    elements.scores.append(row);
  });
}

function tone(frequency, duration) {
  if (!soundOn) return;
  audioContext ||= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "square";
  gain.gain.setValueAtTime(.025, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

elements.start.addEventListener("click", () => status === "paused" ? togglePause() : startGame());
elements.pause.addEventListener("click", togglePause);
elements.sound.addEventListener("click", () => {
  soundOn = !soundOn;
  elements.sound.textContent = soundOn ? "Sound on" : "Sound off";
  elements.sound.setAttribute("aria-pressed", String(soundOn));
  tone(440, .06);
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const actions = { left: () => move(-1), right: () => move(1), down: () => stepDown(true), rotate: rotatePiece, drop: hardDrop };
    actions[button.dataset.action]?.();
  });
});

window.addEventListener("keydown", (event) => {
  if (["ArrowLeft","ArrowRight","ArrowDown","ArrowUp"," "].includes(event.key)) event.preventDefault();
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
  if (event.key === "ArrowDown") stepDown(true);
  if (event.key === "ArrowUp" || event.key.toLowerCase() === "x") rotatePiece();
  if (event.key === " ") hardDrop();
  if (event.key.toLowerCase() === "p" || event.key === "Escape") togglePause();
}, { passive: false });

window.addEventListener("message", (event) => {
  if (event.data?.type === "block-drop-pause" && status === "playing") togglePause();
});

renderScores();
render();
