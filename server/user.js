const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user'); //用户信息模型
const Chat = model.getModel('chat'); //聊天记录模型
const _filter = {
  'pwd': 0,
  '_v': 0
};

//获取所有用户
Router.get('/list', function (req, res) {
  //清除所有用户
  // User.remove({},function(e,d){});
  const {
    type
  } = req.query.type ? req.query : {
    type: ''
  };
  const params = type ? {
    type
  } : {}
  //获取所有用户
  User.find(params, function (err, doc) {
    return res.json({
      data: doc
    })
  })
})
//获取除自己以外的用户
Router.get('/otherUser', function (req, res) {
  const {
    id
  } = req.query.id ? req.query : {
    id: ''
  };
  const params = id ? {
    _id: {
      $ne: id
    }
  } : {}
  //获取所有用户
  User.find(params, function (err, doc) {
    return res.json({
      data: doc
    })
  })
})
//登录
Router.post('/login', function (req, res) {
  const {
    user,
    pwd
  } = req.body;
  User.findOne({
    user,
    pwd
  }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '用户名或者密码错误'
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})
//注册
Router.post('/register', function (req, res) {
  const {
    user,
    pwd
  } = req.body;
  User.findOne({
    user
  }, function (err, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: '用户名重复'
      })
    }
    const userModel = new User({
      user,
      pwd: pwd
    });
    userModel.save(function (e, d) {
      if (e) {
        return res.json({
          code: 1,
          msg: '服务器故障'
        })
      }
      const {
        user,
        _id
      } = d;
      return res.json({
        code: 0,
        msg: '注册成功',
        data: {
          user,
          _id
        }
      })
    })
  })
})
//获取聊天记录
Router.get('/getmsglist', function (req, res) {
  //清除所有聊天记录
  // Chat.remove({},function(err,doc){});

  const user = req.query.id;
  User.find({}, function (e, userdoc) {
    let users = {};
    userdoc.forEach(v => {
      users[v._id] = {
        name: v.user,
        avatar: v.avatar
      }
    });
    Chat.find({
      '$or': [{
        from: user
      }, {
        to: user
      }]
    }, function (err, doc) {
      if (!err) {
        return res.json({
          code: 0,
          mags: doc,
          users: users
        })
      }
    })
  })
})
module.exports = Router