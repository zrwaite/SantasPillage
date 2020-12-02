export default class Input{
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 80: // Pause, P
          game.togglePause()
          break
        case 32: //Start, Space
          game.start()
          break
      }
    })
  }
}
