var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// game controlling object
var game = require('./game.server.js');

// list of users by socket id
clients = {};

// ROUTING

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

// EVENTS

io.on('connection', function(socket) {
	console.log('client connected. socket: ' + socket.id);

    socket.on('join', function(username) {
        console.log('USER JOINING. name: ' + username);
        clients[socket.id] = new Player(username);
    });

	socket.on('disconnect', function() {
		console.log("client disconnected: " + socket.id);
        delete clients[socket.id];
	});

    socket.on('player to server', function(player) {
        //console.log("got player info!\n  x: " + player.position.x + "\n  y: " + player.position.y);
    });
});

// SERVER

var server = http.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("rofl lol listening at http://" + host + ":" + port);
});

// start the game
game.run();