import { EditorialLink } from './EditorialLink.tsx'

export function ArtistScene({ locale }: { locale: 'ko' | 'en' }) {
  return <section className="artist-scene" data-home-scene="07" data-artist-identity="cho-youn-kyoung" aria-labelledby="artist-heading">
    <p className="section-index">07 — THE ARTIST</p>
    <div className="artist-copy">
      <p className="artist-english" lang="en">Cho<br/>Youn Kyoung</p>
      <h2 id="artist-heading"><span>조</span><span>윤</span><span>경</span></h2>
      <EditorialLink to="/about/" locale={locale}>연주자 소개</EditorialLink>
    </div>
  </section>
}
