const join = require('path').join;

module.exports = {
    output: {
        path: join(__dirname, '../public/assets'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            join(__dirname, '../node_modules'),
            join(__dirname, '../src')
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    }
};
