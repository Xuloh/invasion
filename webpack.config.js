const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslint = require("eslint");

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");
const BUNDLE_NAME = "invasion.bundle.js";

const loaders = {
    babelLoader: {
        loader: "babel-loader",
        options: {
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ],
            cacheDirectory: true
        }
    },
    eslintLoader: {
        loader: "eslint-loader",
        options: {
            cache: false,
            formatter: eslint.CLIEngine.getFormatter("unix"),
            emitError: true,
            emitWarning: true,
            failOnError: true
        }
    },
    styleLoader: {
        loader: "style-loader",
        options: {
            singleton: true
        }
    },
    cssLoader: "css-loader",
    /*sassLoader: {
        loader: "sass-loader",
        options: {
            implementation: require("sass")
        }
    },*/
    fileLoader: "file-loader"
};

module.exports = {
    entry: path.join(SRC_DIR, "invasion.js"),
    output: {
        path: DIST_DIR,
        filename: BUNDLE_NAME
    },
    target: "web",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: [
                    loaders.babelLoader,
                    loaders.eslintLoader
                ]
            },
            {
                test: /\.css/,
                use: [
                    loaders.styleLoader,
                    loaders.cssLoader
                ]
            },
            /*{
                test: /\.scss/,
                exclude: /node_modules/,
                use: [
                    loaders.styleLoader,
                    loaders.cssLoader,
                    loaders.sassLoader
                ]
            },
            {
                test: /\.ttf/,
                exclude: /node_modules/,
                use: loaders.fileLoader
            }*/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    devServer: {
        index: "index.html",
        contentBase: DIST_DIR,
        port: 12345,
        compress: true,
        historyApiFallback: true
    },
    performance: {
        hints: false
    }
};
