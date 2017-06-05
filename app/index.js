const argv = require('optimist').argv;
let command = argv._[0] || 'start';
const availableCommands = ['help', 'send', 'settings', 'signup', 'start', 'ping', 'user'];

if (!availableCommands.includes(command)) {
  command = 'help';
}

require(`./commands/${command}`)(argv, (err, data) => {
  if (err) console.error(err);
  console.log(data);
  process.exit(err ? 1 : 0);
});
