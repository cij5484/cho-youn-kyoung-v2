import { EditorialLink } from '../EditorialLink.tsx'

/** User-confirmed Korean facts; EN routing does not silently turn these into authored translations. */
export function CompactArtistProfile({ titleId, locale }: { titleId: string; locale: 'ko' | 'en' }) {
  return <div className="artist-experience-profile" lang="ko">
    <div className="artist-experience-identity">
      <h2 id={titleId}>조윤경</h2>
      <p className="artist-experience-name" lang="en">Cho Youn Kyoung</p>
    </div>
    <p className="artist-experience-role">해금 연주자</p>
    <ul className="artist-experience-credentials">
      <li>국립부산국악원 기악단 단원</li>
      <li>한양대학교 음악학박사<span lang="en">(D.M.A.)</span></li>
      <li>국가무형유산 「종묘제례악」 이수자</li>
      <li>제27회 온나라국악경연대회 해금부문 금상</li>
    </ul>
    <EditorialLink to="/about/" locale={locale}>전체 프로필 보기</EditorialLink>
  </div>
}
