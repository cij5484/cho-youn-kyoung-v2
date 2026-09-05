import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts, useLocation } from 'react-router'
import { logicalPath } from './spike/paths'
import './styles/spike.css'

export function Layout({ children }: { children: ReactNode }) {
  const path = logicalPath(useLocation().pathname)
  const lang = path === '/en' || path.startsWith('/en/') ? 'en' : 'ko'

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:," />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
