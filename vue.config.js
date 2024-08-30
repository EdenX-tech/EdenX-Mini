const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/",
  outputDir: 'dist.bak',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    client: {
      overlay: false,
    },
    proxy: 'https://alpha.edenxminiapp.edenx.xyz',
    // proxy: {
    //   [process.env.VUE_APP_BASE_API]: {
    //     // target: 'https://alpha.webapi.thelzkj.com',//alpha
    //     target: 'https://alpha.edenxminiapp.edenx.xyz',//beta
    //     // target: 'https://webapi.soulland.xyz',//master
    //     changeOrigin: true,
    //     ws: false,
    //     pathRewrite: {
    //       ["^" + process.env.VUE_APP_BASE_API]: ""
    //     }
    //   }
    // },
  }
})
