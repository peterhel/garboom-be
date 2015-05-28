var PingEvent = require('./PingEvent.js');

exports = module.exports = function(eventEmitter) {
	var events = {
		ping: new PingEvent(eventEmitter)
	};
	eventEmitter.on('ping', events.ping.invoke);
}