module.exports = {
  devServer: {
    proxy: {
      '/': {
        "target": 'http://openapi.data.go.kr',
        "pathRewrite": { '^/': '' },
        "changeOrigin": true,
        "secure": false
      }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/covid-dashboard-vue/' : '/'
  },
}