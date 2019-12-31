const path = require('path');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../public'),
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: {'^/api' : ''}
            }
        }
    }
};