var express = require("express");
var app = express();

//setting up server
var server = app.listen("3499");

//socket io
var io = require("socket.io").listen(server);

app.use(express.static("public"));

io.on("connection",function(socket){
	socket.on('chat',function(data){
		io.sockets.emit('chats',data);
	})
});