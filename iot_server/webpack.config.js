/*
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./views/main/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./views/main/index.html"
    })
  ]
};
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  entry: './bin/www',
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

let frontEndConfig = Object.assign({}, config, {
  name: 'frontEnd',
  entry: ['babel-polyfill', './views/main/index.js'],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index-bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/main/index.html',
    }),
  ],
});

// Return Array of Configurations
module.exports = [
  serverConfig, frontEndConfig,
];
