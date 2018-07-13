import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

var socketHandler = {
  socket: socket,
  listeners: {},

  sendNotification: function(channel, message) {
    this.socket.emit(channel, message);
  }
}

module.exports = socketHandler;