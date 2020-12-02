import Game from "./game.js"

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const gameWidth = 800
const gameHeight = 600

let game = new Game(gameWidth, gameHeight)

let lastTime = 0
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp
  game.update(deltaTime)
  game.draw(ctx)
  requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)
