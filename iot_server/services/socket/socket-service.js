const socketIO = require('socket.io');
const io = socketIO();

const socketService = {};
socketService.io = io;
socketService.listeners = {};

const channels = {
  STATE_CHANGE: 'state_change',
};

io.on('connection', function(socket) {
  console.log('A device has connected');
  Object.keys(socketService.listeners).forEach((channel) => {
    const callback = socketService.listeners[channel];
    socket.on(channel, callback);
  });
});

socketService.addListener = function(channel, callback) {
  socketService.listeners[channel] = callback;
};

socketService.removeListener = function(channel) {
  delete socketService.listeners[channel];
};

socketService.clearListeners = function() {
  socketService.listeners = {};
};

socketService.sendNotification = function(channel, message) {
  io.emit(channel, message);
};

socketService.sendStateChange = function(mesaId, newState) {
  io.emit(channels.STATE_CHANGE, {
    mesaId: mesaId,
    newState: newState,
  });
};

module.exports = socketService;
