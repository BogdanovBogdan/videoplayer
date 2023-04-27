const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { template } = require('lodash');

module.exports = {
  entry: './src/index.ts',
  devServer: {
    port: 3000,
  },
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Custom Title',
      template: path.resolve(__dirname, 'example', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
