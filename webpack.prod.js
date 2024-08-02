const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "webpack-preprocessor-loader",
                options: {
                    params: {
                        ENV: "production",
                    },
                    verbose: false,
                },
            }
        ]
    }
});