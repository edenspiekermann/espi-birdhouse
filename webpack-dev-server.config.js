const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

require('dotenv').config();

const config = {
  //Entry points to the project
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  //Config options on how to interpret requires imports
  resolve: {
    extensions: ["", ".js"],
  },
  //workaround request lib bug
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  //Server Configuration options
  // devServer:{
  //   contentBase: 'src/www',  //Relative directory for base of server
  //   devtool: 'eval',
  //   hot: true,        //Live-reload
  //   inline: true,
  //   port: 3800,        //Port Number
  //   host: 'localhost',  //Change to '0.0.0.0' for external facing server
  // },
  devtool: 'eval',
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      PUBNUB_PUBLISH: JSON.stringify(process.env.PUBNUB_PUBLISH),
      PUBNUB_SUBSCRIBE: JSON.stringify(process.env.PUBNUB_SUBSCRIBE),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    // //Enables Hot Modules Replacement
    // new webpack.HotModuleReplacementPlugin(),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Moves files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, "src")),
  ],
  module: {
    loaders: [
      {
        //React-hot loader and
        test: /\.js$/,  //All .js files
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath],
      },
      { test: /\.json$/, loader: 'json-loader' }

    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  }
};

module.exports = config;
