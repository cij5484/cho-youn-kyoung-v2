import { Link } from 'react-router'
import type { CSSProperties } from 'react'
import { localizedPath, type Language } from '../routing/locale-contract.ts'

export function EditorialLink({to,children,className='',locale='ko'}:{to:string;children:string;className?:string;locale?:Language}){
  const path=localizedPath(to,locale)
  return <Link className={`editorial-link ${className}`} to={path==='/'?path:`${path}/`} aria-label={children}>
    <span className="editorial-link-copy" aria-hidden="true">{[...children].map((c,i)=><span className="link-letter-window" key={i} style={{'--letter':i} as CSSProperties}><span className="link-letter">{c===' '?'\u00a0':c}<span>{c===' '?'\u00a0':c}</span></span></span>)}</span>
    <span className="editorial-link-arrow" aria-hidden="true">↗</span>
  </Link>
}
