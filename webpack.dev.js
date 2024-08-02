const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "webpack-preprocessor-loader",
                options: {
                    params: {
                        ENV: "development",
                    },
                    verbose: true,
                },
            }
        ]
    }
});