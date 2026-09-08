import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyPromotion } from '../src/home/experience/config.ts'

const args = process.argv.slice(2), check = args.includes('--check'), input = args.filter(arg => arg !== '--check')
if (input.length !== 1) {
  console.error('사용법: npm run experience:promote -- <설정.json 또는 JSON payload> [--check]')
  process.exitCode = 1
} else {
  try {
    const source = input[0].trim().startsWith('{') ? input[0] : await readFile(resolve(input[0]), 'utf8')
    const path = fileURLToPath(new URL('../src/home/experience/canonical.json', import.meta.url))
    const current = JSON.parse(await readFile(path, 'utf8'))
    const { next, changes } = applyPromotion(current, JSON.parse(source))
    if (!changes.length) console.log('Canonical과 배포 후보가 같습니다. 파일 변경 없음.')
    else {
      for (const change of changes) console.log(`${change.key}: ${JSON.stringify(change.from)} → ${JSON.stringify(change.to)}`)
      if (check) console.log('검증만 완료했습니다. Canonical 파일은 변경하지 않았습니다.')
      else { await writeFile(path, `${JSON.stringify(next, null, 2)}\n`); console.log('src/home/experience/canonical.json 갱신 완료. commit/배포는 별도입니다.') }
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1
  }
}
