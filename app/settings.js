let settings;

try {
    settings = require('../settings.json');
} catch (e) {
    settings = {};
}

module.exports = Object.assign({
    host: 'https://cowchat.herokuapp.com',
    timeout: 3000,
}, settings);
