'use client'

import { Skeleton } from '@mui/material'
import { useSession } from 'next-auth/react'

import type { Props } from '@/types'

type SessionLayoutProps = Props & {
  secured?: boolean
}

const SessionLayout = ({ secured = false, children }: SessionLayoutProps) => {
  const { data: session } = useSession({ required: secured })

  return (
    <>
      {!secured && children}
      {secured && !session && <Skeleton />}
      {secured && session && children}
    </>
  )
}

export default SessionLayout
