import { promises as fs } from 'fs'
// import { resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { resolve } from 'path'
import { findExports, resolve as resolvePackage } from 'mlly'
import { getPackageInfo } from 'local-pkg'
import type { GetExportsOptions } from './types'

export async function getExportsStatic(
  name: string,
  options?: GetExportsOptions,
) {
  const map = new Map<string, Promise<string[]>>()
  async function resolvePackageEntry(name: string, importer?: string) {
    try {
      const { rootPath, packageJson } = (await getPackageInfo(name, { paths: importer ? [fileURLToPath(importer)] : undefined }))!
      if (!packageJson.exports && packageJson.module)
        return pathToFileURL(resolve(rootPath, packageJson.module)).href
    }
    catch (err) {}
    return await resolvePackage(name, {
      url: importer,
      extensions: ['.mjs', '.js'],
      conditions: ['import', 'require', 'default'],
    })
  }

  async function getExportsRelative(
    relative: string,
    importer?: string,
  ): Promise<string[]> {
    const isPkgRegx = /^[@a-z0-9]/
    const url = relative.match(isPkgRegx)
      ? await resolvePackageEntry(relative, importer)
      : new URL(relative, importer).href
    return getExportsUrl(url)
  }
  async function getExportsUrl(url: string): Promise<string[]> {
    if (!map.has(url))
      map.set(url, _getExportsUrl(url))
    return await map.get(url)!
  }
  async function _getExportsUrl(url: string): Promise<string[]> {
    const code = await fs.readFile(fileURLToPath(url), 'utf-8')
    // specifier: '@vue/runtime-dom',
    const exports = findExports(code)
    return (
      await Promise.all(
        exports.map((i) => {
          if (i.type === 'star' && i.specifier) {
            const newUrl = i.specifier
            return getExportsRelative(newUrl, url)
          }
          return i.names
        }),
      )
    ).flat()
  }
  return await getExportsRelative(name, options?.url)
}
