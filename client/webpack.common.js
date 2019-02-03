const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: './src/index.jsx'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}