const io = require('socket.io-client');
const settings = require('./settings');
module.exports = io(settings.host);
