const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

io.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on('createRoom', (room) => {
		console.log("creating room", room.name);
		rooms.unshift(room);
		// Update every client about the new room
		socket.broadcast.emit('createRoom', rooms);
		// Join the host socket to the by roomId
		socket.join(room.id);
	});

	socket.on('joinRoom', (room) => {
		const r = rooms.find(rm => rm.id === room.id);

		// Update the whole room for the user that just joined
		socket.emit('joinRoom', r)
		
		// Let everyone in the room know that another person has joined the room
		socket.to(room.id).emit('joinRoom', r);
		
		// Join the users' socket to the roomId
		socket.join(room.id);
	});

	socket.on('deleteRoom', (room) => {
		let i = rooms.findIndex((r) => r.id === room.id)
		if (i > -1) {
			rooms.splice(i, 1);
		}
		socket.broadcast.emit('deleteRoom', rooms);
	});

	socket.on("addTrack", (obj) => {
		const {id, track} = obj;
		const room = rooms.find(room => room.id === id);
		if (room) {
			// if there's no track playing: play it now
			// If currentlyPlaying == {}: currentlyPlaying = track
			if (Object.keys(room.currentlyPlaying).length === 0) {
				room.currentlyPlaying = track;
				io.in(room.id).emit('addedFirstTrack', track);
			}
			else {
				// Else: add track to queue
				room.queue.push(track);
				// sort queue by votes
				room.queue.sort((a, b) => b.votes - a.votes);
				io.in(room.id).emit("addedTrackToQueue", room.queue);
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
		io.in(room.id).emit("playingNextTrack", {track:nextTrack, queue:r.queue})
	});

	socket.on('vote', (room) => {
		const { id, track } = room;
		const r = rooms.find(rm => rm.id === id);
		const t = r.queue.find(t => t.uri === track.uri);

		// Increment the vote count
		t.votes += 1;
		r.queue.sort((a, b) => b.votes - a.votes);
		io.in(room.id).emit('vote', r.queue);
	});

	socket.on('startCountdownForNextTrack', (room) => {
		io.in(room.id).emit('startCountdownForNextTrack');
	});

	socket.on('disconnect', () => {
		socket.disconnect();
		console.log('user ' + socket.id + ' disconnected');
	});
});

app.get("/rooms", (req, res) => {
	console.log("getting rooms");
	res.json(rooms);
});

app.get('/queue/:id', (req, res) => {
	console.log("getting queue");
	const { id } = req.params;
	const r = rooms.find((rm) => rm.id === id);
	res.json(r.queue);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});