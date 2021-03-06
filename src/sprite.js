export default class Sprite{
  constructor(info, id, pos, cutscene=false){
    this.info = info
    this.gravity = this.info.gravity
    this.fric = this.info.fric
    this.id = id
    this.pos = pos
    this.cutscene = cutscene
    if (this.pos.x !== null){
      this.startPos = {
        x: Math.abs(this.pos.x),
        y: Math.abs(this.pos.y)
      }
      this.realPos = Math.abs(this.pos.x)
    }
    else{
      this.startPos = null
      this.realPos = null
    }
    this.accel = 1.05
    this.image = document.getElementById("img-ghostR")//Default image
    this.height = 100
    this.width = 50
    this.lives = 1
    this.detects = {
      top:false,
      left:false,
      right:false,
      bottom:false
    }
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
  draw(ctx) {if(this.pos.x!==null){ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}}
  yDetect(){
    //Vertical Bounds detection
    if (this.pos.y + this.height > this.info.height){
      this.pos.y = this.info.height - this.height
      this.speed.y = 0
    } else if (this.pos.y < 0){this.pos.y = this.speed.y = 0}
  }
}
