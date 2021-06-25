const Maze = require('./js/mazeGenerator');
const Player = require('./js/player');
const Game = require('./js/game');
const Flashlight = require('./js/flashlight');

const map = new Maze(10, 10);
map.kruskal();
const player = new Player(map);
const flashlight = new Flashlight(map, player);

const gameView = new Game(map, player, flashlight);
