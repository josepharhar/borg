var socket;

var width = 400;
var height = 400;

// the time when we last sent our data to the server
var lastUpdate = getTime();

// how often we should send our player info to the server
var updateIntervalMilis = 20;

// list of other players updated by server
var otherPlayers = {};

// the player of this client
var player = {
	color: color(128 + 128 * Math.random(), 128 + 128 * Math.random(), 128 + 128 * Math.random()),
	position: new PVector(width / 2, height / 2),
	speed: 3,
	velocity: new PVector(0, 0),
	size: new PVector(20, 20),
	updateMouse: function() {
		var dy = mouseY - this.position.y;
		var dx = mouseX - this.position.x;
		var theta = Math.atan(dy/dx);
		this.velocity.y = Math.sin(theta) * this.speed;
		this.velocity.x = Math.cos(theta) * this.speed;
		if (mouseX < this.position.x) {
			this.velocity.x *= -1;
			this.velocity.y *= -1;
		}
	},
	move: function() {
		if (this.position.x + this.velocity.x + (this.size.x / 2) < width) {
			if (this.position.x + this.velocity.x - (this.size.x / 2) > 0) {
				this.position.x += this.velocity.x;
			}
		}
		if (this.position.y + this.velocity.y + (this.size.y / 2) < width) {
			if (this.position.y + this.velocity.y - (this.size.y / 2) > 0) {
				this.position.y += this.velocity.y;
			}
		}
	},
	draw: function() {
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
	}
};

void setup() {
	size(width, height);

	socket = io();
	socket.emit("join", prompt("Enter username"));

	// the server will send a new list of players at intervals
	/*socket.on("server to player", function(players) {
		for (var p in players) {
			if ()
		}
	});*/
}

void draw() {
	background(128);

	player.updateMouse();
	player.move();
	player.draw();

	/*for (var p in otherPlayers) {
		p.move();
		p.draw();
	}*/

	// send coordinates to server every 20ms
	if (getTime() - lastUpdate < updateTimeMilis) {
		socket.emit("player to server", player);
		lastUpdate = getTime();
	}
}

