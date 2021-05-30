import Sprite from "./sprite.js"
export default class Elf extends Sprite{
  constructor(...args){
    super(...args)
    this.state = 0
    this.images=[
      document.getElementById('img-santa1'),
      document.getElementById('img-santa2'),
      document.getElementById('img-santa3'),
      document.getElementById('img-santa4'),
      document.getElementById('img-santa5'),
      document.getElementById('img-santa6'),
      document.getElementById('img-santa7'),
      document.getElementById('img-santa8'),
    ]
    this.height = 150
    this.width = 110
    this.count = 0
    this.wait = 50
  }
  update(deltaTime) {
    this.image = this.images[this.state]
    this.detector()
    super.update()
  }
  detector(){
    if(this.detects.top || this.pos.y+this.height>=this.info.height){
      this.speed.y = 0;
      this.accel = this.fric //Friction
      this.speed.x *= this.accel
    }

  }
}
