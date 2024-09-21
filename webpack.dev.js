const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: "./src/index.html",
      },
      js: {
        filename: "[name].js",
      },
      css: {
        filename: "[name].css",
      },
      preload: [
        {
          test: /\.s?css$/,
          as: "style",
        },
        {
          test: /\.(js)$/,
          as: "script",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets/*",
          to: "./assets/[name][ext]",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[contenthash][ext][query]",
        },
      },
      {
        test: /\.(ico|png|webp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/[contenthash][ext][query]",
        },
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.txt$/,
        generator: {
          filename: "./[name][ext]",
        },
      },
    ],
  },
};
