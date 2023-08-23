import io from 'socket.io-client';
import Constants from './constants';

export const socket = io(`http://${Constants.EXPO_IP}:${Constants.PORT}`, {
  transports: ['websocket'],
  jsonp: false
});