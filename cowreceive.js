var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
  socket.on('message', function(data){
    console.log(data.content);
  });
  socket.on('disconnect', function(){});
});
