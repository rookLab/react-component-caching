const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/exposedExports.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'reactCCbundle.js'
  },
  // devtool: "eval-source-map",
  module: {
    // loaders: [
    //   {
    //     test: /.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader',
    //     query: {
    //       presets:[ 'es2015', 'react', 'stage-2' ]
    //     }
    //   }
    // ]
  },
}