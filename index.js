var Event = require('./lib/events/Event.js');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 9991
    }),
    players = {};

require('./lib/events/eventHandler.js')(eventEmitter);

wss.on('connection', function(ws) {
    ws.getPlayerName = function() {
        return this.upgradeReq.url.substring(1)
    };

    var player = ws.getPlayerName();
    players[player] = ws;
    console.log(' -> ' + player + ' logged in');
    console.log(Object.keys(players).length + ' players online');

    ws.on('message', function(message) {
        try {
            console.log(message);
            var data = JSON.parse(message);
            eventEmitter.emit(data.event, data.msg, ws);
        } catch (error) {
            console.log(error);
            ws.send(new Event('error', error).toString());
        }
    });

    ws.on('close', function() {
        var player = ws.upgradeReq.url.substring(1);
        console.log(player + ' logged out');
        delete players[player];
        console.log(Object.keys(players).length + ' players online');
    });

    new Event('stats', { playersOnline: Object.keys(players).length }).sendTo(ws);
});

eventEmitter.on('broadcast', function(message, sender) {
    for (var p in players) {
        if (p !== sender.getPlayerName()) {
            players[p].send(message);
        }
    }
})