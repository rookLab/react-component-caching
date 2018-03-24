/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostring
 */
var ReactDOMServerRenderer = require('./ReactPartialRenderer');

export default async function renderToString(element, cache, memLife = 0) {
  // If and only if using memcached, pass the lifetime of your cache entry (in seconds) into 'memLife'.
  var renderer = new ReactDOMServerRenderer(element, false);
  var markup = await renderer.read(Infinity, cache, false, null, memLife);
  return markup;
}