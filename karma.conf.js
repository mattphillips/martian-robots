module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'test/js/index.js',
            'test/js/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        preprocessors: {
            'test/js/index.js': ['webpack'],
            'test/js//**/*.js': ['webpack']
        },

        browsers : ['PhantomJS'],

        webpack: {
            entry: {
                vendor: [
                    'babel-polyfill'
                ]
            },

            externals: {
                'jsdom': 'window',
                'cheerio': 'window'
            },

            debug: true,

            resolve: {
                extensions: ['', '.js']
            },

            module: {
                loaders: [{
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loaders: [
                        'babel' + '?presets[]=es2015' + '&plugins[]=syntax-async-functions'
                    ]
                }]
            },

            devtool: 'eval'
        },

        plugins : [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-webpack'
        ]
    });
};
