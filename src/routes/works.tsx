import type { MetaArgs } from 'react-router'
import { EditorialNavigation } from '../navigation/EditorialNavigation'
import { siteCatalog } from '../routing/site-catalog'
import { spikeMetadata } from '../spike/metadata'
import { WorksExperience } from '../works/WorksExperience'
import '../navigation/navigation.css'

export function meta({ location }: MetaArgs) { return spikeMetadata(location.pathname) }
export default function WorksRoute() {
  return <>
    <EditorialNavigation catalog={siteCatalog} mainId="works-main"/>
    <main id="works-main" tabIndex={-1}><WorksExperience locale="ko"/></main>
  </>
}
