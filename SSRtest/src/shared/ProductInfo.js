import React, { Component } from 'react';
import './app.styl';

export default class ProductInfo extends Component {
  render() { 
    return (
      <div className="product">
        <p className="name">{this.props.name}</p>
        <p className="description">{this.props.description}</p>
        <p className="price">Price: ${this.props.price}</p>
      </div>
    )
  }
}