
import React from "react";
import ReactDOMServer from "../SSRtest/ModifiedReact";
// import ReactDOMServer from "react-dom/server";
import RecursiveDivs from "./RecursiveDivs";
// import LRUCache from '../SSRtest/LRUCache';

const cache = {};
// const cache = new LRUCache(500).componentCache;

const depth = 4,
  breadth = 11;

const render = () => {
  ReactDOMServer.renderToString(
    <div>
      {/* <RecursiveDivs depth={depth} breadth={breadth} cacheKey="test"/> */}
      <RecursiveDivs depth={depth} breadth={breadth} />
      <RecursiveDivs depth={depth} breadth={breadth} />
    </div>,
    cache
  );
};

export default [{ name: "Testing render time", fn: render }];
