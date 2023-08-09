import io from 'socket.io-client';
export const socket = io('http://10.0.0.22:4000', {
  transports: ['websocket'],
  jsonp: false
});