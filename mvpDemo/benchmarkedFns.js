import React from "react";
import ReactDOMServer from "../SSRtest/ModifiedReact";
// import ReactDOMServer from "react-dom/server";
import RecursiveDivs from "./RecursiveDivs";

const cache = {};

const depth = 4,
  breadth = 11;

const render = () => {
  ReactDOMServer.renderToString(
    <div>
      {/* <RecursiveDivs depth={depth} breadth={breadth} cachekey="key" /> */}
      <RecursiveDivs depth={depth} breadth={breadth} />
      <RecursiveDivs depth={depth} breadth={breadth} />
    </div>,
    cache
  );
};

export default [{ name: "Testing render time", fn: render }];
