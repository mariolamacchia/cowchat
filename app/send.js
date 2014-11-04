var socket = require('./socket'),
    settings = require('./settings');

module.exports = function(argv, callback) {
    var me = settings.get('me');
    if (!me.session) return console.log('Not Logged');

    socket.send('message', {
        me: me,
        to: argv._[1],
        message: argv._[2],
    }, function(err) {
        if (err) return callback(err);
        return callback();
    });
}
