
module.exports = {
  publicPath: '/', // 打包相对路径
  devServer: {
    port: 8080 // 运行端口号
  },
  chainWebpack: config => config.resolve.symlinks(false)
}
