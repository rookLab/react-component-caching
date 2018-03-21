import React from "react";
import ReactDOMServer from "./../../ModifiedReact.js";
// import ReactDOMServer from "reactdom/server";
// import RecursiveDivs from "./RecursiveDivs";
// import LRUCache from '../SSRtest/LRUCache';
// import redis from 'redis';
// const cache = redis.createClient();
// const cache = {};
const cache = new LRUCache(800);

const depth = 4,
  breadth = 11;

const render = () => {
  ReactDOMServer.renderToString(
    <App/>,
    cache
  );
};

export default [{ name: "Testing render time", fn: render }];
