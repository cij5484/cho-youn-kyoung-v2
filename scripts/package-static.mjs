import { copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { getBuildTarget } from '../config/build.ts'
import { spikeRoutes } from '../src/spike/fixtures.ts'

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

// Local artifact assembly only: copy bytes; never render/rewrite HTML or patch dependencies.
export async function packageStatic(targetName) {
  const target = getBuildTarget(targetName)
  const buildDirectory = resolve(target.directory)
  const client = resolve(buildDirectory, 'client')
  const output = resolve(buildDirectory, 'static')
  const inWorkspace = relative(process.cwd(), output)
  if (inWorkspace.startsWith(`..${sep}`) || inWorkspace === '..' || dirname(output) !== buildDirectory) {
    throw new Error('Artifact output must stay inside the selected workspace build directory')
  }

  const basePrefix = target.base.slice(1)
  const publicFiles = new Set(await filesBelow('public'))
  const mapping = new Map()
  for (const source of await filesBelow(client)) {
    if (source.startsWith('.vite/') || source.endsWith('.gitkeep')) continue
    let destination = source
    if (basePrefix) {
      if (source.startsWith(basePrefix)) destination = source.slice(basePrefix.length)
      else if (source === 'index.html') destination = '__spa-fallback.html'
      else if (!source.startsWith('assets/') && !publicFiles.has(source)) {
        throw new Error(`Unrecognized React Router subpath output: ${source}`)
      }
    }
    if (mapping.has(destination)) throw new Error(`Static artifact collision: ${destination}`)
    mapping.set(destination, source)
  }
  for (const fixture of spikeRoutes) {
    const htmlPath = `${fixture.path === '/' ? '' : `${fixture.path.slice(1)}/`}index.html`
    if (!mapping.has(htmlPath)) throw new Error(`Missing prerender output: ${htmlPath}`)
  }
  await stat(client)
  await rm(output, { recursive: true, force: true })
  for (const [destination, source] of mapping) {
    const file = resolve(output, destination)
    await mkdir(dirname(file), { recursive: true })
    await copyFile(resolve(client, source), file)
  }
  console.log(`Static artifact (${targetName}): ${mapping.size} unchanged files -> ${relative(process.cwd(), output)}`)
}
