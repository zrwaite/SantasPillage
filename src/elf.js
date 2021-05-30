import Sprite from "./sprite.js"
export default class Elf extends Sprite{
  constructor(...args){
    super(...args)
    this.images = {"j":[document.getElementById("img-elfJL"),document.getElementById("img-elfJR")],
    "w1":[document.getElementById("img-elfWL1"),document.getElementById("img-elfWR1")],
    "w2":[document.getElementById("img-elfWL2"),document.getElementById("img-elfWR2")],
    "s":[document.getElementById("img-elfSL"),document.getElementById("img-elfSR")],
    }
    this.dirs = {
      left: 0,
      right: 1
    }
    this.mstate = "w1";
    this.dir=this.dirs.left
    this.image = this.images[this.mstate][this.dir]
    this.height = 60
    this.width = 40
    this.count = 0
    this.detect = false
    this.detectNum = 0
    this.legSpeed = 10
    if(this.cutscene){this.moving=false}
    else{this.moving=true}
    this.canJump = false
    this.speed = {
      x:0,
      y:0,
      maxx:5,
      maxy:14
    }
  }
  update(deltaTime) {
    if (!this.canJump){this.mstate="j"}
    else{
      if(this.moving){
        this.count++
        if (this.count<this.legSpeed){this.mstate="w1"}
        else if (this.count<2*this.legSpeed){this.mstate="w2"}
        else {this.count=0}
      }
      else{this.mstate="s"}
    }
    this.image = this.images[this.mstate][this.dir]
    this.detector()
    if(this.moving){this.speedControl()}
    super.update()
  }
  speedControl(){
    if(this.detect){
      this.speed.x = (this.dir-0.5)*4
      this.jump()
      this.detectNum++
      if(this.detectNum>35){
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
    if(this.detects.top || this.pos.y+this.height>=this.info.height){
      this.canJump = true
      this.speed.y = 0;
    } else {this.canJump = false}
    if((this.detects.left&&this.dir===1)||(this.detects.right&&this.dir===0)){this.detect = true}
    else if(this.detects.bottom){this.speed.y=0}
  }
  jump() {
    if (this.canJump) {
      this.speed.y = -this.speed.maxy
      this.canJump = false
    }
  }

}
