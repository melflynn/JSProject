class Player {
  constructor () {
    this.pos = [15, 35]
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 6, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.fillStyle = 'pink';
    ctx.fill();
  }
}

module.exports = Player;