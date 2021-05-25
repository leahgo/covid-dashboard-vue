module.exports = {
  devServer: {
    proxy: {
      '/openapi': {
        "target": 'http://openapi.data.go.kr',
        "pathRewrite": { '^/': '' },
        "changeOrigin": true,
        "secure": false
      }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/covid-dashboard-vue/' : '/'
  },
}