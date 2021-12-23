const config = require('./webpack.config')

const { merge } = require('webpack-merge')

module.exports =  merge(config , {
    mode : 'development',
    devServer: {
        compress: true,
        port: 8088,
        historyApiFallback :true
    },
})
