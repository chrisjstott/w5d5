function Clock () {
  this.currentTime = {};
}

Clock.prototype.TICK = 5000;

Clock.prototype.printTime = function () {
  console.log(this.currentTime.hours + ":" + this.currentTime.minutes + ":" +
              this.currentTime.seconds);
};

Clock.prototype.run = function() {
  var date = new Date();
  this.currentTime.seconds = date.getSeconds();
  this.currentTime.minutes = date.getMinutes();
  this.currentTime.hours = date.getHours();
  this.printTime();
  setInterval (this._tick.bind(this), this.TICK);
};

Clock.prototype._tick = function() {
  this.currentTime.seconds += this.TICK / 1000;
  this._check60(this.currentTime.seconds, this.currentTime.minutes);
  this._check60(this.currentTime.minutes, this.currentTime.hours);
  this.currentTime.hours %= 24;
  this.printTime();
};


Clock.prototype._check60 = function(smaller, bigger) {
  if (smaller > 60) {
    bigger += 1;
    smaller -= 60;
  }
};

var clock = new Clock();
clock.run();
