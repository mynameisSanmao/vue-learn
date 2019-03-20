const mongoose = require('mongoose');
//连接mongoose，m-chat相当于数据库名
let db = mongoose.connect('mongodb://localhost:27017/m-chat', {
  useNewUrlParser: true
});
//定义 模型和数据类型  user存放用户信息  chat存放聊天记录
const models = {
  user: {
    'user': {
      'type': String,
      'require': true
    },
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