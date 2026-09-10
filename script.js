/* =====================================================
   AYUSH GAME ZONE
   NEON DODGE
===================================================== */


/* ================= INTRO ================= */

const intro = document.getElementById("intro");
const loadingBar = document.getElementById("loadingBar");
const introPercent = document.getElementById("introPercent");
const introStatus = document.getElementById("introStatus");
const skipIntro = document.getElementById("skipIntro");

let introProgress = 0;
let introFinished = false;

const introMessages = [
  "INITIALIZING NEURAL ENGINE...",
  "LOADING GRAPHICS CORE...",
  "CALIBRATING PLAYER SYSTEM...",
  "CONNECTING GAME SERVER...",
  "GENERATING DIGITAL ARENA...",
  "SYSTEM READY..."
];

const introInterval = setInterval(() => {

  if (introFinished) return;

  introProgress++;

  loadingBar.style.width = introProgress + "%";
  introPercent.textContent = introProgress + "%";

  const index = Math.min(
    Math.floor(introProgress / 17),
    introMessages.length - 1
  );

  introStatus.textContent = introMessages[index];

  if (introProgress >= 100) {
    finishIntro();
  }

}, 300);


function finishIntro() {

  if (introFinished) return;

  introFinished = true;

  clearInterval(introInterval);

  loadingBar.style.width = "100%";
  introPercent.textContent = "100%";
  introStatus.textContent = "SYSTEM READY";

  setTimeout(() => {
    intro.classList.add("hide");
  }, 700);
}


skipIntro.addEventListener("click", finishIntro);


/* ================= GAME VARIABLES ================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const levelElement = document.getElementById("level");

const gameMessage = document.getElementById("gameMessage");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const startGameButton = document.getElementById("startGame");

const heroPlay = document.getElementById("heroPlay");

let width = 0;
let height = 0;

let gameRunning = false;

let score = 0;
let level = 1;

let highScore = Number(
  localStorage.getItem("ayushNeonHighScore") || 0
);

highScoreElement.textContent = formatNumber(highScore);

let lastTime = 0;
let enemyTimer = 0;
let coreTimer = 0;

let keys = {};

let enemies = [];
let cores = [];
let particles = [];

let player;


/* ================= CANVAS SIZE ================= */

function resizeCanvas() {

  const rect = canvas.getBoundingClientRect();

  width = rect.width;
  height = rect.height;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


/* ================= PLAYER ================= */

function createPlayer() {

  player = {
    x: width / 2,
    y: height / 2,
    size: 16,
    speed: 330,
    trail: []
  };

}


/* ================= CONTROLS ================= */

window.addEventListener("keydown", (event) => {

  keys[event.key.toLowerCase()] = true;

  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ].includes(event.key)
  ) {
    event.preventDefault();
  }

});

window.addEventListener("keyup", (event) => {

  keys[event.key.toLowerCase()] = false;

});


/* ================= MOBILE CONTROLS ================= */

document.querySelectorAll(".mobile-controls button")
.forEach(button => {

  const key = button.dataset.key;

  button.addEventListener("touchstart", (event) => {

    event.preventDefault();

    keys[key] = true;

  });

  button.addEventListener("touchend", (event) => {

    event.preventDefault();

    keys[key] = false;

  });

  button.addEventListener("mousedown", () => {
    keys[key] = true;
  });

  button.addEventListener("mouseup", () => {
    keys[key] = false;
  });

});


/* ================= FORMAT SCORE ================= */

function formatNumber(number) {

  return Math.floor(number)
    .toString()
    .padStart(6, "0");

}


/* ================= PARTICLES ================= */

function createParticles(x, y, amount = 10, color = "cyan") {

  for (let i = 0; i < amount; i++) {

    particles.push({

      x: x,
      y: y,

      vx: (Math.random() - .5) * 250,
      vy: (Math.random() - .5) * 250,

      life: .5 + Math.random() * .5,

      maxLife: .5 + Math.random() * .5,

      size: 2 + Math.random() * 4,

      color: color

    });

  }

}


/* ================= ENEMY ================= */

function spawnEnemy() {

  const side = Math.floor(Math.random() * 4);

  let x;
  let y;

  if (side === 0) {
    x = Math.random() * width;
    y = -30;
  }

  if (side === 1) {
    x = width + 30;
    y = Math.random() * height;
  }

  if (side === 2) {
    x = Math.random() * width;
    y = height + 30;
  }

  if (side === 3) {
    x = -30;
    y = Math.random() * height;
  }

  enemies.push({

    x,
    y,

    size: 13 + Math.random() * 7,

    speed: 80 + level * 12 + Math.random() * 50,

    angle: Math.random() * Math.PI * 2

  });

}


/* ================= ENERGY CORE ================= */

function spawnCore() {

  cores.push({

    x: 50 + Math.random() * (width - 100),

    y: 50 + Math.random() * (height - 100),

    size: 8,

    pulse: Math.random() * Math.PI * 2

  });

}


/* ================= COLLISION ================= */

function distance(a, b) {

  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(dx * dx + dy * dy);

}


/* ================= UPDATE ================= */

function update(delta) {

  if (!gameRunning) return;


  /* PLAYER MOVEMENT */

  let dx = 0;
  let dy = 0;

  if (keys["w"] || keys["arrowup"]) {
    dy -= 1;
  }

  if (keys["s"] || keys["arrowdown"]) {
    dy += 1;
  }

  if (keys["a"] || keys["arrowleft"]) {
    dx -= 1;
  }

  if (keys["d"] || keys["arrowright"]) {
    dx += 1;
  }


  if (dx !== 0 || dy !== 0) {

    const length = Math.sqrt(dx * dx + dy * dy);

    dx /= length;
    dy /= length;

    player.x += dx * player.speed * delta;
    player.y += dy * player.speed * delta;

    createParticles(
      player.x,
      player.y,
      1,
      "cyan"
    );

  }


  /* KEEP PLAYER INSIDE */

  player.x = Math.max(
    player.size,
    Math.min(width - player.size, player.x)
  );

  player.y = Math.max(
    player.size,
    Math.min(height - player.size, player.y)
  );


  /* SCORE */

  score += delta * 10;


  /* LEVEL */

  level = Math.floor(score / 500) + 1;

  scoreElement.textContent = formatNumber(score);
  levelElement.textContent =
    String(level).padStart(2, "0");


  /* ENEMY SPAWN */

  enemyTimer += delta;

  const enemyDelay =
    Math.max(.28, .9 - level * .045);

  if (enemyTimer > enemyDelay) {

    enemyTimer = 0;

    spawnEnemy();

  }


  /* CORE SPAWN */

  coreTimer += delta;

  if (coreTimer > 2.5) {

    coreTimer = 0;

    if (cores.length < 5) {
      spawnCore();
    }

  }


  /* ENEMIES */

  enemies.forEach(enemy => {

    const angle = Math.atan2(
      player.y - enemy.y,
      player.x - enemy.x
    );

    enemy.angle = angle;

    enemy.x +=
      Math.cos(angle) *
      enemy.speed *
      delta;

    enemy.y +=
      Math.sin(angle) *
      enemy.speed *
      delta;


    /* COLLISION */

    if (
      distance(player, enemy) <
      player.size + enemy.size
    ) {

      gameOver();

    }

  });


  /* REMOVE OLD ENEMIES */

  enemies = enemies.filter(enemy => {

    return (
      enemy.x > -100 &&
      enemy.x < width + 100 &&
      enemy.y > -100 &&
      enemy.y < height + 100
    );

  });


  /* CORES */

  cores.forEach(core => {

    core.pulse += delta * 5;

    if (
      distance(player, core) <
      player.size + core.size + 8
    ) {

      score += 100;

      createParticles(
        core.x,
        core.y,
        25,
        "cyan"
      );

      core.collected = true;

    }

  });


  cores = cores.filter(core => !core.collected);


  /* PARTICLES */

  particles.forEach(p => {

    p.x += p.vx * delta;
    p.y += p.vy * delta;

    p.life -= delta;

  });

  particles = particles.filter(p => p.life > 0);

}


/* ================= DRAW GRID ================= */

function drawGrid() {

  ctx.fillStyle = "#02040a";

  ctx.fillRect(0, 0, width, height);


  const gridSize = 40;

  ctx.strokeStyle = "rgba(0,246,255,.07)";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += gridSize) {

    ctx.beginPath();

    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);

    ctx.stroke();

  }

  for (let y = 0; y < height; y += gridSize) {

    ctx.beginPath();

    ctx.moveTo(0, y);
    ctx.lineTo(width, y);

    ctx.stroke();

  }


  /* CENTER GLOW */

  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    10,
    width / 2,
    height / 2,
    Math.max(width, height) / 2
  );

  gradient.addColorStop(
    0,
    "rgba(0,246,255,.06)"
  );

  gradient.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, width, height);

}


/* ================= DRAW PLAYER ================= */

function drawPlayer() {

  if (!player) return;


  ctx.save();

  ctx.translate(player.x, player.y);

  ctx.rotate(Math.PI / 4);


  ctx.shadowBlur = 30;
  ctx.shadowColor = "#00f6ff";

  ctx.fillStyle = "#00f6ff";

  ctx.fillRect(
    -player.size / 2,
    -player.size / 2,
    player.size,
    player.size
  );


  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(
    -4,
    -4,
    8,
    8
  );


  ctx.restore();

}


/* ================= DRAW ENEMIES ================= */

function drawEnemies() {

  enemies.forEach(enemy => {

    ctx.save();

    ctx.translate(enemy.x, enemy.y);

    ctx.rotate(enemy.angle);

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#ff3158";

    ctx.strokeStyle = "#ff3158";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(-enemy.size, -enemy.size);
    ctx.lineTo(enemy.size, enemy.size);

    ctx.moveTo(enemy.size, -enemy.size);
    ctx.lineTo(-enemy.size, enemy.size);

    ctx.stroke();

    ctx.restore();

  });

}


/* ================= DRAW CORES ================= */

function drawCores() {

  cores.forEach(core => {

    const scale =
      1 + Math.sin(core.pulse) * .25;

    ctx.save();

    ctx.translate(core.x, core.y);
    ctx.rotate(core.pulse);

    ctx.scale(scale, scale);

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00f6ff";

    ctx.fillStyle = "#00f6ff";

    ctx.beginPath();

    ctx.moveTo(0, -core.size);
    ctx.lineTo(core.size, 0);
    ctx.lineTo(0, core.size);
    ctx.lineTo(-core.size, 0);

    ctx.closePath();

    ctx.fill();

    ctx.restore();

  });

}


/* ================= DRAW PARTICLES ================= */

function drawParticles() {

  particles.forEach(p => {

    ctx.save();

    ctx.globalAlpha =
      Math.max(0, p.life / p.maxLife);

    ctx.fillStyle =
      p.color === "cyan"
        ? "#00f6ff"
        : "#ff3158";

    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.fillStyle;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

  });

}


/* ================= DRAW ================= */

function draw() {

  drawGrid();

  drawCores();

  drawParticles();

  drawEnemies();

  drawPlayer();

}


/* ================= GAME LOOP ================= */

function gameLoop(time) {

  const delta = Math.min(
    (time - lastTime) / 1000,
    .05
  );

  lastTime = time;

  update(delta);

  draw();

  requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);


/* ================= START GAME ================= */

function startGame() {

  resizeCanvas();

  createPlayer();

  enemies = [];
  cores = [];
  particles = [];

  score = 0;
  level = 1;

  enemyTimer = 0;
  coreTimer = 0;

  scoreElement.textContent = "000000";
  levelElement.textContent = "01";

  gameRunning = true;

  gameMessage.classList.add("hidden");

  spawnCore();

}


/* ================= GAME OVER ================= */

function gameOver() {

  if (!gameRunning) return;

  gameRunning = false;

  createParticles(
    player.x,
    player.y,
    60,
    "red"
  );

  const finalScore = Math.floor(score);

  if (finalScore > highScore) {

    highScore = finalScore;

    localStorage.setItem(
      "ayushNeonHighScore",
      highScore
    );

    highScoreElement.textContent =
      formatNumber(highScore);

  }


  messageTitle.textContent = "GAME OVER";

  messageText.innerHTML =
    "FINAL SCORE: <strong>" +
    formatNumber(finalScore) +
    "</strong><br><br>" +
    "The arena destroyed your run.";

  startGameButton.textContent =
    "PLAY AGAIN";

  gameMessage.classList.remove("hidden");

}


/* ================= BUTTON ================= */

startGameButton.addEventListener(
  "click",
  startGame
);


/* ================= HERO BUTTON ================= */

heroPlay.addEventListener(
  "click",
  () => {

    document
      .getElementById("game")
      .scrollIntoView({
        behavior: "smooth"
      });

    setTimeout(() => {
      startGame();
    }, 700);

  }
);


/* ================= INITIAL DRAW ================= */

createPlayer();

draw();
