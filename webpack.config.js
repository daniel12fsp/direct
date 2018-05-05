const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
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



// const config = {
//   plugins: [
//     new CopyWebpackPlugin([ ...patterns ], options)
//   ]
// }


// // webpack config
// {
  
// }