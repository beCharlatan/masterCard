
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: '[name].js',
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]'
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'src/postcss.config.js'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: 'index.html'
    })
  ]
}