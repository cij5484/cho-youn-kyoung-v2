import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { languageOfPath } from '../../src/routing/locale-contract.ts'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { buildTargets } from '../../config/build.ts'

export function NavigationLab() {
  const location = useLocation()
  const main = useRef<HTMLElement>(null)
  const initial = useRef(true)
  const ko = languageOfPath(location.pathname) === 'ko'
  const scenario = new URLSearchParams(location.search).get('translation')
  const catalog = spikeCatalog.map(record => record.key !== 'album' || !scenario ? record : {
    ...record, content: { ko: record.content.ko, en: scenario === 'missing' ? undefined : {
      ...record.content.en!, source: scenario === 'machine' ? 'machine-assisted' as const : 'authored' as const, status: 'draft' as const,
    } },
  })
  useEffect(() => {
    document.documentElement.lang = ko ? 'ko' : 'en'
    if (initial.current) { initial.current = false; return }
    window.scrollTo({ top: 0, behavior: 'instant' })
    requestAnimationFrame(() => main.current?.focus({ preventScroll: true }))
  }, [location.key, ko])
  return <>
    <EditorialNavigation catalog={catalog} mainId="prototype-main" />
    <main id="prototype-main" ref={main} tabIndex={-1}>
      <section className="nav-lab-space page-frame" aria-labelledby="prototype-title">
        <div className="nav-lab-note">
          <p className="type-micro label-caps" lang="en">Navigation study / P2B</p>
          <h1 id="prototype-title" lang="en">An index,<br />in the margins.</h1>
          <p className="type-metadata">{ko ? '내비게이션의 여백과 전환을 보는 중립적인 공간입니다.' : 'A neutral space for the navigation and its reveal.'}</p>
          <p className="type-micro" lang="en">Open MENU to explore the index ↗</p>
        </div>
        <div className="nav-lab-foot type-micro"><span lang="en">NEUTRAL SCROLL FIELD</span><span lang="en">{location.pathname}</span></div>
      </section>
      <div id="poster-boundary" />
      <section className="nav-lab-reading page-frame flow" aria-labelledby="reading-title">
        <p className="type-micro label-caps" lang="en">01 / After the boundary</p>
        <h2 id="reading-title" lang="en">The page continues.</h2>
        <p className="reading-measure type-body">{ko ? 'artist name과 MENU가 같은 위치에 유지됩니다. 이 영역은 스크롤과 메뉴의 키보드 접근을 확인하기 위한 개발용 샘플입니다.' : 'The artist name and MENU retain their positions. This development sample checks scrolling and keyboard access.'}</p>
        <div className="nav-lab-tools flow">
          <p className="type-metadata">Lab route fixtures / semantic counterpart checks</p>
          <Link className="text-action" to="/album/test-album/?source=lab#sample">Album fixture →</Link>
          <Link className="text-action" to="/performance/test-performance/">Performance fixture →</Link>
          <a className="text-action" href={`${buildTargets.pagesPreview.base}en/album/test-album/`}>Project-base EN fixture →</a>
          <p className="type-micro">Development only · no HOME Hero or migrated content.</p>
        </div>
      </section>
    </main>
  </>
}
