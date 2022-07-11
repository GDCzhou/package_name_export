# 练习写库

- node ts vue
- 把库的 export 都导出来
- mlly: 处理 esm 包
- tinypool 库  - node worker thread

- 文档: https://github.com/tinylibs/tinypool#readme
- 打包： tsup | unbuild
- local-pkg: 读取package.json文件

### 一 功能: 自动引入库的 api

- 方案1 runtime - node 处理

```ts
const vue = await import('vue')
Object.keys(vue)
```

## 方案2 static analysis

- ast
- regexp

```ts
fs.readFile('/path/entry')
```

```ts
//index.ts
export * from './bar'
export * from '@vue/reactivity'
```

### usege

- 静态 ast 分析 only support ESM

```js
const pkg = await getExportsStatic('vue')
const { ref, onMounted } = pkg
```

- node thread workers
  ```js
  const pkg = await getExportsRuntime('vue')
  const { ref, onMounted } = pkg
  ```

```

```
