'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import useSWR from 'swr'

import Spinner from '@/components/Spinner'

const UnityApp = () => {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl: '/unity/Build/Build.loader.js',
    dataUrl: '/unity/Build/Build.data',
    frameworkUrl: '/unity/Build/Build.framework.js',
    codeUrl: '/unity/Build/Build.wasm',
    companyName: 'TUS',
    productName: 'Unitychan Practice',
    productVersion: '0.1',
  })
  const { data } = useSWR(
    '/api/pose',
    (url) => fetch(url, { cache: 'no-cache' }).then((res) => res.json()),
    { refreshInterval: 33 },
  )
  console.log({ data })

  return (
    <>
      {!isLoaded && <Spinner />}
      <Unity unityProvider={unityProvider} className='h-screen w-screen' />
    </>
  )
}

export default UnityApp
