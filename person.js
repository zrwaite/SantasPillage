import Sprite from "./sprite.js"
export default class Person extends Sprite{
  constructor(...args){
    super(...args)
    this.zac = {"s":[document.getElementById("img-zacSR"),document.getElementById("img-zacSR")],
    "j":[document.getElementById("img-zacSR"),document.getElementById("img-zacSR")],
    "wl":[document.getElementById("img-zacSR"),document.getElementById("img-zacSR")],
    "wr":[document.getElementById("img-zacSR"),document.getElementById("img-zacSR")]
    }
    this.matt = {"s":[document.getElementById("img-mattSR"),document.getElementById("img-mattSR")],
    "j":[document.getElementById("img-mattSR"),document.getElementById("img-mattSR")],
    "wl":[document.getElementById("img-mattSR"),document.getElementById("img-mattSR")],
    "wr":[document.getElementById("img-mattSR"),document.getElementById("img-mattSR")]
    }
    this.dirs = {
      left: 0,
      right: 1
    }
    this.mstate = "s"; //Movement State; Standing, Jumping, Walking animation
    this.dir = this.dirs.right //Which way they are looking
    this.characters = {1:this.zac, 2:this.matt}
    this.person = this.characters[this.id]
    this.image = this.person[this.mstate][this.dir]
    this.height = 100
    this.width = 50
    this.legSpeed = 12 //time between the walking animation frames
    this.lives = 3
    this.canJump = false //Is true when there is ground under you
    this.moving = false //If you are moving left or right with the controls
    this.speed = {
      x:0,
      y:0,
      maxx:6,
      maxy: 14
    }
  }
  reset(){
    this.pos.x = this.startPos.x
    this.pos.y = this.startPos.y
    this.speed.y = 0
    this.speed.x = 0
  }
  update(deltaTime) {
    if (this.pos.y + this.height >= this.info.height) {this.canJump = true}
    this.speedControl()
    this.xDetect()
    super.update()
  }
  speedControl(){
    if (this.speed.x>this.speed.maxx){this.speed.x = this.speed.maxx}
    else if (this.speed.x<-this.speed.maxx){this.speed.x = -this.speed.maxx}
    else if (Math.abs(this.speed.x)<0.2){this.speed.x = 0} //Saves computation
    else {
      if (!this.moving){this.accel = this.fric} //Friction
      this.speed.x *= this.accel
    }
  }
  xDetect(){
    //Horizontal bounds detection
    if (this.realPos <=0){
      this.realPos = 0
    }
  }
  left() {
    console.log('left')
    if (!this.moving){//Only sets speed to 1 at the beginning, then accelerates to max speed
      this.dir = this.dirs.left
      this.speed.x = -1
      this.accel = 1.1
      this.moving = true
    }
    else if(this.dir === this.dirs.left){
      if (this.speed.x >=-1){this.speed.x = -1}
      this.accel = 1.1
      this.moving = true
    }
  }
  right() {
    console.log('right')
    if (!this.moving){
      this.dir = this.dirs.right
      this.speed.x = 1
      this.accel = 1.1
      this.moving = true
    }
    else{
      if(this.dir === this.dirs.right){
        this.dir = this.dirs.right
        if (this.speed.x <=1){this.speed.x = 1}
        this.accel = 1.1
        this.moving = true
      }
    }
  }
  jump() {
    if (this.canJump) {
      this.speed.y = -this.speed.maxy
      this.canJump = false
    }
  }
}
