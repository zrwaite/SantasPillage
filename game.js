import Input from "./input.js"
import Controller from "./controller.js"
import Sprite from "./sprite.js"
import Person from "./person.js"
import Block from "./block.js"
import Door from "./door.js"
import Display from "./display.js"
import Bg from "./bg.js"
import { onePBuild, onePLevels} from "./1PLevels.js"
import { twoPBuild, twoPLevels} from "./2PLevels.js"

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth
    this.height = gameHeight
    this.gravity = 1-(0.3)
    this.fric = 1-(0.4) //Friction
    this.onePLevels = onePLevels
    this.twoPLevels = twoPLevels
    this.level = 0 //starting level is 0
    this.levelLen = 0 //Length of level in pixels - used for moving map
    this.pos = 0 //Position of moving map
    this.numPlayers = 1
    this.hitbox = 0
    this.hvHandicap = 0
    this.objects = [] //Used to store all game objects from level generator
    this.persons = []
    this.blocks = []
    this.doors = []
    this.elves = []
    this.gingers = []
    this.inputs = []
    this.info = {
      width:this.width,
      height:this.height,
      gravity:this.gravity,
      fric:this.fric,
    }
    this.states = {
      start: 0,
      running: 1,
      paused: 2,
      gameover: 3,
      win: 4
    } //All of the game states
    this.state = this.states.start //Default is the start screen
    this.sprite = new Sprite(this.info, 0, null)
    this.block = new Block(this.info, 0, null) //Declare with null position to pull information from without drawing on screen
    this.door = new Door(this.info, 0, null)
    this.bg = new Bg(this) //Background
    this.display = new Display(this) //Display (this.states controls this)
    this.input = new Input(this) //Standard inputs, like pause and play
  }
  start() {
    [...this.persons, ...this.blocks, ...this.doors, ...this.elves, ...this.gingers].forEach((object) => object = null)
    this.state = this.states.running //Starts the game
    // Pulls objects from level creator
    if (this.numPlayers === 1){this.objects = onePBuild(this, this.onePLevels[this.level])}
    else {this.objects = twoPBuild(this, this.twoPLevels[this.level])}
    this.persons = this.objects[0]
    this.blocks = this.objects[1]
    this.doors = this.objects[2]
    this.elves = this.objects[3]
    this.gingers = this.objects[4]
    this.levelLen = this.objects[5] - 800
    this.inputs = [new Controller(this, this.persons[0])]
    //Multiplayer:
    if (this.numPlayers > 1){this.inputs.push(new Controller(this, this.persons[1]))}
    this.pos = 0 //Resets map position
  }
  update(deltaTime) {
    if (this.state===this.states.start){this.display.update(deltaTime)}
    if (this.state!==this.states.running)return //If the game isn't running, dont run the game
    [this.bg, ...this.persons, ...this.elves, ...this.gingers, ...this.blocks, ...this.doors, this.display].forEach((object) =>object.update(deltaTime));//Updates all objects
    this.objectGame()
    this.persons.forEach((person)=>this.personGame(person))
    this.elves.forEach((elf)=>this.elfGame(elf))
    this.gingers.forEach((ginger)=>this.gingerGame(ginger))
    this.doors.forEach((door)=>this.doorGame(door))
    this.blocks.forEach((block)=>this.blockGame(block))
  }
  draw(ctx) {
    if (this.state===this.states.start){this.display.draw(ctx)}
    [this.bg, ...this.persons, ...this.elves, ...this.gingers, ...this.blocks, ...this.doors, this.display].forEach((object) => object.draw(ctx))//Draws all objects
  }
  objectGame(){
    [...this.persons, ...this.elves, ...this.gingers, ...this.blocks, ...this.doors].forEach((object)=>(object.pos.x=object.realPos-this.pos));
  }
  personGame(person){
    if(this.inputs[person.id-1].uPressed){person.jump()}
    if(this.inputs[person.id-1].lPressed){person.left()}
    if(this.inputs[person.id-1].rPressed){person.right()}
    if (person.realPos + person.width >= this.width+this.pos){person.realPos = this.width - person.width + this.pos}
    if(!this.inputs[person.id-1].rPressed&&!this.inputs[person.id-1].lPressed){person.moving = false} //If left and right aren't pressed then they aren't moving
    let pPoss = []; //Array of player positions
    if ((person.realPos >= 450 && person.realPos<=450+this.levelLen)||(this.pos>0 && this.pos<this.levelLen)){
      //This player in da zone
      this.persons.forEach((object)=>pPoss.push(object.realPos))
      if (Math.max(...pPoss) > this.levelLen + 450){this.pos = this.levelLen}
      else{this.pos = Math.max(...pPoss) - 450}
    } else if (this.pos>0 && this.pos<this.levelLen){
      //Other player in da zone
      this.persons.forEach((object)=>pPoss.push(object.realPos))
      if (Math.max(...pPoss) > this.levelLen + 450){this.pos = this.levelLen}
      else{this.pos = Math.max(...pPoss) - 450}
    } else {
      //Nobody in da zone
      if (this.pos >= this.levelLen){this.pos = this.levelLen}
      else if (this.pos <= 0){this.pos = 0}
    }
    if (this.inputs[person.id-1].dir === "left"){person.dir = person.dirs.left}
    if (this.inputs[person.id-1].dir === "right"){person.dir = person.dirs.right}
  }
  elfGame(elf){
    if (elf.realPos + elf.width >= this.levelLen+800){elf.dir = elf.dirs.left}
  }
  gingerGame(ginger){
    if (ginger.realPos + ginger.width >= this.levelLen+800){ginger.dir = ginger.dirs.left}
    if(ginger.jumpCount === 1){
      let pPoss = []; //Array of player positions
      if (this.numPlayers === 1){
        if(ginger.realPos < this.persons[0].realPos){ginger.dir = ginger.dirs.right}
        else {ginger.dir = ginger.dirs.left}
      } else if (this.numPlayers === 2){
        this.persons.forEach((object)=>pPoss.push(object.realPos))
        if (Math.abs(ginger.realPos-pPoss[0])>Math.abs(ginger.realPos-pPoss[1])){pPoss = pPoss[1]}
        else{pPoss = pPoss[0]}
        if(ginger.realPos < pPoss){ginger.dir = ginger.dirs.right}
        else {ginger.dir = ginger.dirs.left}
      }
      ginger.jumpCount=0
    }
  }
  doorGame(door){
    this.hvHandicap = 0
    this.hitbox = 0
    for (let i=0; i<this.numPlayers; i++){
      if(this.detector(this.persons[i], door)!==false){
        this.level += 1
        this.start()
        break;
      }
    }
  }
  blockGame(block){
    this.persons.forEach((person)=>this.personBlock(person, block))
    this.elves.forEach((elf)=>this.elfBlock(elf, block))
    this.gingers.forEach((ginger)=>this.gingerBlock(ginger, block))
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y -this.hitbox && sprite.pos.y < block.pos.y + block.height + this.hitbox && sprite.realPos + sprite.width > block.realPos - this.hitbox && sprite.realPos < block.realPos + block.width + this.hitbox){
      let dl = sprite.realPos+sprite.width-block.realPos - this.hvHandicap
      let dr = block.realPos+block.width-sprite.realPos - this.hvHandicap
      let dt = sprite.pos.y+sprite.height-block.pos.y + this.hvHandicap
      let db = block.pos.y+block.height-sprite.pos.y + this.hvHandicap
      if (dl<dt && dl< db){return "left"}
      else if (dr<dt && dr<db){return "right"}
      else if (dt<db){return "top"}
      else{return "bottom"}
    }
    return false
  }
  personBlock(person, block){
    this.hvHandicap = -2
    this.hitbox = -1
    let spot = this.detector(person, block)
    switch (String(spot)) {
      case "top":
        person.canJump = true
        person.pos.y = block.pos.y - person.height
        person.speed.y = 0;
        if (!person.moving){
          person.friction = person.blockFriction
        }
        break
      case "left":
        person.realPos = block.realPos - person.width
        person.speed.x = 0
        person.moving = false
        break
      case "right":
        person.realPos = block.realPos + block.width
        person.speed.x = 0
        person.moving = false
        break
      case "bottom":
        person.pos.y = block.pos.y + block.height
        person.speed.y = 0
        break
    }
  }
  elfBlock(elf, block){
    this.hvHandicap = -3
    this.hitbox = -2
    let spot = this.detector(elf, block)
    switch (String(spot)) {
      case "top":
        elf.canJump = true
        elf.pos.y = block.pos.y - elf.height
        elf.speed.y = 0;
        break
      case "left":
        elf.realPos = block.realPos - elf.width
        elf.speed.x = 0
        elf.jump()
        break
      case "right":
        elf.realPos = block.realPos + block.width
        elf.speed.x = 0
        elf.jump()
        break
      case "bottom":
        elf.pos.y = block.pos.y + block.height
        elf.speed.y = 0
        break
    }
  }
  gingerBlock(ginger, block){
    this.hvHandicap = 2
    this.hitbox = 0
    let spot = this.detector(ginger, block)
    switch (String(spot)) {
      case "top":
        ginger.canJump = true
        ginger.pos.y = block.pos.y - ginger.height
        ginger.speed.y = 0;
        ginger.jump()
        break
      case "left":
        ginger.realPos = block.realPos - ginger.width
        ginger.speed.x = 0
        break
      case "right":
        ginger.realPos = block.realPos + block.width
        ginger.speed.x = 0
        break
      case "bottom":
        ginger.pos.y = block.pos.y + block.height
        ginger.speed.y = 0
        ginger.jump()
        break
    }
  }
  togglePause() {
    if (this.state === this.states.paused) {this.state = this.states.running}
    else {this.state = this.states.paused}
  }
}
