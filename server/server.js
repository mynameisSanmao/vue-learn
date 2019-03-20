const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const model = require('./model');
const Chat = model.getModel('chat'); //聊天记录模型

const server = require('http').Server(app)
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  /*接收*/
  socket.on('sendMsg', function (data) {
    const {
      from,
      to,
      msg
    } = data;
    //设置聊天唯一的id
    const chatid = [from, to].sort().join('_');
    // 发送时间
    const create_time = new Date().getTime();

    Chat.create({
      chatid,
      from,
      to,
      create_time,
      content: msg
    }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })

})
const userRouter = require('./user');
app.use(bodyParse.json());
app.use('/mchat', userRouter);
server.listen(9093, function () { //如果不连接socket server改成app
  console.log('Node app start at port 9093!!!!')
})