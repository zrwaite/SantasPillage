import Sprite from "./sprite.js"
export default class Ginger extends Sprite{
  constructor(...args){
    super(...args)
    this.images = {"s":[document.getElementById("img-ginger"),document.getElementById("img-ginger")],
    "j":[document.getElementById("img-ginger"),document.getElementById("img-ginger")],
    "wl":[document.getElementById("img-ginger"),document.getElementById("img-ginger")],
    "wr":[document.getElementById("img-ginger"),document.getElementById("img-ginger")]
    }
    this.dirs = {
      left: 0,
      right: 1
    }
    this.mstate = "s";
    let num = Math.floor(Math.random() * 2)
    if (num === 0){this.dir = this.dirs.right}
    else {this.dir = this.dirs.left}
    this.image = this.images[this.mstate][this.dir]
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
    this.speedControl()
    this.xDetect()
    super.update()
  }
  speedControl(){
    if (this.dir === this.dirs.right){
      if (this.canJump){
        this.speed.x = this.speed.maxx
        this.jump()
      } else {
        this.speed.x = 4
        this.jump()
      }
    } else {
      if (this.canJump){
        this.speed.x = -this.speed.maxx
        this.jump()
      } else {
        this.speed.x = -4
        this.jump()
      }
    }
  }
  xDetect(){
    if (this.realPos <=0){
      this.realPos = 0
      this.dir = this.dirs.right
    }
  }
  jump() {
    if (this.canJump) {
      this.speed.y = -this.speed.maxy
      this.canJump = false
      this.jumpCount=1
    }
  }
}
