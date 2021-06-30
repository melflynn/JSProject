class Timer {
  constructor (width, height, game) {
    this.game = game;
    this.time = Math.floor((width * height));
    this.remainingTime = Math.floor((width * height));
    this.start();
  }

  start () {
    let counter = 1;
    let timerEl = document.createElement('div');
    document.getElementsByClassName('buttons')[0].appendChild(timerEl);
    while (counter <= this.time && !this.game.over) {
        this.countTime(counter, timerEl);
        // counter += 1;
    }
  }
  
  countTime (counter, timerEl) {
      setTimeout(() => {
        if (!this.game.over) {
          this.remainingTime -= 1; 
          timerEl.innerText = this.remainingTime;
          // console.log(this.remainingTime);
          // console.log(!this.game.over);
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
          }
        }
      }, 1000 * counter);
  }
}

module.exports = Timer;