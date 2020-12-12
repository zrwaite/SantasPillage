var xpos = 0
var ypos = 0
var num = 0
var pos = [430, 195]
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
    this.image = document.getElementById("img-wideBackground")
    this.hat = document.getElementById("img-hat")
  }
  update(deltaTime){
    if (this.game.state === this.game.states.start) {
      document.getElementById("gameScreen").onmousedown = this.down
      document.getElementById("gameScreen").onmouseup = this.up
      if(loc){this.set()}
    }
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
  draw(ctx){
    //Menu Screen
    if (this.game.state === this.game.states.start) {
      ctx.drawImage(this.image, 0, 0, this.cropWidth, this.cropHeight, 0, 0, this.game.width, this.game.height+2)
      ctx.globalAlpha = 0.8
      ctx.fillStyle='white'
      ctx.fillRect(20, 120, 360, 460)
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
      ctx.fillText("Instructions:", 200, 160)
      ctx.fillText("Player 1: WASD", 200, 230)
      ctx.fillText("Player 2: ← ↑ → ↓", 200, 280)
      ctx.fillText("Avoid or Kill Enemies", 200, 330)
      ctx.fillText("Collect Cookies", 200, 380)
      ctx.fillText("P to Pause", 200, 430)
      ctx.fillText("Select Characters →", 200, 480)
      ctx.fillText("& Number of Players", 200, 510)
      ctx.fillText("Space to Start", 200, 560)
      ctx.fillText("Player 1      Player 2", 600, 160)
      for(let i=0; i<players.length; i++){
        ctx.fillStyle=bgs[i]
        ctx.fillRect(players[i][1]-10, players[i][2]-10, players[i][3]+20, players[i][4]+20)
        ctx.drawImage(players[i][0], players[i][1], players[i][2], players[i][3], players[i][4])
      }
    }
    //Paused Screen
    else if (this.game.state === this.game.states.paused) {
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
      this.game.level = 0
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgb(255, 0, 0)"
      ctx.fill()
      ctx.font = "30px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("GAME OVER", this.width / 2, (this.height / 2)-25)
      ctx.fillText("Space to try again", this.width / 2, (this.height / 2)+25)
    }
    //Win Screen
    else if (this.game.state === this.game.states.win) {
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgb(0, 255, 0)"
      ctx.fill()
      ctx.font = "30px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("YOU WIN", this.width / 2, this.height / 2)
      ctx.fillText("S to play again", this.width / 2, (this.height / 2)+25)
    }
  }
}
