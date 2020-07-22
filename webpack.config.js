const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  },
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader', options: { injectType: 'lazyStyleTag' } }, 'css-loader', 'sass-loader']
      }
    ]
  }
}
