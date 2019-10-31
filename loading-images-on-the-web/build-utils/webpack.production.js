const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

module.exports = () => ({
    mode: "production",
    devtool: "none",
    output: {
        publicPath: '',
        filename: "bundle.[contenthash].js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }]
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "style.[contenthash].css"
    }), new OptimizeCSSAssetsPlugin(), new ImageminWebpWebpackPlugin]
});