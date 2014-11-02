var io = require('socket.io-client'),
    exec = require('child_process').exec,
    settings = require('./settings'),
    login = require('./login'),
    logout = require('./logout');

module.exports = function(argv) {
  
  // Login
  login(argv, function(e) {
    if (e) {
      console.log(e);
      process.exit();
    }
    console.log('\u001b[2J\u001b[0;0H');
    console.log('Logged');

    // Listen on stdin for "logout"
    process.stdin.on('data', function(input) {
      input = input.toString().trim();
      if (input == 'logout') {
        logout(function(e) {
          if (e)
            console.log(e);
          process.exit();
        });
      }
    });

    var session = settings.get('session');
    console.log(session);
    var socket = io.connect(settings.get('host'));
    console.log(socket);
    socket.on('connect', function() {
      socket.on(session, function(message) {
        console.log('Message from ' + message.from.username);
        exec('cowsay -f ' + message.from.cow + ' ' + message.content,
          function(err, stdout, stderr) {
            console.log(stdout);
          }
        );
        socket.emit('message received', message.id);
      });
      console.log('asdasd');
    });
  });
}
