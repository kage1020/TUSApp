import NextAuthProvider from '@/components/providers/NextAuthProvider'

import type { Props } from '@/types'

import './globals.css'
import './preflight.css'

export const metadata = {
  title: 'TUSApp',
  description: 'Utility app created by Taniguchi Lab members.',
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='ja'>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
