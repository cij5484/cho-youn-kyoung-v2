import { test } from 'node:test'
import { assertDesignArtifacts } from './assert-design-artifacts.ts'

test('fresh root artifact includes licensed local fonts and excludes the development Lab', async t => {
  t.diagnostic(JSON.stringify(await assertDesignArtifacts('root')))
})
