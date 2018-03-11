import React, { Component } from 'react';
import ListItem from './ListItem.js';

import './app.styl';

/**
 * A List
 */
export default class List extends Component {
    render() {
        let bunchOfProducts = [];
        for (let i=0; i<100; i++) {
            bunchOfProducts.push(<Product key={i} name={`Thing${i}`} description={'This product is awesome!'} price={Math.floor(Math.random() * 200)} />);
        }
        return (
            <div>
              <h1>Here's my list</h1>
              {bunchOfProducts}
              {/* <ListItem />
              <ListItem />
              <ListItem /> */}
            </div>
        );
    }

}
