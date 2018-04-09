/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactPartialRenderer from './ReactPartialRenderer';

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostring
 */
export async function renderToString(element, cache, memLife=0) {
  // If and only if using memcached, pass the lifetime of your cache entry (in seconds) into 'memLife'.
  var renderer = new ReactPartialRenderer(element, false);
  var markup = await renderer.read(Infinity, cache, false, null, memLife);
  return markup;
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
 */
export async function renderToStaticMarkup(element, cache, memLife=0) {
  var renderer = new ReactPartialRenderer(element, true);
  var markup = await renderer.read(Infinity, cache, false, null, memLife);
  return markup;
}
