'use client'

import axios from 'axios'
import { SWRConfig } from 'swr'

import type { Props } from '@/types'

const SWRProvider = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios(url).then((r) => r.data),
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
