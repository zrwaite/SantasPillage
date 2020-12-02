export default class Display{
  constructor(game){
    this.game = game
    this.width = game.width
    this.height = game.height
  }
  update(deltaTime){
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
      ctx.fillText("Space to Start and Restart", this.width / 2, (this.height / 2)-100)
      ctx.fillText("P to Pause", this.width / 2, (this.height / 2)-50)
      ctx.fillText("Use the W-A-D arrow keys to move", this.width / 2, (this.height / 2))
      ctx.fillText("Avoid enemies, make it to the door", this.width / 2, (this.height / 2)+50)
      ctx.fillText("Kill skeletons to stop their pumpkins", this.width / 2, (this.height / 2)+100)
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
