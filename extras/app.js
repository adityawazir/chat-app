var express = require('express');
var app=express();

var server = app.listen(3300);
var io = require('socket.io').listen(server);

app.get("/",function(req,res){
	res.sendfile("index.html");
});
var clients=0;
io.on('connection',function(socket){
	console.log("a user connected");
	clients++;
	// socket.send("message!!!");
	socket.emit('tester',{des:"hey it is a message from server side "});//created a server side custom emitter and sent it to client side using emit and on function
	socket.on('testserver',function(data){
		console.log(data.d);
	});

	//broadcasting
	socket.emit("broadcast",{desc:' hey!welcome! '});
	//broadcast.emit 
	socket.broadcast.emit("broadcast",{desc:clients+' client connected'})

	socket.on('disconnect',function()
	{
		console.log("user disconnected");
		clients--;
		socket.broadcast.emit("broadcast",{desc:clients+' clients connected'});
	});
});

//using different namr=espaces
// var nsp = io.of('/hello');
// nsp.on('connection',function(socket){
// 	nsp.emit('hi',{descr:'hello world!'});
// });
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res) {
//    res.sendfile('index.html');
// });

// //Whenever someone connects this gets executed
// io.on('connection', function(socket) {
//    console.log('A user connected');

//    //Whenever someone disconnects this piece of code executed
//    socket.on('disconnect', function () {
//       console.log('A user disconnected');
//    });
// });

// http.listen(3400, function() {
//    console.log('listening on *:3000');
// });

// <!DOCTYPE html>
// <html>
// <head>
// 	<title>socket</title>
// </head>
// <script src = "/socket.io/socket.io.js"></script>
// <script src = "chatapp.js"></script>
// <body>
// 	<h1>Hello</h1>

// 	<br>
// 	<div id="error"></div>
// 	<input type="text" id='name' name="username" value="" placeholder="enter your name">
// 	<button type="button" name="button" id="btn">Let me chat!</button>
// 	<div id="welcome"></div>
// 	<script >
// 	var socket = io();
// 	document.getElementById("btn").addEventListner("click",function(){
// 		prompt("clicked");
// 		socket.emit("setusername",document.getElementById('name').value);
	
// 	});
	
// 	//userexist
// 	socket.on("userexist",function(data){
// 		document.getElementById("error").write(data.desc);
// 	});

// 	//userset
// 	socket.on("userset",function(data){
// 		document.getElementById("welcome").write(data.desc);
// 	});
// 	//<script src=”https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js">--to import socket.io on each user client
// </script>
// </body>
// </html>

// var express = require("express");
// var app = express();

// var server = app.listen(3499);
// var io = require("socket.io").listen(server);

// app.get("/",function(req,res){
// 	res.sendFile("/home/itachi/socketproject/chatapp.html");
// });

// io.on("connection",function(socket){
// 	username=[];
// 	socket.on('setusername',function(data){
// 		if(username.indexof(data)>-1)
// 		{
// 			socket.emit("userexist",{desc:"user with this username already exist!!"})
// 		}
// 		else
// 		{
// 			username.push(data);
// 			socket.emit("userset",{desc:data+" ready to chat,welcome!"});
// 		}
// 	})
// })