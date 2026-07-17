/**
 * Tiny className combiner — joins truthy class fragments with a single space.
 * Keeps a zero-dependency footprint (no clsx/tailwind-merge) for bundle size.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  let out = ''
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (p) out += (out ? ' ' : '') + p
  }
  return out
}
