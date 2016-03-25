import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

export default {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
		hot: true,
		noInfo: false,
		historyApiFallback: true,
  },
  context: path.join(__dirname, '/src'),
	entry: {
    app: ['webpack/hot/dev-server', 'index.js'],
  },
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js'
	},
  resolve: {
    root: path.join(__dirname, '/src'),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.html', '.css', '.scss'],
    alias: {
      'foundation': path.join(__dirname,
        '/node_modules/foundation-sites/dist/foundation.js'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   loaders: ['style', 'css', 'postcss']
      // },
      {
        test: /\index.html$/,
        loaders: ['file?name=index.html']
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      Rx: 'rx',
      d3: 'd3',
      c3: 'c3',
      jQuery: 'jquery',
      $: 'jquery',
    }),
  ]
};
