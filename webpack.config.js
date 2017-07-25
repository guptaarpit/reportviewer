const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const config = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
    }],
  },
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourcemap: false,
      output: { comments: false },
      minimize: true,
      mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] },
    }),
    new ExtractTextPlugin({
      filename: 'src/public/stylesheets/app.css',
      allChunks: true,
    }),
  ],
};

module.exports = config;
