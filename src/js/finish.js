class Finish {
  constructor (map) {
    this.map = map;
    this.ctx = map.canvasEl.getContext('2d');
  }

  draw () {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.arc(this.map.width * 20 + 10, this.map.height * 20 + 5 - 30, 20, 0, 2 * Math.PI);
    this.ctx.stroke();
    const gradient = this.ctx.createRadialGradient(this.map.width * 20 + 10, this.map.height * 20 + 5 - 30, 1, this.map.width * 20 + 10, this.map.height * 20 + 5 - 30, 20);
    gradient.addColorStop(0, 'rgba(0, 71, 171, 0.5');
    gradient.addColorStop(1, 'rgba(135, 206, 255, .5)');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
}

module.exports = Finish;