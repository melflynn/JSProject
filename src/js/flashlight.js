const Ray = require('./ray');
const dist = require('./util');

class Flashlight {
  constructor (map, player) {
    this.map = map;
    this.player = player;
    // const ctx = map.canvasEl.getContext('2d');
    this.rays = [];
    // this.calculateRays(ctx);
    // this.lightMaze(ctx);
  }

  draw () {
    const ctx = this.map.canvasEl.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.player.pos[0], this.player.pos[1], 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'rgba(250, 216, 89, .5)';
    ctx.fill();
  }

  hideMaze() {
    const ctx = this.map.canvasEl.getContext('2d');
    let maskCanvas = document.createElement('canvas');
    maskCanvas.width = this.map.canvasEl.width;
    maskCanvas.height = this.map.canvasEl.height;
    const maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.globalCompositeOperation = 'xor';
    maskCtx.arc(this.player.pos[0], this.player.pos[1], 50, 0, 2 * Math.PI);
    maskCtx.fill();
    ctx.drawImage(maskCanvas, 0, 0);
  }

  calculateRays () {
    const ctx = this.map.canvasEl.getContext('2d');
    this.rays = [];
    this.map.walls.forEach(wall => { //build a ray from the player center to each wall start and end point
      const ray1Pos = [this.player.pos, wall.startPos]; //first the ray from center to the start point of the wall
      let intersects = false;
      let i = 0;
      while (!intersects && i < this.map.walls.length) { //check if ray will intersect any walls
        const otherWall = this.map.walls[i];
        // if (otherWall !== wall) {
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
          if ((t > 0 && t < 1) && (u > 0 && u < 1)) {
            intersects = true; //do not include ray if intersecting other walls
          }
        // }
        i++;
      }
      if (!intersects) {
        let j = 0;
        while (!intersects && j < this.rays.length) { //check if ray is colinear to any existing ray
          const ray = this.rays[j];
          if (!(ray.endPos[0] === ray1Pos[1][0] && ray.endPos[1] === ray1Pos[1][1])) {
            // debugger;
            let rayLength = dist(ray.startPos, ray.endPos);
            let ray1Length = dist(ray1Pos[0], ray1Pos[1]);
            let rayDist = dist(ray.endPos, ray1Pos[1]);
            if (ray1Length > rayLength) {
              if (Math.abs(ray1Length - (rayLength + rayDist)) < Math.abs(0.01)) {
                intersects = true;
              }
            } else {
              if (Math.abs(rayLength - (ray1Length + rayDist)) < Math.abs(0.01)) {
                this.rays.splice(this.rays.indexOf(ray), 1, new Ray(this.player.pos, wall.startPos, ctx)) //if colinear, select the shorter (nearest) of the rays
                intersects = true;
              }
            }
          } else {
            intersects = true;
          }
          j++;
        }

        if (!intersects) {
          let ray = new Ray(this.player.pos, wall.startPos, ctx)
          if (!this.rays.includes(ray)) {
            this.rays.push(ray);
          }
        }
      }
        
      const ray2Pos = [this.player.pos, wall.endPos]; //next repeat the process for the ray from center to end point of the wall
      intersects = false;
      i = 0;
      while (!intersects && i < this.map.walls.length) {
        const otherWall = this.map.walls[i];
        // if (otherWall !== wall) {
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
          if ((t > 0 && t < 1) && (u > 0 && u < 1)) {
            intersects = true;
          }
        // }
        i++;
      }
      if (!intersects) {
        let j = 0;
        while (!intersects && j < this.rays.length) {
          const ray = this.rays[j];
          if (!(ray.endPos[0] === ray2Pos[1][0] && ray.endPos[1] === ray2Pos[1][1])) {
            // debugger;
            let rayLength = dist(ray.startPos, ray.endPos);
            let ray2Length = dist(ray2Pos[0], ray2Pos[1]);
            let rayDist = dist(ray.endPos, ray2Pos[1]);
            if (ray2Length > rayLength) {
              if (Math.abs(ray2Length - (rayLength + rayDist)) < Math.abs(0.01)) {
                intersects = true;
              }
            } else {
              if (Math.abs(rayLength - (ray2Length + rayDist)) < Math.abs(0.01)) {
                this.rays.splice(this.rays.indexOf(ray), 1, new Ray(this.player.pos, wall.startPos, ctx))
                intersects = true;
              }
            }
          } else {
            intersects = true;
          }
          j++;
        }

        if (!intersects) {
          let ray = new Ray(this.player.pos, wall.endPos, ctx)
          // debugger;
          if (!this.rays.includes(ray)) {
            this.rays.push(ray);
          }
        }
      }
    })
    console.log(this.rays);
    this.rays.forEach(ray => {
      ray.draw(); //print the rays that do not intersect other walls
    })
  }

  lightMaze () {
    const ctx = this.map.canvasEl.getContext('2d');
    const sortedRays = this.sortRays();
    ctx.strokeStyle = 'rgba(250, 216, 89, 1)';
    ctx.beginPath();
    ctx.moveTo(...sortedRays[0].startPos);
    sortedRays.forEach(ray => {
      ctx.lineTo(...ray.endPos);
      // let lastPos = ray.endPos;
      // let startWall;
      // let endWall
      // let i = 0;
      // while (!startWall && !endWall && i < this.map.walls.length) {
      //   let checkWall = this.map.walls[i];
      //   if (checkWall.startPos[0] === lastPos[0] && checkWall.startPos[1] === lastPos[1]) {
      //     startWall = checkWall;
      //   }
      //   if (checkWall.endPos[0] === lastPos[0] && checkWall.endPos[1] === lastPos[1]) {
      //     endWall = checkWall;
      //   }
      //   i++;
      // }
      // if(startWall) {
      //   ctx.lineTo(...startWall.endPos);
      // } 
      // if (endWall) {
      //   ctx.lineTo(...endWall.startPos)
      // }
    })
    ctx.lineTo(...sortedRays[0].endPos);
    ctx.stroke();
    ctx.fillStyle = 'rgba(250, 216, 89, 0.5)';
    ctx.fill()
  }

  rayAngle (first, second, center) {
    const cf = dist(center, first);
    const cs = dist(center, second);
    const fs = dist(first, second);
    return Math.acos((cf + cs - fs)/ (2 * cf * cs));
  }

  sortRays () {
    const ray = this.rays[0];
    return [ray].concat(this.mergeSort(this.rays.slice(1), ray));
  }

  mergeSort(array, firstRay) {
    if (array.length <= 1) {
      return array;
    } else {
      const mid = array.length / 2;
      const left = this.mergeSort(array.slice(0, mid), firstRay);
      const right = this.mergeSort(array.slice(mid), firstRay);
      return this.merge(left, right, firstRay);
    }
  }

  merge (left, right, firstRay) {
    let sorted = [];
    while (!left.length === 0 && !right.length === 0) {
      if (this.rayAngle(firstRay.endPos, left[0].endPos, firstRay.startPos) < this.rayAngle(firstRay.endPos, right[0].endPos, firstRay.startPos)) {
        sorted.push(left.shift());
      } else {
        sorted.push(right.shift());
      }
    }
    return sorted.concat(left).concat(right);
  }
}

module.exports = Flashlight;