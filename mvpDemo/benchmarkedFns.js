import React from "react";
import ReactDOMServer from "../index";
// import ReactDOMServer from "react-dom/server";
import RecursiveDivs from "./RecursiveDivs";

const cache = {};

const depth = 4,
  breadth = 11;

const render = () => {
  ReactDOMServer.renderToString(
    // <RecursiveDivs depth={depth} breadth={breadth} cacheKey="test"/>,
    <RecursiveDivs depth={depth} breadth={breadth} />,
    cache
  );
};

export default [{ name: "Testing render time", fn: render }];
