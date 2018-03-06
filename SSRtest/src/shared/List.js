import React, { Component } from 'react';
import ListItem from './ListItem.js';

import './app.styl';

/**
 * A List
 */
export default class List extends Component {

    render() {
        return (
            <div>
              <h1>Here's my list</h1>
              <ListItem />
              <ListItem />
              <ListItem />
            </div>
        );
    }

}
