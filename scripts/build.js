/*
 * @Description: 构建打包
 * @Author: mzn
 * @Date: 2019-10-11 18:45:08
 */
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const { rollup } = require('rollup')
const cjs = require('rollup-plugin-commonjs')

let building = ora('building...');

if (!fs.existsSync('lib')) {
  fs.mkdirSync('lib')
}
let builds = require('./config').getAllBuilds()
let defaultPlugins = require('./config').defaultPlugins;

// 构建config.js配置的全量包
function buildConfig(builds) {
  building.start();
  let built = 0;
  const total = builds.length;
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++;
      if (built < total) {
        next()
      }
    }).then(() => {
      building.stop()
    }).catch(logError)
  }
  next()
}

// 构建Fn
function buildEntry(config) {
  const output = config.output;
  const { file } = output;
  return rollup(config).then(bundle => bundle.generate(output)).then(({ output: [{ code }] }) => {
    return write(file, code);
  })
}

// 打印日志
function write(dest, code) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      console.log(`${blue(path.relative(process.cwd(), dest))}  ${getSize(code)}${extra || ''}`)
      resolve()
    }
    fs.writeFile(dest, code, err => {
      if (err) return reject(err);
      report()
    })
  })
}

// 获取文件大小
function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`
}

// 输出错误日志
function logError(e) {
  building.stop()
  console.log(e)
}

// 设置颜色
function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

// 处理字符串，头字母大写
function firstUpperCase(str) {
  return str.replace(/^\S/,function(s){return s.toUpperCase();});
}

// 导出单个函数
function buildSingleFn() {
  const targetPath1 = path.resolve(__dirname, '../', 'dist/src/')
  const dir1 = fs.readdirSync(targetPath1)
  dir1.map(type => {
    if (/entry-compiler.js/.test(type)) return;
    const targetPath2 = path.resolve(__dirname, '../', `dist/src/${type}`)
    const dir2 = fs.readdirSync(targetPath2)
    dir2.map(fn => {
      if (/.map/.test(fn)) return;
      try {
        const targetPath3 = path.resolve(__dirname, '../', `dist/src/${type}/${fn}`)
        fs.readFile(targetPath3, async (err, data) => {
            if(err) return;
            const handleContent = data.toString().replace(/require\(".{1,2}\/[\w\/]+"\)/g, (match) => {
              // match 为 require("../collection/each") => require("./each")
              const splitArr = match.split('/')
              const lastStr = splitArr[splitArr.length - 1].slice(0, -2)
              const handleStr = `require('./${lastStr}')`
              return handleStr
            })
            const libPath = path.resolve(__dirname, '../', 'lib')
            await fs.writeFileSync(`${libPath}/${fn}`, handleContent)
             //单个函数rollup打包到lib文件根目录下
            let moduleName = firstUpperCase(fn.replace(/.js/,''));
            let config = {
              input: path.resolve(__dirname, '../', `lib/${fn}`),
              plugins: defaultPlugins,
              external: ['tslib', 'dayjs'],  // 由于函数用ts编写，使用external外部引用tslib，减少打包体积
              output: {
                file: `lib/${fn}`,
                format: 'umd',
                name: `m${moduleName}`,
                globals: {
                  tslib:'tslib',
                  dayjs: 'dayjs',
                },
                banner: '/*!\n' +
                ` * @author mzn\n` +
                ` * @desc ${moduleName}\n` +
                ' */',
              }
            }
            await buildEntry(config);
          })
      } catch (e) {
        logError(e);
      }
    })
  })
}

// 构建打包（全量和单个）
async function build() {
  if (!fs.existsSync(path.resolve(__dirname, '../', 'lib'))) {
    fs.mkdirSync(path.resolve(__dirname, '../', 'lib'))
  }
  building.start()
  Promise.all([
    await buildConfig(builds),
    await buildSingleFn(),
  ]).then(([result1, result2]) => {
    building.stop()
  }).catch(logError)
}

build();