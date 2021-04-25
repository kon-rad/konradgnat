const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '..', 'konradgnat', 'static_files'),
        publicPath: '../konradgnat/static_files/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /(\.jpg$|\.jpeg$|\.webp$|\.JPG$)/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
