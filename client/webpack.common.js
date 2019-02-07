const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://steamate.herokuapp.com'
        })
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
};