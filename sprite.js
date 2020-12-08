export default class Sprite{
  constructor(info, id, pos){
    this.info = info
    this.gravity = this.info.gravity
    this.fric = this.info.fric
    this.id = id
    this.pos = pos
    if (this.pos !== null){
      this.startPos = {
        x: Math.abs(this.pos.x),
        y: Math.abs(this.pos.y)
      }
      this.realPos = Math.abs(this.pos.x)
    }
    this.accel = 1.05
    this.image = document.getElementById("img-ghostR")//Default image
    this.height = 100
    this.width = 50
    this.lives = 1
    this.speed = {
      x:0,
      y:0,
      maxx:6,
      maxy: 13
    }
  }
  update(deltaTime) {
    //Simple physics
    this.speed.y += this.gravity
    this.pos.y += this.speed.y
    this.realPos += this.speed.x
    this.yDetect()
  }
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
  yDetect(){
    //Vertical Bounds detection
    if (this.pos.y + this.height > this.info.height) {
      this.pos.y = this.info.height - this.height
      this.speed.y = 0
    } else if (this.pos.y < 0){
      this.pos.y = 0
      this.speed.y = 0
    }
  }
}
