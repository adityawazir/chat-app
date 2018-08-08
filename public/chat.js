var socket = io.connect('http://localhost:3499');

//DOM Query
var btn=document.getElementById("send");
var output = document.getElementById("output");
var message = document.getElementById("message");
var handle = document.getElementById("handle");

btn.addEventListener("click",function(){
	socket.emit("chat",{
		message:message.value,
		username:handle.value
	});
});

socket.on('chats',function(data){
	 output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});