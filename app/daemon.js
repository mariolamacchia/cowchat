var exec = require('child_process').exec,
    socket = require('./socket'),
    settings = require('./settings'),
    login = require('./login'),
    logout = require('./logout');

module.exports = function(argv) {
  // Login
  login(argv, function(e) {
    console.log(e);
    if (e) {
      console.log(e);
      console.log('first');
      return process.exit();
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
          console.log('second');
          process.exit();
        });
      }
    });

    var session = settings.get('session');
    socket.socket.on('message', function(message) {
      console.log('message from ' + message.from);
      console.log(message.message);
    });
  });
}
