const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: "file-loader",
        options: {name: "../public/img/[name].[ext]"}
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: 'text/css',
      filename: 'bundle.css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    publicPath: '/',
    historyApiFallback: true,
  }
};