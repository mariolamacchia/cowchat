var socket = require('./socket'),
    settings = require('./settings');

var username, password, callback;

process.stdin.on('data', function(input) {
    input = input.toString().trim();
    if (!username) {
        if (validateInput(input)) {
            username = input;
            console.log('Insert password');
        } else {
            console.log('Invalid username!');
        }
    } else if (!password) {
        if (validateInput(input)) {
            password = input;
            login();
        } else {
            console.log('Invalid password!');
        }
    }
});

function validateInput(input) {
    return !!input.match(/^[a-z0-9A-Z]{6,24}$/);
}

function login() {
    socket.send('login', {
        username: username,
        password: password
    }, function(err, data) {
        if (err) return callback(err);
        settings.set('me', data);
        return callback(null, data);
    });
}

module.exports = function(argv, cb) {
    callback = cb;
    username = argv._[1];
    password = argv._[2];
    if (username && password) {
        if (!validateInput(username)) username = '';
        if (!validateInput(password)) password = '';
    }
    if (!username) console.log('Insert username:');
    else if (!password) console.log('Insert password:');
    else if (username && password) login();
}
