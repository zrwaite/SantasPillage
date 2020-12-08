export default class Door {
  constructor(info, id, pos) {
    this.info = info
    this.id = name
    this.pos = pos
    this.image = document.getElementById("img-door")
    this.width = 40
    this.height = 80
    if (this.pos !== null){this.realPos = Math.abs(this.pos.x)}
  }
  update() {
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
  }
}
