import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../redux/utils';


const initialState = {
    rooms: [{"currentlyPlaying": {"artistName": "", "image": "", "trackName": "", "trackUri": ""}, "deviceId": "b166d1276412b883e0b37b6ef1112e656a5dc127", "hostId": "t1wyfo4650rthc8s0y3bmfhm8", "id": "oaijwefojewfewfaiejfojawef", "name": "1", "password": "1", "queue": [], "users": []}],
    addRoomState: REQUEST_STATE.IDLE,
    deleteRoomState: REQUEST_STATE.IDLE,
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
            room.queue.push(track);
        },
        popQueue(state, action) {
            state.queue.shift();
        },
    },
});

// const individualRoomSlice = createSlice({
//     name: 'individualRoom',
//     initialState: {
//         'name': '',
//         'password': '',
//         'id': '',
//         'hostId': '',
//         'deviceId': '',
//         'users': [],
//         'currentlyPlaying': {},
//         'queue': [],
//     },
//     reducers: {
//         pushQueue(state, action) {
//             state.queue.push(action.payload);
//             console.log("queue after push", state.queue);
//         },
//         popQueue(state, action) {
//             state.queue.shift();
//         }
//     },
// });

const reducer = combineReducers({
    rooms: roomsSlice.reducer,
    // individualRoom: individualRoomSlice.reducer,
});

export const { createRoom, deleteRoom, pushQueue, popQueue } = roomsSlice.actions;
// export const { pushQueue, popQueue } = individualRoomSlice.actions;
export default reducer; // this goes to redux/store.js