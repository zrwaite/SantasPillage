export default class Cane{
  constructor(pos){
    this.pos = pos
    this.speed = 0
    this.realPos = Math.abs(this.pos.x)
    this.images = [document.getElementById("img-cane1"), document.getElementById("img-cane2"), document.getElementById("img-cane3"), document.getElementById("img-cane4"), document.getElementById("img-cane5")]
    this.place = 0
    this.image = this.images[this.place]
    this.height = 40
    this.width = 40
    this.count = 0
    this.spinSpeed = 3+Math.floor(Math.random() * 4)
  }
  update(deltaTime) {
    this.count++
    switch(Math.floor(this.count/this.spinSpeed)){
      case 0:
        this.place = 0
        break
      case 1: case 8:
        this.place = 1
        break
      case 2: case 7:
        this.place = 2
        break
      case 3: case 6:
        this.place = 3
        break
      case 4: case 5:
        this.place = 4
        break
      default:
        this.count = 0
        break
    }
    this.image = this.images[this.place]
  }
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
}
