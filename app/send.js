var socket = require('./socket'),
    settings = require('./settings');

module.exports = function(argv, callback) {
  var session = settings.get('session');
  if (!session)
    return callback('Not logged');

  socket.send('message', {
    me: settings.get('session'),
    to: argv._[1],
    message: argv._[2],
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
}
