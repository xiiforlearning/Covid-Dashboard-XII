const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    
    const jsLoaders = () => {
        const loaders = [{
            loader: 'babel-loader',
        }]
        if (!isProduction) {
            loaders.push('eslint-loader')
        }
        return loaders;
    }

    const config = {
        context: path.resolve(__dirname, 'src'),
        mode: 'development',
        entry: ['./js/app.js', './sass/style.scss'],
        output: {
            filename: 'js/bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                filename: "index.html",
                cache: false,
            }),
            new CopyPlugin({
                patterns: [{ 
                    from: path.resolve(__dirname, 'src/assets'), 
                    to: path.resolve(__dirname, 'dist/assets') 
                }],
            }),
            new MiniCssExtractPlugin({
                filename: 'style/style.css'
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [ 
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: jsLoaders()
                },
                {
                    test: /\.scss$/,
                    use:   [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images',
                        publicPath: '../assets/images'
                    }
                }
            ]
        },
    }
    return config;
}