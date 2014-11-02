var socket = require('./socket'),
    settings = require('./settings'),
    exec = require('child_process').exec;

module.exports = function(argv, callback) {
  var key, content;
  if (argv._[1]) {
    content = argv._[1];
    key = 'user';
  } else {
    content = settings.get('session');
    key = 'me';
  }

  socket.send(key, content, function(err, data) {
    if (err)
      return callback(err)
    exec('cowsay -f ' + data.cow + ' ' + data.username,
      function(error, stdout, stderr) {
        return callback(null, stdout);
      }
    );
  });
}
