const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js')
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

var users = new Users();
var app = express();

const publicPath = path.join(__dirname, '../public'); 
const port = process.env.PORT || 3000;
var server = http.createServer(app);  //server created
var io = socketIO(server); //serversocket created here and io() used to create socket on client's end 

io.on('connection', (socket) => {
	console.log('New User Connected');

	socket.on('join',  (params,callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and room name are required')
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		io.to(user.room).emit('updateUserList', users.getUserList(user.room));
		io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
	});

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});
});
server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

app.use(express.static(publicPath));


