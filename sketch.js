//I changed my original idea because i didnt like it that much and I followed some of Daniel Shiffman's tutorials.


let moveMent = 280
let rightPress = false
let leftPress = false
let game = true
let dx = 6
let dy = 6
let score = 0
let lives = 3
let livesRestart = false
const bricks = []
const brickColors = ["#00FF00", "#00FF00", "#00FF00", "#00FF00", "#00FF00", "#00FF00", "#00FF00", "#00FF00"];

const circle = {
  x: moveMent + 50,
  y: 380,
  radius: 20
}

function setup() {
  createCanvas(600, 400);
  createBricks()
}

function paddle() {
  stroke('purple')
  fill('#00000')
  rect(moveMent, 385, 100, 15, 20)
  if (rightPress && moveMent < 500) {
    moveMent += 15
  }
  if (leftPress && moveMent > 0) {
    moveMent += -15
  }
}

function ball() {
  noStroke()
  fill('#FF0000')
  ellipse(circle.x, circle.y, circle.radius, circle.radius)
  if (circle.y <= 0) {
    dy = -dy
    score++
  }
  if (circle.y >= height - 15 && circle.x > moveMent && circle.x <= moveMent + 50) {
    dy = -dy
    if (dx > 0) dx = -dx
    if (dx < 0) dx = dx
  }
  if (circle.y >= height - 15 && circle.x > moveMent + 50 && circle.x <= moveMent + 100) {
    dy = -dy
    if (dx > 0) dx = dx
    if (dx < 0) dx = -dx
  }
  if (circle.x >= width - 10 || circle.x <= 0) dx = -dx

  bricks.forEach((item, index) => {
    if (checkCollisionBottom(circle, item)) {
      dy = -dy
      score++
      bricks.splice(index, 1)
    }
  })

  if (circle.y > height) {
    lives--
    livesRestart = true
    if (lives === 0) game = false
  }
  circle.x += dx
  circle.y += dy
}

function createBricks() {
  const rows = 8
  const cols = 10
  const brickWidth = width / cols
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let brick = {
        x: i * 58 + 10,
        y: j * 12 + 30,
        w: 57,
        h: 10,
        color: brickColors[j]
      }
      bricks.push(brick)
    }
  }
}

function drawBricks() {
  bricks.forEach(brick => {
    fill(brick.color)
    rect(brick.x, brick.y, brick.w, brick.h)
  })
}

function keyPressed(value) {
  if (value.key === 'ArrowRight') {
    rightPress = true
  }
  if (value.key === 'ArrowLeft') {
    leftPress = true
  }
  if (value.keyCode === 32 && livesRestart) {
    livesRestart = false
    circle.x = moveMent + 50
    circle.y = 380
  }
  if (value.keyCode === 32 && !game) {
    game = true
    circle.x = moveMent + 50
    circle.y = 380
    score = 0
    lives = 3
    dy = -6
    moveMent = 250
    createBricks()
  }
}

function keyReleased(value) {
  if (value.key === 'ArrowRight') {
    rightPress = false
  }
  if (value.key === 'ArrowLeft') {
    leftPress = false
  }
}

function restartGame() {
  fill('#FFEEEE')
  textAlign(CENTER);
  noStroke()
  textSize(40)
  text('Press Space to Play Again', 300, 170)
  textSize(28);
  text('Final score: ' + score, 300, 200);
}

function lostLifeText() {
  fill('#FFEEEE')
  textAlign(CENTER);
  noStroke()
  textSize(36)
  text('-1 Life', 300, 170)
  textSize(24);
  text('You have ' + lives + ' left', 300, 200);
  textSize(18);
  text('Press Space to continue', 300, 225);
}

function scoreText() {
  fill('#FFEEEE')
  textAlign(CENTER);
  noStroke()
  textSize(18);
  text('Score = ' + score, 500, 20);
}

function livesText() {
  textAlign(CENTER);
  noStroke()
  textSize(18);
  text('Lives: ' + lives, 40, 20);
}

function checkCollisionBottom(ball, brick) {
  if (ball.y - 20 < brick.y && ball.x > brick.x && ball.x <= brick.x + 58) {
    return true
  }
}

function draw() {
  background('#000000');
  if (game && !livesRestart) ball()
  if (livesRestart && game) lostLifeText()
  if (!game && livesRestart) restartGame()
  if (game) {
    scoreText()
    livesText()
    drawBricks()
    paddle()
  }
}