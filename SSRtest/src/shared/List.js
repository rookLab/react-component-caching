import React, { Component } from 'react';
import ListItem from './ListItem.js';

import './app.styl';

/**
 * A List
 */
export default class List extends Component {
    render() {
<<<<<<< HEAD
        const listArr = [];
        for (let i = 0; i < 10000; i++) {
            listArr.push(<ListItem />)
=======
        let bunchOfPics = [];
        for (let i=0; i<1000; i++) {
            bunchOfPics.push(<ListItem key={i}/>);
>>>>>>> ff1de9f113946f852ded727878248e3f6fe66fe8
        }
        return (
            <div>
              <h1>Here's my list</h1>
<<<<<<< HEAD
              {listArr}
=======
              {bunchOfPics}
              {/* <ListItem />
              <ListItem />
              <ListItem /> */}
>>>>>>> ff1de9f113946f852ded727878248e3f6fe66fe8
            </div>
        );
    }

}
