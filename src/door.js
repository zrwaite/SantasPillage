export default class Door {
  constructor(info, id, pos) {
    this.info = info
    this.id = name
    this.pos = pos
    this.states = {
      "closed": document.getElementById("img-doorC"),
      "open": document.getElementById("img-doorO")
    }
    this.state='closed'
    this.image = this.states[this.state]
    this.width = 40
    this.height = 80
    if (this.pos !== null){this.realPos = Math.abs(this.pos.x)}
  }
  update() {
    this.image = this.states[this.state]
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
  }
}
