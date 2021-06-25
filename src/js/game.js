const dist = require('./util');

class Game {
  constructor (map, player, flashlight) {
    this.map = map;
    this.player = player;
    this.flashlight = flashlight;
    // this.addPlayer();
    // this.draw();
    this.bindKeyHandlers();
  }

  bindKeyHandlers () {
    window.addEventListener('keydown', this.move.bind(this));
  }

  move (e) {
    if (this.player) {
      this.player.prevPos[1] = this.player.pos[1] - 7;
      this.player.prevPos[0] = this.player.pos[0] - 7;
      // const dist = (pos1, pos2) =>  Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
      let newPos = true;
      
      switch (e.keyCode) {
        case 65: //a
          for (let i = 0; i < this.map.walls.length; i++) {
            if (dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].startPos) < 8 
            || dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].endPos) < 8 
            || dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].center) < 8) {
              newPos = false;
            }
          }
          if (newPos) {
            this.player.pos[0] -= 2;
          }
          break;
        // case 37: //left
        //   for (let i = 0; i < this.map.walls.length; i++) {
        //     if (dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].startPos) < 8 
        //     || dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].endPos) < 8 
        //     || dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].center) < 8) {
        //       newPos = false;
        //     }
        //   }
        //   if (newPos) {
        //     this.player.pos[0] -= 2;
        //   }
        //   break;
        case 87: //w 
          for (let i = 0; i < this.map.walls.length; i++) {
            if (dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].startPos) < 8 
            || dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].endPos) < 8
            || dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].center) < 8) {
              newPos = false;
            }
          }
          if (newPos) {
            this.player.pos[1] -= 2;
          }
          break;
        // case 38: //up
        //   for (let i = 0; i < this.map.walls.length; i++) {
        //     if (dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].startPos) < 8 
        //     || dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].endPos) < 8
        //     || dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].center) < 8) {
        //       newPos = false;
        //     }
        //   }
        //   if (newPos) {
        //     this.player.pos[1] -= 2;
        //   }
        //   break;
        case 68: //d
          for (let i = 0; i < this.map.walls.length; i++) {
            if (dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].startPos) < 8 
            || dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].endPos) < 8
            || dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].center) < 8) {
              newPos = false;
            }
          }
          if (newPos) {
            this.player.pos[0] += 2;
          }
          break;
        // case 39: //right
        //   for (let i = 0; i < this.map.walls.length; i++) {
        //     if (dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].startPos) < 8 
        //     || dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].endPos) < 8
        //     || dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].center) < 8) {
        //       newPos = false;
        //     }
        //   }
        //   if (newPos) {
        //     this.player.pos[0] += 2;
        //   }
        //   break;
        case 83: //s
          for (let i = 0; i < this.map.walls.length; i++) {
            if (dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].startPos) < 8 
            || dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].endPos) < 8
            || dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].center) < 8) {
              newPos = false;
            }
          }
          if (newPos) {
            this.player.pos[1] += 2;
          }
          break;
        // case 40: //down
        //   for (let i = 0; i < this.map.walls.length; i++) {
        //     if (dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].startPos) < 8 
        //     || dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].endPos) < 8
        //     || dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].center) < 8) {
        //       newPos = false;
        //     }
        //   }
        //   if (newPos) {
        //     this.player.pos[1] += 2;
        //   }
        //   break;
      }
  
      this.draw();
    }
  }

  draw (reveal) {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.map.draw();
    this.player.draw();
    if (!reveal) {
      this.flashlight.draw();
      this.flashlight.hideMaze();
    }
    // this.flashlight.calculateRays();
    // this.flashlight.lightMaze();
  }
}

module.exports = Game;