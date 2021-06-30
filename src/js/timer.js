class Timer {
  constructor (width, height, game) {
    this.game = game;
    // this.time = Math.floor((width * height) / 2);
    this.remainingTime = Math.floor((width * height) / 2);
    this.start();
  }

  start () {
    let timerEl = document.createElement('div');
    document.getElementsByClassName('buttons')[0].appendChild(timerEl);
    this.countTime(timerEl);
  }
  
  countTime (timerEl) {
      setTimeout(() => {
        if (!this.game.over) {
          this.remainingTime -= 1; 
          timerEl.innerText = `${Math.floor(this.remainingTime / 60)}min ${this.remainingTime % 60}sec`;
          if (this.remainingTime === 0) {
            this.game.over = 'timeUp';
            let modalBackground = document.createElement('section');
            modalBackground.id = "result-modal-background";
            let resultModal = document.createElement('div');
            resultModal.id = 'result-modal-box';
            resultModal.innerText = "Time's up!"
            let playAgain = document.createElement('button');
            playAgain.innerText = "Play Again";
            playAgain.addEventListener('click', (e) => {
              e.preventDefault();
              window.location.reload();
            })
            resultModal.appendChild(playAgain);
            modalBackground.appendChild(resultModal);
            document.getElementsByTagName('body')[0].appendChild(modalBackground);
          } else {
            this.countTime(timerEl);
          }
        }
      }, 1000);
  }
}

module.exports = Timer;