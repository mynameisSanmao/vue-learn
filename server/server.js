const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const model = require('./model');
// app.get('/', function (req, res) {
//   res.send('hello world')
// })
const server = require('http').Server(app)
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  /*接收*/
  socket.on('name', function (data) {
    console.log("sendMsgServer", data);
    io.emit('sanmao', data)
  })

})
const userRouter = require('./user');
app.use(bodyParse.json());
app.use('/mChat', userRouter);
server.listen(9093, function () { //如果不连接socket server改成app
  console.log('Node app start at port 9093!!!!')
})