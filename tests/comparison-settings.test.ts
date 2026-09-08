import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readComparison,comparisonSearch,resetComparison,comparisonAddress} from '../src/experience-prototype/comparison-settings.ts'
test('ordinary deployed preview is inert, local has a collapsed launcher, explicit dev gates experiments',()=>{
  assert.equal(readComparison('',false).available,false)
  assert.equal(readComparison('',true).open,false)
  assert.equal(readComparison('?portrait=hanji&magnet=on',false).portrait,'off')
  assert.equal(readComparison('?dev=1&portrait=hanji&magnet=on',false).portrait,'hanji')
  assert.equal(readComparison('?dev=1&portrait=hanji&magnet=on',false).magnet,true)
  const off=readComparison('?dev=0&all=a&portrait=hanji&magnet=on',true)
  assert.equal(off.portrait,'off');assert.equal(off.magnet,false);assert.equal(off.points,true)
})
test('legacy compare/all remains available and a single choice preserves the other legacy choices',()=>{
  assert.equal(readComparison('?compare',false).available,true)
  const query=comparisonSearch('?all=a&campaign=hello',{points:true})
  const state=readComparison(query,false)
  assert.equal(state.points,true);assert.equal(state.janggu,false);assert.equal(state.type,false)
  assert.equal(new URLSearchParams(query).get('campaign'),'hello')
})
test('reset/exit removes owned experiments while retaining unrelated query; copied URL keeps locale/base/hash',()=>{
  const input='?dev=1&portrait=hanji&magnet=on&all=a&campaign=hello'
  const cleared=resetComparison(input,true),q=new URLSearchParams(cleared)
  assert.equal(q.get('dev'),'0');assert.equal(q.get('campaign'),'hello');assert.equal(q.has('portrait'),false);assert.equal(q.has('all'),false)
  const href='https://cij5484.github.io/cho-youn-kyoung-v2/en/?campaign=hello#artist'
  const shared=new URL(comparisonAddress(href,readComparison(input,true)))
  assert.equal(shared.pathname,'/cho-youn-kyoung-v2/en/');assert.equal(shared.hash,'#artist');assert.equal(shared.searchParams.get('portrait'),'hanji');assert.equal(shared.searchParams.get('campaign'),'hello');assert.equal(shared.searchParams.get('dev'),'1')
})
