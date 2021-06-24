class Ray {
  constructor (startPos, endPos, ctx) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.draw(ctx);
  }

  draw (ctx) {
    // ctx.strokeStyle = 'transparent';
    ctx.beginPath();
    ctx.moveTo(...this.startPos);
    ctx.lineTo(...this.endPos);
    ctx.stroke();
  }
}

module.exports = Ray;