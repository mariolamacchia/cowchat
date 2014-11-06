var socket = require('./socket'),
    settings = require('./settings');

module.exports = function(to, message, callback) {
    var me = settings.get('me');
    if (!me.session) return console.log('Not Logged');

    socket.send('message', {
        me: me,
        to: to,
        message: message,
    }, function(err) {
        if (err) return callback(err);
        return callback();
    });
}
