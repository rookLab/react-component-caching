import React from 'react';
<<<<<<< HEAD
import ReactDOM from '../../productionBuild';
=======
// import ReactDOM from '../../nodeProdBuild';
// import ReactDOM from '../../browserDevBuild';
import ReactDOM from '../../ModifiedReact';
>>>>>>> ff1de9f113946f852ded727878248e3f6fe66fe8
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../shared/App';

import LRUCache from '../../LRUCache';

// can pass in max-size, otherwise defaults to 1 million
<<<<<<< HEAD
const cache = new LRUCache(1000000);
=======
const cache = new LRUCache();
>>>>>>> ff1de9f113946f852ded727878248e3f6fe66fe8

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
<<<<<<< HEAD
   };
=======
   };
>>>>>>> ff1de9f113946f852ded727878248e3f6fe66fe8
