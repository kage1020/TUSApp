import { Suspense } from 'react'

import Spinner from '@/components/Spinner'

import UnityApp from './unity'

export const metadata = {
  title: 'Unity',
}

const UnityPage = async () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <UnityApp />
      </Suspense>
    </div>
  )
}

export default UnityPage
