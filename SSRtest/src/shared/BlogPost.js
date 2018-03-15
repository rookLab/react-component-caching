import React, { Component } from 'react';
import BlogContent from './BlogContent.js';

import './app.styl';

/**
 * A List
 */
export default class BlogPost extends Component {

    render() {
        return (
            <div>
              <h1>This is a great blog post!</h1>
              <BlogContent />
              <p>{this.props.thing}</p>
            </div>
        );
    }

}
