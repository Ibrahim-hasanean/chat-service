var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const cors = require("cors")
const Messages = require("./models/Messages");
require("./config/mongoose");

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(4000,()=>{
  console.log("listen on port 3000");
})

let chat = io.of("/chat")
chat.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit("log","socket connected")
 
  socket.on("sendMessage", async data=>{
    let {chatRoomId,message,senderId} = data;
    console.log(chatRoomId,message,senderId)
    let newMessage = await Messages.create({senderId,message,chatRoomId});    
    chat.in(chatRoomId).emit("reciveMessage",{message,senderId,chatRoomId});    
  })

  socket.on("joinRoom",async data=>{
    let {senderId,reciverId} = data;  
    let roomName = [senderId,reciverId].sort().join("-");
    console.log("join room",roomName)
    socket.join(roomName);    
    socket.emit("joinRoom",roomName)
  })  

  socket.on("typing",(data)=>{
    const {userTyping,roomId} = data;
    chat.to(roomId).emit("typing",{userTyping});
  })
  socket.on("untyping",(data)=>{
    const {userTyping,roomId} = data;
    chat.to(roomId).emit("untyping",{userTyping});
  })

  socket.on("seen",(data)=>{
    const {userSeen,roomId} = data;
    chat.to(roomId).emit("seen",{userSeen});
  })

  socket.on("read",(data)=>{
    const {userRead,roomId} = data;
    chat.to(roomId).emit("read",{userRead});
  })  

  socket.on("leaveRoom",data=>{
    let {roomId}=data;
    socket.leave(roomId)
  })
  socket.on("disconnect",()=>{
    console.log("user disconnect")
  })
});