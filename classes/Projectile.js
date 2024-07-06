import { CONFIG } from "../config.js";

export class Projectile {
  constructor(canvaSizeX, canvaSizeY, targetX, targetY) {
    this.isOutOfBounds = false

    this.canva = {
      sizeX: canvaSizeX,
      sizeY: canvaSizeY
    }
    this.radius = CONFIG.projectile.radius
    this.color = CONFIG.projectile.color

    this.position = {
      x: canvaSizeX / 2,
      y: canvaSizeY / 2
    }

    this.target = {
      x: targetX,
      y: targetY
    }
    this.target.angle = Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x)

    this.velocity = {
      total: CONFIG.projectile.velocity,
      angle: this.target.angle
    }
    this.velocity.x = this.velocity.total * Math.cos(this.target.angle)
    this.velocity.y = this.velocity.total * Math.sin(this.target.angle)
  }

  update() {
    // Update next position
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