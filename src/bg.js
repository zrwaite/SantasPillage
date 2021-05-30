export default class Bg{
  constructor(game){
    this.game = game
    this.width = game.width
    this.height = game.height
    this.cropWidth = 2500
    this.cropHeight = 2178
    this.pos = this.game.pos
    this.type = this.game.bgType
    this.images = [document.getElementById("img-wideBackground"), document.getElementById("img-niceBackground")]
    this.image = this.images[this.type]
  }
  update(deltaTime){
    this.type = this.game.bgType
    this.image = this.images[this.type]
    this.pos = this.game.pos
  }
  draw(ctx){
    ctx.save()
    ctx.globalAlpha = 0.6
    ctx.drawImage(this.image, this.game.pos, 0, this.cropWidth, this.cropHeight, 0, 0, this.width, this.height+2);
    ctx.restore();
  }
}
