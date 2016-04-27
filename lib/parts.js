const webpack = require('webpack');

exports.devServer = function(options) {
  return {
    devServer: {
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
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]    
  };
};

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  };
};

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        // mangle example
        mangle: {
          // Mangle matching properties
          props: /matching_props/,
          // Don't mangle these
          except: [
            'Array', 'BigInteger', 'Boolean', 'Buffer'
          ]
        }
      })
    ],
  };
};

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);
  
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;
  
  return {
    // Define an entry point needed splitting
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. 
      // Manifest is needed for reliable
      // caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest'],
        
        // options.name module only
        minChunks: Infinity
      })
    ]
  };
}