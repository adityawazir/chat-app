var express = require("express");
var app = express();

var server = app.listen(3499);
var io = require("socket.io").listen(server);

app.get("/",function(req,res){
	res.sendFile("/home/itachi/socketproject/chatapp.html");
});

io.on("connection",function(socket){
	socket.on("chat",function(data){
		console.log(data);
	});
});