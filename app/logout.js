var io = require('socket.io-client'),
    settings = require('./settings'),
    messageId = require('./messageId'),
    socket = io(settings.get('host'));

module.exports = function() {
  var session = settings.get('session');
  if (!session) {
    console.log("You are not logged");
    process.exit();
  }

  var id = messageId();

  socket.on('connect', function() {
    socket.on(id + ':success', function() {
      console.log('Logged out');
      settings.set('session', '');
      process.exit();
    });
    socket.on(id + ':error', function(e) {
      console.log(e);
      settings.set('session', '');
      process.exit();
    });
    socket.emit('logout', {id: id, content: settings.get('session')});
  });
}
