const Maze = require('./js/mazeGenerator');
const Player = require('./js/player');
const Game = require('./js/game');
const Flashlight = require('./js/flashlight');

const game = new Game();

let peekCount = 3;
const create = document.getElementById('create-maze');

create.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementsByTagName('form')[0].style.display = 'none';
  document.getElementById('description').innerText = `w-a-s-d to move ${peekCount} peeks remaining`
  document.getElementById('maze').style.display = 'flex';
  const height = parseInt(document.getElementById('maze-height').value);
  const width = parseInt(document.getElementById('maze-width').value);
  const map = new Maze(width, height);
  const player = new Player(map);
  const flashlight = new Flashlight(map, player);
  map.kruskal();
  
  game.map = map; 
  game.player = player;
  game.flashlight = flashlight;
  game.draw(true);
  let modalBox = document.getElementById('countdown-modal-box')
  const countdown = [3, 2, 1, 'start', ''];
  countdown.forEach((text, i) => {
    setTimeout(() => modalBox.innerText = text, 1000 * i);
  })
  setTimeout(() => game.draw(), 3000);
})

const reveal = document.getElementById('reveal-maze');
reveal.addEventListener('click', (e) => {
  e.preventDefault();
  game.over = 'lost';
  game.draw(true);
})


const peek = document.getElementById('peek');

peek.addEventListener('click', (e) => {
  e.preventDefault();
  if (peekCount > 1) {
    game.draw(true);
    setTimeout(() => game.draw(), 3000);
  } else {
    game.draw(true);
    setTimeout(() => game.draw(), 3000);
    peek.style.display = 'none';
  }
  peekCount -= 1;
  document.getElementById('description').innerText = `w-a-s-d to move ${peekCount} peeks remaining`
})

