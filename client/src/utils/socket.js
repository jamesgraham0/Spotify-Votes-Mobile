import io from 'socket.io-client';
// Initialize Socket IO: change to 'https://<myserver.onheroku.com>' in prod.
export const socket = io('http://192.168.1.67:3000', {
  transports: ['websocket'],
  jsonp: false
});
