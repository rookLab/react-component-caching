'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./development.js');
} else {
  module.exports = require('./development.js');
}