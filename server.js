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
app.use('/api/stake', require('./routes/api/stake'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/test', require('./routes/api/test'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', function(socket){
  socket.on("stake", (arg) => {
    console.log(arg)
    io.emit('allow', 'Success socket');  
  });
  socket.on("response", (arg) => {
    console.log(arg)
    io.emit('response', 'response');  
  });
  socket.on('unstake', function () {
    io.emit('unstakeResponse', 'response'); 
  });
  socket.on('unStakeResponse', function (res) {
    io.emit('unstakeResponse-client', res); 
  });
  socket.on('unStakeReject', function (response) {
    console.log(response);
    io.emit('unstakeReject-client', response); 
  });
});
http.listen(5000, function(){
  console.log('listening on *:5000');
});
