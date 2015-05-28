function Event(e, m, s) {
	this.event = e;
	this.data = m,
	this.sender = s || 'The Magnificent Scrotum';

	this.toString = function () {
		return JSON.stringify(this);
	}

	this.toLog = function () {
		return this.sender + ' says: "' + this.event + '=' + (this.data.substring ? this.data : JSON.stringify(this.data));
	}

	this.sendTo = function(ws) {
		ws.send(this.toString());
		console.log(this.toLog());
	}
}

module.exports = exports = Event;
