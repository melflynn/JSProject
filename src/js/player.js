// const KeyMaster = require('../../vendor/keymaster');

class Player {
  constructor (map) {
    this.pos = [15, 35];
    this.prevPos = [10, 25];
    this.vel = [0,0];
    this.canvas = map.canvasEl;
    // this.walls = map.walls;
    // console.log(this.walls);
    // const ctx = canvas.getContext('2d');
    // this.draw();
    // this.bindKeyHandlers();
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    // ctx.beginPath();
    // ctx.clearRect(this.prevPos[0], this.prevPos[1], 14, 14 );
    // ctx.closePath()
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 6, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    // ctx.globalCompositeOperation = 'destination-out';
    // ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, 0, 2 * Math.PI);
    // ctx.fill();
    
  }

  // bindKeyHandlers () {
  //   window.addEventListener('keydown', this.move.bind(this));
  // }

  // move (e) {
  //   this.prevPos[1] = this.pos[1] - 7;
  //   this.prevPos[0] = this.pos[0] - 7;
  //   const dist = (pos1, pos2) =>  Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  //   let newPos = true;
  //   switch (e.keyCode) {
  //     case 37:
  //       for (let i = 0; i < this.walls.length; i++) {
  //         if (dist([this.pos[0] - 1, this.pos[1]], this.walls[i].startPos) < 8 
  //         || dist([this.pos[0] - 1, this.pos[1]], this.walls[i].endPos) < 8 
  //         || dist([this.pos[0] - 1, this.pos[1]], this.walls[i].center) < 8) {
  //           newPos = false;
  //         }
  //       }
  //       if (newPos) {
  //         this.pos[0] -= 2;
  //       }
  //       break;
  //     case 38:
  //       for (let i = 0; i < this.walls.length; i++) {
  //         if (dist([this.pos[0], this.pos[1] - 1], this.walls[i].startPos) < 8 
  //         || dist([this.pos[0], this.pos[1] - 1], this.walls[i].endPos) < 8
  //         || dist([this.pos[0], this.pos[1] - 1], this.walls[i].center) < 8) {
  //           newPos = false;
  //         }
  //       }
  //       if (newPos) {
  //         this.pos[1] -= 2;
  //       }
  //       break;
  //     case 39:
  //       for (let i = 0; i < this.walls.length; i++) {
  //         if (dist([this.pos[0] + 1, this.pos[1]], this.walls[i].startPos) < 8 
  //         || dist([this.pos[0] + 1, this.pos[1]], this.walls[i].endPos) < 8
  //         || dist([this.pos[0] + 1, this.pos[1]], this.walls[i].center) < 8) {
  //           newPos = false;
  //         }
  //       }
  //       if (newPos) {
  //         this.pos[0] += 2;
  //       }
  //       break;
  //     case 40:
  //       for (let i = 0; i < this.walls.length; i++) {
  //         if (dist([this.pos[0], this.pos[1] + 1], this.walls[i].startPos) < 8 
  //         || dist([this.pos[0], this.pos[1] + 1], this.walls[i].endPos) < 8
  //         || dist([this.pos[0], this.pos[1] + 1], this.walls[i].center) < 8) {
  //           newPos = false;
  //         }
  //       }
  //       if (newPos) {
  //         this.pos[1] += 2;
  //       }
  //       break;
  //   }

  //   this.draw();
  // }

}

module.exports = Player;