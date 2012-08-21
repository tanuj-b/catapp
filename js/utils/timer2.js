function Timer() {
	this.mins = 6;
	this.secs = 0;
	this.timerRunning = false;
	this.timerId = null;
}

Timer.prototype.init = function() {
	this.mins = 6;
	this.secs = 0;
	this.stopTimer();
	this.startTimer();
};

Timer.prototype.stopTimer = function() {
	if (this.timerRunning)
		this.clearTimeout(timerId);
	this.timerRunning = false;
};

Timer.prototype.startTimer = function() {
	this.timerRunning = true;
	window.status = "Time Remaining " + this.pad(this.mins) + ":" + this.pad(this.secs);
	var fName = 'this.startTimer()';
	this.timerId = self.setTimeout('startTimer()', 1000);
	this.check();

	if (this.mins == 0 && this.secs == 0)
		this.stopTimer();

	if (this.secs == 0) {
		this.mins--;
		this.secs = 60;
	}
	this.secs--;
};

Timer.prototype.check = function() {
	if (this.mins == 5 && this.secs == 0)
		alert("You have only five minutes remaining");
	else if (this.mins == 0 && this.secs == 0) {
		alert("Your alloted time is over.");
	}
};

Timer.prototype.pad = function(number) {
	if (number < 10)
		number = 0 + "" + number;
	return number;
};