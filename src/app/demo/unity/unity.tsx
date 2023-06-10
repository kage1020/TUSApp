'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'

const UnityApp = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: '/unity/Build/Build.loader.js',
    dataUrl: '/unity/Build/Build.data',
    frameworkUrl: '/unity/Build/Build.framework.js',
    codeUrl: '/unity/Build/Build.wasm',
    companyName: 'TUS',
    productName: 'Unitychan Practice',
    productVersion: '0.1',
  })
  return <Unity unityProvider={unityProvider} className='h-screen w-screen' />
}

export default UnityApp
