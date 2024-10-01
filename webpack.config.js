const path = require('path');

module.exports = {
  entry: './src/index.ts', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // TypeScript loader to handle .ts files
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  mode: 'development', // or 'production' for minified output
};
