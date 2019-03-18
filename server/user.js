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
//登录
Router.post('/login', function (req, res) {
  // res.json(
  // {
  //   data:0
  // })
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
    //把登录用户id存在cookie
    // res.cookie('userid', doc._id)
    return res.json({
      code: 0,
      data: doc
    })
  })
})
module.exports = Router