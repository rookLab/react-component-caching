# React 16 SSR Template
This project provides a template for React 16 (Fiber) using server
side rendering.

*Important:* The master branch is only supposed to contain the bare-bone template.
There are different branches containing more advanced features, like streaming and 
more to come in the future. Those are documentented in the Branches section.

## Features
* Content served by ExpressJS using the EJS view engine
* Hot reloading of styles and scripts
* ESNext ready
* powered by webpack

## Branches
The following, more advanced, features are pushed to dedicated branches. 
Either checkout a specific branch or fork the repository and merge the branches to 
get the features you need. You might as well just use them as a resource to learn, how
the specific technologies are implemented.

### Streaming (feature/streaming)
Since React 16, we have the possibility to render to a node stream. This improves the time to first byte (TTBF), 
since the browser can display the app in an iterative manner. The dedicated branch provides the basic streaming 
implementation.

### React-Router Integration (feature/react-router)
For a template using [react-router](https://github.com/ReactTraining/react-router) you can make use of this branch.
It features routing on client and server side as well as basic routes.

Thanks to [@crabbits](https://github.com/crabbits) for contributing this example.

### Express Routing / API (feature/express-routing)
This example shows how to configure routing ExpressJS. This can be used to create
an API to work alongside your frontend application.

### Redux (feature/redux)
This example shows how to integrate [redux](https://redux.js.org) along with server-side rendering
as well as hot-reloading. It features a simple store with preloaded state
from the server as well as state hydration on the client.

## Development
To start development, follow these steps:

```
$ git clone https://github.com/rherwig/template-react-16-ssr.git
$ cd template-react-16-ssr
$ npm i
$ npm start
```

This fires up the development server on port `3000`.

You can now choose to either start developing your react application or
to enhance the express server according to your needs.

The react app's entry point is `src/shared/App.js` and the express
server is started from `src/index.js`.

For more information on how the specific parts of the application work,
please refer to the documentation in the code.

## Building for Production
In order to build for production and run the finished project, execute
the following:

```
$ npm run build
$ node public/index
```

This bundles and optimizes your app and runs it from the `public/`
directory.

## License
MIT

## Contributing
If there are any ideas or optimizations to improve this template,
feel free to submit a pull request including your documented changes.
