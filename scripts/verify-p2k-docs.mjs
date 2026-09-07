import {execFileSync} from 'node:child_process'
import {existsSync,readFileSync,writeFileSync} from 'node:fs'
import {dirname,resolve} from 'node:path'
const paths=[...new Set([...execFileSync('git',['diff','--name-only'],{encoding:'utf8'}).trim().split('\n'),...execFileSync('git',['ls-files','--others','--exclude-standard'],{encoding:'utf8'}).trim().split('\n')])].filter(p=>p.endsWith('.md'))
let checked=0;const failures=[]
function anchors(path){
  const text=readFileSync(path,'utf8'),ids=new Set([...text.matchAll(/\bid=["']([^"']+)/g)].map(m=>m[1])),counts=new Map()
  for(const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)){
    const slug=match[1].toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}\s_-]/gu,'').trim().replace(/\s/g,'-')
    const count=counts.get(slug)||0;counts.set(slug,count+1);ids.add(count?`${slug}-${count}`:slug)
  }
  return ids
}
for(const path of paths){
  const text=readFileSync(path,'utf8')
  for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
    const href=match[1].replace(/^<|>$/g,'').split(' "')[0]
    if(/^(https?:|mailto:|tel:|codex:)/.test(href))continue
    const [file,fragment]=decodeURIComponent(href).split('#'),target=resolve(dirname(path),file||path.split('/').at(-1))
    checked++
    if(!existsSync(target))failures.push({path,href,reason:'missing file'})
    else if(fragment&&target.endsWith('.md')&&!anchors(target).has(fragment))failures.push({path,href,reason:'missing anchor'})
  }
}
const result={date:'2026-09-07',files:paths,checked,failures};writeFileSync('evidence/p2k/document-links.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({files:paths.length,checked,failures},null,2));if(failures.length)process.exitCode=1
