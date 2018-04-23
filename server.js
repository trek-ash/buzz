var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);

server.listen(process.env.PORT || 3001);
console.log('server started successfully');
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html');
});

app.use(express.static(__dirname));
connections=[];
users=[];
sockets={};

io.on('connection',(socket)=>{
	connections.push(socket);
	socket.join(socket.username);	
	
	socket.on('disconnect',()=>{
		
		for (var i = users.length - 1; i >= 0; --i) {
    		if (users[i].Name == socket.username) {
        	users.splice(i,1);
    		}
		}
		
		connections.splice(connections.indexOf(socket),1);
		if(socket.username!==undefined)
		console.log('%s is now offline',socket.username);
		updateUsers();
	})
	var chatwith="";
	
	socket.on('join',(data)=>{
		chatwith=data;
		
		
	});

	socket.on('New private Message',(data)=>{
	io.to(sockets[chatwith]).emit('chat message',data);
	io.to(sockets[data.By]).emit('chat message',data);
	});


	socket.on('New Message',(data)=>{
	io.emit('chat message',data);

	});

	socket.on('user',(data)=>{
	socket.username=data.Name;	
	console.log('%s is online',data.Name);
	users.push(data);
	sockets[data.Name]=socket.id;
	updateUsers();
	});
	function updateUsers(){
	io.emit('New Users',users);	
	}
	


});
