// 获取当前代码分支名
var fs = require("fs")
var gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/develop
var develop = gitHEAD.split('/')[2] // 环境：develop
var gitCommitVersion = '"' + develop;
// 例如dev环境: "develop: 6ceb0ab5059d01fd444cf4e78467cc2dd1184a66"
process.env.VUE_APP_VERSION = gitCommitVersion;
module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9093', //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //代理的路径
        }
      }
    }
  }

}