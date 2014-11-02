var send = require('./send');
var receive = require('./daemon');

var command = process.argv[2];

if (command === 'start') {
  receive();
} else if (command === 'send') {
  send(process.argv[3]);
}
