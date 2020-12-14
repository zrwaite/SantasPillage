import Sprite from "./sprite.js"
export default class Snowball extends Sprite{
  constructor(dir, ...args){
    super(...args)
    this.images = [
      document.getElementById('img-snowball1'),
      document.getElementById('img-snowball2'),
      document.getElementById('img-snowball3'),
      document.getElementById('img-snowball4'), ]
    this.state = 0;
    this.dir = dir
    this.image = this.images[this.state]
    this.height = 30
    this.width = 30
    this.count = 0
    this.loop = 0
    this.delete = false
    this.spinSpeed = 10
    this.speed = {
      x:0,
      y:0,
      maxx:4,
      maxy:13
    }
  }
  update(deltaTime) {
    this.count+=this.dir
    this.count = this.count%this.spinSpeed
    if(this.count%this.spinSpeed===0){
      if(this.dir===-1){this.state++}
      else{this.state--}
      this.state = (this.state+4)%4
      this.loop++
    }
    if(this.loop>25){this.delete = true}
    this.speedControl()
    this.detector()
    this.image = this.images[this.state]
    super.update()
  }
  speedControl(){
    if (this.dir === 1){this.speed.x = this.speed.maxx}
    else {this.speed.x = -this.speed.maxx}
  }
  detector(){
    if (this.realPos <=0){this.delete = true}
    if(this.detects.top){
      this.speed.y = 0;
    }
    if(this.detects.left||this.detects.right){
      this.delete = true
    }
    if(this.detects.bottom){
      snowball.speed.y = 0
    }
  }

}
