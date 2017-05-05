const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');

const config = {
  entry: './src/index.js',
  watch: true,
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/app/components/'),
      assets: path.resolve(__dirname, 'src/assets/')
    },
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      Waves: 'node-waves',
      Tether: 'tether',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
            ignoreCustomFragments: [/\{\{.*?}}/],
            attrs: ['img:src', 'link:href']
          },
        }],
      },
      {
        test: /\.(jpe|png|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader'
      },
      {
        // Transpile ES6 to ES5 in Bootstrap V4
        test: /bootstrap\/js\/src\/.*\.js$/,
        loaders: [
          'imports?jQuery=jquery,Tether=tether',
          'babel?babelrc=true',
        ],
      },
    ],
  },
};

module.exports = config;
