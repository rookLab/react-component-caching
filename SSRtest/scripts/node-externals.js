const readdirSync = require('fs').readdirSync;
const join = require('path').join;

module.exports = readdirSync(join(__dirname, '../node_modules'))
    .filter(x => !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(x))
    .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`;
        return externals;
    }, {});
