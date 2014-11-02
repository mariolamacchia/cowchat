var argv = require('optimist').argv,
    send = require('./send'),
    receive = require('./daemon'),
    login = require('./login'),
    logout = require('./logout'),
    signup = require('./signup'),
    settings = require('./settings');

var command = argv._[0];

if (command === 'start') {
  receive(argv);
} else if (command === 'send') {
  send(argv);
} else if (command === 'signup') {
  signup(argv);
} else if (command === 'login') {
  login(argv);
} else if (command === 'logout') {
  logout(argv);
} else if (command === 'settings') {
  settings(argv);
}
