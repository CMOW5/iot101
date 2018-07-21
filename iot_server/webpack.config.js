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

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var nodeExternals = require('webpack-node-externals');

var config = {
  // common configuration
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
}

var serverConfig = Object.assign({}, config, {
  name: "server",
  entry: "./bin/www",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "server-bundle.js"
  },
  target: 'node',
  node: {
      // fs: 'empty',
    __dirname: true
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
});

var frontEndConfig = Object.assign({}, config, {
  name: "frontEnd",
  entry: ['babel-polyfill', "./views/main/index.js"],
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index-bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./views/main/index.html"
    })
  ]
});

// Return Array of Configurations
module.exports = [
  serverConfig, frontEndConfig,    	
];
