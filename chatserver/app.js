const app = require('express')();

const httpServer = require('http').createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

const users = {}

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', name => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });

});

httpServer.listen(8000,()=>console.log('listening on port 8000...'));