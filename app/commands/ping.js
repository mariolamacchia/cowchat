var socket = require('../socket');
var settings = require('../settings');

module.exports = function(argv, cb) {
    var t = setTimeout(() => cb(new Error('The server did not reply')), settings.timeout);
    socket.on('connect', function() {
        clearTimeout(t);
        cb(null, 'Pong!');
    })
}
