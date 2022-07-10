# 练习写库
  node ts vue
  把库的export都导出来
  mlly: 处理esm包
  tinypool库文档 - node worker thread
- https://github.com/tinylibs/tinypool#readme
  打包： tsup | unbuild
  local-pkg
# 自动引入库的api
-runtime
```ts
  const vue = await import('vue')
  Object.keys(vue)

```

### static analysis
-ast
-regexp

```ts
  fs.readFile('/path/entry')
```
```ts
//index.ts
  export * from './bar'
  export * from '@vue/reactivity'
```