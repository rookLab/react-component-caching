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
const cache = ReactCC.ComponentCache();
ReactCC.renderToString(<App />, cache>)

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
                <ComponentToTemplatize templatizedProp1="value" templatizedProp2="value2" nonTemplatizedProp="anotherValue" cache templatized={["templatizedProp1", "templatizedProp2"]} />
            </div>
        );
    }
}
// ...
```

## Cache Options
React Component Caching provides its own cache implementation as well as support for Redis and Memcached. Simply create your preferred cache and pass it into one of the rendering methods.

**Standard (LRU) Cache Example:**

```javascript
const ReactCC = require("react-component-caching");

const cache = ReactCC.ComponentCache();

ReactCC.renderToString(<App />, cache);
```

**Redis Example:**

```javascript
const ReactCC = require("react-component-caching");
const redis = require("redis");

const cache = redis.createClient();

ReactCC.renderToString(<App />, cache);
```

**Memcached Example:**

```javascript
const ReactCC = require("react-component-caching");
const Memcached = require("memcached");

const cache = new Memcached(server location, options);

// Make sure to pass in the lifetime of the data (in seconds) as a number.
ReactCC.renderToString(<App />, cache, 1000);
```

## API

### ReactCC
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
- `cache`: The component cache
- `memLife`: (*Only if using Memcached*) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**
```javascript
ReactCC.renderToNodeStream(<App />, cache);
```

### renderToStaticNodeStream
- `component`: The React component being rendered
- `cache`: The component cache
- `memLife`: (*Only if using Memcached*) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**
```javascript
ReactCC.renderToStaticNodeStream(<App />, cache);
```
