module.exports = {
  devServer: {
    proxy: {
      '/': {
        "target": 'http://openapi.data.go.kr',
        "pathRewrite": { '^/': '' },
        "changeOrigin": true,
        "secure": false
      }
    }
  },
}