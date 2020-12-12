export default class Angel {
  constructor(info, id, pos) {
    this.info = info
    this.id = id
    this.pos = pos
    this.image = document.getElementById("img-angel")
    this.width = 30
    this.height = 30
    this.realPos = Math.abs(this.pos.x)
    this.startPos = Math.abs(this.pos.y)
    this.count = 0
    this.delete = false
  }
  update() {
    console.log(this.delete)
    this.count+=0.1
    if(this.count===360){this.count=0}
    this.pos.y=this.startPos + Math.sin(this.count)*6
  }
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
}
