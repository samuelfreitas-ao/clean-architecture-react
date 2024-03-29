const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // devtool: 'inline-source-map',
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, '/public/js/'),
    publicPath: '/public/js/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s?)css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  externals: {
    // Para não incluir dentro do bundle.js
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': 'http://localhost:5050/api',
    }),
  ],
}
