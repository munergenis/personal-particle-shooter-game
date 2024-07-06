import { CONFIG } from "../config.js";
import { getRandomInRange, randomBool } from "../helpers/helpers.js"

export class Enemy {
  constructor(canvaSizeX, canvaSizeY, playerX, playerY) {
    this.radius = Math.floor(getRandomInRange(CONFIG.enemy.radius.min, CONFIG.enemy.radius.max, true) / 10) * 10

    this.color = CONFIG.enemy.color[this.radius]

    const posFlag = randomBool()
    this.position = {
      x: posFlag 
        ? Math.random() * canvaSizeX 
        : (
          randomBool() 
            ? 0 - this.radius 
            : canvaSizeX + this.radius
        ),
      y: posFlag 
        ? (
          randomBool() 
            ? 0 - this.radius 
            : canvaSizeY + this.radius
        ) 
        : Math.random() * canvaSizeY
    }

    this.target = {
      x: playerX,
      y: playerY
    }
    this.target.angle = Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x)

    this.velocity = {
      total: CONFIG.enemy.velocity,
      angle: this.target.angle
    }
    this.velocity.x = this.velocity.total * Math.cos(this.velocity.angle)
    this.velocity.y = this.velocity.total * Math.sin(this.velocity.angle)
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}