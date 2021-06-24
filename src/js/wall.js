class Wall {
  constructor (startPos, endPos, ctx, dir) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.dir = dir;
    let center;
    if (dir === "horizontal") {
      center = [(startPos[0] + endPos[0]) / 2, startPos[1]];
    } else if (dir === "vertical") {
      center = [startPos[0], (startPos[1] + endPos[1]) / 2];
    }
    this.center = center;
    this.draw(ctx);
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.moveTo(...this.startPos);
    ctx.lineTo(...this.endPos);
    ctx.stroke();
  }
}

module.exports = Wall;