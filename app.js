var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

var seats = [
	[1,1,1,1,0,0,0,1,1,1],
	[1,1,1,1,1,1,1,1,0,1],
	[1,1,1,1,1,1,1,1,0,1],
	[1,1,1,1,1,1,1,1,0,1]
];

var app = express();

app.use(app.router);

app.get('/', function(request, response, next){
	fs.readFile('HTMLPage.html', function(error, data){
		response.send(data.toString());
	});
});

app.get('/seats', function(request, response, next){
	response.send(seats);
});

var server = http.createServer(app);
server.listen(3000, function(){
	console.log('Server Running');
});

var io = socketio.listen(server);
io.sockets.on('connection', function (socket){
	socket.on('reserve', function(data){
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve', data);
	});
	socket.on('cancel', function(data){
		seats[data.y][data.x] = 1;
		io.sockets.emit('cancel', data);
	});
});