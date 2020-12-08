export default class Block {
  constructor(info, id, pos) {
    this.info = info
    this.id = id
    this.pos = pos
    this.image = document.getElementById("img-block")
    this.width = this.info.width/20
    this.height = this.info.height/15
    if (this.pos !== null){this.realPos = Math.abs(this.pos.x)}
  }
  update() {
  }
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
}
