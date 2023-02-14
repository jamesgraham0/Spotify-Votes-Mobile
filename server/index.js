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
		room.queue.push(track);
		socket.emit("addedTrack", room.queue);
	});

  socket.on('disconnect', () => {
	socket.disconnect();
	console.log('user ' + socket.id + ' disconnected');
  })
});

app.get("/rooms", (req, res) => {
	res.json(rooms);
});

server.listen(PORT, () => {
  console.log('server started and listening on port ' + PORT);
});