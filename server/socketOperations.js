import { roomOperations } from "./roomOperations.js";

const { findRoomById, generateRandomString } = roomOperations;

let roomCodeToIdMap = {};

export default function socketOperations(io) {
  io.on("connection", (socket) => {
    console.log(`User connected with socket id: ${socket.id}`);
    
    socket.on("createRoom", (room) => {
      const { id } = room;
      const code = generateRandomString();
      roomCodeToIdMap[code] = id;
      room["code"] = code;
      roomOperations.addRoom(room);
      socket.broadcast.emit("createRoom", roomOperations.getRooms());
      socket.join(room.id);
    });

    socket.on("joinRoom", (obj) => {
      const { user, room } = obj;
      const roomToJoin = findRoomById(room.id);
      roomToJoin.users.push(user);
      io.in(room.id).emit("newUserJoinedRoom", roomToJoin);
      socket.emit("joinRoom", roomToJoin);
      socket.join(room.id);
    });

    socket.on("deleteRoom", (room) => {
      let roomIndex = roomOperations
        .getRooms()
        .findIndex((rm) => rm.id === room.id);
      if (roomIndex >= 0) {
        roomOperations.removeRoom(roomIndex);
      }
      delete roomCodeToIdMap[room.code];
      io.in(room.id).emit("kickUsersFromRoom");
      socket.broadcast.emit("deleteRoom", roomOperations.getRooms());
    });

    socket.on("addTrack", (obj) => {
      const { roomId, track } = obj;
      const room = findRoomById(roomId);
      if (room) {
        if (Object.keys(room.currentlyPlaying).length === 0) {
          room.currentlyPlaying = track;
          io.in(room.id).emit("addedFirstTrack", track);
        } else {
          room.queue.push(track);
          room.queue.sort((a, b) => b.votes - a.votes);
          io.in(room.id).emit("addedTrackToQueue", room.queue);
        }
      }
    });

    socket.on("playNextTrack", (room) => {
      const { id } = room;
      const roomToPlayNextTrack = findRoomById(id);
      let nextTrack = {};
      if (roomToPlayNextTrack.queue.length > 0) {
        nextTrack = roomToPlayNextTrack.queue.shift();
      }
      console.log("play next track:", nextTrack);
      roomToPlayNextTrack.currentlyPlaying = nextTrack;
      io.in(room.id).emit("playingNextTrack", {
        nextTrack: nextTrack,
        queue: roomToPlayNextTrack.queue,
      });
    });

    socket.on("vote", (room) => {
      const { track, roomId, user } = room;
      const roomToVote = findRoomById(roomId);
      const trackToVote = roomToVote.queue.find((t) => t.uri === track.uri);
      if (!trackToVote.usersVoted.some((u) => u.id === user.id)) {
        trackToVote.votes += 1;
        trackToVote.usersVoted.push(user);
        roomToVote.queue.sort((a, b) => b.votes - a.votes);
      }
      io.in(roomId).emit("vote", roomToVote.queue);
    });

    socket.on("startCountdownForNextTrack", (room) => {
      io.in(room.id).emit("startCountdownForNextTrack");
    });

    socket.on("checkRoomCode", (guessedCode, callback) => {
      if (guessedCode in roomCodeToIdMap) {
        const roomId = roomCodeToIdMap[guessedCode];
        const room = findRoomById(roomId);
        // if the host of the room is the one trying to join, don't let them
        if (room.hostId === socket.id) {
          callback({ room: {}, isCorrectCode: false });
          return;
        }
        callback({ room: room, isCorrectCode: true });
      } else {
        callback({ room: {}, isCorrectCode: false });
      }
    });

    socket.on("leaveRoom", (obj) => {
      const { roomId, user } = obj;
      const roomToLeave = findRoomById(roomId);
      const userIndex = roomToLeave.users.findIndex((u) => u.id === user.id);
      if (userIndex >= 0) {
        roomToLeave.users.splice(userIndex, 1);
      }
      io.in(roomId).emit("leaveRoom", roomToLeave);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log(`User disconnected with ID: ${socket.id}`);
    });
  });
}
