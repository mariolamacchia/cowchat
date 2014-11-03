var argv = require('optimist').argv;

var command = argv._[0];

if (command === 'start') {
  require('./daemon')(argv);
} else if (command === 'send') {
  require('./send')(argv, function(err) {
    if (err)
      console.log(err);
    else console.log('Sent');
    process.exit();
  });
} else if (command === 'signup') {
  require('./signup')(argv, function(err, data) {
    if (err)
      console.log(err);
    else
      console.log('Signed');
    process.exit();
  });
} else if (command === 'user') {
  require('./user')(argv, function(err, data) {
    if (err)
      console.log(err);
    else console.log(data);
    process.exit();
  });
} else if (command === 'settings') {
  var settings = require('./settings');
  if (argv._.length == 2)
    console.log(settings.get(argv._[1]));
  else settings.set(argv._[1], argv._[2]);
}
