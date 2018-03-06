import React, { Component } from 'react';

import './app.styl';

/**
 * A List
 */
export default class BlogContent extends Component {

    render() {
        return (
          <div>
            <p>
              Dear Diary,
            </p>
            <p>
              Today I tried to understand React 16 source code. It was a rollercoaster of emotion. Now I'm making the next big web app. Everyone will love it.
            </p>
          </div>
        );
    }

}