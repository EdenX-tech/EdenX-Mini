module.exports = {
  plugins: {
    autoprefixer: {},
    // flexible配置
    "postcss-pxtorem": {
      "rootValue": 75,
      "propList": ["*"],
      //'.el',
      selectorBlackList: ['.w-e', 'vueCropper', 'el-message', 'el-button', '.el-form-item__error'],
      exclude: ['pc'],
    }
  }
}