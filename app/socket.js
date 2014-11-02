var io = require('socket.io-client'),
    settings = require('./settings'),
    messageId = require('./messageId'),
    socket = io(settings.get('host'));

module.exports = {
  socket: socket,
  send: function(key, value, callback) {
    var id = messageId();
    socket.on(id + ':success', function(data) {callback(null, data);});
    socket.on(id + ':error', function(err) {callback(err);});
    socket.emit(key, {id: id, content: value});
  }
};
