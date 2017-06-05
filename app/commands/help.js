const fs = require('fs');
const join = require('path').join;

module.exports = function(argv, cb) {
  console.log('Invalid command');
  const help = fs.readFile(join(__dirname, '../help/index.md'), 'utf-8', cb);
}
