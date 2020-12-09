export default class Icicle{
  constructor(info, pos){
    this.info=info
    this.pos=pos
    this.realPos = Math.abs(this.pos.x)
    this.speed=0
    this.gravity=this.info.gravity
    this.falling=true
    this.images = {
    "i1":document.getElementById("img-icicle1"),
    "i2":document.getElementById("img-icicle2"),
    "i3":document.getElementById("img-icicle3")
    }
    this.mstate = "i1";
    this.image = this.images[this.mstate]
    this.height = 80
    this.width = 40
  }
  update(deltaTime) {
    if(false) {
      this.mstate="i2"
    }
    //else {this.mstate="i3"}
    if(this.falling) {
      this.speed+=this.gravity
      this.pos.y+=this.speed
      if(this.pos.y+this.height>this.info.height) {
        this.falling=false
        this.height=30
        this.pos.y=this.info.height-this.height
        this.speed=0
        this.mstate="i3"
      }
    }
    this.image = this.images[this.mstate]
  }

draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
}
