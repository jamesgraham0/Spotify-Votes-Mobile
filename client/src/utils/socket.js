import io from 'socket.io-client';
import Constants from './constants';

export const socket = io(`http://${Constants.EXPO_IP}:${Constants.BACKEND_PORT}`, {
  transports: ['websocket'],
  jsonp: false
});

socket.on("connect", () => {
  console.log(`User connected with socket id: ${socket.id}`)
});