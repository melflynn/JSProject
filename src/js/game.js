const dist = require('./util');

class Game {
  constructor (map, player, flashlight, finish) {
    this.map = map;
    this.player = player;
    this.flashlight = flashlight;
    // this.addPlayer();
    // this.draw();
    this.bindKeyHandlers();
    this.over = null;
  }

  bindKeyHandlers () {
    window.addEventListener('keydown', this.move.bind(this));
    if (this.over) {
      window.removeEventListener('keydown', this.move.bind(this));
    }
  }

  move (e) {
    if (this.player && !this.over) {
      // this.player.prevPos[1] = this.player.pos[1] - 7;
      // this.player.prevPos[0] = this.player.pos[0] - 7;
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
            this.draw();
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
            this.draw();
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
            if (this.player.pos[0] > this.map.canvasEl.width - 5) {
              console.log('You win!');
              this.over = 'won';
            }
            this.draw();
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
            this.draw();
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
  
      
    }
  }

  draw (reveal) {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.map.draw();
    this.player.draw();
    this.finish.draw();
    if (!reveal) {
      this.flashlight.draw();
      this.flashlight.hideMaze();
    }
    if (this.over) {
      let modalBackground = document.createElement('section');
      modalBackground.id = "result-modal-background";
      let resultModal = document.createElement('div');
      resultModal.id = 'result-modal-box';
      if (this.over === 'won') {
        resultModal.innerText = "You won!";
      } else {
        resultModal.innerText = "Better luck next time!";
      }
      let playAgain = document.createElement('button');
      playAgain.innerText = "Play Again";
      playAgain.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
      })
      resultModal.appendChild(playAgain);
      modalBackground.appendChild(resultModal);
      document.getElementsByTagName('body')[0].appendChild(modalBackground);
    }
  }
}

module.exports = Game;