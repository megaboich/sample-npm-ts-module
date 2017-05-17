"use strict";
// Karma configuration
module.exports = function (config) {
    config.set({
		/*
         * Enable or disable watching files and executing the tests whenever
         * one of the files in the "files" field is changed.
         */
        autoWatch: true,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            //'Chrome',
            //'Firefox',
            'PhantomJS',
        ],

        // web server port
        port: 9876,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // enable / disable colors in the output (reporters and logs)
        colors: false,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        /**
        * A lot of plugins are available for test results reporting.
        * You can find them here: https://npmjs.org/browse/keyword/karma-reporter
        */
        reporters: ['mocha'],

        files: [
            "./tests-entry-point.ts"
        ],

        // list of files to exclude
        exclude: [],

        /**
         * Transform files before loading them.
         */
        preprocessors: {
            './tests-entry-point.ts': ['webpack'],
        },

        webpack: (() => {
            // Here we load our base webpack config and override some settings.
            // This is because we want to reuse configuration and avoid duplication
            let webpackConf = require('./webpack.config.js')({});
            delete webpackConf.entry; // should be empty for karma
            delete webpackConf.output; // should be empty for karma
            return webpackConf;
        })(),

        /*** Make dev server silent. */
        webpackServer: { noInfo: true }
    })
}
