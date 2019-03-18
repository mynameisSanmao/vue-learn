import axios from 'axios'
const state = {
  money: 100
}
const actions = {
  login({
    commit
  }, obj) {
    let {
      user,
      pwd
    } = obj
    axios.post('/mChat/login', {
      user,
      pwd
    }).then(res => {
      if (res.status == 200 && res.data.code == 0) {
        console.log(res, 'res')
      } else {

      }
    })
  }
}
const mutations = {

}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}