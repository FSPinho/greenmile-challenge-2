var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: './dist/index.html' });

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist", 
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, 
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
}