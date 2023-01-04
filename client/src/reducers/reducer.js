import { combineReducers, createSlice } from '@reduxjs/toolkit';
// import { REQUEST_STATE } from '../redux/utils';

const initialState = {
    rooms: [{"currentlyPlaying": {"artistName": "", "image": "", "trackName": "", "trackUri": ""}, "deviceId": "b166d1276412b883e0b37b6ef1112e656a5dc127", "hostId": "t1wyfo4650rthc8s0y3bmfhm8", "id": "oaijwefojewfewfaiejfojawef", "name": "1", "password": "1", "queue": [], "users": []}],
    // addRoomState: REQUEST_STATE.IDLE,
    // deleteRoomState: REQUEST_STATE.IDLE,
    // currentlyPlaying: "PLAYING",
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
            const { id } = action.payload;
            const room = state.rooms.find(room => room.id === id);
            if (room) {
                console.log(room);
            }
        },
    },
});

const reducer = combineReducers({
    rooms: roomsSlice.reducer,
});

export const { createRoom, deleteRoom, pushQueue, popQueue } = roomsSlice.actions;
export default reducer; // this goes to redux/store.js