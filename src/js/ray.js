class Ray {
  constructor (startPos, endPos, ctx) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.ctx = ctx;
    // this.draw(ctx);
  }

  draw () {
    // ctx.strokeStyle = 'transparent';
    this.ctx.beginPath();
    this.ctx.moveTo(...this.startPos);
    this.ctx.lineTo(...this.endPos);
    this.ctx.stroke();
  }
}

module.exports = Ray;