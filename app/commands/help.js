const fs = require('fs');
const join = require('path').join;

module.exports = function(argv, cb) {
  const help = fs.readFile(join(__dirname, '../help/index.md'), 'utf-8', cb);
}
