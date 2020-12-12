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
    this.wait = Math.floor(Math.random() * 100)+100
  }
  /*
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y && sprite.pos.y < block.pos.y + block.height && sprite.pos.x + sprite.width > block.pos.x && sprite.pos.x < block.pos.x + block.width){
      this.dead = true
      this.image = this.images[3]
      this.height = 55
    }
  }
  */
  update() {
    if (!this.dead) {
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
}
