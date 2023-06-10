'use client'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { Unity, useUnityContext } from 'react-unity-webgl'

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
  return (
    <>
      {!isLoaded && (
        <Container
          sx={{
            width: '100lvw',
            height: '100lvh',
            display: 'grid',
            placeItems: 'center',
            position: 'absolute',
            inset: 0,
          }}
        >
          <CircularProgress size={60} />
        </Container>
      )}
      <Unity unityProvider={unityProvider} className='h-screen w-screen' />
    </>
  )
}

export default UnityApp
