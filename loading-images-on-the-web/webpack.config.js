const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = ({
    mode
}) => webpackMerge({
    mode: "production",
    entry: "./src/index.js",
    plugins: [new HtmlWebpackPlugin({
        template: "index.html",
        inject: "body"
    }), new CopyWebpackPlugin([{
        from: 'src/images/',
        to: 'images/'
    }])]
}, modeConfig(mode))