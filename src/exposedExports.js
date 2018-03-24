var renderToString = require('./renderToString');
var renderToStaticMarkup = require('./renderToStaticMarkup');
var renderToNodeStream = require('./streamRenderingMethods').renderToNodeStream;
var renderToStaticNodeStream = require('./streamRenderingMethods').renderToStaticNodeStream;
var ComponentCache = require('./ComponentCache');

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}


// Note: when changing this, also consider https://github.com/facebook/react/issues/11526
var ReactDOMServerNode = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
  renderToNodeStream: renderToNodeStream,
  renderToStaticNodeStream: renderToStaticNodeStream,
  ComponentCache: ComponentCache,
  version: ReactVersion
};

var ReactDOMServerNode$1 = Object.freeze({
  default: ReactDOMServerNode
});

var ReactDOMServer =
  (ReactDOMServerNode$1 && ReactDOMServerNode) || ReactDOMServerNode$1;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest
var server_node = ReactDOMServer["default"]
  ? ReactDOMServer["default"]
  : ReactDOMServer;

module.exports = server_node;