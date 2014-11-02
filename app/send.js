var io = require('socket.io-client'),
    settings = require('./settings'),
    messageId = require('./messageId'),
    socket = io(settings.get('host'));

module.exports = function(argv) {
  var session = settings.get('session');
  if (!session) {
    console.log('You must log in');
    process.exit();
  }

  var id = messageId();

  socket.on('connect', function() {
    socket.on(id + ':error', function(data) {
      console.log(data);
      process.exit();
    });
    socket.on(id + ':success', function(data) {
      console.log('Sent');
      process.exit();
    });
    socket.emit('message',
      {
        id: id,
        content: {
          me: session,
          to: argv._[1],
          message: argv._[2]
        }
      }
    );
  });
}
