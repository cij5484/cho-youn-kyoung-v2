import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { getBuildTarget } from '../config/build.ts'
import { packageStatic } from './package-static.mjs'

const [target = 'root', command = 'dev', ...args] = process.argv.slice(2)
getBuildTarget(target)
if (!['dev', 'build', 'typegen'].includes(command)) {
  throw new Error(`Unsupported React Router command: ${command}`)
}
const require = createRequire(import.meta.url)
const cli = resolve(dirname(require.resolve('@react-router/dev/package.json')), 'bin.cjs')
const child = spawn(process.execPath, [cli, command, ...args], {
  env: { ...process.env, P0B_TARGET: target },
  stdio: 'inherit',
})
child.on('error', (error) => { console.error(error); process.exitCode = 1 })
child.on('exit', async (code) => {
  process.exitCode = code ?? 1
  if (code === 0 && command === 'build') {
    try {
      await packageStatic(target)
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }
  }
})
