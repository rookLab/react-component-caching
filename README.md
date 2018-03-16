# ReactCC

## Overview

## Installation
Using npm:
```shell
$ npm install --save rapscallion
```

## Usage
# In Node rendering server:
```javascript
const ReactCC = require("reactcc");

// ...
```

# In React app:
To cache a component, simply add a 'cache' property to it. To create a cache template, add both 'cache' and 'templatized'.

```javascript
export default class App extends Component {
    render() {
        return (
            <div>
                <ComponentNotToBeCached />
                <ComponentToCache cache />
                <ComponentToTemplatize cache templatized='props to templatize' />
            </div>
        );
    }
}
// ...
```

## Cache Options
ReactCC provides its own cache implementation as well as support for Redis and Memcached. Simply create your preferred cache and pass it into one of the rendering methods.

**ReactCC LRU Cache Example:**

```javascript
const cache = ReactCC.ComponentCache();

ReactCC.renderToString(<App />, cache);
```

**Redis Example:**

```javascript
const ReactCC = require("reactcc");
const redis = require("redis");

const cache = redis.createClient();

ReactCC.renderToString(<App />, cache);
```

**Memcached Example:**

```javascript
const ReactCC = require("reactcc");
const Memcached = require("memcached");

const cache = new Memcached(server location, options);

// Make sure to pass in the lifetime of the data (in seconds) as a number.
ReactCC.renderToString(<App />, cache, 1000);
```

## API

### `ReactCC`
ReactCC gives you access to all four of React 16's server-side rendering methods, as well as additional functionality. ReactCC methods are described below.

### `ComponentCache`
- `size`: (Optional) An integer representing the maximum size (in characters) of the cache. Defaults to 1 million.

**Example:**

```javascript
const cache = new ReactCC.ComponentCache();
```

### renderToString
- `component`: The React component being rendered.
- `cache`: The component cache
- `memLife`: (Only if using Memcached) A number representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**

```javascript
ReactCC.renderToString(<App />, cache);
```

### renderToStaticMarkup
- `component`: The React component being rendered.
- `cache`: The component cache
- `memLife`: (Only if using Memcached) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**

```javascript
ReactCC.renderToStaticMarkup(<App />, cache);
```

### renderToNodeStream
- `component`: The React component being rendered.
- `cache`: The component cache
- `memLife`: (Only if using Memcached) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**

```javascript
ReactCC.renderToNodeStream(<App />, cache);
```

### renderToStaticNodeStream
- `component`: The React component being rendered.
- `cache`: The component cache
- `memLife`: (Only if using Memcached) An integer representing the lifetime (in seconds) of each Memcached entry. Defaults to 0.

**Example:**

```javascript
ReactCC.renderToStaticNodeStream(<App />, cache);
```

-----