const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  // common configuration
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: false,
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

let serverConfig = Object.assign({}, config, {
  name: 'server',
  entry: ['babel-polyfill', './bin/www'],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'server-bundle.js',
  },
  target: 'node',
  node: {
    // fs: 'empty',
    __dirname: true,
  },
  externals: [nodeExternals()], // ignore all modules in node_modules folder
});

// Return Array of Configurations
module.exports = [
  serverConfig,
];
