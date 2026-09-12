import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

// Separate Classic checkout/build; no source, CSS or dependencies enter the V2 app.
const repository = fileURLToPath(new URL('..', import.meta.url))
export const CLASSIC_SHA = '239d18056d8b3df2cf9a5fd5509f897f85ed70ad'

export function buildClassic({
  directory = process.env.CLASSIC_REPOSITORY || resolve(repository, '../cho-youn-kyoung'),
  output = resolve(repository, '.cache/entry-classic'),
  base = '/',
  pinned = false,
} = {}) {
  directory = resolve(directory)
  output = resolve(output)
  if (pinned) {
    const git = args => execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim()
    if (git(['rev-parse', 'HEAD']) !== CLASSIC_SHA || git(['status', '--porcelain'])) {
      throw new Error(`Classic preview requires a clean checkout at ${CLASSIC_SHA}`)
    }
  }
  execFileSync(process.execPath, [resolve(directory, 'node_modules/vite/bin/vite.js'), 'build',
    '--base', base, '--outDir', output], { cwd: directory, stdio: 'inherit' })
  return output
}

if (import.meta.main) buildClassic({
  output: process.argv[2] || process.env.CLASSIC_OUTPUT,
  base: process.argv[3] || process.env.CLASSIC_BASE,
  pinned: process.env.CLASSIC_PINNED === '1',
})
