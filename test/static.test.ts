import { describe, expect, it } from 'vitest'
// import { resolve } from 'mlly'
import { getExportsStatic } from '../src'
// import { createRequire } from 'module'

describe('static', () => {
  it('ESM', async () => {
    expect(
      (await getExportsStatic('@antfu/utils')).slice(0, 10),
    ).toMatchInlineSnapshot(
      `
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
    `,
    )
  })

  it('vue', async () => {
    const pkg = await getExportsStatic('vue')
    expect(pkg.slice(5, 10)).toMatchInlineSnapshot(`
      [
        "createSSRApp",
        "defineCustomElement",
        "defineSSRCustomElement",
        "hydrate",
        "initDirectivesForSSR",
      ]
    `)
    expect(pkg).toContain('onMounted')
  })
})

// const _require = createRequire(import.meta.url)
// const p = _require.resolve('vue')
// console.log(_require,'test******');
