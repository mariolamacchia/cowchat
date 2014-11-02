var io = require('socket.io-client'),
    settings = require('./settings'),
    messageId = require('./messageId');

function humanTest() {
  var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
      'seven', 'eight', 'nine'],
      operations = [' * ', ' + '],
      n1 = Math.floor(Math.random() * 10),
      n2 = Math.floor(Math.random() * 10),
      o = Math.floor(Math.random() * 2);
  var text = numbers[n1] + operations[o] + numbers[n2];
  var result = o ? n1 + n2 : n1 * n2;
  return {
    text: text,
    result: result
  };
}

var username, password, password2, name, email, cow, human, errors = 0, test;

process.stdin.on('data', function(input) {
  input = input.toString().trim();
  if (!username) {
    if (validateInput(input)) {
      username = input;
      console.log('Insert name (optional):');
    } else {
      console.log('Invalid username!');
    }
  } else if (typeof name === 'undefined') {
    name = input;
    console.log('Insert email (optional):');
  } else if (typeof email === 'undefined') {
    email = input;
    console.log('Insert cow (default=default):');
  } else if (!cow) {
    if (!input)
      cow = 'default';
    else cow = input;
    console.log('Insert password:');
  } else if (!password) {
    if (validateInput(input)) {
      password = input;
      console.log('Again:');
    } else {
      console.log('Invalid password!');
    }
  } else if (!password2) {
    if (input != password) {
      console.log('Password does not match.');
      console.log('Insert password:');
      password = '';
    } else {
      password2 = input;
      test = humanTest();
      console.log(test.text);
    }
  } else if (!human) {
    if (input == test.result) {
      human = true;
      signup();
    } else {
      if (errors > 2)
        process.exit();
      errors ++;
      test = humanTest();
      console.log(test.text);
    }
  }
});

function validateInput(input) {
  return !!input.match(/^[a-z0-9A-Z]{6,24}$/);
}

function signup() {
  var id = messageId();
  socket = io(settings.get('host'));
  socket.on('connect', function() {
    socket.on(id + ':success', function(session) {
      settings.set('session', session);
      console.log('Signed and logged');
      process.exit();
    });
    socket.on(id + ':error', function(error) {
      console.log(error);
      process.exit();
    });
    socket.emit('signup',
      {
        id: id,
        content: {
          username: username,
          password: password,
          name: name,
          email: email,
          cow: cow
        }
      }
    );
  });
}

module.exports = function() {
  console.log('Insert username');
}
