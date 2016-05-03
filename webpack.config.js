"use strict";

/* jshint node:true */
// TODO: This can eventually be removed, but not yet...
// https://github.com/jtangelder/sass/pull/132/files
process.env.UV_THREADPOOL_SIZE = 100;

const path = require("path");
const webpack = require("webpack");
const fs = require("fs");


let plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("development"),
      ASSET_HOST: JSON.stringify(process.env.ASSET_HOST),
      OPEN_PLANET_HOST: JSON.stringify(process.env.OPEN_PLANET_HOST),
    },
  }),
];

// Dynamically build entry files
const basePath = path.join(__dirname, "src");
const vendorPath = path.join(__dirname, "node_modules");

module.exports = {
  debug: true,
  progress: true,
  context: basePath,
  entry: {
    styleguide: "styleguide/client",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name]_[chunkhash:20].js",
    publicPath: "/",
    libraryTarget: "var",
  },
  module: {
    noParse: /node_modules\/(jquery)$/,
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/,
    // }],
    loaders: [{
        test: /\.css$/,
        loader: "style!css",
      }, {
        test: /\.scss$/,
        loader: "style!css" +
          "!sass?outputStyle=expanded&" +
          "includePaths[]=" + path.resolve(__dirname, "./node_modules"),
      }, {
        test: /(\.jsx?)$/,
        loader: "babel?presets[]=es2015," +
          `presets[]=${require.resolve('babel-preset-stage-1')}&` +
          "plugins[]=transform-decorators-legacy",
        // Excluding everything EXCEPT rizzo-next and flamsteed
        exclude: /node_modules\/(?!rizzo\-next|flamsteed).*/,
      }, {
        test: /\.json$/,
        loader: "json",
      }, {
        test: /\.otf$|\.eot\??$|\.svg$|\.woff$|\.ttf$|\.png$/,
        loader: "file?name=[name].[ext]",
      }, {
        test: /picker(.date)?.js$/,
        loader: "imports?define=>false",
      }, {
        test: /jquery.dfp$/,
        loader: "imports?define=>false",
      }
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: [basePath, vendorPath],
    fallback: path.join(__dirname, "node_modules"),
  },
  // Fallback to the node_modules directory if a loader can't be found
  // Basically for when you `npm link rizzo-next`
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules"),
  },
  plugins: plugins,
};
