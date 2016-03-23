var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  // entry: './public/index.js',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080/public/',
    'webpack/hot/only-dev-server',
    './public/index.js'
  ],
  output: { filename: './public/bundle.js' },
  module: {
    loaders: [
      { test: /\.js$/,   loaders: [ 'react-hot', 'babel' ],             exclude: /node_modules/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less'), exclude: /node_modules/ },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./public/bundle.css', { allChunks: true }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      ReactRouter: 'react-router',
      // $: 'jquery',
      // _: 'underscore'
    }),
  ]
};
