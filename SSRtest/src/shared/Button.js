import React, { Component } from 'react';

import './app.styl';

/**
 * A List
 */
export default class Button extends Component {
    render() {
        return (
          <button onClick={()=>console.log('yaclickedme')}>
            Click me!
          </button>
        );
    }
}