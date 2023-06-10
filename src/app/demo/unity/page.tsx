import { Suspense } from 'react'

import Skelton from '@/components/Skeleton'

import UnityApp from './unity'

export const metadata = {
  title: 'Unity',
}

const UnityPage = async () => {
  return (
    <div>
      <Suspense fallback={<Skelton />}>
        <UnityApp />
      </Suspense>
    </div>
  )
}

export default UnityPage
