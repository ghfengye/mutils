/*
 * @Description: 构建配置
 * @Author:mzn
 * @Date: 2019-09-20 11:39:48
 */
const path = require('path')
const node = require('rollup-plugin-node-resolve') // 支持第三方包
const cjs = require('rollup-plugin-commonjs') // 转commonjs to es
const buble = require('rollup-plugin-buble') // 转为es5
const { terser } = require('rollup-plugin-terser') // 代码压缩
const version = process.env.VERSION || require('../package.json').version

const resolve = p => {
    return path.resolve(__dirname,'../',p);
}

const banner =  
'/*!\n' +
` * m-utils v${version}\n` +
` * author mzn\n` +
' * javascript utils\n' +
' */';

// 默认配置
const defaultPlugins = [
    node(),
    cjs(),
    buble()
];

const builds = {
    'm-utils': {
        entry: resolve('dist/src/entry-compiler.js'),
        dest: resolve('lib/m-utils.js'),
        format: 'umd',
        moduleName: 'mUtils',
        banner,
        plugins: defaultPlugins
    },
    'm-utils-min': {
        entry: resolve('dist/src/entry-compiler.js'),
        dest: resolve('lib/m-utils-min.js'),
        format: 'umd',
        moduleName: 'mUtils',
        banner,
        plugins: [...defaultPlugins, terser()]
    },
    'm-utils-cjs': {
        entry: resolve('dist/src/entry-compiler.js'),
        dest: resolve('lib/m-utils-cjs.js'),
        format: 'cjs',
        banner,
        plugins: defaultPlugins
    },
    'm-utils-esm': {
        entry: resolve('dist/src/entry-compiler.js'),
        dest: resolve('lib/m-utils-esm.js'),
        format: 'es',
        banner,
        plugins: defaultPlugins
    },
}

/**
 * 获取对应name的打包配置
 * @param {*} name 
 */
function getConfig(name) {
    const opts = builds[name];
    const config = {
        input: opts.entry,
        external: opts.external || [],
        plugins: opts.plugins || [],
        output: {
            file: opts.dest,
            format: opts.format,
            banner: opts.banner,
            name: opts.moduleName || 'mUtils',
            globals: opts.globals,
            exports: 'named', /** Disable warning for default imports */
        },
        onwarn: (msg, warn) => {
            warn(msg);
        }
    }

    Object.defineProperty(config, '_name', {
        enumerable: false,
        value: name
    });
    return config;
}

if(process.env.TARGET) {
    module.exports = getConfig(process.env.TARGET);
}else {
    exports.defaultPlugins = defaultPlugins;
    exports.getBuild = getConfig;
    exports.getAllBuilds = () => Object.keys(builds).map(getConfig);
}