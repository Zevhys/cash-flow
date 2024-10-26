const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",

  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new CopyPlugin({
      patterns: ["./src/robots.txt"],
    }),
    new HtmlBundlerPlugin({
      entry: {
        index: "./src/index.html",
      },
      js: {
        filename: "[contenthash].js",
      },
      css: {
        filename: "[contenthash].css",
      },
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
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

  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
      new TerserPlugin(),
    ],
    minimize: true,
  },
};
