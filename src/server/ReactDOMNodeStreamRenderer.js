/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Readable} from 'stream';
import { Transform } from 'stream';

import ReactPartialRenderer from './ReactPartialRenderer';

// This is a Readable Node.js stream which wraps the ReactDOMPartialRenderer.
class ReactMarkupReadableStream extends Readable {
  constructor(element, makeStaticMarkup, cache, streamingStart, memLife) {
    // Calls the stream.Readable(options) constructor. Consider exposing built-in
    // features like highWaterMark in the future.
    super({});
    this.cache = cache;
    this.streamingStart = streamingStart;
    this.memLife = memLife;
    this.partialRenderer = new ReactPartialRenderer(element, makeStaticMarkup);
  }

  async _read(size) {
    try {
      let readOutput = await this.partialRenderer.read(size,
        this.cache,
        true,
        this.streamingStart,
        this.memLife);
      this.push(readOutput);
    } catch (err) {
      this.emit('error', err);
    }
  }
}

function createCacheStream(cache, streamingStart, memLife = 0) {
  const bufferedChunks = [];
  return new Transform({
    // transform() is called with each chunk of data
    transform(data, enc, cb) {
      // We store the chunk of data (which is a Buffer) in memory
      bufferedChunks.push(data);
      // Then pass the data unchanged onwards to the next stream
      cb(null, data);
    },

    // flush() is called when everything is done
    flush(cb) {
      // We concatenate all the buffered chunks of HTML to get the full HTML, then cache it at "key"
      let html = bufferedChunks.join("");
      delete streamingStart.sliceStartCount; 

      for (let component in streamingStart) {
        let tagStack = [];
        let tagStart;
        let tagEnd;

        do {
          if (!tagStart) {
            tagStart = streamingStart[component];
          } else {
            tagStart = (html[tagEnd] === '<') ? tagEnd : html.indexOf('<', tagEnd);
          }
          tagEnd = html.indexOf('>', tagStart) + 1;
          // Skip stack logic for void/self-closing elements and HTML comments 
          if (html[tagEnd - 2] !== '/' && html[tagStart + 1] !== '!') {
            // Push opening tags onto stack; pop closing tags off of stack
            if (html[tagStart + 1] !== '/') {
              tagStack.push(html.slice(tagStart, tagEnd));
            } else {
              tagStack.pop();
            }
          }
        } while (tagStack.length !== 0);
        // cache component by slicing 'html'
        if (memLife) {
          cache.set(component, html.slice(streamingStart[component], tagEnd), memLife, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          cache.set(component, html.slice(streamingStart[component], tagEnd));
        }
      }
      cb();
    },
  });
}
/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://reactjs.org/docs/react-dom-stream.html#rendertonodestream
 */
function originalRenderToNodeStream(element, cache, streamingStart, memLife=0) {
  return new ReactMarkupReadableStream(element, false, cache, streamingStart, memLife);
}

export function renderToNodeStream(element, cache, res) {

  const htmlStart =
  '<html><head><title>Page</title></head><body><div id="react-root">';

  const htmlEnd = '</div></body></html>';

  const streamingStart = {
    sliceStartCount: htmlStart.length, 
  };

  const cacheStream = createCacheStream(cache, streamingStart);
    cacheStream.pipe(res);
    cacheStream.write(htmlStart);

    const stream = originalRenderToNodeStream(element, cache, streamingStart);
    stream.pipe(cacheStream, { end: false });
    stream.on("end", () => {
      cacheStream.end(htmlEnd);
    });

}

/**
 * Similar to renderToNodeStream, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://reactjs.org/docs/react-dom-stream.html#rendertostaticnodestream
 */
function originalRenderToStaticNodeStream(element, cache, streamingStart, memLife=0) {
  return new ReactMarkupReadableStream(element, true, cache, streamingStart, memLife);
}

export function renderToStaticNodeStream(element, cache, res) {
  const htmlStart =
  '<html><head><title>Page</title></head><body><div id="react-root">';

  const htmlEnd = '</div></body></html>';

  const streamingStart = {
    sliceStartCount: htmlStart.length, 
  };

  const cacheStream = createCacheStream(cache, streamingStart);
    cacheStream.pipe(res);
    cacheStream.write(htmlStart);

    const stream = originalRenderToStaticNodeStream(element, cache, streamingStart);
    stream.pipe(cacheStream, { end: false });
    stream.on("end", () => {
      cacheStream.end(htmlEnd);
    });
}
