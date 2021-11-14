export default class InputManager {
  constructor(element) {
    this.element = element
    this.keyPoll = { up: 0, left: 0, right: 0, down: 0 }
    this.keyDownHandler = this.keyDownHandler.bind(this)
    this.keyUpHandler = this.keyUpHandler.bind(this)
  }

  addEventListeners() {
    this.element.addEventListener("keydown", this.keyDownHandler)
    this.element.addEventListener("keyup", this.keyUpHandler)
  }

  removeEventListeners() {
    this.element.removeEventListener("keydown", this.keyDownHandler)
    this.element.removeEventListener("keyup", this.keyUpHandler)
  }

  keyDownHandler(event) {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        this.keyPoll.up = -1
        break;
      case "a":
      case "ArrowLeft":
        this.keyPoll.left = -1
        break;
      case "s":
      case "ArrowDown":
        this.keyPoll.down = 1
        break;
      case "d":
      case "ArrowRight":
        this.keyPoll.right = 1
        break;
    }
  }

  keyUpHandler(event) {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        this.keyPoll.up = 0
        break;
      case "a":
      case "ArrowLeft":
        this.keyPoll.left = 0
        break;
      case "s":
      case "ArrowDown":
        this.keyPoll.down = 0
        break;
      case "d":
      case "ArrowRight":
        this.keyPoll.right = 0
        break;
    }
  }
}
