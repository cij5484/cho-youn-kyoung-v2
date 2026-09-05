import { Link, type MetaArgs } from 'react-router'
import { spikeMetadata } from '../spike/metadata'

export function meta({ location }: MetaArgs) {
  return spikeMetadata(location.pathname)
}

export default function NotFound() {
  return <main><h1>404</h1><Link to="/">HOME</Link></main>
}
