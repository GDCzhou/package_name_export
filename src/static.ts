/* eslint-disable no-console */
import { promises as fs } from 'fs'
// import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { findExports, resolve as resolvePackage } from 'mlly'
// import { getPackageInfo } from 'local-pkg'
import type { GetExportsOptions } from './types'

export async function getExportsStatic(
  name: string,
  options?: GetExportsOptions,
) {
  async function getExportsUrl(relative: string, importer?: string): Promise<string[]> {
    const isPkgRegx = /^[@a-zA-Z]/
    const url = relative.match(isPkgRegx)
      ? await resolvePackage(relative, {
        url: importer,
        extensions: ['.mjs', '.js'],
        conditions: ['import', 'require', 'default'],
      })
      : new URL(relative, importer).href
    const code = await fs.readFile(fileURLToPath(url), 'utf-8')
    // specifier: '@vue/runtime-dom',
    const exports = findExports(code)
    console.log('******************************************')
    console.log(url, exports)
    return (
      await Promise.all(
        exports.map((i) => {
          if (i.type === 'star' && i.specifier) {
            const newUrl = i.specifier
            return getExportsUrl(newUrl, url)
          }
          return i.names
        }),
      )
    ).flat()
  }
  return await getExportsUrl(name, options?.url)
}
