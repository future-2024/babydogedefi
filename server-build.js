const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = require('express')();
const fs = require('fs');
const options = {
  key: fs.readFileSync('./ssl/keys/a6f3d_539db_197b4430717a807f521979ab53e4cefa.key'),
  cert: fs.readFileSync('./ssl/certs/babydogedefi_io_a6f3d_539db_1653436799_92bfb52bb6fc450202705edcbbe7a720.crt')
};
app.use(cors({
    origin: '*'
}));
//app.use(cors({
//  origin: true,
//  credentials: true,
//}));
var https = require('https').createServer(options, app);
var io = require('socket.io')(https, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    tran6sports : ['websocket']
  }
});
app.use(express.static(path.join(__dirname, 'build')));
connectDB();
//app.get('*', function (req, res) {
//  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//});
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
  console.log('A user connected');
  socket.on("stack", (arg) => {
    console.log(arg)
    console.log('temp')
    io.emit('allow', 'Success socket');  
  });
  socket.on("response", (arg) => {
    console.log(arg)
	console.log('temp2')
    io.emit('response', 'response');  
  });
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
console.log('temp3')
  });
  socket.on('unstack', function () {
console.log('temp4')
    io.emit('unstackResponse', 'response'); 

  });
  socket.on('unStackResponse', function () {
console.log('temp5')
    io.emit('unstackResponse-client', 'response'); 

  });
  socket.on('unStackReject', function () {
console.log('temp6')
    io.emit('unstackReject-client', 'response'); 

  });
});
https.listen(2087, function(){
  console.log('listening on *:2087');
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
