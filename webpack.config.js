const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require("path");
module.exports = {
    output: {
      filename: 'direct.js',
      path:  path.join(__dirname, 'dist'),
      library: 'library',
      libraryTarget: 'umd'
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
      new CleanWebpackPlugin("dist"),
      new CopyWebpackPlugin(['src/inject.js', 'src/index.html',
    ])
    ]
  };