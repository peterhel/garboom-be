var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 9991})
  , players = {};
wss.on('connection', function(ws) {
	var player = ws.upgradeReq.url.substring(1);
	players[player] = ws;
	console.log(Object.keys(players).length);

    ws.on('message', function(message) {
        console.log('received: %s', message);
    });

    ws.send('Welcome ' + player);

    ws.on('close', function() {
    	console.log('men satan!');
    	delete players[ws.upgradeReq.url.substring(1)];
    	console.log(Object.keys(players).length);
    });
});