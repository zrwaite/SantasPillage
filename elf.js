import Sprite from "./sprite.js"
export default class Elf extends Sprite{
  constructor(...args){
    super(...args)
    this.images = {"s":[document.getElementById("img-elfSR"),document.getElementById("img-elfSR")],
    "j":[document.getElementById("img-elfSR"),document.getElementById("img-elfSR")],
    "wl":[document.getElementById("img-elfSR"),document.getElementById("img-elfSR")],
    "wr":[document.getElementById("img-elfSR"),document.getElementById("img-elfSR")]
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
    this.height = 60
    this.width = 40
    this.legSpeed = 12
    this.canJump = false
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
    console.log(this.speed.y)
    if (this.pos.y + this.height >= this.gHeight) {this.canJump = true}
    this.speedControl()
    this.xDetect()
    super.update()
  }
  speedControl(){
    if (this.dir === this.dirs.right){
      if (this.canJump){
        this.speed.x = this.speed.maxx
      } else {
        this.speed.x = 1
      }
    } else {
      if (this.canJump){
        this.speed.x = -this.speed.maxx
      } else {
        this.speed.x = -1
      }
    }

  }
  xDetect(){
    if (this.realPos + this.width >= this.game.levelLen+800){
      this.dir = this.dirs.left
    }
    if (this.realPos <=0){
      this.realPos = 0
      this.dir = this.dirs.right
    }
  }
  jump() {
    if (this.canJump) {
      this.speed.y = -this.speed.maxy
      this.canJump = false
    }
  }

}
