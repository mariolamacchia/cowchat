var socket = require('socket.io-client')('http://localhost:3000');

var date = Date.now();

module.exports = function(content) {
  socket.on('connect', function() {
    socket.on('message', function(data) {
      if (data.date == date) process.exit();
    });
    socket.emit('message', {date: date, content: content});
  });
}
