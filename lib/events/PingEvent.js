function PingEvent(eventEmitter) {
	var self = this;

	self._eventEmitter = eventEmitter;

	self.invoke = function(message, sender) {
		console.log('Incoming ping [%s]', message);

		self._eventEmitter.emit('broadcast', message);

		sender.send(JSON.stringify({
			event: 'pong',
			msg: message
		}), {
			getPlayerName: function() {
				return "HAL";
			}
		});
	};
}

module.exports = exports = PingEvent;