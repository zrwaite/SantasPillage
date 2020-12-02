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
    this.levelWidth = 0
    this.inDaZone = false //If you are stationary while the map moves
    this.moving = false //If you are moving left or right with the controls
    this.reset()
  }
  reset(){
    this.pos.x = this.startPos.x
    this.pos.y = this.startPos.y
    this.speed.y = 0
    this.speed.x = 0
  }
  update(deltaTime) {
    if (this.pos.y + this.height >= this.gHeight) {this.canJump = true}
    this.speedControl()
    this.xDetect()
    this.controls()
    this.daZone()
    if(!this.game.inputs[this.id-1].rPressed&&!this.game.inputs[this.id-1].lPressed){this.moving = false} //If left and right aren't pressed then they aren't moving
    super.update()
  }
  speedControl(){
    if (this.speed.x>this.speed.maxx){this.speed.x = this.speed.maxx}
    else if (this.speed.x<-this.speed.maxx){this.speed.x = -this.speed.maxx}
    else if (Math.abs(this.speed.x)<0.2){this.speed.x = 0} //Saves computation
    else {
      if (!this.moving){this.accel = this.Fric} //Friction
      this.speed.x *= this.accel
    }
  }
  xDetect(){
    //Horizontal bounds detection
    if (this.realPos + this.width >= this.gWidth+this.game.pos){
      this.realPos = this.gWidth - this.width + this.game.pos
    }
    if (this.realPos <=0){
      this.realPos = 0
    }
  }
  controls(){
    if(this.game.inputs[this.id-1].uPressed){this.jump()}
    if(this.game.inputs[this.id-1].lPressed){this.left()}
    if(this.game.inputs[this.id-1].rPressed){this.right()}
  }
  daZone(){
    this.levelWidth = this.game.levelLen
    let pPoss = []; //Array of player positions
    if ((this.realPos >= 450 && this.realPos<=450+this.levelWidth)||(this.game.pos>0 && this.game.pos<this.levelWidth)){
      //This player in da zone
      this.game.inDaZone = true
      this.inDaZone = true;
      [...this.game.persons].forEach((object)=>pPoss.push(object.realPos))
      if (Math.max(...pPoss) > this.levelWidth + 450){
        this.game.pos = this.levelWidth
      } else{
        this.game.pos = Math.max(...pPoss) - 450
      }
    } else if (this.game.pos>0 && this.game.pos<this.levelWidth){
      //Other player in da zone
      this.game.inDaZone = true
      this.inDaZone = false;
      [...this.game.persons].forEach((object)=>pPoss.push(object.realPos))
      if (Math.max(...pPoss) > this.levelWidth + 450){
        this.game.pos = this.levelWidth
      } else{
        this.game.pos = Math.max(...pPoss) - 450
      }
    } else {
      //Nobody in da zone
      this.game.inDaZone = false
      this.inDaZone = false
      if (this.game.pos >= this.levelWidth){this.game.pos = this.levelWidth}
      else if (this.game.pos <= 0){this.game.pos = 0}
    }
  }
  left() {
    if (!this.moving){//Only sets speed to 1 at the beginning, then accelerates to max speed
      this.dir = this.dirs.left
      this.speed.x = -1
      this.accel = 1.1
      this.moving = true
    }
    else if(this.game.inputs[this.id-1].dir === "left"){
      this.dir = this.dirs.left
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
      if(this.game.inputs[this.id-1].dir === "right"){
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
