import { CONFIG } from "./config.js"
import { Player } from "./classes/Player.js"
import { Projectile } from "./classes/Projectile.js"
import { Enemy } from "./classes/Enemy.js"
import { getDistanceBetweenCircles } from "./helpers/helpers.js"

// DOM ELEMENTS
const canvas = document.getElementById("canvas")
const scoreEl = document.getElementById("actualScore")
const killsEl = document.getElementById("actualKills")
const startGameBtn = document.getElementById("startGameBtn")
const playAgainBtn = document.getElementById("playAgainBtn")
const finalScoreEl = document.getElementById("finalScore")
const welcomeScreen = document.getElementById("welcomeScreen")
const gameOverScreen = document.getElementById("finalScoreScreen")

// GLOBAL VARIABLES
const ctx = canvas.getContext("2d")
let player
let projectiles = []
let enemies = []
let kills = 0
let score = 0
let gameOver = false
let levelWin = false
let intervals = {
  enemies: []
}
let level = 0
let animationFrameID

// ONLOAD
canvas.height = innerHeight
canvas.width = innerWidth
ctx.fillStyle = CONFIG.canvas.initialColor
ctx.fillRect(0, 0, canvas.width, canvas.height)

setupLoadEventListener()

// FUNCTIONS
  // 1. INIT
function init() {
  if (animationFrameID) {
    cancelAnimationFrame(animationFrameID)
  }

  ctx.fillStyle = CONFIG.canvas.initialColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
 
  if (level <= 1) {
    firstLevel()
  } else {
    nextLevel()
  }
}

function firstLevel() {
  console.log(animationFrameID)
  level = 1
  initializePlayer()
  animate()

  setupProjectiles()
  setupEnemies(CONFIG.levels[level].enemies.int, CONFIG.levels[level].enemies.density)
}

function nextLevel() {
  console.log(animationFrameID)
  initializePlayer()
  animate()

  setupProjectiles()
  setupEnemies(CONFIG.levels[level].enemies.int, CONFIG.levels[level].enemies.density)
}

  // 2. UPDATE
function update() {
  updateProjectiles()
  updateEnemies()
  checkCollisions()
  checkLevelWin()
}

  // 3. DRAW
function draw() {
  player.draw(ctx)
  projectiles.forEach(projectile => projectile.draw(ctx))
  enemies.forEach(enemy => enemy.draw(ctx))
}

  // 4. GAME LOGIC
function initializePlayer() {
  player = new Player(canvas.width, canvas.height)
}

function generateNewProjectile({clientX, clientY}) {
  projectiles.push(new Projectile(canvas.width, canvas.height, clientX, clientY))
}

function setupProjectiles() {
  if (!gameOver && !levelWin) {
    setTimeout(() => {
      window.addEventListener("click", generateNewProjectile)
    }, 100);
  } else {
    window.removeEventListener("click", generateNewProjectile)
  }
}

function setupEnemies(int, enemyDensity) {
  const generateNewEnemies = (int) => {
    const intervalID = setInterval(() => {
      for (let i = 0; i < enemyDensity; i++) {
        enemies.push(new Enemy(canvas.width, canvas.height, player.position.x, player.position.y))
      }
    }, int);

    intervals.enemies.push(intervalID)
  }

  return generateNewEnemies(int)
}

function updateProjectiles() {
  // Check out of bounds and remove
  projectiles.forEach((projectile, index) => {
    if (
      projectile.position.x - projectile.radius >= projectile.canva.sizeX
    || projectile.position.x + projectile.radius <= 0
    || projectile.position.y - projectile.radius >= projectile.canva.sizeY
    || projectile.position.y + projectile.radius <= 0
    ) {
      projectiles.splice(index, 1)
    } else {
      projectile.update()
    }
  })
}

function updateEnemies() {
  enemies.forEach(enemy => enemy.update())
}

function checkCollisions() {
  // Enemy - Projectile collision
  const checkEnemyProjectileCollision = () => {
    enemies.forEach((enemy, enemIndex) => {
      projectiles.forEach((projectile, projIndex) => {
        const distance = getDistanceBetweenCircles(enemy, projectile)

        if (distance <= 0) {
          enemies.splice(enemIndex, 1)
          projectiles.splice(projIndex, 1)

          updateScore()
          updateKills()
        }
      })
    })
  }
  checkEnemyProjectileCollision()

  // Enemy - Player collision
  const checkEnemyPlayerCollision = () => {
    enemies.forEach((enemy, enemIndex) => {
      const distance = getDistanceBetweenCircles(enemy, player)

      if (distance <= 0) {
        handleGameOver()
        return
      }
    })
  }
  checkEnemyPlayerCollision()
}

function updateScore() {
  score++

  drawScore()
}

function updateKills() {
  kills++

  drawKills()
}

function handleGameOver() {
  gameOver = true

  if (animationFrameID) {
    cancelAnimationFrame(animationFrameID)
  }

  // Remove listeners and intervals
  setupProjectiles()
  intervals.enemies.forEach(intervalID => clearInterval(intervalID))
  intervals.enemies = []

  // Render game over screen
  finalScoreEl.textContent = score
  gameOverScreen.style.display = "flex"
}

function checkLevelWin() {
  const killsTarget = CONFIG.levels[level].kills

  if (kills >= killsTarget) {
    handleLevelWin()
  }
}

function handleLevelWin() {
  levelWin = true

  if (animationFrameID) {
    cancelAnimationFrame(animationFrameID)
  }
  
  setupProjectiles()
  intervals.enemies.forEach(intervalID => clearInterval(intervalID))
  intervals.enemies = []

  resetToNextLevel()
}

  // 5. RESOURCE MANAGEMENT
function loadresources() {}

  // 6. SETUP LOAD EVENT LISTENERS
function setupLoadEventListener() {
  window.addEventListener("resize", resizeCanvas)
  startGameBtn.addEventListener("click", () => {
    init()
    welcomeScreen.style.display = "none"
  })
  playAgainBtn.addEventListener("click", resetGame)
}

  // 7. HELPERS
function resizeCanvas() {
  canvas.height = innerHeight
  canvas.width = innerWidth

  player.resetPosition(canvas.width, canvas.height)
  draw()
}

function drawScore() {
  scoreEl.textContent = `Score: ${score}`
}

function drawKills() {
  killsEl.textContent = `Kills: ${kills}`
}

  // 8. MAIN GAME LOOP
function animate() {
  ctx.fillStyle = CONFIG.canvas.updateColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  update()
  draw()

  animationFrameID = requestAnimationFrame(animate)

  if (gameOver || levelWin) cancelAnimationFrame(animationFrameID)
}

  // 9. RESET GAME
function resetGame() {
  gameOverScreen.style.display = "none"
  scoreEl.textContent = ""

  projectiles = []
  enemies = []
  kills = 0
  score = 0
  gameOver = false
  levelWin = false
  level = 0

  if (animationFrameID) {
    cancelAnimationFrame(animationFrameID)
  }

  intervals.enemies.forEach(intervalID => clearInterval(intervalID))
  intervals.enemies = []

  init()
}

function resetToNextLevel() {
  projectiles = []
  enemies = []
  kills = 0
  gameOver = false
  levelWin = false

  if (animationFrameID) {
    cancelAnimationFrame(animationFrameID)
  }

  intervals.enemies.forEach(intervalID => clearInterval(intervalID))
  intervals.enemies = []

  level++

  init()
}