'use client'

import { useEffect } from 'react'

import Card from '@mui/joy/Card'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { Unity, useUnityContext } from 'react-unity-webgl'
import useSWR from 'swr'

import Spinner from '@/components/Spinner'

export default function PoseEstimationPage() {
  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: '/Build/Build.loader.js',
    dataUrl: '/Build/Build.data',
    frameworkUrl: '/Build/Build.framework.js',
    codeUrl: '/Build/Build.wasm',
    companyName: 'TUS',
    productName: 'TUSPose',
    productVersion: '1.0',
  })
  const { data } = useSWR(
    '/api/pose',
    (url) => fetch(url, { cache: 'no-cache' }).then(async (res) => await res.json()),
    { refreshInterval: 1000, dedupingInterval: 10 },
  )

  useEffect(() => {
    if (isLoaded) sendMessage('unitychan', 'SetPose', JSON.stringify(data))
  }, [data, isLoaded, sendMessage])

  return (
    <Card sx={{ width: '100%', height: '100%' }} variant='outlined' size='lg'>
      <Typography sx={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 700 }}>
        3D Pose Estimation
      </Typography>
      <Sheet sx={{ height: '100%' }}>
        {!isLoaded && <Spinner />}
        <Unity unityProvider={unityProvider} />
      </Sheet>
    </Card>
  )
}
