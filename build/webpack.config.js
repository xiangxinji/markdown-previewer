const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve }= require('./utils')

module.exports = {
    entry: resolve("src/main.js"),
    output: {
        filename: "bundle.js" ,
        path: resolve('dist')
    },
    resolve: {
        alias: {
            '@' : resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    resolve('loaders/markdown.js')
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test : /\.css$/ ,
                use :[
                    'style-loader' ,
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        compress: true,
        port: 8088,
        historyApiFallback :true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve("./public/index.html")
        }),
    ]
}
