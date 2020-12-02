import Input from "./input.js"
import Controller from "./controller.js"
import Sprite from "./sprite.js"
import Person from "./person.js"
import Block from "./block.js"
import Door from "./door.js"
import Display from "./display.js"
import Bg from "./bg.js"
import { onePBuild, onePLevels} from "./1PLevels.js"
import { twoPBuild, twoPLevel0, twoPLevel1, twoPLevel2, twoPLevel3, twoPLevel4, twoPLevel5, twoPLevel6} from "./2PLevels.js"

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth
    this.height = gameHeight
    this.gravity = 1-(0.3)
    this.Fric = 1-(0.4) //Friction
    this.onePLevels = onePLevels
    this.twoPLevels = [twoPLevel0, twoPLevel1, twoPLevel2, twoPLevel3, twoPLevel4, twoPLevel5, twoPLevel6]
    this.level = 0 //starting level is 0
    this.levelLen = 0 //Length of level in pixels - used for moving map
    this.pos = 0 //Position of moving map
    this.inDaZone = false //true if the map is moving and a person is stationary on screen
    this.numPlayers = 1
    this.objects = [] //Used to store all game objects from level generator
    this.persons = []
    this.blocks = []
    this.doors = []
    this.elves = []
    this.inputs = []
    this.states = {
      start: 0,
      running: 1,
      paused: 2,
      gameover: 3,
      win: 4
    } //All of the game states
    this.state = this.states.start //Default is the start screen
    this.sprite = new Sprite(this, 0, null)
    this.block = new Block(this, 0, null) //Declare with null position to pull information from without drawing on screen
    this.door = new Door(this, 0, null)
    this.bg = new Bg(this) //Background
    this.display = new Display(this) //Display (this.states controls this)
    this.input = new Input(this) //Standard inputs, like pause and play
  }
  start() {
    [...this.persons, ...this.blocks, ...this.doors].forEach((object) => object = null)
    this.state = this.states.running //Starts the game
    // Pulls objects from level creator
    if (this.numPlayers === 1){this.objects = onePBuild(this, this.onePLevels[this.level])}
    else {this.objects = twoPBuild(this, this.twoPLevels[this.level])}
    this.persons = this.objects[0]
    this.blocks = this.objects[1]
    this.doors = this.objects[2]
    this.elves = this.objects[3]
    this.levelLen = this.objects[4] - 800
    this.inputs = [new Controller(this, this.persons[0])]
    //Multiplayer:
    if (this.numPlayers > 1){
      this.inputs.push(new Controller(this, this.persons[1]))
    }
    this.pos = 0 //Resets map position
  }
  update(deltaTime) {
    if (this.state!==this.states.running)return //If the game isn't running, dont run the game
    [this.bg, ...this.persons, ...this.elves, ...this.blocks, ...this.doors, this.display].forEach((object) =>object.update(deltaTime))//Updates all objects
  }
  draw(ctx) {
    [this.bg, ...this.persons, ...this.elves, ...this.blocks, ...this.doors, this.display].forEach((object) => object.draw(ctx))//Draws all objects
  }
  togglePause() {
    if (this.state === this.states.paused) {this.state = this.states.running}
    else {this.state = this.states.paused}
  }
}
