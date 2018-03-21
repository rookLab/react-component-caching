import React, { Component } from 'react';
import Button from './Button.js';
import List from './List.js';
import BlogPost from './BlogPost';

import './app.styl';

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
export default class App extends Component {

    render() {
        return (
            <div>
                <h1>THIS IS AN APP</h1>
                <Button cache />
                <BlogPost cache />
                <BlogPost cache />   
                <List cache />
                
            </div>
        );
    }
}
