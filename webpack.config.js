var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './index.js',
  // entry: [
  //   'webpack-dev-server/client?http://0.0.0.0:8080',
  //   'webpack/hot/only-dev-server',
  //   './index.js'
  // ],
  output: { filename: './app/bundle.js' },
  module: {
    loaders: [
      { test: /\.js$/,   loaders: [ 'react-hot', 'babel' ],             exclude: /node_modules/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less'), exclude: /node_modules/ },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./app/bundle.css', { allChunks: true }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      // $: 'jquery',
      // _: 'underscore'
    }),
  ]
};
