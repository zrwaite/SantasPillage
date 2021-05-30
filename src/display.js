var xpos = 0
var ypos = 0
var num = 0
var totalLives = 0
var pos = [430, 170]
var zac1 = [document.getElementById("img-zacSR"), pos[0], pos[1], 50, 100]
var matt1 = [document.getElementById("img-mattSR"), pos[0]+90, pos[1], 50, 100]
var kell1 = [document.getElementById("img-kellSR"), pos[0], pos[1]+140, 50, 100]
var grey1 = [document.getElementById("img-greySR"), pos[0]+90, pos[1]+140, 50, 100]
var bella1 = [document.getElementById("img-bellaSR"), pos[0], pos[1]+280, 50, 100]
var weiqi1 = [document.getElementById("img-weiqiSR"), pos[0]+90, pos[1]+280, 50, 100]
var zac2 = [document.getElementById("img-zacSL"), pos[0]+200, pos[1], 50, 100]
var matt2 = [document.getElementById("img-mattSL"), pos[0]+290, pos[1], 50, 100]
var kell2 = [document.getElementById("img-kellSL"), pos[0]+200, pos[1]+140, 50, 100]
var grey2 = [document.getElementById("img-greySL"), pos[0]+290, pos[1]+140, 50, 100]
var bella2 = [document.getElementById("img-bellaSL"), pos[0]+200, pos[1]+280, 50, 100]
var weiqi2 = [document.getElementById("img-weiqiSL"), pos[0]+290, pos[1]+280, 50, 100]
var players = [zac1, matt1, kell1, grey1, bella1, weiqi1, zac2, matt2, kell2, grey2, bella2, weiqi2]
var bgs = []
for(let i=0; i<players.length; i++){bgs[i]='white'}

var loc = false

export default class Display{
  constructor(game){
    this.game = game
    this.width = game.width
    this.height = game.height
    this.players = [null, null]
    this.cropWidth = 2500
    this.cropHeight = 2178
    this.deathLevel = this.game.level
    this.image = document.getElementById("img-wideBackground")
    this.hat = document.getElementById("img-hat")
    this.song = document.getElementById("Song");
    song.volume = 0.2;
    this.text = {
      x:0,
      y:0,
      cont: ["", null, null],
    }
    this.time = 0
  }
  update(deltaTime){
    if (this.game.state === this.game.states.start) {
      this.song.pause()
      document.getElementById("gameScreen").onmousedown = this.down
      document.getElementById("gameScreen").onmouseup = this.up
      if(loc){this.set()}
    }
    else if (this.game.state===this.game.states.running){this.song.play()}
    else if (this.game.state===this.game.states.gameover){this.song.pause()}
    else if (this.game.state===this.game.states.win){this.song.play()}
    else if (this.game.state===this.game.states.paused){this.song.pause()}
    else if (this.game.state===this.game.states.cutscene){this.song.play()}
    this.game.bgType=0
    if(this.game.level>2 && this.game.levelLen<5500){this.game.bgType=1}
  }
  down(mouseEvent){loc = mouseEvent}
  up(){loc = false}
  set(){
    xpos = loc.clientX-6
    ypos = loc.clientY-6
    loc = false
    for(let i=0; i<players.length; i++){
      if(xpos>players[i][1]-10 && xpos<players[i][1]+players[i][3]+10 && ypos>players[i][2]-10 && ypos<players[i][2]+players[i][4]+10){
        switch(i){
          case 0: case 1: case 2: case 3: case 4: case 5:
            for(let a=0; a<6; a++){
              if(a===i){continue}
              bgs[a] = 'white'
            }
            if(bgs[i]==='white'){
              this.players[0] = i
              bgs[i] = 'yellow'
            } else{
              this.players[0] = null
              bgs[i] = 'white'
            }
            break
          case 6: case 7: case 8: case 9: case 10: case 11:
            for(let a=6; a<12; a++){
              if(a===i){continue}
              bgs[a] = 'white'
            }
            if(bgs[i]==='white'){
              this.players[1] = i-6
              bgs[i] = 'yellow'
            } else{
              this.players[1] = null
              bgs[i] = 'white'
            }
            break
        }
      }
    }
  }
  running(ctx){
    this.deathLevel = this.game.level
    let time = new Date().getTime() - this.game.startTime
    let seconds = Math.floor(time/1000)
    let mSeconds = Math.floor((time-seconds*1000)/100)
    this.time = seconds+mSeconds*0.1
    ctx.font = "30px Copperplate"
    ctx.fillStyle = "black"
    ctx.textAlign = "left"
    ctx.fillText("Time: " + seconds + "." + mSeconds, 600, 30)
    ctx.textAlign = "center"
    ctx.fillText("Level " + this.game.level, this.width/2, 30)
    if(this.game.numPlayers===1){
      ctx.fillText("Lives: " + this.game.lives[0], 70, 30)
    } else{
      ctx.fillText("P1 Lives: " + this.game.lives[0], 90, 30)
      ctx.fillText("P2 Lives: " + this.game.lives[1], 90, 60)
      ctx.fillText("P1 Points: " + this.game.points[0], 95, 90)
      ctx.fillText("P2 Points: " + this.game.points[1], 95, 120)
    }
    if(this.game.lives[0]+this.game.lives[1]<totalLives){
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgba(255, 0, 0, 0.8)"
      ctx.fill()
    }
    totalLives=this.game.lives[0]+this.game.lives[1]
    if(this.game.numPlayers===1){
      switch(this.game.level){
        case 1: ctx.fillText("Avoid the candy canes!", 400-this.game.pos, 60); break;
        case 2: ctx.fillText("Avoid the elf!", 400-this.game.pos, 60); break;
        case 3: ctx.fillText("Collect Cookies!", 400-this.game.pos, 60); break;
        case 4: ctx.fillText("Knock down Snowmen!", 400-this.game.pos, 60); break;
        case 5: ctx.fillText("Knock down a lot of Snowmen!", 400-this.game.pos, 60); break;
        case 6: ctx.fillText("Timing is everything", 400-this.game.pos, 60); break;
        case 7: ctx.fillText("Patience young padewan", 400-this.game.pos, 60); break;
        case 8: ctx.fillText("Say hi to the Gingerbread Man", 400-this.game.pos, 60); break;
        case 9: ctx.fillText("No more patience. Just run.", 400-this.game.pos, 60); break;
        case 10: ctx.fillText("PARKOUR!.", 400-this.game.pos, 60); break;
        case 11: ctx.fillText("Have some lives.", 400-this.game.pos, 60); break;
      }
    }
  }
  draw(ctx){
    //Menu Screen
    if (this.game.state === this.game.states.start) {
      ctx.drawImage(this.image, 0, 0, this.cropWidth, this.cropHeight, 0, 0, this.game.width, this.game.height+2)
      ctx.globalAlpha = 0.8
      ctx.fillStyle='white'
      ctx.fillRect(20, 100, 360, 460)
      ctx.globalAlpha = 1
      ctx.font = "80px Copperplate"
      ctx.fillStyle = "black"
      ctx.textAlign = "center"
      ctx.globalAlpha = 0.2
      ctx.fillText("SANTA'S VILLAGE", 400, 75)
      ctx.globalAlpha = 1
      ctx.fillText("SANTA'S PILLAGE", 400, 75)
      ctx.setTransform(1, 0, 0, 1, 0, 0) // sets scale and origin
      ctx.rotate(-0.5)
      ctx.drawImage(this.hat, 18, 45, 40, 20)
      ctx.rotate(0.5)
      ctx.font = "30px Copperplate"
      ctx.fillStyle = "black"
      ctx.textAlign = "center"
      ctx.fillText("Instructions:", 200, 140)
      ctx.fillText("Player 1: WASD", 200, 210)
      ctx.fillText("Player 2: ← ↑ → ↓", 200, 260)
      ctx.fillText("Avoid or Kill Enemies", 200, 310)
      ctx.fillText("Collect Cookies", 200, 360)
      ctx.fillText("P to Pause", 200, 410)
      ctx.fillText("Select Characters →", 200, 460)
      ctx.fillText("& Number of Players", 200, 490)
      ctx.fillText("Space to Start", 200, 540)
      ctx.fillText("Pick 1 for single player", 600, 110)
      ctx.fillText("Player 1      Player 2", 600, 140)
      for(let i=0; i<players.length; i++){
        ctx.fillStyle=bgs[i]
        ctx.fillRect(players[i][1]-10, players[i][2]-10, players[i][3]+20, players[i][4]+20)
        ctx.drawImage(players[i][0], players[i][1], players[i][2], players[i][3], players[i][4])
      }
      ctx.font = "20px Copperplate"
      ctx.fillStyle = "white"
      ctx.fillText("Code, Design, Art, and Music by Zac Waite - Pure Code in an IDE - Also ↑ Weiqi", 400, 585)
    }
    else if (this.game.state === this.game.states.running) {
      this.running(ctx)
    }
    else if (this.game.state === this.game.states.cutscene){
      ctx.font = "40px Copperplate"
      ctx.fillStyle = "black"
      ctx.textAlign = "center"
      ctx.fillText("Hit Space to Skip Tutorial/Cutscene", this.width/2, 40)
      ctx.font = "bolder 20px Courier New"
      ctx.fillStyle = "black"
      ctx.textAlign = "left"
      for(let i=0; i<this.text.cont.length; i++){
        if(this.text.cont[i]){ctx.fillText(this.text.cont[i], this.text.x, this.text.y+i*30)}
      }

    }
    //Paused Screen
    else if (this.game.state === this.game.states.paused) {
      this.running(ctx)
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fill()
      ctx.font = "30px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("Paused", this.width / 2, this.height / 2)
    }
    //Gameover Screen
    else if (this.game.state === this.game.states.gameover) {
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgb(255, 0, 0)"
      ctx.fill()
      ctx.font = "30px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      if(this.game.numPlayers===1){
        ctx.fillText("GAME OVER", 400, 250)
        ctx.fillText("You died on level " + this.deathLevel + " in " + this.time + " seconds", 400, 300)
        ctx.fillText("Space to try again", 400, 350)
      }
      else if (this.game.numPlayers===2){
        ctx.fillText("GAME OVER", 400, 200)
        ctx.fillText("You both died by level " + this.deathLevel + " in " + this.time + " seconds", 400, 250)
        if(this.game.points[0]!==this.game.points[1]){ctx.fillText("However, Player " + (this.game.points[0]>this.game.points[1]? 1:2) + " technically won.", 400, 300)}
        else {ctx.fillText("And you tied. You accomplished nothing.", 400, 300)}
        ctx.fillText("Player 1: " + this.game.points[0] + " points.  Player 2: " + this.game.points[1] + " points.", 400, 350)
        ctx.fillText("Space to try again", 400, 400)
      }
    }
    //Win Screen
    else if (this.game.state === this.game.states.win) {
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgb(0, 255, 0)"
      ctx.fill()
      ctx.font = "30px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("YOU WIN", 400, 250)
      ctx.fillText("You won in " + this.time + " seconds", 400, 300)
      ctx.fillText("Space to play again", 400, 350)
    }
  }
}
