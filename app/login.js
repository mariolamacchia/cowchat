var io = require('socket.io-client'),
    settings = require('./settings'),
    messageId = require('./messageId');

var username, password;

process.stdin.on('data', function(input) {
  input = input.toString().trim();
  if (!username) {
    if (validateInput(input)) {
      username = input;
      console.log('Insert password');
    } else {
      console.log('Invalid username!');
    }
  } else if (!password) {
    if (validateInput(input)) {
      password = input;
      login();
    } else {
      console.log('Invalid password!');
    }
  }
});

function validateInput(input) {
  return !!input.match(/^[a-z0-9A-Z]{6,24}$/);
}

function login() {
  var id = messageId();
  var socket = io(settings.get('host'));
  socket.on('connect', function() {
    socket.on(id + ':success', function(session) {
      settings.set('session', session);
      console.log('Logged');
      process.exit();
    });
    socket.on(id + ':error', function(error) {
      console.log(error);
      process.exit();
    });
    socket.emit('login',
      {
        id: id,
        content: {
          username: username,
          password: password
        }
      }
    );
  });
}

module.exports = function(argv) {
  username = argv._[1];
  password = argv._[2];
  if (username && password) {
    if (!validateInput(username))
      username = '';
    if (!validateInput(password))
      password = '';
  }
  if (!username)
    console.log('Insert username:');
  else if (username && password)
    login();
}
