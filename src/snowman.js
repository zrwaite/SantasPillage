import Sprite from "./sprite.js"
export default class Snowman extends Sprite {
  constructor(...args) {
    super(...args)
    this.images = [document.getElementById("img-snowman1"), document.getElementById("img-snowman2"), document.getElementById("img-snowman3")]
    this.state = 0
    this.image = this.images[this.state]
    this.dead = false //ish
    this.width = 70
    this.height = 120
    this.gravity = 0.1
    this.count = 0
    this.throw = false
    this.wait = Math.floor(Math.random() * 50)+50
  }
  update() {
    if (!this.dead&&!this.cutscene) {
      this.count++
      switch(Math.floor(this.count/this.wait)){
        case 0: case 1:
          this.state = 0
          break
        case 2:
          if(this.state === 0){this.throw = true}
          else{this.throw = false}
          this.state = 1
          break
        default:
          this.count = 0
          break
      }
    } else if (this.dead){
      this.throw = false
      this.height = 53
    }
    this.image = this.images[this.state]
    this.detector()
    super.update()
  }
  detector(){
    if(this.detects.top){
      this.speed.y = 0;
      this.gravity = 0;
    }
    if(this.detects.left||this.detects.right){
    }
    if(this.detects.bottom){

    }
  }
  death(){
    this.dead = true
    this.state = 2
    this.speed.y = 0;
    this.gravity = 0.4;
  }
}
