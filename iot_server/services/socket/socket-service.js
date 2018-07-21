var socket_io = require('socket.io');
var io = socket_io();

var socketService = {};
socketService.io = io;
socketService.listeners = {};

io.on('connection', function(socket){
    console.log('A device has connected');
    for (let channel in socketService.listeners) {
      const callback = socketService.listeners[channel];
      socket.on(channel, callback);
    }
});

socketService.addListener = function(channel, callback) {
  socketService.listeners[channel] = callback;
}

socketService.removeListener = function(channel) {
  delete socketService.listeners[channel];
}

socketService.clearListeners = function() {
  socketService.listeners = {};
}

socketService.sendNotification = function(channel, message) {
  io.emit(channel, message);
}

module.exports = socketService;