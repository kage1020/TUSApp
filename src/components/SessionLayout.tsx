'use client'

import CircularProgress from '@mui/material/CircularProgress'
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
      {secured && !session && (
        <div className='grid h-screen w-screen place-items-center bg-gray-200'>
          <CircularProgress />
        </div>
      )}
      {secured && session && children}
    </>
  )
}

export default SessionLayout
