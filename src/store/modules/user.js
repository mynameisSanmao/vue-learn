import axios from 'axios'
import router from '../../router'
import io from 'socket.io-client';
/*因为后端端口是9093 前端是3000 存在跨域 所以手动先写入后端端口号*/
/*若不存在跨域 直接 io()*/
const socket = io('ws://localhost:9093');
const state = {
  userList: [],
  chatmsg: []
}
const actions = {
  /** 
   * 
   * @desc 注册 
   * @param {*} param0 
   * @param {*} obj 
   */
  register({
    commit
  }, obj) {
    let {
      user,
      pwd
    } = obj;
    axios.post('/api/mchat/register', {
      user,
      pwd
    }).then(res => {
      if (res.status == 200 && res.data.code == 0) {
        // console.log(res, 'res')
        alert(res.data.msg)
        router.push('/login');
      } else {
        alert(res.data.msg)
      }
    }).catch(err => {

    })
  },
  /**
   * @desc 登陆 
   * @param {*} param0 
   * @param {*} obj 
   */
  login({
    commit
  }, obj) {
    let {
      user,
      pwd
    } = obj;
    axios.post('/api/mchat/login', {
      user,
      pwd
    }).then(res => {
      if (res.status == 200 && res.data.code == 0) {
        window.localStorage.setItem('isLogin', JSON.stringify(res.data.data));
        router.push('/login');
        alert('登陆成功！')
      } else {
        alert(res.data.msg)
      }
    })
  },
  /**
   * 获取用户列表 过滤当前登录的用户
   * @param {*} param0 
   */
  getUserList({
    commit
  }, userId) {
    axios.get('/api/mchat/otherUser?id=' + userId).then(res => {
      commit('getUserList', res.data.data)
    })
  },
  /**
   * @desc 发送消息
   * @param {*} param0 
   */
  sendMsg({
    commit
  }, {
    from,
    to,
    msg
  }) {
    socket.emit('sendMsg', {
      from,
      to,
      msg
    })
  },
  /**
   * @desc 获取聊天信息
   * @param {*} param0 
   */
  getMsgList({
    commit
  }, chatObjId) {
    axios.get('/api/mchat/getmsglist?id=' + chatObjId.from_id).then(res => {
      if (res.status == 200 && res.data.code == 0) {

        commit('getChatmsg', {
          chatMsg: res.data.mags,
          to_id: chatObjId.to_id,
          from_id: chatObjId.from_id
        })
      }
    })
  },
  /**
   * @desc 接收消息
   * @param {*} param0 
   */
  recvmsg({
    commit
  }, id) {
    socket.on('recvmsg', function (data) {
      // console.log(data, 'data')
      commit('setChatmsg', data)
    })
  }
}
const mutations = {
  /**
   * @desc 获取用户列表
   * @param {*} state 
   * @param {Array} data 
   */
  getUserList(state, data) {
    state.userList = data && data.length ? data : [];
  },
  /**
   * 获取所有聊天记录
   * @param {*} state 
   * @param {Array} chatMsg 
   */
  getChatmsg(state, data) {
    let arr = [];
    let chatId = [data.from_id, data.to_id].sort().join('_');
    console.log(chatId, 'chatId')
    if (data.chatMsg && data.chatMsg.length) {
      arr = data.chatMsg.filter(item => {
        return item.chatid == chatId;
      })
    }
    state.chatmsg = [...state.chatmsg, ...arr];

  },
  /**
   * 接受
   * @param {*} state 
   * @param {Object} data 
   */
  setChatmsg(state, data) {
    state.chatmsg.push(data);
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}