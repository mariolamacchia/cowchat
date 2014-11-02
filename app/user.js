var io = require('socket.io-client'),
    exec = require('child_process').exec,
    settings = require('./settings'),
    messageId = require('./messageId'),
    socket = io(settings.get('host'));

module.exports = function(argv) {
  var id = messageId();
  socket.on('connect', function() {
    socket.on(id + ':error', function(e) {
      console.log(e);
      process.exit();
    });
    socket.on(id + ':success', function(d) {
      exec('cowsay -f ' + d.cow + ' ' + d.username,
        function(error, stdout, stderr) {
          console.log(stdout);
          process.exit();
        }
      );
    });
    if (argv._[1])
      socket.emit('user', {id: id, content: argv._[1]});
    else socket.emit('me', {id: id, content: settings.get('session')});
  });
}
