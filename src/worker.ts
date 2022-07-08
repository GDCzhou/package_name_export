import { resolve } from 'mlly'
import type { GetExportsOptions } from './types'

export default async function getExports({ name, options }: { name: string; options: GetExportsOptions }) {
  const p = await resolve(name, { url: options?.url })
  const { cjsInterop = true } = options || {}
  const pkg = await import(p)
  const keys = Object.keys(pkg)
  if (cjsInterop && keys.length === 1 && keys[0] === 'default')
    return Object.keys(pkg.default)
  return keys
}
