import webpack from 'webpack';
// import WebpackNotifierPlugin from 'webpack-notifier';
import path from 'path';
import autoprefixer from 'autoprefixer';

export default {
  devtool: 'source-map',
  context: path.join(__dirname, '/src'),
	entry: ['webpack/hot/dev-server', 'index.js'],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js'
	},
  resolve: {
    root: path.join(__dirname, '/src'),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.html', '.css', '.scss']
  },
  module: {
    // preLoaders: [],
    loaders: [
      { test: /\.js$/,   loaders: ['react-hot', 'babel'],             exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'],  exclude: /node_modules/ },
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      // $: 'jquery',
      // _: 'lodash'
    }),
    // new WebpackNotifierPlugin({alwaysNotify: true})
  ]
};
