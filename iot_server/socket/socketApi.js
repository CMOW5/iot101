var socket_io = require('socket.io');
var io = socket_io();

var socketApi = {};
socketApi.io = io;
socketApi.listeners = {};

io.on('connection', function(socket){
    console.log('A device has connected');
    for (let channel in socketApi.listeners) {
      const callback = socketApi.listeners[channel];
      socket.on(channel, callback);
    }
});

socketApi.addListener = function(channel, callback) {
  socketApi.listeners[channel] = callback;
}

socketApi.removeListener = function(channel) {
  delete socketApi.listeners[channel];
}

socketApi.clearListeners = function() {
  socketApi.listeners = {};
}

socketApi.sendNotification = function(channel, message) {
  io.emit(channel, message);
  // io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;