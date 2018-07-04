/*
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: 'build.js'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
  }
};
*/

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
      template: "./src/index.html"
    })
  ]
};