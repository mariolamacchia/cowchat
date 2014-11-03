var cowsay = require('cowsay'),
    socket = require('./socket'),
    settings = require('./settings');

module.exports = function(argv, callback) {
  var key, content;
  if (argv._[1]) {
    content = argv._[1];
  } else {
    content = settings.get('me').username;
  }

  socket.send('user', content, function(err, data) {
    if (err) return callback(err);
    
    // If cow is present on this pc, use it, otherwise use default
    // I will use this method waiting to cowsay module to be updated
    var fs = require('fs');
    fs.readdir(__dirname + '/../node_modules/cowsay/cows', function(e, d) {
      var cow = data.cow;

      if (d.indexOf(cow + '.cow') == -1) cow = 'default';

      callback(null, cowsay.think({
        f: cow,
        text: 'I am ' + data.username
      }));
    });
  });
}
