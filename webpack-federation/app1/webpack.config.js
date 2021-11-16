const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require("webpack").container
const path = require("path")

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 3001
  },
  output: {
    publicPath: "auto"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      filename: "remoteEntry.js",
      name: "app1",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js"
      },
      shared: {
        react: {
          singleton: true
        },
        "react-dom": {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
  ],
};

