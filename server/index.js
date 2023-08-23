// import Constants from "./serverConstants";
// let rooms = Constants.rooms;
const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const PORT = "4000";
http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

let rooms = [
	{
		"currentlyPlaying": {
			"title": "", 
			"uri": "", 
			"smallImage": "", 
			"largeImage": "", 
			"duration": 0,
		}, 
		"deviceId": "b166d1276412b883e0b37b6ef1112e656a5dc127", 
		"hostId": "t1wyfo4650rthc8s0y3bmfhm8", 
		"id": "oaijwefojewfewfaiejfojawef", 
		"name": "1", 
		"password": "1", 
		"queue": [], 
		"users": []
	},
]

const DEFAULT_PROFILE_IMAGE = "http://www.gravatar.com/avatar/?d=mp";

const findRoomById = (roomId) => {
	return rooms.find(room => room.id === roomId)
};

///////////////// SOCKET OPERATIONS /////////////////
io.on("connection", (socket) => {
	console.log(`User connected to socket with ID: ${socket.id}`);

	socket.on('createRoom', (room) => {
		rooms.unshift(room);
		socket.broadcast.emit('createRoom', rooms);
		socket.join(room.id);
	});

	socket.on('joinRoom', (room) => {
		const roomToJoin = findRoomById(room.id);
		// This should emit to only the user that joined
		socket.emit('joinRoom', roomToJoin);
		// socket.to(room.id).emit('joinRoom', roomToJoin);
		socket.join(room.id);
	});

	socket.on('deleteRoom', (room) => {
		let roomIndex = rooms.findIndex(rm => rm.id === room.id)
		if (roomIndex >= 0) {
			rooms.splice(roomIndex, 1);
		}
		socket.broadcast.emit('deleteRoom', rooms);
	});

	socket.on("addTrack", (obj) => {
		const { roomId, track } = obj;
		const room = findRoomById(roomId);
		if (room) {
			if (Object.keys(room.currentlyPlaying).length === 0) {
				room.currentlyPlaying = track;
				io.in(room.id).emit('addedFirstTrack', track);
			}
			else {
				room.queue.push(track);
				room.queue.sort((a, b) => b.votes - a.votes);
				io.in(room.id).emit("addedTrackToQueue", room.queue);
			}
		}
	});

	socket.on('playNextTrack', (room) => {
		const { id } = room;
		const roomToPlayNextTrack = findRoomById(id);
		let nextTrack = {};
		if (roomToPlayNextTrack.queue.length > 0) {
			nextTrack = roomToPlayNextTrack.queue.shift();
		}
		roomToPlayNextTrack.currentlyPlaying = nextTrack;
		io.in(room.id).emit("playingNextTrack", {track: nextTrack, queue: roomToPlayNextTrack.queue})
	});

	socket.on('vote', (room) => {
		const { id, track, user } = room;
		const roomToVote = findRoomById(id);
		const trackToVote = roomToVote.queue.find(t => t.uri === track.uri);
		if (!(user.id in trackToVote.usersVoted)) {
			trackToVote.votes += 1;
			roomToVote.queue.sort((a, b) => b.votes - a.votes);
			if (user.images > 0) {
				trackToVote.usersVoted[user.id] = {
					name: user.name,
					image: user.images[0],
				};
			} else {
				trackToVote.usersVoted[user.id] = {
					name: user.name,
					image: DEFAULT_PROFILE_IMAGE,
				}
			}
		}
		io.in(room.id).emit('vote', roomToVote.queue);
	});

	socket.on('startCountdownForNextTrack', (room) => {
		io.in(room.id).emit('startCountdownForNextTrack');
	});

	socket.on('disconnect', () => {
		socket.disconnect();
		console.log(`User disconnected with ID: ${socket.id}`);
	});
});

///////////////// GET OPERATIONS /////////////////
app.get("/rooms", (req, res) => {
	res.json(rooms);
});

app.get('/queue/:id', (req, res) => {
	const { id } = req.params;
	const room = findRoomById(id);
	res.json(room.queue);
});