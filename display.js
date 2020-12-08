var xpos = 0
var ypos = 0
var num = 0
var zac1 = [document.getElementById("img-zacSR"), 80, 100, 50, 100]
var zac2 = [document.getElementById("img-zacSL"), 490, 100, 50, 100]
var matt1 = [document.getElementById("img-mattSR"), 260, 100, 50, 100]
var matt2 = [document.getElementById("img-mattSL"), 670, 100, 50, 100]
var players = [zac1, matt1, zac2, matt2]
var bgs = ['white', 'white', 'white', 'white']
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
    for(let i=0; i<players.length; i++){
      if(xpos>players[i][1]-10 && xpos<players[i][1]+players[i][3]+10 && ypos>players[i][2]-10 && ypos<players[i][2]+players[i][4]+10){
        switch(i){
          case 0:
            this.players[0] = 0
            bgs[0] = 'yellow'
            bgs[1] = 'white'
            break
          case 1:
            this.players[0] = 1
            bgs[1] = 'yellow'
            bgs[0] = 'white'
            break
          case 2:
            this.players[1] = 0
            bgs[2] = 'yellow'
            bgs[3] = 'white'
            break
          case 3:
            this.players[1] = 1
            bgs[3] = 'yellow'
            bgs[2] = 'white'
            break
          default:
            for(let i=0; i<bgs.length; i++){
              bgs[i] = 'white'
            }
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
      ctx.fillStyle = bgs[0]
      ctx.fillRect(zac1[1]-10, zac1[2]-10, zac1[3]+20, zac1[4]+20)
      ctx.drawImage(zac1[0], zac1[1], zac1[2], zac1[3], zac1[4])
      ctx.fillStyle = bgs[1]
      ctx.fillRect(matt1[1]-10, matt1[2]-10, matt1[3]+20, matt1[4]+20)
      ctx.drawImage(matt1[0], matt1[1], matt1[2], matt1[3], matt1[4])
      ctx.fillStyle = bgs[2]
      ctx.fillRect(zac2[1]-10, zac2[2]-10, zac2[3]+20, zac2[4]+20)
      ctx.drawImage(zac2[0], zac2[1], zac2[2], zac2[3], zac2[4])
      ctx.fillStyle = bgs[3]
      ctx.fillRect(matt2[1]-10, matt2[2]-10, matt2[3]+20, matt2[4]+20)
      ctx.drawImage(matt2[0], matt2[1], matt2[2], matt2[3], matt2[4])
      ctx.fillStyle = "white"
      ctx.fillText("P to Pause", this.width / 2, (this.height / 2)-50)
      ctx.fillText("Use the W-A-D arrow keys to move", this.width / 2, (this.height / 2))
      ctx.fillText("Avoid enemies, make it to the door", this.width / 2, (this.height / 2)+50)
      ctx.fillText("PosX: " + xpos + " PosY: " + ypos, this.width/2, (this.height/2)+100)
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
