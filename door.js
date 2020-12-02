export default class Door {
  constructor(game, id, pos) {
    this.game = game
    this.id = name
    this.pos = pos
    this.image = document.getElementById("img-door")
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.width = 40
    this.height = 80
    if (this.pos !== null){this.startPos = Math.abs(this.pos.x)}
  }
  update() {
    this.pos.x = this.startPos - this.game.pos
    this.game.persons.forEach((object)=>this.detector(object))
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > this.pos.y && sprite.pos.y < this.pos.y + this.height && sprite.pos.x + sprite.width > this.pos.x && sprite.pos.x < this.pos.x + this.width){
      this.game.level += 1
      this.game.start()
    }
  }
}
