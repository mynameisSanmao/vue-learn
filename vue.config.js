module.exports = {
  runtimeCompiler: true,
  devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9093',   //代理接口
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''    //代理的路径
          }
        }
      }
    }

}