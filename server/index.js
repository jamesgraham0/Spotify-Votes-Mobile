const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let rooms = [
	{
		"currentlyPlaying": {
			"title": "", 
			"uri": "", 
			"smallImage": "", 
			"largeImage": "", 
			"duration": 0
		}, 
		"deviceId": "b166d1276412b883e0b37b6ef1112e656a5dc127", 
		"hostId": "t1wyfo4650rthc8s0y3bmfhm8", 
		"id": "oaijwefojewfewfaiejfojawef", 
		"name": "1", 
		"password": "1", 
		"queue": [], 
		"users": []
	},
];

io.on('connection', socket => {
	console.log('client socketid: ' + socket.id);

	socket.on('createRoom', (room) => {
		console.log("creating room", room.name);
		rooms.unshift(room);
		socket.emit('createRoom', rooms);
	});

	socket.on('deleteRoom', (room) => {
		let i = rooms.findIndex((r) => r.id === room.id)
		if (i > -1) {
			rooms.splice(i, 1);
		}
		socket.emit('deleteRoom', rooms);
	});

	socket.on("findRoom", (room) => {
		let i = rooms.findIndex((r) => r.id === room.id)
		socket.emit("foundRoom", rooms[i]);
	});

	socket.on("addTrack", (obj) => {
		const {id, track} = obj;
		const room = rooms.find(room => room.id === id);
		
		// If currentlyPlaying == {}: currentlyPlaying = track
		if (room) {
			if (Object.keys(room.currentlyPlaying).length === 0) {
				room.currentlyPlaying = track;
				socket.emit('addedFirstTrack', track);
			}
			else {
				// Else: add track to queue
				room.queue.push(track);
				// sort queue by votes
				room.queue.sort((a, b) => b.votes - a.votes);
				socket.emit("addedTrack", room.queue);
			}
		}
	});

	// play the next track in the queue
	// if there's no tracks in the queue, set the track to {}
	socket.on('playNextTrack', (room) => {
		// find what room this is
		const {id} = room;
		const r = rooms.find(rm => rm.id === id);

		// pop the first track in the room.queue
		let nextTrack = {};
		if (r.queue.length > 0) {
			nextTrack = r.queue.shift();
		}

		r.currentlyPlaying = nextTrack;

		// return {track:<first_track_in_queue>, queue:<room.queue>}
		socket.emit("playingNextTrack", {track:nextTrack, queue:r.queue})
	});

	socket.on('vote', (room) => {
		const { id, track } = room;
		const r = rooms.find(rm => rm.id === id);
		const t = r.queue.find(t => t.uri === track.uri);

		// Increment the vote count
		t.votes += 1;
		console.log(`${t.name} has ${t.votes} votes`);
		r.queue.sort((a, b) => b.votes - a.votes);
		socket.emit('vote', r.queue);
	});

	socket.on('disconnect', () => {
		socket.disconnect();
		console.log('user ' + socket.id + ' disconnected');
	});
});

app.get("/rooms", (req, res) => {
	res.json(rooms);
});

server.listen(PORT, () => {
  console.log('server started and listening on port ' + PORT);
});