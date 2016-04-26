const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of paths
  // entries. We'll be using the latter form
  // given it's convenient with more complex
  // configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // Test expects a RegExp!
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Include accepts either a
        // path or array of paths
        // NOTE: might need to 
        // remove node_modules
        // and reinstall it
        include: PATHS.app
      }
    ]
  }
}


module.exports = merge(common, {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  devtool: 'eval-source-map',
  devServer: {
    contentBase: PATHS.build,
    // Enable history API fallback so HTML5
    // History API based routing works.
    // This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the
    // amount of output.
    stats: 'errors-only',
    // Parse host and port from env so 
    // this is easy to customize.
    // 
    // If you use Vagrant or Cloud 9, set
    // host: process.env.HOST || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network
    // devices unlike default
    // localhost
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin({
      save: true // --save
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
});

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(common, {});
}

module.exports = validate(config);