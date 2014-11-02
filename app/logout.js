var socket = require('./socket'),
    settings = require('./settings');

module.exports = function(callback) {
  var session = settings.get('session');
  if (!session) {
    return callback('You are not logged');
  }

  var id = messageId();

  socket.send('logout', settings.get('session'), function(err, data) {
    if (err)
      return callback(err);
    return callback();
  });
}
