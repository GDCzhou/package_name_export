import { describe, expect, it } from 'vitest'
import { resolve } from 'mlly'
import { getExportsRuntime } from '../dist'

describe('should', () => {
  it('ESM', async () => {
    expect((await getExportsRuntime('@antfu/utils')).slice(0, 10))
      .toMatchInlineSnapshot(`
        [
          "assert",
          "at",
          "batchInvoke",
          "clamp",
          "clampArrayRange",
          "clearUndefined",
          "createControlledPromise",
          "createPromiseLock",
          "createSingletonPromise",
          "debounce",
        ]
      `)
  })
  it('CJS', async () => {
    expect((await getExportsRuntime('react')).slice(0, 10))
      .toMatchInlineSnapshot(`
        [
          "Children",
          "Component",
          "Fragment",
          "Profiler",
          "PureComponent",
          "StrictMode",
          "Suspense",
          "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
          "cloneElement",
          "createContext",
        ]
      `)
  })
  it('vue/reactivity', async () => {
    expect((await getExportsRuntime('@vue/reactivity', { url: await resolve('vue') })).slice(0, 8))
      .toMatchInlineSnapshot(
      `
        [
          "EffectScope",
          "ITERATE_KEY",
          "ReactiveEffect",
          "__esModule",
          "computed",
          "customRef",
          "default",
          "deferredComputed",
        ]
      `)
  })
})

// console.log(await resolve('vue'));
