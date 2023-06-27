'use client'

import { useEffect, useRef } from 'react'

import { Box, Card, CardActions, CardContent } from '@mui/material'
import mapboxgl from 'mapbox-gl'

import './mapbox-gl.css'

const MapboxPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/kage1020/cljea0zsn001301r8equd1hhw',
      center: [139.9, 35.8],
      zoom: 11,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '',
    })

    new mapboxgl.Marker().setLngLat([139.86324, 35.7719]).addTo(map.current)
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minWidth: '360px',
        minHeight: '360px',
        maxWidth: '720px',
        maxHeight: '720px',
      }}
    >
      <Card sx={{ height: '100%', width: '100%' }} elevation={5}>
        <CardContent sx={{ height: '100%', width: '100%' }}>
          <Box component='div' ref={mapContainer} sx={{ height: '100%', width: '100%' }}></Box>
        </CardContent>
        <CardActions sx={{ display: 'none' }}></CardActions>
      </Card>
    </Box>
  )
}

export default MapboxPage
