const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = merge(common, {
    name: 'client',
    target: 'web',
    entry: [
        join(__dirname, '../src/client/index')
    ],
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.styl$/,
            exclude: /node_modules/,
            use: ExtractCssChunks.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: 'stylus-loader'
                }]
            })
        }]
    },
    plugins: [
        new ExtractCssChunks(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new StatsWebpackPlugin('stats.json'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});
