/**
 * This reducer is only responsible for the rooms state. It maintains a list of rooms and has the ability to:
 * 1. Create a room
 * 2. Delete a room
 * 3. Add a track to a room's queue
 * 4. Remove a track from a room's queue
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [{"currentlyPlaying": {"title": "", "uri": "", "smallImage": "", "largeImage": "", "duration": 0}, "deviceId": "b166d1276412b883e0b37b6ef1112e656a5dc127", "hostId": "t1wyfo4650rthc8s0y3bmfhm8", "id": "oaijwefojewfewfaiejfojawef", "name": "1", "password": "1", "queue": [], "users": []}],
    error: null,
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: initialState,
    reducers: {
        createRoom(state, action) {
            state.rooms.push(action.payload);
            console.log(`Created room: ${action.payload.name}`);
        },
        deleteRoom(state, action) {
            state.rooms = state.rooms.filter(room => room.id !== action.payload.id);
        },
        pushQueue(state, action) {
            const { track, roomId } = action.payload;
            const room = state.rooms.find(room => room.id === roomId);
            let alreadyInQueue = false;
            room.queue.map((t) => {
                if (t.uri === track.uri) {
                    alert("Track already in queue");
                    alreadyInQueue = true;
                }
            });
            if (!alreadyInQueue) {
                if (Object.keys(room.currentlyPlaying).length === 0) {
                    room.currentlyPlaying = track;
                    alert(`${track.title} is now playing`);
                }
                else {
                    alert(`${track.title} added to queue`);
                    room.queue.push(track);
                }
            }
        },
        popQueue(state, action) {
            const id = action.payload;
            const room = state.rooms.find(room => room.id === id);
            if (room) {
                room.queue.shift();
            }
            else {
                console.log("room not found when trying to pop queue");
            }
        },
        setCurrentlyPlaying(state, action) {
            const { id, nextTrack } = action.payload;
            const room = state.rooms.find(room => room.id === id);
            if (room) {
                room.currentlyPlaying = nextTrack;
            }
        },
    },
});

export const { createRoom, deleteRoom, pushQueue, popQueue, setCurrentlyPlaying } = roomsSlice.actions;
export default roomsSlice.reducer;