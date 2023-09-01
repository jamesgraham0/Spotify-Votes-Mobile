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
		"code": "00000",
		"queue": [], 
		"users": []
	},
]

let roomCodeToIdMap = {};

const findRoomById = (roomId) => {
	return rooms.find(room => room.id === roomId)
};
 
const generateRandomString = () => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
};

///////////////// SOCKET OPERATIONS /////////////////
io.on("connection", (socket) => {
	console.log(`User connected with socket id: ${socket.id}`)

	socket.on('createRoom', (room) => {
		const { id } = room;
		const code = generateRandomString();
		roomCodeToIdMap[code] = id;
		room["code"] = code;
		rooms.unshift(room);
		socket.broadcast.emit('createRoom', rooms);
		socket.join(room.id);
	});

	socket.on('joinRoom', (obj) => {
		const { user, room } = obj;
		const roomToJoin = findRoomById(room.id);
		roomToJoin.users.push(user);
		io.in(room.id).emit('newUserJoinedRoom', roomToJoin);
		socket.emit('joinRoom', roomToJoin);
		socket.join(room.id);
	});

	socket.on('deleteRoom', (room) => {
		let roomIndex = rooms.findIndex(rm => rm.id === room.id)
		if (roomIndex >= 0) {
			rooms.splice(roomIndex, 1);
		}
		delete roomCodeToIdMap[room.code];
		io.in(room.id).emit('kickUsersFromRoom');
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
		const { track, roomId, user } = room;
		const roomToVote = findRoomById(roomId);
		const trackToVote = roomToVote.queue.find(t => t.uri === track.uri);
		if (!trackToVote.usersVoted.some(u => u.id === user.id)) {
			trackToVote.votes += 1;
			trackToVote.usersVoted.push(user);
			roomToVote.queue.sort((a, b) => b.votes - a.votes);
		}
		io.in(roomId).emit('vote', roomToVote.queue);
	});
	

	socket.on('startCountdownForNextTrack', (room) => {
		io.in(room.id).emit('startCountdownForNextTrack');
	});

	socket.on('checkRoomCode', (guessedCode, callback) => {
		if (roomCodeToIdMap.hasOwnProperty(guessedCode)) {
			const roomId = roomCodeToIdMap[guessedCode];
			const room = findRoomById(roomId);
			callback({ room: room, isCorrectCode: true });
		} else {
			callback({ room: {}, isCorrectCode: false });
		}
	});

	socket.on('leaveRoom', (obj) => {
    const { roomId, user } = obj;
    const roomToLeave = findRoomById(roomId);
    const userIndex = roomToLeave.users.findIndex(u => u.id === user.id);    
    if (userIndex >= 0) {
        roomToLeave.users.splice(userIndex, 1);
    }
    io.in(roomId).emit('leaveRoom', roomToLeave);
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

app.get('/code/:id', (req, res) => {
	const { id } = req.params;
	const room = findRoomById(id);
	res.json(room.code);
});