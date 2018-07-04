var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A device has connected');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

socketApi.sendNotification = function() {
  io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;