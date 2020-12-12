export default class Cookie {
  constructor(info, id, pos) {
    this.info = info
    this.id = id
    this.pos = pos
    this.images = [
      document.getElementById("img-angel"),
      document.getElementById("img-star"),
      document.getElementById("img-snowflake"),
      document.getElementById("img-tree"),
    ]
    this.image = this.images[(this.id-1)%this.images.length]
    this.width = 33
    this.height = 33
    this.realPos = Math.abs(this.pos.x)
    this.startPos = Math.abs(this.pos.y)
    this.count = 0
    this.delete = false
  }
  update() {
    console.log(this.delete)
    this.count+=0.1
    if(this.count===360){this.count=0}
    this.pos.y=this.startPos + Math.sin(this.count)*7
  }
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
}
