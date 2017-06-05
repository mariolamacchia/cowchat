const fs = require('fs');
const join = require('path').join;
const help = require('./help');
const settings = require('../settings');

module.exports = function(argv, cb) {
  const command = argv._[1];
  switch (command) {
    case 'set':
      settings[argv._[2]] = argv._[3];
      console.log(settings, JSON.stringify(settings));
      return fs.writeFile(
        join(__dirname, '../../settings.json'),
        JSON.stringify(settings),
        (err) => cb(err)
      );
    case 'get':
      return cb(null, settings[argv._[2]]);
    default:
      return help(argv, cb);
  }
};
