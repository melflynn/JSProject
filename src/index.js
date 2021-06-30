const Maze = require('./js/mazeGenerator');
const Player = require('./js/player');
const Game = require('./js/game');
const Flashlight = require('./js/flashlight');
const Timer = require('./js/timer');
const Finish = require('./js/finish');

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
  const finish = new Finish(map);
  map.kruskal();
  
  game.map = map; 
  game.player = player;
  game.flashlight = flashlight;
  game.finish = finish;
  game.draw(true);
  // let modalBox = document.getElementById('countdown-modal-box')
  let modalBackground = document.createElement('section');
  modalBackground.id = 'result-modal-background';
  let modalBox = document.createElement('div');
  modalBox.id = 'modal-box';
  modalBackground.appendChild(modalBox);
  document.getElementsByTagName('body')[0].appendChild(modalBackground);
  const countdown = [3, 2, 1, 'start', ''];
  countdown.forEach((text, i) => {
    setTimeout(() => modalBox.innerText = text, 1000 * i);
  })
  setTimeout(() => {
    game.draw();
    const timer = new Timer(width, height, game);
    document.getElementsByTagName('body')[0].removeChild(modalBackground);
    }, 3000);

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

