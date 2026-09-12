import test from 'node:test'
import assert from 'node:assert/strict'
import { detailDestinationMatches } from '../src/album-detail/album-navigation.ts'

test('shared image waits for both route and exact incoming detail owner', () => {
  for (const type of ['performance', 'album']) {
    const next = `/${type}/next/`, old = `/${type}/old/`
    assert.equal(detailDestinationMatches(next, old, old), false)
    assert.equal(detailDestinationMatches(next, next, old), false)
    assert.equal(detailDestinationMatches(next, next, undefined), false)
    assert.equal(detailDestinationMatches(next, next, `/${type}/next`), true)
    assert.equal(detailDestinationMatches(`${next}?dev=1`, next, next), true)
  }
})
