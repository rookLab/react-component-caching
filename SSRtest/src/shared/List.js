import React, { Component } from 'react';
import ListItem from './ListItem.js';

import './app.styl';

/**
 * A List
 */
export default class List extends Component {

    render() {
        const listArr = [];
        for (let i = 0; i < 10000; i++) {
            listArr.push(<ListItem />)
        }
        return (
            <div>
              <h1>Here's my list</h1>
              {listArr}
            </div>
        );
    }

}
