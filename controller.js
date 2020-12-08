export default class Controller {
  constructor(game, sprite) {
    this.game = game
    this.sprite = sprite
    this.id = sprite.id
    this.lPressed = false
    this.rPressed = false
    this.uPressed = false
    this.dir = "right"
    this.controls = {
      1: [65, 87, 68],
      2: [37, 38, 39]
    }
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case this.controls[this.id][0]: //Left, left
          this.lPressed = true
          this.dir = "left"
          break
        case this.controls[this.id][1]: //Up, up
            this.uPressed = true
          break
        case this.controls[this.id][2]: //Right, right
          this.rPressed = true
          this.dir = "right"
          break
      }
    })
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case this.controls[this.id][0]://Left, A
          this.lPressed = false
          break
        case this.controls[this.id][1]://Up, W
          this.uPressed = false
          break
        case this.controls[this.id][2]: //Right, D
          this.rPressed = false
          break
      }
    })
  }
}
