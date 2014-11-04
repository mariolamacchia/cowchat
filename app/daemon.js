var cowsay = require('cowsay'),
    socket = require('./socket'),
    settings = require('./settings'),
    login = require('./login');

module.exports = function(argv) {
    // Login
    login(argv, function(e) {
        console.log(e);
        if (e) {
            console.log(e);
            console.log('first');
            return process.exit();
        }

        console.log('\u001b[2J\u001b[0;0H');
        console.log('Logged');

        var alive = true;
        socket.socket.on('keep alive', function() {
            alive = true;
            socket.socket.emit('alive', settings.get('me'));
        });
        setInterval(function() {
            if (alive) return alive = false;
            console.log("Disconnected");
            process.exit();
        }, 10000);

        var session = settings.get('session');
        socket.socket.on('message', function(message) {
            socket.socket.emit(message.id + ':received');
            console.log('message from ' + message.from.username);
            // If cow is present on this pc, use it, otherwise use default
            // I will use this method waiting to cowsay module to be updated
            var fs = require('fs');
            fs.readdir(__dirname + '/../node_modules/cowsay/cows',
                       function(e, d) {
                var cow = message.from.cow;

                if (d.indexOf(cow + '.cow') == -1) cow = 'default';

                console.log(cowsay.say({
                    f: cow,
                    text: message.message
                }));
            });
        });
    });
}
