export default class Icicle{
  constructor(info, pos){
    this.info=info
    this.pos=pos
    this.realPos = Math.abs(this.pos.x)
    this.speed=0
    this.gravity=this.info.gravity
    this.falling=false
    this.detect=false
    this.images = {
      "i1":document.getElementById("img-icicle1"),
      "i2":document.getElementById("img-icicle1"),
      "i3":document.getElementById("img-icicle2")
    }
    this.mstate = "i1";
    this.image = this.images[this.mstate]
    this.height = 80
    this.width = 40
  }
  update(deltaTime) {
    if(this.falling) {
      this.detector()
      this.speed+=this.gravity
      this.pos.y+=this.speed
      if(this.pos.y+this.height>this.info.height) {
        this.detect=true
        this.height=10
        this.pos.y=this.info.height-this.height
      }
    }
    else if(this.mstate==='i2'){
      if(this.height>10){
        this.height-=20
        this.pos.y+=20
      }
      else{
        this.pos.y+=this.height-10
        this.height=10
        this.mstate='i3'
      }
    }
    this.image = this.images[this.mstate]
  }

  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
  detector(){
    if(this.detect){
      this.speed = 0;
      this.gravity = 0;
      this.falling=false
      this.mstate="i2"
    }
  }
}
