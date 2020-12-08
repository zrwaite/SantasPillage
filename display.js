var xpos = 0
var ypos = 0
var num = 0
var zac1 = [document.getElementById("img-zacSR"), 80, 100, 50, 100]
var matt1 = [document.getElementById("img-mattSR"), 260, 100, 50, 100]
var kell1 = [document.getElementById("img-kellSR"), 80, 250, 50, 100]
var grey1 = [document.getElementById("img-greySR"), 260, 250, 50, 100]
var bella1 = [document.getElementById("img-bellaSR"), 80, 400, 50, 100]
var weiqi1 = [document.getElementById("img-weiqiSR"), 260, 400, 50, 100]
var zac2 = [document.getElementById("img-zacSL"), 490, 100, 50, 100]
var matt2 = [document.getElementById("img-mattSL"), 670, 100, 50, 100]
var kell2 = [document.getElementById("img-kellSL"), 490, 250, 50, 100]
var grey2 = [document.getElementById("img-greySL"), 670, 250, 50, 100]
var bella2 = [document.getElementById("img-bellaSL"), 490, 400, 50, 100]
var weiqi2 = [document.getElementById("img-weiqiSL"), 670, 400, 50, 100]
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
              if(a===i){break}
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
              if(a===i){break}
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
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = "rgb(0, 0, 0)"
      ctx.fill()
      ctx.font = "30px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("Select Player One                     Select Player Two", this.width / 2, (this.height / 2)-250)
      for(let i=0; i<players.length; i++){
        ctx.fillStyle=bgs[i]
        ctx.fillRect(players[i][1]-10, players[i][2]-10, players[i][3]+20, players[i][4]+20)
        ctx.drawImage(players[i][0], players[i][1], players[i][2], players[i][3], players[i][4])
      }
      /*
      ctx.fillStyle = "white"
      ctx.fillText("P to Pause", this.width / 2, (this.height / 2)-50)
      ctx.fillText("Use the W-A-D arrow keys to move", this.width / 2, (this.height / 2))
      ctx.fillText("Avoid enemies, make it to the door", this.width / 2, (this.height / 2)+50)
      ctx.fillText("PosX: " + xpos + " PosY: " + ypos, this.width/2, (this.height/2)+100)
      */
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
