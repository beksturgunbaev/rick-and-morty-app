const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// argv.mode будет 'production' при сборке и 'development' при запуске devServer
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/app/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: isDev ? "/" : "/rick-and-morty-app/",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Он сам найдет ваш postcss.config.mjs
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isDev ? "development" : "production",
      ),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],

  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
