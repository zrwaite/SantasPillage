import Input from "./input.js"
import Controller from "./controller.js"
import Block from "./block.js"
import Snowball from "./snowball.js"
import Display from "./display.js"
import Bg from "./bg.js"
import {build, levels} from "./levels.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.gravity = 0.7
    this.fric = 0.6 //Friction
    this.levels = levels
    this.levelLen = 0 //Length of level in pixels - used for moving map
    this.pos = 0 //Position of moving map
    this.startLevel=7
    this.level = this.startLevel//starting level is 0
    this.deletes=0
    this.numPlayers = 0
    this.collect = 0
    this.lives = [5, 5]
    this.players = []
    this.objects = [] //Used to store all game objects from level generator
    this.delObjects = []
    this.persons = []
    this.blocks = []
    this.doors = []
    this.elves = []
    this.gingers = []
    this.canes = []
    this.icicles=[]
    this.snowmen=[]
    this.deers=[]
    this.snowballi=0
    this.snowballs=[]
    this.cookies=[]
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
    this.block = new Block(this.info, 0, null) //Declare with null position to pull information from without drawing on screen
    this.bg = new Bg(this) //Background
    this.display = new Display(this) //Display (this.states controls this)
    this.input = new Input(this) //Standard inputs, like pause and play
  }
  start() {
    if(this.level!==this.startLevel){
      if(this.level>this.levels[this.numPlayers-1].length){this.state=this.states.win;return}
    }
    this.deletes=0
    this.players = this.display.players
    this.numPlayers = 0
    for(let i=0; i<this.players.length; i++){
      if(this.players[i]!==null){this.numPlayers++}
      else{break}
    }
    if(!this.numPlayers){return}
    this.objects.forEach((object) => object = null)
    this.delObjects.forEach((object) => object = null)
    this.state = this.states.running //Starts the game
    // Pulls objects from level creator
    this.objects = build(this, this.levels[this.numPlayers-1][this.level])
    this.persons = this.objects[1]
    this.blocks = this.objects[0]
    this.doors = this.objects[2]
    this.elves = this.objects[3]
    this.gingers = this.objects[4]
    this.canes = this.objects[5]
    this.icicles=this.objects[6]
    this.snowmen=this.objects[7]
    this.snowballi=0
    this.snowballs=[]
    this.deers=this.objects[8]
    this.cookies=this.objects[9]
    this.collect=this.cookies.length
    this.levelLen = this.objects[10] - 800
    this.objects = [...this.blocks, ...this.doors, ...this.elves, ...this.gingers, ...this.snowmen, ...this.deers, ...this.canes, ...this.icicles, ...this.persons,]
    this.delObjects = [...this.snowballs, ...this.cookies] //Objects that can be deleted
    this.inputs = [new Controller(this, this.persons[0])]
    this.persons[0].lives=this.lives[0]
    if (this.numPlayers > 1){//Multiplayer:
      this.inputs.push(new Controller(this, this.persons[1]))
      this.persons[1].lives=this.lives[1]
    }
    else {this.lives[1]=0}
    this.pos = 0 //Resets map position
  }
  update(deltaTime) {
    if (this.state===this.states.start){this.display.update(deltaTime)}
    if (this.state!==this.states.running)return //If the game isn't running, dont run the game
    [this.bg, ...this.objects, ...this.delObjects, this.display].forEach((object) =>object.update(deltaTime));//Updates all objects
    [...this.objects, ...this.delObjects].forEach((object)=>(object.pos.x=object.realPos-this.pos));
    this.delObjects=this.delObjects.filter(this.deleter)
    this.cookies=this.cookies.filter(this.deleter)
    this.snowballs=this.snowballs.filter(this.deleter)
    if(this.lives[0]+this.lives[1]<=0){this.state=this.states.gameover}
    this.persons.forEach((person)=>this.personGame(person))
    this.elves.forEach((elf)=>this.elfGame(elf))
    this.gingers.forEach((ginger)=>this.gingerGame(ginger))
    this.canes.forEach((cane)=>this.caneGame(cane))
    this.icicles.forEach((icicle)=>this.icicleGame(icicle))
    this.snowmen.forEach((snowman)=>this.snowmanGame(snowman))
    this.snowballs.forEach((snowball)=>this.snowballGame(snowball))
    this.deers.forEach((deer)=>this.deerGame(deer))
    this.cookies.forEach((cookie)=>this.cookieGame(cookie))
    this.doors.forEach((door)=>this.doorGame(door))
    this.blocks.forEach((block)=>this.blockGame(block))
  }
  draw(ctx) {
    if (this.state===this.states.start){this.display.draw(ctx);return}
    [this.bg, ...this.objects, ...this.delObjects, this.display].forEach((object) => object.draw(ctx))//Draws all objects
  }
  deleter(sprite){
    if(sprite.delete){return false}
    return true
  }
  detector(sprite, block, hitbox=0, hvhandicap=0){
    //Bigger HVHandicap means more likely to be horizontal detection
    if (sprite.pos.y + sprite.height >= block.pos.y -hitbox && sprite.pos.y <= block.pos.y + block.height + hitbox && sprite.realPos + sprite.width >= block.realPos - hitbox && sprite.realPos <= block.realPos + block.width + hitbox){
      let dl = sprite.realPos+sprite.width-block.realPos - hvhandicap + hitbox
      let dr = block.realPos+block.width-sprite.realPos - hvhandicap - hitbox
      let dt = sprite.pos.y+sprite.height-block.pos.y + hvhandicap + hitbox
      let db = block.pos.y+block.height-sprite.pos.y + hvhandicap - hitbox
      if (dl<dt && dl< db){return "left"}
      else if (dr<dt && dr<db){return "right"}
      else if (dt<db){return "top"}
      else{return "bottom"}
    }
    return false
  }
  spriteBlock(sprite, block, spot){
    switch (String(spot)) {
      case "top":
        sprite.detects.top=true
        sprite.pos.y=block.pos.y-sprite.height
        break
      case "left":
        sprite.detects.left=true
        sprite.realPos=block.realPos-sprite.width
        break
      case "right":
        sprite.detects.right=true
        sprite.realPos=block.realPos+block.width
        break
      case "bottom":
        sprite.detects.bottom=true
        sprite.pos.y=block.pos.y+block.height
        break
    }
  }
  verticalDetector(person, icicle){
    let hitbox = 40
    if(person.pos.y>icicle.pos.y && person.realPos + person.width > icicle.realPos - hitbox && person.realPos < icicle.realPos + icicle.width + hitbox){
      icicle.falling = true
    }
  }
  personGame(person){
    person.detects.top=person.detects.left=person.detects.right=person.detects.bottom=false
    this.blocks.forEach((block)=>this.personBlock(person, block));
    [...this.elves, ...this.gingers, ...this.snowballs, ...this.deers, ...this.canes].forEach((enemy)=>this.personEnemy(person, enemy))
    this.icicles.forEach((icicle)=>this.personIcicle(person, icicle))
    person.lives=this.lives[person.id-1]
    if(this.inputs[person.id-1].uPressed){person.jump()}
    if(this.inputs[person.id-1].lPressed){person.left()}
    if(this.inputs[person.id-1].rPressed){person.right()}
    if(!this.inputs[person.id-1].rPressed&&!this.inputs[person.id-1].lPressed){person.moving = false} //If left and right aren't pressed then they aren't moving
    if (this.inputs[person.id-1].dir === "left"){person.dir = person.dirs.left}
    if (this.inputs[person.id-1].dir === "right"){person.dir = person.dirs.right}
    if (person.realPos + person.width >= this.width+this.pos&&person.lives>0){person.realPos = this.width - person.width + this.pos}
    let pPoss = []; //Array of player positions
    if (person.realPos >= 450 && person.realPos<=450+this.levelLen && person.lives>0){
      this.persons.forEach((object)=>pPoss.push(object.lives>0? object.realPos:0))
      if (Math.max(...pPoss) > this.levelLen + 450){this.pos = this.levelLen}
      else{this.pos = Math.max(...pPoss) - 450}
    } else {//Not in da zone
      if (this.pos >= this.levelLen){this.pos = this.levelLen}
      else if (this.pos <= 0){this.pos = 0}
      else if (this.lives[0]+this.lives[1]-person.lives<=0&&person.lives>0&&this.numPlayers>1){this.pos = 0}
    }
  }
  elfGame(elf){
    if(elf.realPos + elf.width >= this.levelLen+800){elf.dir = elf.dirs.left}
    elf.detect=elf.detects.top=elf.detects.left=elf.detects.right=elf.detects.bottom=false
    this.blocks.forEach((block)=>this.elfBlock(elf, block))
  }
  gingerGame(ginger){
    if (ginger.realPos + ginger.width >= this.levelLen+800){ginger.dir = ginger.dirs.left}
    ginger.detects.top=ginger.detects.left=ginger.detects.right=ginger.detects.bottom=false
    this.blocks.forEach((block)=>this.gingerBlock(ginger, block))
    if(ginger.jumpCount === 1){
      let pPoss = []; //Array of player positions
      if (this.numPlayers === 1){
        if(ginger.realPos < this.persons[0].realPos){ginger.dir = ginger.dirs.right}
        else {ginger.dir = ginger.dirs.left}
      } else if (this.numPlayers === 2){
        this.persons.forEach((object)=>pPoss.push(object.lives>0? object.realPos:-10000))
        if (Math.abs(ginger.realPos-pPoss[0])>Math.abs(ginger.realPos-pPoss[1])){pPoss = pPoss[1]}
        else{pPoss = pPoss[0]}
        if(ginger.realPos < pPoss){ginger.dir = ginger.dirs.right}
        else {ginger.dir = ginger.dirs.left}
      }
      ginger.jumpCount=0
    }
  }
  snowmanGame(snowman){
    snowman.detects.top=snowman.detects.left=snowman.detects.right=snowman.detects.bottom=false
    this.blocks.forEach((block)=>this.snowmanBlock(snowman, block))
    if(!snowman.dead){this.persons.forEach((person)=>this.personSnowman(person, snowman))}
    if(snowman.throw){
      let dir = Math.floor(this.snowballi/this.snowmen.length)%2===0? -1:1
      this.snowballs.push(new Snowball(dir, this.info, this.snowballi, {x:snowman.realPos+snowman.width/2, y: snowman.pos.y+snowman.height/2}))
      this.delObjects.push(this.snowballs[this.snowballs.length-1])
      this.snowballi++
    }
  }
  snowballGame(snowball){
    if(snowball.realPos + snowball.width >= this.levelLen+800){snowball.delete=true}
    snowball.detects.top=snowball.detects.left=snowball.detects.right=snowball.detects.bottom=false
    this.blocks.forEach((block)=>this.snowballBlock(snowball, block))
  }
  icicleGame(icicle){
    this.persons.forEach((person)=>this.verticalDetector(person, icicle))
    if(icicle.falling){this.blocks.forEach((block)=>this.icicleBlock(icicle, block))}
  }
  deerGame(deer){
    if(deer.realPos + deer.width >= this.levelLen+800){deer.dir = deer.dirs.left}
    deer.detect = false
    this.blocks.forEach((block)=>this.deerBlock(deer, block))
  }
  doorGame(door){
    if (!this.collect){door.state = 'open'}
    for (let i=0; i<this.numPlayers; i++){
      if(this.detector(this.persons[i], door)!==false&&door.state==='open'){
        this.level ++
        this.start()
        break;
      }
    }
  }
  cookieGame(cookie){
    this.persons.forEach((person)=>this.personCookie(person, cookie))
  }
  caneGame(cane){}
  blockGame(block){}
  personBlock(person, block){
    let spot = false
    if(block.covered){spot = this.detector(person, block, 0, 4)}
    else{spot = this.detector(person, block, -1, -4)}
    if(spot){this.spriteBlock(person, block, spot)}
  }
  personEnemy(person, enemy){
    if(!person.hit){
      let hitbox = -5
      if (person.pos.y + person.height > enemy.pos.y -hitbox && person.pos.y < enemy.pos.y + enemy.height + hitbox && person.realPos + person.width > enemy.realPos - hitbox && person.realPos < enemy.realPos + enemy.width + hitbox){
        this.lives[person.id-1]--
        person.hit = true
      }
    }
  }
  personIcicle(person, icicle){
    if (icicle.mstate!=="i3" && !person.hit){
      let hitbox = -5
      if (person.pos.y + person.height > icicle.pos.y -hitbox && person.pos.y < icicle.pos.y + icicle.height + hitbox && person.realPos + person.width > icicle.realPos - hitbox && person.realPos < icicle.realPos + icicle.width + hitbox){
        this.lives[person.id-1]--
        person.hit = true
      }
    }
  }
  personSnowman(person, snowman){
    let hitbox = -5
    if (person.pos.y + person.height > snowman.pos.y -hitbox && person.pos.y < snowman.pos.y + snowman.height + hitbox && person.realPos + person.width > snowman.realPos - hitbox && person.realPos < snowman.realPos + snowman.width + hitbox){
      snowman.death()
    }
  }
  elfBlock(elf, block){
    let spot = false
    if(block.covered){spot = this.detector(elf, block, 0, 1000)}
    else{spot = this.detector(elf, block, -1, -4)}
    if(spot){this.spriteBlock(elf, block, spot)}
  }
  gingerBlock(ginger, block){
    let spot = this.detector(ginger, block, -1, 2)
    if(spot){this.spriteBlock(ginger, block, spot)}
  }
  snowmanBlock(snowman, block){
    let spot = this.detector(snowman, block, -1, 2)
    if(spot){this.spriteBlock(snowman, block, spot)}
  }
  snowballBlock(snowball, block){
    let spot = this.detector(snowball, block, 0, -3)
    if(spot){this.spriteBlock(snowball, block, spot)}
  }
  icicleBlock(icicle, block){
    let spot = this.detector(icicle, block, 0, 10)
    if(spot==="top"){
      icicle.detect=true
      icicle.pos.y = block.pos.y - icicle.height
    }
  }
  deerBlock(deer, block){
    let spot = this.detector(deer, block, 95, -3)
    if(spot!==false){deer.detect=true}
  }
  personCookie(person, cookie){
    let hitbox = 5
    if (person.pos.y + person.height > cookie.pos.y -hitbox && person.pos.y < cookie.pos.y + cookie.height + hitbox && person.realPos + person.width > cookie.realPos - hitbox && person.realPos < cookie.realPos + cookie.width + hitbox){
      cookie.delete = true
      this.collect--
    }
  }
  togglePause() {
    if (this.state === this.states.paused) {this.state = this.states.running}
    else {this.state = this.states.paused}
  }
}
