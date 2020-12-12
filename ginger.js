import Sprite from "./sprite.js"
export default class Ginger extends Sprite{
  constructor(...args){
    super(...args)
    this.images = [document.getElementById("img-gingerL"),document.getElementById("img-gingerR")]
    this.dirs = {
      left: 0,
      right: 1
    }
    let num = Math.floor(Math.random() * 2)
    if (num === 0){this.dir = this.dirs.right}
    else {this.dir = this.dirs.left}
    this.image = this.images[this.dir]
    this.height = 100
    this.width = 60
    this.legSpeed = 12
    this.canJump = false
    this.gravity = 1-(0.5)
    this.jumpCount = 0
    this.speed = {
      x:0,
      y:0,
      maxx:5,
      maxy:13
    }
    this.reset()
  }
  reset(){
    this.pos.x = this.startPos.x
    this.pos.y = this.startPos.y
    this.speed.y = 0
    this.speed.x = 0
  }
  update(deltaTime) {
    if (this.pos.y + this.height >= this.info.height) {this.canJump = true}
    this.image = this.images[this.dir]
    this.speedControl()
    this.detector()
    this.jump()
    super.update()
  }
  speedControl(){
    if (this.canJump){this.speed.x = this.speed.maxx*(this.dir-0.5)*2}
    else {this.speed.x = 4*(this.dir-0.5)*2}
  }
  detector(){
    if (this.realPos <=0){
      this.realPos = 0
      this.dir = this.dirs.right
    }
    if(this.detects.top){
      this.canJump = true
      this.jump()
    }
    if(this.detects.left||this.detects.right){this.speed.x = 0}
    if(this.detects.bottom){this.speed.y = 0}
  }
  jump() {
    if (this.canJump) {
      this.speed.y = -this.speed.maxy
      this.canJump = false
      this.jumpCount=1
    }
  }
}
