export default class Input{
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 80: // Pause, P
          game.togglePause()
          break
        case 32: //Start, Space
          if(game.state===game.states.start){game.start()}
          else if(game.state===game.states.gameover||game.state===game.states.win){
            game.state=game.states.start
            game.lives = [5, 5]
            game.level=game.startLevel
          }
          else if(game.state===game.states.cutscene){
            game.level++
            game.start()
          }
          break
      }
    })
  }
}
