'use strict';
const net = require('net');
const EE = require('events');
const Client = require('../module/client.js');
const PORT = process.env.PORT || 3000;
const pool =[];
const server = net.createServer();
const ee = new EE();

ee.on('\\nick', function(client, string){
  client.nickname = string;
});

ee.on('\\all', function(client, string){
  pool.forEach( user => {
    user.sockeet.write(`${client.nickname}: `, string);
  });
});

ee.on('default', function(client){
  client.socket.write('not a command');
});

server.on('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);
  socket.on('data', function(data){
    const command = data.toString.split(' ').shift().trim();
    if(command.startsWith('\\')) {
      ee.emit(command, client, data.toString.split(' ').slice(1).join(' '));
    }
    ee.emit('default', client, data.toString());
  });
});

server.listen(PORT, function(){
  console.log('server running on PORT: ', PORT);
});
