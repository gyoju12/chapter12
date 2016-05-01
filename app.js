var socketio = require("socket.io");
var express = require("express");
var http = require("http");
var fs = require("fs");

var seats = [
				[1,1,0,1,1,0,0,0,0,0,1,1,0,1,1],
				[1,1,0,1,1,1,1,1,1,1,1,1,0,1,1],
				[1,1,0,1,1,1,1,1,1,1,1,1,0,1,1]
			];

var app = express();

// app.use(app.router);

app.get("/", function(req, res, next){
	fs.readFile("HTMLPage.html", function(error, data){
		res.send(data.toString());
	});
});

app.get("/seats", function(req, res, next){
	res.send(seats);
});

var server = http.createServer(app);
server.listen(3000, function(){
	console.log("Server Running at http://127.0.0.1:3000");
});

var io = socketio.listen(server);
io.sockets.on("connection", function(socket){
	socket.on("reserve", function(data){
		var seat = seats[data.y][data.x];
		if(seat == 1){
			seats[data.y][data.x] = 2;
		}else if(seat == 2){
			seats[data.y][data.x] = 1;
		}
		io.sockets.emit("reserve", data);
	});
});
