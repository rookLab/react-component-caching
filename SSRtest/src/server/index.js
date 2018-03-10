import React from 'react';
// import ReactDOM from '../../nodeProdBuild';
// import ReactDOM from '../../browserDevBuild';
import ReactDOM from '../../ModifiedReact';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../shared/App';

import LRUCache from '../../LRUCache';

// can pass in max-size, otherwise defaults to 1 million
const cache = new LRUCache();

/**
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    const app = <App />;
    const start_cached = process.hrtime();
    const appString = ReactDOM.renderToString(app, cache);
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
