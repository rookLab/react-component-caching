import React from 'react';
// import ReactDOM from '../../nodeProdBuild';
// import ReactDOM from '../../browserDevBuild';
import ReactCC from '../../ModifiedReact';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../shared/App';

import createCacheStream from "./cacheStream";
// can pass in max-size, otherwise defaults to 1 million
// const cache = new ReactCC.ComponentCache();
// import redis from 'redis';
// const cache = redis.createClient();
import memcached from 'memcached';
const cache = new memcached('localhost:11211');

// Force NodeStream

const htmlStart =
  '<html><head><title>Page</title></head><body><div id="react-root">';
const htmlEnd = "</div></body></html>";


const streamingStart = {
  sliceStartCount: htmlStart.length, 
};
/**
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
  // Need To Come back To If Statement
  if(true){
    const cacheStream = createCacheStream(cache, streamingStart);
    cacheStream.pipe(res);
    cacheStream.write(htmlStart);

    const stream = ReactCC.renderToNodeStream(<App />, cache, streamingStart, 30);
    stream.pipe(cacheStream, { end: false });
    stream.on("end", () => {
      cacheStream.end(htmlEnd);
    });
  }
  else if (false){
    const app = <App />;
    const start_cached = process.hrtime();
    
    const appString = await ReactCC.renderToStaticMarkup(app, cache, 30);
    const end_cached = process.hrtime(start_cached);
    console.info(
      "Cached render time: %ds %dms",
      end_cached[0],
      end_cached[1] / 1000000
    );
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
   
    res.render("index", {
      appString,
      js,
      styles,
      cssHash
    });
  }
    
   };