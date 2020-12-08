import Sprite from "./sprite.js"
export default class Elf extends Sprite{
  constructor(...args){
    super(...args)
    this.images = {"j":[document.getElementById("img-elfJL"),document.getElementById("img-elfJR")],
    "w1":[document.getElementById("img-elfWL1"),document.getElementById("img-elfWR1")],
    "w2":[document.getElementById("img-elfWL2"),document.getElementById("img-elfWR2")]
    }
    this.dirs = {
      left: 0,
      right: 1
    }
    this.mstate = "w1";
    let num = Math.floor(Math.random() * 2)
    if (num === 0){this.dir = this.dirs.right}
    else {this.dir = this.dirs.left}
    this.image = this.images[this.mstate][this.dir]
    this.height = 60
    this.width = 40
    this.count = 0
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
    if (this.pos.y + this.height >= this.info.height) {this.canJump = true}
    if (!this.canJump){this.mstate="j"}
    else{
      this.count++
      if (this.count<this.legSpeed){this.mstate="w1"}
      else if (this.count<2*this.legSpeed){this.mstate="w2"}
      else {this.count=0}
    }
    this.image = this.images[this.mstate][this.dir]
    this.speedControl()
    this.xDetect()
    super.update()
  }
  speedControl(){
    if (this.dir === this.dirs.right){
      if (this.canJump){this.speed.x = this.speed.maxx}
      else {this.speed.x = 1}
    } else {
      if (this.canJump){this.speed.x = -this.speed.maxx}
      else {this.speed.x = -1}
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
    }
  }

}
