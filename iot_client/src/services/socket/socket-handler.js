import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

let socketHandler = {
  socket: socket,
  listeners: {},

  sendNotification: function(channel, message) {
    this.socket.emit(channel, message);
  },
};

export default socketHandler;

