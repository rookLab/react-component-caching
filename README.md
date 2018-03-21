# React Component Caching

## Overview
React Component Caching is a component-level caching library for faster server-side rendering with React 16.  
- Use any of React's four server-side rendering methods. Rendering is **asynchronous**.
- Cache components using a simple or template strategy.
- Choose from three cache implementations (LRU, Redis, or Memcached).

## Installation
Using npm:
```shell
$ npm install react-component-caching
```

## Usage
### In Node rendering server:
Instantiate a cache and pass it to any rendering method (`renderToString`, `renderToStaticMarkup`, `renderToNodeStream`, or `renderToStaticNodeStream`) as a second argument. Wherever you would use `ReactDOM.renderToString`, use `ReactCC.renderToString`.

**Note: All of these methods are asynchronous, and return a promise. To use them, `await` the response before rendering**
```javascript
const ReactCC = require("react-component-caching");
const cache = new ReactCC.ComponentCache();

app.get('/example', async (req,res) => {
    const renderString = await ReactCC.renderToString(<App />, cache);
    res.send(renderString);
});

// ...
```

### In React app:
To flag a component for caching, simply add a `cache` property to it. 

```javascript
export default class App extends Component {
    render() {
        return (
            <div>
                <ComponentNotToBeCached />
                <ComponentToCache cache />
            </div>
        );
    }
}
// ...
```

## Templatizing Cached Components
The example above employs a simple caching strategy: a rendered component is saved with its prop values. Each time the component is rendered with different prop values, a separate copy is saved to the cache. If a component is frequently rendered with different prop values, you may prefer to cache a template of the component to save space in the cache. The template strategy stores a version of the component with placeholders (e.g. `{{0}}`, `{{1}}`) in place of actual prop values. 

To create a cache template, add both `cache` and `templatized` to the component along with an array of props to templatize. Templatized props should have **string** or **number** values. **Be aware that templates are not currently supported with the `renderToNodeStream` or `renderToStaticNodeStream` methods.**

```javascript
export default class App extends Component {
    render() {
        return (
            <div>
                <ComponentNotToBeCached />
                <ComponentToCache cache />
                <ComponentToTemplatize
                    templatizedProp1="value1"
                    templatizedProp2="value2"
                    nonTemplatizedProp="anotherValue"
                    cache
                    templatized={["templatizedProp1", "templatizedProp2"]} />
            </div>
        );
    }
}
// ...
```
## Streaming HTML Markup
To use streaming on the server side, use either the renderToStaticNodeStream or renderToNodeStream function. Both streaming option works with caching, but not yet compatible with templatization. To use the streaming functions, simply pass in these 5 arguments:
(
`component`: The React component being rendered
`cache`: The component cache object
`res`: The response object that Express provides
`htmlStart`: Start of html markup in string form
`htmlEnd`: End of html markup in string form
).
The benefit that comes with streaming is faster time to first byte, which translates to faster viewing of page content. 

## Cache Options
React Component Caching provides its own cache implementation as well as support for Redis and Memcached. Simply create your preferred cache and pass it into one of the rendering methods.

**Standard (LRU) Cache Example:**

```javascript
const ReactCC = require("react-component-caching");
const cache = new ReactCC.ComponentCache();
```

**Redis Example:**

```javascript
const ReactCC = require("react-component-caching");
const redis = require("redis");
const cache = redis.createClient();
```

**Memcached Example:**

```javascript
const ReactCC = require("react-component-caching");
const Memcached = require("memcached");
const cache = new Memcached(server location, options);

// If using Memcached, make sure to pass in the lifetime of the data (in seconds) as a number.
ReactCC.renderToString(<App />, cache, 1000);
```

## API

### React Component Caching
React Component Caching gives you access to all four of React 16's server-side rendering methods, as well as additional functionality. Available methods are described below.

### ComponentCache
- `size`: (*Optional*) An integer representing the maximum size (in characters) of the cache. Defaults to 1 million.

**Example:**
```javascript
const cache = new ReactCC.ComponentCache();
```

### renderToString
- `component`: The React component being rendered
- `cache`: The component cache
- `memLife`: (*Only if using Memcached*) A number representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**
```javascript
ReactCC.renderToString(<App />, cache);
```

### renderToStaticMarkup
- `component`: The React component being rendered
- `cache`: The component cache
- `memLife`: (*Only if using Memcached*) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**
```javascript
ReactCC.renderToStaticMarkup(<App />, cache);
```

### renderToNodeStream
- `component`: The React component being rendered
- `cache`: The component cache object
- `res`: The response object that Express provides
- `htmlStart`: Start of html markup in string form
- `htmlEnd`: End of html markup in string form
- `memLife`: (*Only if using Memcached*) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**
```javascript
let htmlStart = '<html><head><title>Page</title></head><body><div id="react-root">';
let htmlEnd =  '</div></body></html>';
ReactCC.renderToNodeStream(<App />, cache, res, htmlStart, htmlEnd);
```

### renderToStaticNodeStream
- `component`: The React component being rendered
- `cache`: The component cache object
- `res`: The response object that Express provides
- `htmlStart`: Start of html markup in string form
- `htmlEnd`: End of html markup in string form
- `memLife`: (*Only if using Memcached*) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**
```javascript
let htmlStart = '<html><head><title>Page</title></head><body><div id="react-root">';
let htmlEnd = '</div></body></html>';
ReactCC.renderToStaticNodeStream(<App />, cache, res, htmlStart, htmlEnd);
```
