import React, { Component } from 'react';
import './app.styl';

export default class ProductInfo extends Component {
  render() { 
    return (
      <div>
        <p><strong>Product Name: </strong>{this.props.name}</p>
        <p><strong>Product Description: </strong>{this.props.description}</p>
        <p><strong>Price: </strong>${this.props.price}</p>
        <p><strong>Non-Templatized Prop: </strong>{this.props.nonTemplatized}</p>   
        <hr />
      </div>
    );
  }
}