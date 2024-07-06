import { CONFIG } from "../config.js"

export class Player {
  constructor(canvaSizeX, canvaSizeY) {
    this.radius = CONFIG.player.radius
    this.color = CONFIG.player.color

    this.position = {
      x: canvaSizeX / 2,
      y: canvaSizeY / 2,
    }
  }

  update() {}

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  resetPosition(canvaSizeX, canvaSizeY) {
    this.position.x = canvaSizeX / 2
    this.position.y = canvaSizeY / 2
  }
}