import React from 'react';
import ReactDOM from '../../ModifiedReact';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../shared/App';

import LRUCache from '../../LRUCache';

// can pass in max-size, otherwise defaults to 1 million
const cache = new LRUCache(800);

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    const app = (
        <App/>
    );
    const appString = ReactDOM.renderToString(app, cache);
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    res.render('index', {
        appString,
        js,
        styles,
        cssHash
    });
};
