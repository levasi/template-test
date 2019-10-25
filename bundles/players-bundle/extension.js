'use strict';

module.exports = function (nodecg) {

	const fs = require('fs');
	let playersData = JSON.parse(fs.readFileSync(`${__dirname}\\playersData.json`))

	const playersDataRep = nodecg.Replicant('playersData')

	playersDataRep.value = playersData

	nodecg.listenFor('addPlayer', newPlayer => {

		// add new player to players
		playersData.push(newPlayer)

		// update players data replicant
		playersDataRep.value = playersData

		// write new updated players to json file
		fs.writeFile(`${__dirname}\\playersData.json`, JSON.stringify(playersData), function (err) {
			if (err) throw err;
		});

	})

	nodecg.listenFor('removePlayer', index => {

		const filteredPlayers = []

		playersDataRep.value.filter((player, playerIndex) => {
			if (playerIndex !== index) {
				filteredPlayers.push(player)
			}
		})

		playersDataRep.value = filteredPlayers

		fs.writeFile(`${__dirname}\\playersData.json`, JSON.stringify(filteredPlayers), function (err) {
			if (err) throw err;
		});

	})
};