'use client'

import { SessionProvider } from 'next-auth/react'

import type { Props } from '@/types'

const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthProvider
