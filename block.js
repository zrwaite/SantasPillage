export default class Block {
  constructor(game, id, pos) {
    this.game = game
    this.id = id
    this.pos = pos
    this.image = document.getElementById("img-block")
    this.gWidth = game.width
    this.gHeight = game.height
    this.width = this.gWidth/20
    this.height = this.gHeight/15
    this.hitbox = -2 //changes the non-visual size of the box - negative means more likely to be vertical
    this.hvHandicap = 0 //gives an advantage to the vertical axis during object detection
    if (this.pos !== null){this.startPos = Math.abs(this.pos.x)}
  }
  update() {
    this.pos.x = this.startPos - this.game.pos
    this.game.persons.forEach((object)=> this.personDetector(object))
    this.game.elves.forEach((object)=> this.elfDetector(object))
    this.game.gingers.forEach((object)=> this.gingerDetector(object))
  }
  draw(ctx) {ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)}
  detector(sprite){
    if (sprite.pos.y + sprite.height > this.pos.y -this.hitbox && sprite.pos.y < this.pos.y + this.height + this.hitbox && sprite.realPos + sprite.width > this.startPos - this.hitbox && sprite.realPos < this.startPos + this.width + this.hitbox){
      let dl = sprite.realPos+sprite.width-this.startPos - this.hvHandicap
      let dr = this.startPos+this.width-sprite.realPos - this.hvHandicap
      let dt = sprite.pos.y+sprite.height-this.pos.y + this.hvHandicap
      let db = this.pos.y+this.height-sprite.pos.y + this.hvHandicap
      if (dl<dt && dl< db){
        return "left"
      } else if (dr<dt && dr<db){
        return "right"
      } else if (dt<db){
        return "top"
      } else{
        return "bottom"
      }
    }
    return false
  }
  personDetector(person){
    this.hvHandicap = -2
    this.hitbox = -2
    let spot = this.detector(person)
    switch (String(spot)) {
      case "top":
        person.canJump = true
        person.pos.y = this.pos.y - person.height
        person.speed.y = 0;
        if (!person.moving){
          person.friction = person.blockFriction
        }
        break
      case "left":
        person.realPos = this.startPos - person.width
        person.speed.x = 0
        person.moving = false
        break
      case "right":
        person.realPos = this.startPos + this.width
        person.speed.x = 0
        person.moving = false
        break
      case "bottom":
        person.pos.y = this.pos.y + this.height
        person.speed.y = 0
        break
    }
  }
  elfDetector(elf){
    this.hvHandicap = -3
    this.hitbox = -2
    let spot = this.detector(elf)
    switch (String(spot)) {
      case "top":
        elf.canJump = true
        elf.pos.y = this.pos.y - elf.height
        elf.speed.y = 0;
        break
      case "left":
        elf.realPos = this.startPos - elf.width
        elf.speed.x = 0
        elf.jump()
        break
      case "right":
        elf.realPos = this.startPos + this.width
        elf.speed.x = 0
        elf.jump()
        break
      case "bottom":
        elf.pos.y = this.pos.y + this.height
        elf.speed.y = 0
        break
    }
  }
  gingerDetector(ginger){
    this.hvHandicap = 2
    this.hitbox = 0
    let spot = this.detector(ginger)
    switch (String(spot)) {
      case "top":
        ginger.canJump = true
        ginger.pos.y = this.pos.y - ginger.height
        ginger.speed.y = 0;
        ginger.jump()
        break
      case "left":
        ginger.realPos = this.startPos - ginger.width
        ginger.speed.x = 0
        break
      case "right":
        ginger.realPos = this.startPos + this.width
        ginger.speed.x = 0
        break
      case "bottom":
        ginger.pos.y = this.pos.y + this.height
        ginger.speed.y = 0
        ginger.jump()
        break
    }
  }
}
