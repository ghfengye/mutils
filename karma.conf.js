/**
 * @author mzn
 * @desc 自动化单元测试
 */

// Karma configuration
// Generated on Mon Sep 23 2019 11:18:41 GMT+0800 (GMT+08:00)
const path = require('path');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // 识别ts
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    // 使用webpack处理，则不需要karma匹配文件，只留一个入口给karma
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    webpack: {
      mode: 'development',
      entry: './src/entry-compiler.ts',
      output: {
        filename: '[name].js'
      },
      devtool: 'inline-source-map',
      module: {
        rules: [{
            test: /\.tsx?$/,
            use: {
              loader: 'ts-loader',
              options: {
                configFile: path.join(__dirname, 'tsconfig.json')
              }
            },
            exclude: [path.join(__dirname, 'node_modules')]
          },
          {
            test: /\.tsx?$/,
            include: [path.join(__dirname, 'src')],
            enforce: 'post',
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
      }
    },

    // 生成coverage覆盖率报告
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage/%browser%/'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' }
      }
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha', 'chai', 'karma-typescript'],
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'test/index.ts'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.ts': ['webpack', 'coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'nyan', 'coverage-istanbul'],

    // reporter options
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      }
    },

    // 配置覆盖率报告的查看方式,type查看类型，可取值html、text等等，dir输出目录
    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}