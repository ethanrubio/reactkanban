# React Kanban
A Kanban app developed in React.


# Getting Started

To get started with modifying components run:

```js
npm install         # install dependencies
npm start           # run webpack dev server on localhost:8080

```

Or to build for deployment run:

```js
npm run build       # splits, minifies, and hashes project files for deployment

```
Then open up index.html in the build folder to access the app.


# Structure

```
.
├── app                   # Client-facing source code
|   ├── actions           # Defines actions that communicate with dispatcher
│   ├── components        # Holds app components
│   ├── libs              # Starts Alt a Flux architecture
│   ├── stores            # Holds the logic for note creating/editing/deleting
│   ├── index.html        # Contains app html
│   ├── index.js          # Bootstraps react app
│   └── main.css          # Styles app
├── lib                   # webpack helper library of functions
├── webpack.config.js     # Configures webpack
└── index.js              # Loads babel plugins
```