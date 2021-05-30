import Person from "./person.js"
import Elf from "./elf.js"
import Santa from "./santa.js"
import Snowman from "./snowman.js"
import Deer from "./deer.js"
import Ginger from "./ginger.js"
export default class Cutscene{
  constructor(players, id, info, disp){
    this.players = players
    this.id = id
    this.numPlayers = 0
    for(let i=0; i<this.players.length; i++){
      if(this.players[i]!==null){this.numPlayers++}
      else{break}
    }
    this.santa = null
    this.persons = []
    this.elves = []
    this.gingers = []
    this.snowmen=[]
    this.snowballs=[]
    this.deers=[]
    this.wait = 100
    this.count = 0
    this.line = [false, 0, 0, 0, 0]
    this.display = disp
    this.num=2*this.id+this.numPlayers
    if(this.num===1){
      let santaPos = {x: 1000, y: 2000}
      let person1Pos = {x: 200, y: 500}
      let elf1Pos = {x: null, y: 50}
      let elf2Pos = {x: null, y: 200}
      let elf3Pos = {x: null, y: 150}
      let elf4Pos = {x: null, y: 100}
      let snowman1Pos = {x:1880, y: 200}
      let snowman2Pos = {x:1560, y: 200}
      let deer1Pos = {x: null, y:100}
      let deer2Pos = {x: null, y:100}
      let ginger1Pos = {x: null, y:450}
      this.santa = new Santa(info, 1, santaPos, true)
      this.Person1 = new Person(this.players[0], info, 1, person1Pos, true)
      this.Elf1 = new Elf(info, 1, elf1Pos, true)
      this.Elf2 = new Elf(info, 2, elf2Pos, true)
      this.Elf3 = new Elf(info, 3, elf3Pos, true)
      this.Elf4 = new Elf(info, 4, elf4Pos, true)
      this.Snowman1 = new Snowman(info, 1, snowman1Pos, true)
      this.Snowman2 = new Snowman(info, 2, snowman2Pos, true)
      this.Deer1 = new Deer(info, 1, deer1Pos, true)
      this.Deer2 = new Deer(info, 2, deer2Pos, true)
      this.Ginger1 = new Ginger (info, 1, ginger1Pos, true)
      this.persons.push(this.Person1)
      this.elves.push(this.Elf1, this.Elf2, this.Elf3, this.Elf4)
      this.snowmen.push(this.Snowman1, this.Snowman2)
      this.deers.push(this.Deer1, this.Deer2)
      this.gingers.push(this.Ginger1)
    } else if (this.num===2){
      let santaPos = {x: 1000, y: 2000}
      let person1Pos = {x: 200, y: 500}
      let person2Pos = {x: 300, y: 500}
      let elf1Pos = {x: null, y: 50}
      let elf2Pos = {x: null, y: 200}
      let elf3Pos = {x: null, y: 150}
      let elf4Pos = {x: null, y: 100}
      let snowman1Pos = {x:1880, y: 200}
      let snowman2Pos = {x:1560, y: 200}
      let deer1Pos = {x: null, y:100}
      let deer2Pos = {x: null, y:100}
      let ginger1Pos = {x: null, y:450}
      this.santa = new Santa(info, 1, santaPos, true)
      this.Person1 = new Person(this.players[0], info, 1, person1Pos, true)
      this.Person2 = new Person(this.players[1], info, 2, person2Pos, true)
      this.Elf1 = new Elf(info, 1, elf1Pos, true)
      this.Elf2 = new Elf(info, 2, elf2Pos, true)
      this.Elf3 = new Elf(info, 3, elf3Pos, true)
      this.Elf4 = new Elf(info, 4, elf4Pos, true)
      this.Snowman1 = new Snowman(info, 1, snowman1Pos, true)
      this.Snowman2 = new Snowman(info, 2, snowman2Pos, true)
      this.Deer1 = new Deer(info, 1, deer1Pos, true)
      this.Deer2 = new Deer(info, 2, deer2Pos, true)
      this.Ginger1 = new Ginger (info, 1, ginger1Pos, true)
      this.persons.push(this.Person1, this.Person2)
      this.elves.push(this.Elf1, this.Elf2, this.Elf3, this.Elf4)
      this.snowmen.push(this.Snowman1, this.Snowman2)
      this.deers.push(this.Deer1, this.Deer2)
      this.gingers.push(this.Ginger1)
    }
  }
  liner(ctx){
    if(this.line[0]){
      ctx.beginPath();
      ctx.moveTo(this.line[1], this.line[2]);
      ctx.lineTo(this.line[3], this.line[4]);
      ctx.stroke();
    }
  }
  update(deltaTime){
    switch(this.num){
      case 1:
        switch(this.count){
          case 1:
            this.Person1.dir=0
            this.display.text.cont[0] = "I finally arrived in the North Pole!"
            this.display.text.x = 100
            this.display.text.y = 350
            this.line=[true, 225, 450, 265, 370]
            this.santa.realPos = -200
            break
          case 100:
            this.santa.pos.y-=200
            this.santa.speed.x = 10.5
            break
          case 120:
            this.display.text.cont[0] = "Oh my god you're Santa!"
            this.display.text.x = 130
            break
          case 220:
            this.display.text.cont[0] = "I'm sorry to intrude - I just"
            this.display.text.cont[1] = " wanted to see if this existed"
            this.display.text.x = 100
            this.display.text.y = 320
            break
          case 400:
            this.santa.state++
            break
          case 420:
            this.display.text.cont[0] = "I can tell by your bright"
            this.display.text.cont[1] = 'red eyes that you are upset'
            this.display.text.x = 120
            this.display.text.y = 320
            break
          case 500:
            this.santa.state++
            break
          case 530:
            this.santa.state++
            break
          case 560:
            this.display.text.cont[0] = "Okay yeah you are upset."
            this.display.text.cont[1] = "And are those horns?"
            this.display.text.x = 130
            this.display.text.y = 320
            break
          case 640:
            this.santa.state++
            break
          case 660:
            this.display.text.cont[0] = "And is that a tail?"
            this.display.text.cont[1] = null
            this.display.text.x = 140
            this.display.text.y = 350
            break
          case 720:
            this.santa.state++
            break
          case 740:
            this.display.text.cont[0] = "Your face is turning a bit red - "
            this.display.text.cont[1] = "Are you feeling okay?"
            this.display.text.x = 110
            this.display.text.y = 320
            break
          case 830:
            this.santa.state++
            break
          case 870:
            this.santa.state++
            break
          case 890:
            this.display.text.cont[0] = "Wait a minute... that's not Santa - "
            this.display.text.cont[1] = "that's Satan!"
            this.display.text.cont[2] = "I am going to run now"
            this.display.text.x = 100
            this.display.text.y = 290
            break
          case 1020:
            this.Elf2.moving=true
            this.Elf2.pos.x=0
            this.Elf2.realPos = 0
            break
          case 1030:
            this.Elf3.moving=true
            this.Elf3.pos.x=0
            this.Elf3.realPos = 0
            break
          case 1040:
            this.Elf4.moving=true
            this.Elf4.pos.x=0
            this.Elf4.realPos = 0
            this.display.text.cont[0] = null
            this.display.text.cont[1] = null
            this.display.text.cont[2] = null
            this.line[0] = false
            this.Person1.dir = this.Person1.dirs.right
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            this.Elf1.moving=true
            this.Elf1.pos.x = 0
            this.Elf1.realPos = 900
            break
          case 1075:
            this.Person1.jump()
            break
          case 1110:
            this.Person1.moving = false
            break
          case 1115:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1120:
            this.Person1.jump()
            break
          case 1150:
            this.Person1.moving = false
            break
          case 1160:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1170:
            this.Person1.jump()
            break
          case 1200:
            this.Person1.moving = false
            break
          case 1210:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1220:
            this.Person1.jump()
            break
          case 1300:
            this.Person1.jump()
            break
          case 1310:
            this.Snowman2.death()
            break
          case 1320:
            this.Person1.jump()
            break
          case 1340:
            this.Snowman1.throw=true
            this.Snowman1.state = 1
            break
          case 1341:
            this.Snowman1.throw = false
            break
          case 1380:
            this.Person1.jump()
            this.Snowman1.state = 0
            break
          case 1400:
            this.Snowman1.throw=true
            this.Snowman1.state = 1
            break
          case 1401:
            this.Snowman1.throw = false
            break
          case 1440:
            this.Person1.jump()
            this.Snowman1.state = 0
            break
          case 1445:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1475:
            this.Person1.jump()
            break
          case 1480:
            this.Snowman1.death()
            break
          case 1520:
            this.Deer1.pos.x=0
            this.Deer2.pos.x=0
            this.Deer1.realPos= 2400
            this.Deer2.realPos = 2500
            this.Deer1.dir = this.Deer1.dirs.left
            this.Deer2.dir = this.Deer2.dirs.left
            break
          case 1540:
            this.Person1.moving = false
            break
          case 1545:
            this.Person1.dir = this.Person1.dirs.left
            this.Person1.speed.x = -1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1580:
            this.display.text.cont[0] = "I have to collect more Chistmas cookies to"
            this.display.text.cont[1] = "unlock the door! That makes no sense but"
            this.display.text.cont[2] = "most of this was coded at 2AM so ¯\\_(ツ)_/¯"
            this.line=[true, 480, 450, 510, 370]
            this.display.text.x = 290
            this.display.text.y = 240
            break
          case 1800:
            this.display.text.cont[0] = null
            this.display.text.cont[1] = null
            this.display.text.cont[2] = null
            this.line[0]=false
            this.Person1.dir = this.Person1.dirs.right
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            this.Deer1.pos.x = null
            this.Deer2.pos.x = null
            break
          case 1815:
            this.Person1.jump()
            break
          case 1850:
            this.Person1.jump()
            break
          case 1855:
            this.Ginger1.pos.x = 0
            this.Ginger1.realPos = 2900
            break
          case 1890:
            this.Person1.moving = false
            break
          case 1915:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1940:
            this.Person1.jump()
            break
          case 1978:
            this.Person1.jump()
            break
          case 1985:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 2030:
            this.Person1.dir = this.Person1.dirs.left
            this.Person1.speed.x = -1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 2050:
            this.Person1.jump()
            break
          case 2100:
            this.Person1.dir = this.Person1.dirs.left
            this.Person1.speed.x = -1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 2140:
            this.Person1.jump()
            break

        }
      break
      case 2:
        switch(this.count){
          case 1:
            this.Person1.dir=0
            this.Person2.dir=0
            this.display.text.cont[0] = "We finally arrived in the North Pole!"
            this.display.text.x = 100
            this.display.text.y = 350
            this.line=[true, 225, 450, 265, 370]
            this.santa.realPos = -200
            break
          case 100:
            this.santa.pos.y-=200
            this.santa.speed.x = 10.5
            break
          case 120:
            this.display.text.cont[0] = "Oh my god you're Santa!"
            this.display.text.x = 130
            break
          case 220:
            this.display.text.cont[0] = "We're sorry to intrude - we just"
            this.display.text.cont[1] = " wanted to see if this existed"
            this.display.text.x = 100
            this.display.text.y = 320
            break
          case 400:
            this.santa.state++
            break
          case 420:
            this.display.text.cont[0] = "I can tell by your bright"
            this.display.text.cont[1] = 'red eyes that you are upset'
            this.display.text.x = 120
            this.display.text.y = 320
            break
          case 500:
            this.santa.state++
            break
          case 530:
            this.santa.state++
            break
          case 560:
            this.display.text.cont[0] = "Okay yeah you are upset."
            this.display.text.cont[1] = "And are those horns?"
            this.display.text.x = 130
            this.display.text.y = 320
            break
          case 640:
            this.santa.state++
            break
          case 660:
            this.display.text.cont[0] = "And is that a tail?"
            this.display.text.cont[1] = null
            this.display.text.x = 140
            this.display.text.y = 350
            break
          case 720:
            this.santa.state++
            break
          case 740:
            this.display.text.cont[0] = "Your face is turning a bit red - "
            this.display.text.cont[1] = "Are you feeling okay?"
            this.display.text.x = 110
            this.display.text.y = 320
            break
          case 830:
            this.santa.state++
            break
          case 870:
            this.santa.state++
            break
          case 890:
            this.display.text.cont[0] = "Wait a minute... that's not Santa - "
            this.display.text.cont[1] = "that's SATAN! RUUUNN!!"
            this.display.text.x = 100
            this.display.text.y = 310
            break
          case 1020:
            this.Elf2.moving=true
            this.Elf2.pos.x=0
            this.Elf2.realPos = 0
            break
          case 1030:
            this.Elf3.moving=true
            this.Elf3.pos.x=0
            this.Elf3.realPos = 0
            break
          case 1040:
            this.Elf4.moving=true
            this.Elf4.pos.x=0
            this.Elf4.realPos = 0
            this.display.text.cont[0] = null
            this.display.text.cont[1] = null
            this.display.text.cont[2] = null
            this.line[0] = false
            this.Person1.dir = this.Person1.dirs.right
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            this.Person2.dir = this.Person1.dirs.right
            this.Person2.speed.x = 1
            this.Person2.accel = 1.1
            this.Person2.moving = true
            this.Elf1.moving=true
            this.Elf1.pos.x = 0
            this.Elf1.realPos = 900
            break
          //New
          case 1055:
            this.Person2.jump()
            break
          case 1075:
            this.Person1.jump()
            break
          //New
          case 1090:
            this.Person2.moving = false
            break
          //New
          case 1095:
            this.Person2.speed.x = 1
            this.Person2.accel = 1.1
            this.Person2.moving = true
            break
          //New
          case 1100:
            this.Person2.jump()
            break
          case 1110:
            this.Person1.moving = false
            break
          case 1115:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1120:
            this.Person1.jump()
            break
          //New
          case 1130:
            this.Person2.moving = false
            break
          //New
          case 1140:
            this.Person2.speed.x = 1
            this.Person2.accel = 1.1
            this.Person2.moving = true
            break
          //New
          case 1149:
            this.Person2.jump()
            break
          case 1150:
            this.Person1.moving = false
            break
          case 1160:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1170:
            this.Person1.jump()
            break
          //New
          case 1180:
            this.Person2.moving = false
            break
          //New
          case 1190:
            this.Person2.speed.x = 1
            this.Person2.accel = 1.1
            this.Person2.moving = true
            break
          //New
          case 1199:
            this.Person2.jump()
            break
          case 1200:
            this.Person1.moving = false
            break
          case 1210:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1220:
            this.Person1.jump()
            break
          //New
          case 1280:
            this.Person2.jump()
            break
          case 1300:
            this.Person1.jump()
            break
          //Changed (-20)
          case 1290:
            this.Snowman2.death()
            break
          case 1320:
            this.Person1.jump()
            break
          case 1340:
            this.Snowman1.throw=true
            this.Snowman1.state = 1
            break
          case 1341:
            this.Snowman1.throw = false
            break
          //Changed
          case 1380:
            this.Person1.jump()
            this.Person2.jump()
            this.Snowman1.state = 0
            break
          case 1400:
            this.Snowman1.throw=true
            this.Snowman1.state = 1
            break
          case 1401:
            this.Snowman1.throw = false
            break
          //Changed
          case 1440:
            this.Person1.jump()
            this.Person2.jump()
            this.Snowman1.state = 0
            break
          case 1445:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1475:
            this.Person1.jump()
            break
          case 1480:
            this.Snowman1.death()
            break
          case 1520:
            this.Deer1.pos.x=0
            this.Deer2.pos.x=0
            this.Deer1.realPos= 2400
            this.Deer2.realPos = 2500
            this.Deer1.dir = this.Deer1.dirs.left
            this.Deer2.dir = this.Deer2.dirs.left
            break
          case 1540:
            this.Person1.moving = false
            break
          case 1545:
            this.Person1.dir = this.Person1.dirs.left
            this.Person1.speed.x = -1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1580:
            this.display.text.cont[0] = "I have to collect more Chistmas cookies to"
            this.display.text.cont[1] = "unlock the door! That makes no sense but"
            this.display.text.cont[2] = "most of this was coded at 2AM so ¯\\_(ツ)_/¯"
            this.line=[true, 480, 450, 510, 370]
            this.display.text.x = 290
            this.display.text.y = 240
            break
            //New
          case 1715:
            this.Person2.jump()
            break
          //New
          case 1720:
            this.Person2.speed.x = 1
            this.Person2.accel = 1.1
            this.Person2.moving = true
            break
          //New
          case 1750:
            this.Person2.jump()
            break
          case 1800:
            this.display.text.cont[0] = null
            this.display.text.cont[1] = null
            this.display.text.cont[2] = null
            this.line[0]=false
            this.Person1.dir = this.Person1.dirs.right
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            this.Deer1.pos.x = null
            this.Deer2.pos.x = null
            break
          //New
          case 1810:
            this.Person2.dir = this.Person1.dirs.left
            this.Person2.speed.x = -1
            this.Person2.accel = 1.1
            this.Person2.moving = true
            break
          case 1815:
            this.Person1.jump()
            break
          case 1850:
            this.Person1.jump()
            break
          case 1855:
            this.Ginger1.pos.x = 0
            this.Ginger1.realPos = 2900
            break
          case 1890:
            this.Person1.moving = false
            break
          case 1915:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 1940:
            this.Person1.jump()
            break
          case 1978:
            this.Person1.jump()
            break
          case 1985:
            this.Person1.speed.x = 1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 2030:
            this.Person1.dir = this.Person1.dirs.left
            this.Person1.speed.x = -1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 2050:
            this.Person1.jump()
            break
          case 2100:
            this.Person1.dir = this.Person1.dirs.left
            this.Person1.speed.x = -1
            this.Person1.accel = 1.1
            this.Person1.moving = true
            break
          case 2140:
            this.Person1.jump()
            break

        }
      break
    }
    this.count++
  }
  draw(ctx){
    this.liner(ctx)
  }

}
