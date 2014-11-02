var socket = require('socket.io-client')('http://localhost:3000');
var exec = require('child_process').exec;

module.exports = function() {
  socket.on('connect', function(){
    socket.on('message', function(data){
      exec('cowsay ' + data.content, function(error, stdout, stderr) {
        console.log(stdout);
      });
    });
    socket.on('disconnect', function(){});
  });
};
