const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var bodyParser = require('body-parser');


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports : ['websocket']
  }
});
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/stacks', require('./routes/api/stacks'));
app.use('/api/admin', require('./routes/api/admin'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', function(socket){
  socket.on("stack", (arg) => {
    console.log(arg)
    io.emit('allow', 'Success socket');  
  });
  socket.on("response", (arg) => {
    console.log(arg)
    io.emit('response', 'response');  
  });
  socket.on('unstack', function () {
    io.emit('unstackResponse', 'response'); 
  });
  socket.on('unStackResponse', function () {
    io.emit('unstackResponse-client', 'response'); 
  });
  socket.on('unStackReject', function () {
    io.emit('unstackReject-client', 'response'); 
  });
});
http.listen(5000, function(){
  console.log('listening on *:5000');
});
