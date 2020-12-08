import Sprite from "./sprite.js"
export default class Person extends Sprite{
  constructor(...args){
    super(...args)
    this.zac = {"s":[document.getElementById("img-zacSL"),document.getElementById("img-zacSR")],
    "j":[document.getElementById("img-zacJL"),document.getElementById("img-zacJR")],
    "w1":[document.getElementById("img-zacWL1"),document.getElementById("img-zacWR1")],
    "w2":[document.getElementById("img-zacWL2"),document.getElementById("img-zacWR2")]
    }
    this.matt = {"s":[document.getElementById("img-mattSL"),document.getElementById("img-mattSR")],
    "j":[document.getElementById("img-mattJL"),document.getElementById("img-mattJR")],
    "w1":[document.getElementById("img-mattWL1"),document.getElementById("img-mattWR1")],
    "w2":[document.getElementById("img-mattWL2"),document.getElementById("img-mattWR2")]
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
    this.count = 0
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
    if (!this.canJump){this.mstate="j"}
    else if (this.moving){
      this.count++
      if (this.count<this.legSpeed){this.mstate="w1"}
      else if (this.count<2*this.legSpeed){this.mstate="w2"}
      else {this.count=0}
    } else{
      this.count = 0
      this.mstate="s"
    }
    this.image = this.person[this.mstate][this.dir]
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
    if (this.realPos <=0){this.realPos = 0}
  }
  left() {
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
