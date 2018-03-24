/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
 */

var ReactDOMServerRenderer = require('./ReactPartialRenderer');

export default async function renderToStaticMarkup(element, cache, memLife = 0) {
  var renderer = new ReactDOMServerRenderer(element, true);
  var markup = await renderer.read(Infinity, cache, false, null, memLife);
  return markup;
}