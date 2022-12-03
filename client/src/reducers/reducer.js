import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../redux/utils';


const initialState = {
    rooms: [],
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
        },
        deleteRoom(state, action) {
            state.rooms = state.rooms.filter(room => room.id !== action.payload.id);
        },
    },
});

const individualRoomSlice = createSlice({
    name: 'individualRoom',
    initialState: {
        'name': '',
        'password': '',
        'id': '',
        'deviceId': '',
        'users': [],
        'currentTrack': {},
        'queue': [],
    },
    reducers: {
        pushQueue(state, action) {
            state.queue.push(action.payload);
        },
        popQueue(state, action) {
            state.queue.shift();
        }
    },
});

const reducer = combineReducers({
    rooms: roomsSlice.reducer,
    individualRoom: individualRoomSlice.reducer,
});

export default reducer; // this goes to redux/store.js