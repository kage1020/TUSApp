import Header from '@/components/Header'
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
        <main className='flex h-screen w-screen flex-col items-center justify-center bg-gray-200'>
          <NextAuthProvider>
            <Header />
            <div className='grid w-full flex-grow place-items-center px-4'>{children}</div>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  )
}
