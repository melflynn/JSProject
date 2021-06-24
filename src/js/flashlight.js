const Ray = require('./ray');

class Flashlight {
  constructor (map, player) {
    this.map = map;
    this.player = player;
    const ctx = map.canvasEl.getContext('2d');
    this.rays = [];
    this.calculateRays(ctx);
    this.lightMaze(ctx);
  }

  calculateRays (ctx) {
    this.map.walls.forEach(wall => {
      const ray1Pos = [this.player.pos, wall.startPos];
      let intersects = false;
      let i = 0;
      // debugger;
      while (!intersects && i < this.map.walls.length) {
        const otherWall = this.map.walls[i];
        // console.log(otherWall === wall);
        if (otherWall !== wall) {
          if ((otherWall.startPos[0] === ray1Pos[1][0] && otherWall.startPos[1] === ray1Pos[1][1]) 
          || (otherWall.endPos[0] === ray1Pos[1][0] && otherWall.endPos[1] === ray1Pos[1][1])) {
            intersects = true;
          }
          let x1 = ray1Pos[0][0];
          let x2 = ray1Pos[1][0];
          let x3 = otherWall.startPos[0];
          let x4 = otherWall.endPos[0];
          let y1 = ray1Pos[0][1];
          let y2 = ray1Pos[1][1];
          let y3 = otherWall.startPos[1];
          let y4 = otherWall.endPos[1];
          let det = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
          let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
          let u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / det;
          // console.log(t);
          if ((t > 0 && t < 1) && (u > 0 && u < 1)) {
            intersects = true;
          }
        }
        i++;
      }
      if (!intersects) {
        this.rays.push(new Ray(this.player.pos, wall.startPos, ctx));
      }
      const ray2Pos = [this.player.pos, wall.endPos];
      intersects = false;
      i = 0;
      // debugger;
      while (!intersects && i < this.map.walls.length) {
        const otherWall = this.map.walls[i];
        // console.log(otherWall === wall);
        if (otherWall !== wall) {
          if ((otherWall.startPos[0] === ray2Pos[1][0] && otherWall.startPos[1] === ray2Pos[1][1]) 
          || (otherWall.endPos[0] === ray2Pos[1][0] && otherWall.endPos[1] === ray2Pos[1][1])) {
            intersects = true;
          }
          let x1 = ray2Pos[0][0];
          let x2 = ray2Pos[1][0];
          let x3 = otherWall.startPos[0];
          let x4 = otherWall.endPos[0];
          let y1 = ray2Pos[0][1];
          let y2 = ray2Pos[1][1];
          let y3 = otherWall.startPos[1];
          let y4 = otherWall.endPos[1];
          let det = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
          let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
          let u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / det;
          // console.log(t);
          if ((t > 0 && t < 1) && (u > 0 && u < 1)) {
            intersects = true;
          }
        }
        i++;
      }
      if (!intersects) {
        this.rays.push(new Ray(this.player.pos, wall.endPos, ctx));
      }
    })
    
  }

  lightMaze (ctx) {
    this.rays.forEach(ray => {
      ctx.strokeStyle = 'rgba(250, 216, 89, 1)';
      ctx.beginPath();
      ctx.moveTo(...ray.startPos);
      ctx.lineTo(...ray.endPos);
      let lastPos = ray.endPos;
      let startWall;
      let endWall
      let i = 0;
      while (!startWall && !endWall && i < this.map.walls.length) {
        let checkWall = this.map.walls[i];
        if (checkWall.startPos[0] === lastPos[0] && checkWall.startPos[1] === lastPos[1]) {
          startWall = checkWall;
        }
        if (checkWall.endPos[0] === lastPos[0] && checkWall.endPos[1] === lastPos[1]) {
          endWall = checkWall;
        }
        i++;
      }
      if(startWall) {
        ctx.lineTo(...startWall.endPos);
      } else if (endWall) {
        ctx.lineTo(...endWall.startPos)
      }
      ctx.lineTo(...ray.startPos);
      ctx.stroke();
      ctx.fillStyle = 'rgba(250, 216, 89, 0.5)';
      ctx.fill()
    })
  }
}

module.exports = Flashlight;