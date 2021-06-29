const Graph = require('./graph');
const DisjointSet = require('./disjointSet');
const Wall = require('./wall');

class Maze {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    const graph = new Graph(width, height);
    this.grid = graph.grid;
    this.AdjacencyCellList = this.grid.AdjacencyCellList;
    this.canvasEl = document.createElement('canvas');
    document.getElementById('maze').append(this.canvasEl);
    this.keptWalls = [];
    this.walls = [];
  }

  kruskal () {
    let walls = [];
    let keptWalls = [];
    for (let i = 0; i < this.height - 1; i++) {
      for (let j = 0; j < this.width - 1; j++) {
        walls.push([[i, j], [i + 1, j]], [[i, j], [i, j + 1]]);
      }
    }
    for (let i = 0; i < this.width - 1; i++) {
      walls.push([[this.height - 1, i], [this.height - 1, i + 1]])
    }
    for (let j = 0; j < this.height - 1; j++) {
      walls.push([[j, this.width -1], [j + 1, this.width - 1]]);
    }

    // console.log(walls);
    let cells = new DisjointSet();
    this.grid.forEach((row, rowNum) => {
      row.forEach((col, colNum) => {
        cells.makeSet([rowNum, colNum]);
      })
    })
    // debugger;
    // console.log(cells);
    while (walls.length > 0) {
      let i = Math.floor(Math.random() * (walls.length - 1))
      let wall = walls[i];
      let first = cells.find(wall[0]);
      let second = cells.find(wall[1]);
      if (first === second || first === undefined || second === undefined) {
        keptWalls.push(wall);
        walls.splice(i, 1);
      } else {
        walls.splice(i, 1);
        cells.union(wall[0], wall[1]);
      }
    }
    // console.log(cells);
    // console.log(walls);
    this.keptWalls = keptWalls;
  }

  draw () {
    // const canvasEl = document.getElementsByTagName("canvas")[0];
    this.canvasEl.height = this.height * 20 + 10;
    this.canvasEl.width = this.width * 20 + 10;
    // debugger;
    // console.log(this.keptWalls);
    // this.canvasEl.style.backgroundColor = 'white';
    const ctx = this.canvasEl.getContext("2d");
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    // canvasEl.style.border = '1px solid black';
    this.walls = [];
    let pos = [5,5];
    while (pos[0] < this.width * 20 + 5) {
      this.walls.push(new Wall(pos, [pos[0] + 20, pos[1]], ctx, "horizontal"));
      pos = [pos[0] + 20, pos[1]]; 
    } 
    // this.walls.push(new Wall([5, 5], [this.width * 20 + 5, 5], ctx, "horizontal"));
    this.walls.push(new Wall([5, 5], [5, 25], ctx, "vertical"));
    pos = [5,45];
    while (pos[1] < this.height * 20 + 5) {
      this.walls.push(new Wall(pos, [pos[0], pos[1] + 20], ctx, "vertical"));
      pos = [pos[0], pos[1] + 20];
    }
    // this.walls.push(new Wall([5, 45], [5, this.height * 20 + 5], ctx, "vertical"));
    pos = [5, this.height * 20 + 5];
    while (pos[0] < this.width * 20 + 5) {
      this.walls.push(new Wall(pos, [pos[0] + 20, this.height * 20 + 5], ctx, "horizontal"));
      pos = [pos[0] + 20, pos[1]];
    }
    // this.walls.push(new Wall([5, this.height * 20 + 5], [this.width * 20 + 5, this.height * 20 + 5], ctx, "horizontal"));
    pos = [this.width * 20 + 5, 5];
    while (pos[1] < this.height * 20 + 5 - 40) {
      this.walls.push(new Wall(pos, [pos[0], pos[1] + 20], ctx, "vertical"));
      pos = [pos[0], pos[1] + 20];
    }
    // this.walls.push(new Wall([this.width * 20 + 5, 5], [this.width * 20 + 5, this.height * 20 + 5 - 40], ctx, "vertical"));
    this.walls.push(new Wall([this.width * 20 + 5, this.height * 20 + 5 - 20], [this.width * 20 + 5, this.height * 20 + 5], ctx, "vertical"));
    this.keptWalls.forEach((wall) => {
      const first = wall[0];
      const second = wall[1];
      if (first[0] < second[0]) { //horizontal line
        this.walls.push(new Wall([second[1] * 20 + 5, second[0] * 20 + 5], [(second[1] + 1) * 20 + 5, second[0] * 20 + 5], ctx, "horizontal"));
      } else { //vertical line
        this.walls.push(new Wall([second[1] * 20 + 5, second[0] * 20 + 5], [second[1] * 20 + 5, (second[0] + 1) * 20 + 5], ctx, "vertical"));
      }
    })
  }
}

// let maze = new Maze(5, 5);
// maze.kruskal();

module.exports = Maze;