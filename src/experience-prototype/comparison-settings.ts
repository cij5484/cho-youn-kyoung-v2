import type { JangguColor } from '../interaction-prototype/tuning.ts'
export type PortraitExperiment = 'off' | 'straight' | 'hanji'
export type ComparisonPatch = Partial<{portrait:PortraitExperiment;magnet:boolean;points:boolean;janggu:boolean;type:boolean;color:JangguColor;dev:boolean}>
const owned=['dev','portrait','magnet','compare','all','points','janggu','type','color','study']
export function readComparison(search:string,local:boolean){
  const q=new URLSearchParams(search),disabled=q.get('dev')==='0'
  const legacy=q.has('compare')||q.has('all')
  const enabled=!disabled&&(local||q.get('dev')==='1'||legacy)
  const a=!disabled&&q.get('all')==='a',candidate=q.get('portrait'),color=q.get('color')
  return {enabled,available:local||enabled,open:enabled&&(q.get('dev')==='1'||legacy),
    portrait:(enabled&&(candidate==='straight'||candidate==='hanji')?candidate:'off') as PortraitExperiment,
    magnet:enabled&&q.get('magnet')==='on',
    points:disabled||!a&&q.get('points')!=='a',janggu:disabled||!a&&q.get('janggu')!=='a',type:disabled||!a&&q.get('type')!=='a',
    color:(!disabled&&(color==='burnt'||color==='rust')?color:'lacquer') as JangguColor,
    study:!disabled&&q.get('study')==='type',legacy,
  }
}
export type ComparisonSettings=ReturnType<typeof readComparison>
/** Change only owned settings; locale/path, unrelated query and the user's hash stay with the caller. */
export function comparisonSearch(search:string,patch:ComparisonPatch){
  const q=new URLSearchParams(search),current=readComparison(search,true)
  if(q.has('all')&&['points','janggu','type','color'].some(key=>key in patch)){
    q.delete('all');for(const key of ['points','janggu','type'] as const)q.set(key,current[key]?'b':'a')
  }
  for(const [key,value] of Object.entries(patch)){
    if(key==='portrait'){if(value==='off')q.delete(key);else q.set(key,String(value))}
    else if(key==='dev')q.set(key,value?'1':'0')
    else if(key==='magnet'){if(value)q.set(key,'on');else q.delete(key)}
    else if(key==='color')q.set(key,String(value))
    else q.set(key,value?'b':'a')
  }
  return q.toString()
}
export function resetComparison(search:string,exit=false){
  const q=new URLSearchParams(search);for(const key of owned)q.delete(key)
  q.set('dev',exit?'0':'1');return q.toString()
}
export function comparisonAddress(href:string,settings:ComparisonSettings){
  const url=new URL(href)
  url.search=comparisonSearch(url.search,{dev:true,portrait:settings.portrait,magnet:settings.magnet,points:settings.points,janggu:settings.janggu,type:settings.type,color:settings.color})
  return url.href
}
