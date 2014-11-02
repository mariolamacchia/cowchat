var io = require('socket.io-client'),
    settings = require('./settings'),
    messageId = require('./messageId'),
    socket = io(settings.get('host'));

module.exports = function(callback) {
  var session = settings.get('session');
  if (!session) {
    callback('You are not logged');
  }

  var id = messageId();

  socket.on('connect', function() {
    socket.on(id + ':success', function() {
      settings.set('session', '');
      callback();
    });
    socket.on(id + ':error', function(e) {
      console.log(e);
      settings.set('session', '');
      callback(e);
    });
    socket.emit('logout', {id: id, content: settings.get('session')});
  });
}
