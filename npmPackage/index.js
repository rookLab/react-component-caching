'use strict';

if (process.env.NODE_ENV === 'production') {
  // NOTE: CHANGE TO PRODUCTION WHEN WE HAVE THAT FINAL FILE
  module.exports = require('./development.js');
} else {
  module.exports = require('./development.js');
}