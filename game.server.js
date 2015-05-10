var game = {};
module.exports = game;

game.lastUpdate = getTime();

game.updateIntervalMilis = 20;

game.width = 400;
game.height = 400;

game.players = {};

// Update all clients with new information about players
game.updateClients = function() {

};

// Continuously running game function
game.run = function() {
	console.log("game running");


	// send data to clients every 20ms
	if (getTime() - game.lastUpdate < game.updateTimeMilis) {
		game.updateClients();
		lastUpdate = getTime();
	}

	// loop the game indefinitely
	setImmediate(game.run);
};