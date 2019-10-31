const path = require("path");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

module.exports = () => ({
    mode: "development",
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../src/'),
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    plugins: [new ImageminWebpWebpackPlugin()]
});