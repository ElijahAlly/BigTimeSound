const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', "./frontend/entry.jsx"],
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, 
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", ".json", "*"]
  }
};