const Maze = require('./js/mazeGenerator');
const Player = require('./js/player');
const Game = require('./js/game');

const map = new Maze(12, 12);
map.kruskal();
const player = new Player();

const game = new Game(map.canvasEl, player);
