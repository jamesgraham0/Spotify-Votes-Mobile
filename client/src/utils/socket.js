import io from 'socket.io-client';
// Change this url to the expo go url exp://192.168.1.75:19000
export const socket = io('http://192.168.1.75:4000', {
  transports: ['websocket'],
  jsonp: false
});