class Timer {
  constructor (width, height) {
    this.time = Math.floor((width * height) / 2);
    this.remainingTime = Math.floor((width * height) / 2);
    this.start();
  }

  start () {
    let counter = 1;
    while (counter < this.time) {
      this.countTime(counter);
      counter += 1;
    }
  }
  
  countTime (counter) {
    setTimeout(() => {
      this.remainingTime -= 1; 
      console.log(this.remainingTime);
      }, 1000 * counter);
  }
}

module.exports = Timer;