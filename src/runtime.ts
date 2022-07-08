import { resolve } from 'mlly'
import type { GetExportsOptions } from './types'

export async function getExports(name: string, options?: GetExportsOptions) {
  const p = await resolve(name, { url: options?.url })
  const pkg = await import(p)
  const keys = Object.keys(pkg)
  if (keys.length === 1 && keys[0] === 'default')
    return Object.keys(pkg.default)
  return keys
}
