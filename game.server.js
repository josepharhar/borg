var game = {};
module.exports = game;

game.lastUpdate = Date.now();

game.updateIntervalMilis = 20;

game.width = 400;
game.height = 400;

game.players = {};

// Update all clients with new information about players
game.updateClients = function() {

};

// Continuously running game function
game.run = function() {
	console.log("game running. Date.now(): " + process.hrtime());


	// send data to clients every 20ms
	if (Date.now() - game.lastUpdate < game.updateTimeMilis) {
		game.updateClients();
		lastUpdate = Date.now();
	}

	// loop the game indefinitely
	//setInterval(game.run, 1000);
};