import React, { Component } from 'react';
import ListItem from './ListItem.js';

import './app.styl';

/**
 * A List
 */
export default class List extends Component {
    render() {
        let bunchOfPics = [];
        for (let i=0; i<1000; i++) {
            bunchOfPics.push(<ListItem key={i}/>);
        }
        return (
            <div>
              <h1>Here's my list</h1>
              {bunchOfPics}
            </div>
        );
    }

}
