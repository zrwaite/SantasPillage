import Sprite from "./sprite.js"
export default class Deer extends Sprite{
  constructor(...args){
    super(...args)
    this.images = [[document.getElementById("img-deerL1"), document.getElementById("img-deerL2"), document.getElementById("img-deerL3"), document.getElementById("img-deerL4")],
                  [document.getElementById("img-deerR1"), document.getElementById("img-deerR2"), document.getElementById("img-deerR3"), document.getElementById("img-deerR4")]]
    this.dirs = {
      left: 0,
      right: 1
    }
    this.state = 0;
    let num = Math.floor(Math.random() * 2)
    if (num === 0){this.dir = this.dirs.right}
    else {this.dir = this.dirs.left}
    this.image = this.images[this.dir][this.state]
    this.height = 70
    this.width = 100
    this.gravity = 0
    this.detect = false
    this.count = 0
    this.spinSpeed = 12
    this.speed = {
      x:0,
      y:0,
      maxx:5,
      maxy:13
    }
  }
  update(deltaTime) {
    this.count++
    this.count = this.count%this.spinSpeed
    if(this.count%this.spinSpeed===0){
      this.state++
      this.state = (this.state+4)%4
    }
    this.image = this.images[this.dir][this.state]
    this.speedControl()
    this.detector()
    this.xDetect()
    super.update()
  }
  detector(){
    if(this.detect){
      if(this.speed.y>0){this.speed.y=0}
      this.speed.y-=0.2
    } else {
      if(this.speed.y<0){this.speed.y=0}
      this.speed.y+=0.2
    }
  }
  speedControl(){
    if (this.dir === this.dirs.right){
      this.speed.x = this.speed.maxx
    } else {
      this.speed.x = -this.speed.maxx
    }
  }
  xDetect(){
    if (this.realPos <=0){
      this.realPos = 0
      this.dir = this.dirs.right
    }
  }

}
