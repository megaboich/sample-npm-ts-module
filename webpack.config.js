const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require("awesome-typescript-loader")

module.exports = function (env) {
    env = env || {};
    console.log(`building package bundle with webpack.`);

    const webpackConfig = {
        entry: {
            tests: './tests-entry-point.ts'
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            modules: [
                __dirname,
                "node_modules"
            ],
        },

        output: {
            path: __dirname + '/dist',
            publicPath: '',
            filename: '[name].js',
            pathinfo: true,
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        target: "es5",
                        useCache: true,
                        cacheDirectory: ".atl-cache"
                    }
                },
                { test: /\.(html|txt|sparql)$/, loader: "raw-loader" }
            ]
        },

        plugins: [
            new CheckerPlugin(),

            new HtmlWebpackPlugin({
                template: 'tests-index-template.ejs',
                filename: 'index.html',
                chunks: ['tests']
            })
        ],

        externals: {
            /**
             * These 3 stub externals are here to silenty skip errors during bundling Enzyme package
             * They are not actually needed - only referenced in conditionals to support obsolete react 0.13
             */
            'react/addons': 'undefined',
            'react/lib/ReactContext': 'undefined',
            'react/lib/ExecutionEnvironment': 'undefined'
        },
        stats: { modules: false },
        performance: { hints: false },
        devServer: {
            contentBase: "dist/",
            port: 8084,
        },
        devtool: 'source-map', // Turn on sourcemaps
    }

    return webpackConfig;
};