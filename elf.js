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
    this.detect = false
    this.detectNum = 0
    this.legSpeed = 12
    this.canJump = false
    this.speed = {
      x:0,
      y:0,
      maxx:5,
      maxy:14
    }
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
    this.detector()
    this.speedControl()
    super.update()
  }
  speedControl(){
    if(this.detect){
      this.speed.x = 0
      this.jump()
      this.detectNum++
      if(this.detectNum>50){
        this.detectNum = 0
        this.detect=false
        if(this.dir===0){this.dir=1}
        else{this.dir=0}
        if (this.dir === this.dirs.right){this.speed.x = this.speed.maxx}
        else {this.speed.x = -this.speed.maxx}
      }
    }
    else{
      if (this.dir === this.dirs.right){this.speed.x = this.speed.maxx}
      else {this.speed.x = -this.speed.maxx}
      this.detectNum = 0
    }
  }
  detector(){
    if (this.realPos <=0){
      this.realPos = 0
      this.dir = this.dirs.right
    }
    if(this.detects.top){
      this.canJump = true
      this.speed.y = 0;
    }
    if(this.detects.left){
      if (this.dir===1){this.detect = true}
    }
    if(this.detects.right){
      if (this.dir===0){this.detect = true}
    }
    if(this.detects.bottom){
      this.speed.x = 0
    }

  }
  jump() {
    if (this.canJump) {
      console.log(this.canJump)
      this.speed.y = -this.speed.maxy
      this.canJump = false
    }
  }

}
