import Sprite from "./sprite.js"
export default class Person extends Sprite{
  constructor(player, ...args){
    super(...args)
    this.player = player
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
    this.kell = {"s":[document.getElementById("img-kellSL"),document.getElementById("img-kellSR")],
    "j":[document.getElementById("img-kellJL"),document.getElementById("img-kellJR")],
    "w1":[document.getElementById("img-kellWL1"),document.getElementById("img-kellWR1")],
    "w2":[document.getElementById("img-kellWL2"),document.getElementById("img-kellWR2")]
    }
    this.grey = {"s":[document.getElementById("img-greySL"),document.getElementById("img-greySR")],
    "j":[document.getElementById("img-greyJL"),document.getElementById("img-greyJR")],
    "w1":[document.getElementById("img-greyWL1"),document.getElementById("img-greyWR1")],
    "w2":[document.getElementById("img-greyWL2"),document.getElementById("img-greyWR2")]
    }
    this.bella = {"s":[document.getElementById("img-bellaSL"),document.getElementById("img-bellaSR")],
    "j":[document.getElementById("img-bellaJL"),document.getElementById("img-bellaJR")],
    "w1":[document.getElementById("img-bellaWL1"),document.getElementById("img-bellaWR1")],
    "w2":[document.getElementById("img-bellaWL2"),document.getElementById("img-bellaWR2")]
    }
    this.weiqi = {"s":[document.getElementById("img-weiqiSL"),document.getElementById("img-weiqiSR")],
    "j":[document.getElementById("img-weiqiJL"),document.getElementById("img-weiqiJR")],
    "w1":[document.getElementById("img-weiqiWL1"),document.getElementById("img-weiqiWR1")],
    "w2":[document.getElementById("img-weiqiWL2"),document.getElementById("img-weiqiWR2")]
    }
    this.dirs = {
      left: 0,
      right: 1
    }
    this.mstate = "s"; //Movement State; Standing, Jumping, Walking animation
    this.lstate = 0 //Life State, either alive, injured, or dead
    this.dir = this.dirs.right //Which way they are looking
    this.characters = [this.zac, this.matt, this.kell, this.grey, this.bella, this.weiqi]
    this.person = this.characters[this.player]
    this.image = this.person[this.mstate][this.dir]
    this.death = document.getElementById("img-ghostR")
    this.height = 100
    this.width = 50
    this.count = 0
    this.wait = 0
    this.legSpeed = 10 //time between the walking animation frames
    this.lives = 3
    this.canJump = false //Is true when there is ground under you
    this.moving = false //If you are moving left or right with the controls
    this.hit = false
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
    if(this.lives<=0){
      this.image=(this.death)
      return
    }
    if(this.hit){
      this.wait++
      if(this.wait>60){
        this.hit = false
        this.wait = 0
      }
    }
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
    this.detector()
    super.update()
  }
  draw(ctx) {
    if(this.hit){ctx.globalAlpha = 0.5}
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    ctx.globalAlpha = 1
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
  detector(){
    //Horizontal bounds detection
    if (this.realPos <=0){this.realPos = 0}
    if (this.detects.top){
      this.canJump = true
      this.speed.y = 0;
      if (!this.moving){this.friction = this.blockFriction}
    }
    if (this.detects.left||this.detects.right){
      if(this.moving){this.speed.x = 0}
      this.moving = false
    }
    if(this.detects.bottom){
      this.speed.y = 0
    }
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
