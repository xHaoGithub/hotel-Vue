module.exports = {
  devServer: {
    host: 'localhost',
    https: false,
    open: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/'
}
