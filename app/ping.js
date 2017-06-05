var socket = require('./socket');
var settings = require('./settings');

module.exports = function(cb) {
    var t = setTimeout(cb.bind(null, new Error('The server did not reply')), settings.get('timeout'));
    socket.socket.on('connect', function() {
        clearTimeout(t);
        cb();
    })
}
