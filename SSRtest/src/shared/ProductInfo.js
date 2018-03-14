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
/*
        
        <p>Non-Templatized Prop: {this.props.nonTemplatized}</p>
        <hr />     
        
        This works:
           <p><strong>Product Name: </strong><span>{this.props.name}</span></p>
        <p><strong>Product Description: </strong><span>{this.props.description}</span></p>
        <p><strong>Price: </strong><span>${this.props.price}</span></p>
        <p><strong>Non-Templatized Prop: </strong><span>{this.props.nonTemplatized}</span></p>
        <hr />   
*/