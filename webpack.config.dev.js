const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require("path");
module.exports = {
    entry:  './src/browser.js',
    output: {
      path: __dirname + "/distBrowser",
      filename: "main.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new CleanWebpackPlugin("distBrowser"),
      new CopyWebpackPlugin(['src/inject.js', 'src/index.html',
    ])
    ]
  };