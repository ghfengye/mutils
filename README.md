# m-utils

## 编译

```
npm run compile
npm run compile:w  // 可监听
```

## 测试

```
npm run test
```

## 打包

```
npm run build
```

## 自定义打包

```
// 打包umd格式，兼容浏览器和node环境
npm run dev

// 打包cjs格式
npm run dev:cjs

// 打包es6格式
npm run dev:esm
```

## 发布
```
npm publish
```

## 使用

1. 浏览器直接引入，使用m-utils或者压缩版m-utils-min.js，调用 window.mUtils

2. npm引入

```
import mUtils from '@mUtils/m-utils';
import { local } from '@mUtils/m-utils';
```

### 编写工具函数

1. 在src下创建对应函数的文件 xx(工具类，如date)/xxx.ts

2. 在入口文件entry-compiler.ts 导入
```
import xxx from './xx/xxx.ts'
export = {
    ...
    xxx
}
```

3. 在index.d.ts中添加类型声明， 如

```
declare namespace mUtils {
    ...
    export function xxx():void
}
```

### 编写单元测试用例

1. 在test下创建命名为xx.spec.ts文件，然后写单元测试用例使用mocha

2. 执行 ```npm run test```， 可在终端查看测试通过情况和代码覆盖率

### 编译、打包构建、发布

```
// 修改提交后，直接执行以下命令，即可完成编译、打包、发布
npm run publish:patch 
npm run publish:minor
npm run publish:major
npm run publish:premajor
```

### 