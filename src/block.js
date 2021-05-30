export default class Block {
  constructor(info, id, pos, covered) {
    this.info = info
    this.id = id
    this.pos = pos
    this.covered = covered
    this.image = document.getElementById("img-block".concat(Math.floor(Math.random() * 8)+1))
    this.width = this.info.width/20
    this.height = this.info.height/15
    if (this.pos !== null){this.realPos = Math.abs(this.pos.x)}
  }
  update() {}
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
}
