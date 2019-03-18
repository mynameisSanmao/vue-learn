const mongoose = require('mongoose');
let db = mongoose.connect('mongodb://localhost:27017/m-chat');
// mongoose.connection.on("connected",function(){
//   console.log("mongo connect success")
// })

const models = {
  user: {
    'user': {
      'type': String,
      'require': true
    },
    //加密后的密码
    'pwd': {
      'type': String,
      'require': true
    }

  },
  chat: {
    //每个聊天的标识
    'chatid': {
      'type': String,
      'require': true
    },
    //发送者
    'from': {
      'type': String,
      'require': true
    },
    //接受者
    'to': {
      'type': String,
      'require': true
    },
    //内容
    'content': {
      'type': String,
      'require': true,
      'default': ''
    },
    //聊天记录的时间
    'create_time': {
      'type': Number,
      'default': new Date().getTime()
    }
  }

}
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}