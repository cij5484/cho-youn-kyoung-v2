import { test } from 'node:test'
import { assertDraftArtifactsExcluded } from './assert-draft-artifacts.ts'

// Fast CI runs this after a fresh root build; Full also checks the project build in Playwright.
test('root build omits registered drafts from every public HTML, script and manifest', async (t) => {
  t.diagnostic(JSON.stringify(await assertDraftArtifactsExcluded('root')))
})
