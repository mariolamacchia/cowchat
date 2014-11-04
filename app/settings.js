var nconf = require('nconf');

nconf
    .file(__dirname + '/config.json')
    .defaults({host: 'https://cowchat.herokuapp.com'});

module.exports = {
    get: function(k) {
        return nconf.get(k);
    },
    set: function(k, v) {
        nconf.set(k, v);
        nconf.save();
    }
}
