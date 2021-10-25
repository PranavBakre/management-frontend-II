/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cssLoader = 'css-loader';


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require("tailwindcss")("tailwind.config.js"),'autoprefixer']
    }
  }
};

module.exports = function(env, { analyze }) {
  const production = env.production || process.env.NODE_ENV === 'production';
  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? undefined : 'eval-cheap-source-map',
    entry: {
      entry: './src/main.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production ? '[name].[contenthash].bundle.js' : '[name].bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev-app'), 'node_modules']
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 3000
    },
    module: {
      rules: [
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset' },
        { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,  type: 'asset' },
        {
          test: /\.css$/i,
          // For style loaded in src/main.js, it's not loaded by style-loader.
          // It's for shared styles for shadow-dom only.
          issuer: /[/\\]src[/\\]main\.(js|ts)$/,
          use: [ cssLoader, postcssLoader ]
        },
        {
          test: /\.css$/i,
          // For style loaded in other js/ts files, it's loaded by style-loader.
          // They are directly injected to HTML head.
          issuer: /(?<![/\\]src[/\\]main)\.(js|ts)$/,
          use: [ 'style-loader', cssLoader, postcssLoader ]
        },
        {
          test: /\.css$/i,
          // For style loaded in html files, Aurelia will handle it.
          issuer: /\.html$/,
          use: [ cssLoader, postcssLoader ]
        },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        {
          test: /[/\\]src[/\\].+\.html$/i,
          use: {
            loader: '@aurelia/webpack-loader',
            options: {
              // The other possible Shadow DOM mode is 'closed'.
              // If you turn on "closed" mode, there will be difficulty to perform e2e
              // tests (such as Cypress). Because shadowRoot is not accessible through
              // standard DOM APIs in "closed" mode.
              defaultShadowOptions: { mode: 'open' }
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new CopyWebpackPlugin({
        patterns: [{ from: "public/" }],
      }),
      new Dotenv({
        path: `./.env${production ? '' :  '.' + process.env.NODE_ENV}`,
      }),
      analyze && new BundleAnalyzerPlugin()
    ].filter(p => p)
  }
}