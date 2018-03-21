import React, { Component } from 'react';
import ListItem from './ListItem.js';
import ProductInfo from './ProductInfo.js';

import './app.styl';

/**
 * A List
 */
export default class List extends Component {
    render() {
        let bunchOfProducts = [];
        const templatizedProps = ["name", "description", "price"];
        for (let i=0; i<1000; i++) {
            bunchOfProducts.push(<ProductInfo key={i} name={`Thing ${i}`} description="This product is awesome!" price={i * 10} nonTemplatized="THIS TEXT SHOULD NEVER CHANGE" templatized={templatizedProps}/>);
        }
        return (
            <div>
              <h1>Here's my list</h1>
              {bunchOfProducts}
            </div>
        );
    }
}
