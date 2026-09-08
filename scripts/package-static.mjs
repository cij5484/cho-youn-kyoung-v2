import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { dirname, relative, resolve, sep } from 'node:path'
import { getBuildTarget } from '../config/build.ts'
import { siteRoutes } from '../src/routing/site-catalog.ts'
import { staticLayout } from './static-layout.mjs'

async function filesBelow(directory, prefix = '') {
  const entries = await readdir(resolve(directory, prefix), { withFileTypes: true })
  const groups = await Promise.all(entries.map(async (entry) => {
    const name = `${prefix}${entry.name}`
    if (entry.isDirectory()) return filesBelow(directory, `${name}/`)
    if (!entry.isFile()) throw new Error(`Unsupported build entry: ${name}`)
    return [name]
  }))
  return groups.flat()
}

// Shared local/CI artifact assembly: copy bytes; never render/rewrite HTML or patch dependencies.
export async function packageStatic(targetName) {
  const target = getBuildTarget(targetName)
  const buildDirectory = resolve(target.directory)
  const client = resolve(buildDirectory, 'client')
  const output = resolve(buildDirectory, 'static')
  const inWorkspace = relative(process.cwd(), output)
  if (inWorkspace.startsWith(`..${sep}`) || inWorkspace === '..' || dirname(output) !== buildDirectory) {
    throw new Error('Artifact output must stay inside the selected workspace build directory')
  }

  const publicFiles = new Set(await filesBelow('public'))
  const routePaths = siteRoutes.map(({ path }) => path)
  const mapping = staticLayout(await filesBelow(client), { base: target.base, publicFiles, routePaths })
  const commit = process.env.BUILD_SHA ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('BUILD_SHA must be a full Git commit SHA')
  await stat(client)
  await rm(output, { recursive: true, force: true })
  const files = []
  for (const [destination, source] of mapping) {
    const file = resolve(output, destination)
    await mkdir(dirname(file), { recursive: true })
    await copyFile(resolve(client, source), file)
    const contents = await readFile(file)
    files.push({ path: destination, bytes: contents.length, sha256: createHash('sha256').update(contents).digest('hex') })
  }
  await writeFile(resolve(output, 'build-info.json'), `${JSON.stringify({
    schema: 1, commit, target: targetName, base: target.base, routes: routePaths, files,
  }, null, 2)}\n`)
  console.log(`Static artifact (${targetName}): ${mapping.size} unchanged files -> ${relative(process.cwd(), output)}`)
}
