export default class Bg{
  constructor(game){
    this.game = game
    this.width = game.width
    this.height = game.height
    this.cropWidth = 2500
    this.cropHeight = 2178
    this.pos = this.game.pos
    this.image = document.getElementById("img-wideBackground")
  }
  update(deltaTime){
    this.pos = this.game.pos
  }
  draw(ctx){
    ctx.save()
    ctx.globalAlpha = 0.6
    ctx.drawImage(this.image, this.game.pos, 0, this.cropWidth, this.cropHeight, 0, 0, this.width, this.height+2);
    ctx.restore();
  }
}
