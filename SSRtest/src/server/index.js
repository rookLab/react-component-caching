import React from 'react';
// import ReactDOM from '../../nodeProdBuild';
// import ReactDOM from '../../browserDevBuild';
import ReactCC from '../../ModifiedReact';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../shared/App';

// can pass in max-size, otherwise defaults to 1 million
// const cache = new ReactCC.ComponentCache();
import redis from 'redis';
const cache = redis.createClient();
// import memcached from 'memcached';
// const cache = new memcached('localhost:11211');

/**
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    const app = <App />;
    const start_cached = process.hrtime();
    
    
    const appString = await ReactCC.renderToString(app, cache);
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
   };
